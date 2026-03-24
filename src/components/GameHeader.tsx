import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface GameHeaderProps {
  title: string;
  score: number;
  total: number;
}

const GameHeader = ({ title, score, total }: GameHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-6 px-4">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-lg font-semibold"
      >
        <ArrowRight className="w-5 h-5" />
        חזרה
      </button>
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
      <motion.div
        key={score}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1 bg-sunshine/20 text-sunshine-foreground px-3 py-1 rounded-full font-bold"
      >
        <Star className="w-5 h-5 text-sunshine fill-sunshine" />
        {score}/{total}
      </motion.div>
    </div>
  );
};

export default GameHeader;
