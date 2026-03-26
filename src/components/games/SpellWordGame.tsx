import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomWords, shuffle, WordItem } from "@/data/words";
import GameHeader from "@/components/GameHeader";
import GameComplete from "@/components/GameComplete";

const ROUNDS = 8;

function generateRound(usedWords: WordItem[]) {
  const word = getRandomWords(1, usedWords)[0];
  const letters = word.english.toUpperCase().split("");
  const shuffled = shuffle(letters);
  return { word, letters, shuffled };
}

const SpellWordGame = () => {
  const usedWordsRef = useRef<WordItem[]>([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(() => {
    const r = generateRound([]);
    usedWordsRef.current = [r.word];
    return r;
  });
  const [placed, setPlaced] = useState<string[]>([]);
  const [available, setAvailable] = useState<{ letter: string; id: number }[]>(() =>
    currentRound.shuffled.map((l, i) => ({ letter: l, id: i }))
  );
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [isComplete, setIsComplete] = useState(false);

  const targetWord = currentRound.word.english.toUpperCase();

  const handleLetterClick = useCallback(
    (item: { letter: string; id: number }) => {
      if (status !== "playing") return;

      const newPlaced = [...placed, item.letter];
      const newAvailable = available.filter((a) => a.id !== item.id);
      setPlaced(newPlaced);
      setAvailable(newAvailable);

      if (newPlaced.length === targetWord.length) {
        const isCorrect = newPlaced.join("") === targetWord;
        if (isCorrect) {
          setStatus("correct");
          setScore((s) => s + 1);
        } else {
          setStatus("wrong");
          // Show the correct answer
          setPlaced(targetWord.split(""));
          setAvailable([]);
        }

        setTimeout(() => {
          if (round + 1 >= ROUNDS) {
            setIsComplete(true);
          } else {
            const next = generateRound(usedWordsRef.current);
            usedWordsRef.current = [...usedWordsRef.current, next.word];
            setRound((r) => r + 1);
            setCurrentRound(next);
            setPlaced([]);
            setAvailable(next.shuffled.map((l, i) => ({ letter: l, id: i })));
            setStatus("playing");
          }
        }, 1200);
      }
    },
    [status, placed, available, targetWord, round]
  );

  const handleUndo = () => {
    if (placed.length === 0 || status !== "playing") return;
    const lastLetter = placed[placed.length - 1];
    setPlaced(placed.slice(0, -1));
    setAvailable([...available, { letter: lastLetter, id: Date.now() }]);
  };

  const restart = () => {
    usedWordsRef.current = [];
    const next = generateRound([]);
    usedWordsRef.current = [next.word];
    setRound(0);
    setScore(0);
    setCurrentRound(next);
    setPlaced([]);
    setAvailable(next.shuffled.map((l, i) => ({ letter: l, id: i })));
    setStatus("playing");
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
      <GameHeader title="🔤 אייתו את המילה" score={score} total={ROUNDS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="flex flex-col items-center gap-6 w-full max-w-md"
        >
          <div className="text-7xl">{currentRound.word.emoji}</div>
          <p className="text-xl font-bold text-foreground">{currentRound.word.hebrew}</p>

          {/* Placed letters */}
          <div className="flex gap-2 min-h-[60px] justify-center flex-wrap" dir="ltr">
            {targetWord.split("").map((_, i) => (
              <motion.div
                key={i}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-extrabold
                  ${placed[i]
                    ? status === "correct"
                      ? "bg-grass text-grass-foreground border-grass"
                      : status === "wrong"
                      ? "bg-destructive text-destructive-foreground border-destructive"
                      : "bg-sky/20 border-sky text-foreground"
                    : "border-border bg-card"
                  }`}
              >
                {placed[i] || ""}
              </motion.div>
            ))}
          </div>

          {/* Available letters */}
          <div className="flex gap-2 flex-wrap justify-center" dir="ltr">
            {available.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                layout
                onClick={() => handleLetterClick(item)}
                className="card-bounce w-12 h-12 rounded-xl bg-sunshine text-sunshine-foreground text-2xl font-extrabold shadow-md flex items-center justify-center"
              >
                {item.letter}
              </motion.button>
            ))}
          </div>

          {placed.length > 0 && status === "playing" && (
            <button
              onClick={handleUndo}
              className="text-muted-foreground hover:text-foreground font-semibold transition-colors"
            >
              ↩ בטל
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SpellWordGame;
