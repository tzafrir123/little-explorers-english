import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomWords, shuffle, WordItem } from "@/data/words";
import GameHeader from "@/components/GameHeader";
import GameComplete from "@/components/GameComplete";

const ROUNDS = 8;

type QuestionType = "en-to-he" | "he-to-en" | "emoji-to-en";

function generateRound(): { correct: WordItem; options: WordItem[]; type: QuestionType } {
  const correct = getRandomWords(1)[0];
  const wrong = getRandomWords(3, [correct]);
  const options = shuffle([correct, ...wrong]);
  const types: QuestionType[] = ["en-to-he", "he-to-en", "emoji-to-en"];
  const type = types[Math.floor(Math.random() * types.length)];
  return { correct, options, type };
}

const QuizGame = () => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState(generateRound);
  const [isComplete, setIsComplete] = useState(false);

  const getQuestion = () => {
    switch (currentRound.type) {
      case "en-to-he":
        return { prompt: currentRound.correct.english, subtext: "?מה התרגום לעברית" };
      case "he-to-en":
        return { prompt: currentRound.correct.hebrew, subtext: "?מה התרגום לאנגלית" };
      case "emoji-to-en":
        return { prompt: currentRound.correct.emoji, subtext: "?מה זה באנגלית" };
    }
  };

  const getOptionLabel = (word: WordItem) => {
    switch (currentRound.type) {
      case "en-to-he":
        return word.hebrew;
      case "he-to-en":
      case "emoji-to-en":
        return word.english;
    }
  };

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

  const { prompt, subtext } = getQuestion();

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 p-4" dir="rtl">
      <GameHeader title="🎯 חידון מהיר" score={score} total={ROUNDS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="flex flex-col items-center gap-6 w-full max-w-md"
        >
          <div className="bg-card rounded-3xl p-8 shadow-lg w-full text-center">
            <div className={currentRound.type === "emoji-to-en" ? "text-8xl" : "text-4xl font-extrabold text-foreground"}>
              {prompt}
            </div>
          </div>

          <p className="text-lg font-bold text-muted-foreground">{subtext}</p>

          <div className="flex flex-col gap-3 w-full">
            {currentRound.options.map((word, i) => {
              const isCorrectAnswer = word.english === currentRound.correct.english;
              const isSelected = selected === word.english;
              let bgClass = "bg-card border-border";
              if (selected) {
                if (isCorrectAnswer) bgClass = "bg-grass border-grass text-grass-foreground";
                else if (isSelected) bgClass = "bg-destructive border-destructive text-destructive-foreground";
              }

              return (
                <motion.button
                  key={word.english}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(word)}
                  className={`card-bounce ${bgClass} rounded-2xl p-4 text-right font-bold text-xl shadow-sm border-2 transition-colors flex items-center gap-3`}
                >
                  {getOptionLabel(word)}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizGame;
