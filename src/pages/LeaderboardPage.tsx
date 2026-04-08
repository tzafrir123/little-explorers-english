import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Leaderboard from "@/components/Leaderboard";

const LeaderboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 p-4" dir="rtl">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-bold mb-6 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
          חזרה לתפריט
        </button>
        <Leaderboard />
      </motion.div>
    </div>
  );
};

export default LeaderboardPage;
