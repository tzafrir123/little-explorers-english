// ============================================
// GameComplete - Shows results after finishing a game
// Score Save: Saves score to DB when game is completed
// ============================================

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, RotateCcw, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useRef } from "react";

interface GameCompleteProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const GameComplete = ({ score, total, onRestart }: GameCompleteProps) => {
  const navigate = useNavigate();
  const { addScore, user } = useAuth();
  const scoreSavedRef = useRef(false);
  const percentage = Math.round((score / total) * 100);

  // Score Save: Save score to DB only once when game completes
  useEffect(() => {
    if (!scoreSavedRef.current && user && score > 0) {
      scoreSavedRef.current = true;
      addScore(score);
    }
  }, [score, user, addScore]);

  const getMessage = () => {
    if (percentage === 100) return "!מושלם! כל הכבוד 🎉";
    if (percentage >= 70) return "!עבודה מעולה 🌟";
    if (percentage >= 50) return "!לא רע, המשיכו לתרגל 💪";
    return "!נסו שוב, אתם יכולים 🤗";
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="flex flex-col items-center gap-6 bg-card rounded-3xl p-10 shadow-xl max-w-md mx-auto"
      dir="rtl"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-7xl"
      >
        {percentage === 100 ? "🏆" : percentage >= 70 ? "🌟" : "💪"}
      </motion.div>

      <h2 className="text-2xl font-extrabold text-foreground">{getMessage()}</h2>

      <div className="flex items-center gap-2 text-3xl font-bold text-sunshine-foreground">
        <Star className="w-8 h-8 text-sunshine fill-sunshine" />
        {score} מתוך {total}
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => {
            scoreSavedRef.current = false;
            onRestart();
          }}
          className="card-bounce flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl font-bold text-lg game-shadow"
        >
          <RotateCcw className="w-5 h-5" />
          שחקו שוב
        </button>
        <button
          onClick={() => navigate("/")}
          className="card-bounce flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-bold text-lg game-shadow"
        >
          <Home className="w-5 h-5" />
          דף הבית
        </button>
      </div>
    </motion.div>
  );
};

export default GameComplete;
