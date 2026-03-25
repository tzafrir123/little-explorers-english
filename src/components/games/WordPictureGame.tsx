import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomWords, shuffle, WordItem } from "@/data/words";
import GameHeader from "@/components/GameHeader";
import GameComplete from "@/components/GameComplete";

const ROUNDS = 8;

function generateRound(usedWords: WordItem[]) {
  const correct = getRandomWords(1, usedWords)[0];
  const wrong = getRandomWords(3, [...usedWords, correct]);
  const options = shuffle([correct, ...wrong]);
  return { correct, options };
}

const WordPictureGame = () => {
  const usedWordsRef = useRef<WordItem[]>([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState(() => {
    const r = generateRound([]);
    usedWordsRef.current = [r.correct];
    return r;
  });
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
          const next = generateRound(usedWordsRef.current);
          usedWordsRef.current = [...usedWordsRef.current, next.correct];
          setRound((r) => r + 1);
          setCurrentRound(next);
          setSelected(null);
        }
      }, 1000);
    },
    [selected, currentRound, round]
  );

  const restart = () => {
    usedWordsRef.current = [];
    const next = generateRound([]);
    usedWordsRef.current = [next.correct];
    setRound(0);
    setScore(0);
    setSelected(null);
    setCurrentRound(next);
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
