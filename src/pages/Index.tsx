import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const games = [
  {
    id: "word-picture",
    title: "התאימו תמונה למילה",
    emoji: "🖼️",
    description: "ראו תמונה ובחרו את המילה הנכונה באנגלית",
    color: "bg-primary text-primary-foreground",
    path: "/game/word-picture",
  },
  {
    id: "spell-word",
    title: "אייתו את המילה",
    emoji: "🔤",
    description: "סדרו את האותיות כדי ליצור את המילה הנכונה",
    color: "bg-sky text-sky-foreground",
    path: "/game/spell-word",
  },
  {
    id: "quiz",
    title: "חידון מהיר",
    emoji: "🎯",
    description: "ענו על שאלות תרגום מהירות",
    color: "bg-accent text-accent-foreground",
    path: "/game/quiz",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 p-4" dir="rtl">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-7xl mb-4"
        >
          📚
        </motion.div>
        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          !בואו נלמד אנגלית
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          בחרו משחק והתחילו ללמוד 🎮
        </p>
      </motion.div>

      <div className="grid gap-4 w-full max-w-md">
        {games.map((game, i) => (
          <motion.button
            key={game.id}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(game.path)}
            className={`${game.color} rounded-3xl p-6 text-right shadow-lg game-shadow flex items-center gap-4 transition-shadow`}
          >
            <span className="text-5xl">{game.emoji}</span>
            <div className="flex-1">
              <h2 className="text-xl font-extrabold">{game.title}</h2>
              <p className="text-sm opacity-90 mt-1">{game.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-muted-foreground text-sm"
      >
        ✨ כל משחק כולל 8 סיבובים - בהצלחה
      </motion.p>
    </div>
  );
};

export default Index;
