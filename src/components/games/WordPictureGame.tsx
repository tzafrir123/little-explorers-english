import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { words, getRandomWords, shuffle, WordItem } from "@/data/words";
import GameHeader from "@/components/GameHeader";
import GameComplete from "@/components/GameComplete";

const ROUNDS = 8;

function generateRound() {
  const correct = getRandomWords(1)[0];
  const wrong = getRandomWords(3, [correct]);
  const options = shuffle([correct, ...wrong]);
  return { correct, options };
}

const WordPictureGame = () => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState(generateRound);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = useCallback(
    (word: WordItem) => {
      if (selected) return;
      setSelected(word.english);

      const isCorrect = word.english === currentRound.correct.english;
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        if (round + 1 >= ROUNDS) {
          setIsComplete(true);
        } else {
          setRound((r) => r + 1);
          setCurrentRound(generateRound());
          setSelected(null);
        }
      }, 1000);
    },
    [selected, currentRound, round]
  );

  const restart = () => {
    setRound(0);
    setScore(0);
    setSelected(null);
    setCurrentRound(generateRound());
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <GameComplete score={score} total={ROUNDS} onRestart={restart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 p-4" dir="rtl">
      <GameHeader title="🖼️ התאימו תמונה למילה" score={score} total={ROUNDS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="flex flex-col items-center gap-6 w-full max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-9xl select-none"
          >
            {currentRound.correct.emoji}
          </motion.div>

          <p className="text-xl font-bold text-muted-foreground">
            ?מה השם באנגלית
          </p>

          <div className="grid grid-cols-2 gap-3 w-full">
            {currentRound.options.map((word) => {
              const isCorrectAnswer = word.english === currentRound.correct.english;
              const isSelected = selected === word.english;
              let bgClass = "bg-card";
              if (selected) {
                if (isCorrectAnswer) bgClass = "bg-grass text-grass-foreground";
                else if (isSelected) bgClass = "bg-destructive text-destructive-foreground";
              }

              return (
                <motion.button
                  key={word.english}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(word)}
                  className={`card-bounce ${bgClass} rounded-2xl p-4 text-center font-bold text-lg shadow-md transition-colors border-2 border-border`}
                >
                  <div className="text-2xl">{word.english}</div>
                  <div className="text-sm text-muted-foreground mt-1">{word.hebrew}</div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WordPictureGame;
