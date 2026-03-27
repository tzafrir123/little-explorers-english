import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shuffle } from "@/data/words";
import { sentenceTemplates } from "@/data/sentences";
import GameHeader from "@/components/GameHeader";
import GameComplete from "@/components/GameComplete";

const ROUNDS = 12;

const HintButton = ({ hint }: { hint: string }) => {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className="text-center mb-4">
      {showHint ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground text-sm"
        >
          💡 {hint}
        </motion.p>
      ) : (
        <button
          onClick={() => setShowHint(true)}
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          💡 רמז
        </button>
      )}
    </div>
  );
};

const WordOrderGame = () => {
  const [level, setLevel] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [placed, setPlaced] = useState<string[]>([]);
  const [available, setAvailable] = useState<{ word: string; id: number }[]>([]);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [isComplete, setIsComplete] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const usedRef = useRef<Set<number>>(new Set());

  const wordCount = level ? level + 3 : 4;

  const currentSentence = useMemo(() => {
    if (level === null) return null;
    const wc = level + 3;
    const candidates = sentenceTemplates
      .map((t, i) => ({ t, i }))
      .filter(({ t, i }) => t.sentence.length === wc && !usedRef.current.has(i));

    if (candidates.length === 0) {
      usedRef.current.clear();
      const retry = sentenceTemplates
        .map((t, i) => ({ t, i }))
        .filter(({ t }) => t.sentence.length === wc);
      if (retry.length === 0) return null;
      const pick = retry[Math.floor(Math.random() * retry.length)];
      usedRef.current.add(pick.i);
      return pick.t;
    }
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    usedRef.current.add(pick.i);
    return pick.t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, round]);

  // Initialize available words when sentence changes
  useMemo(() => {
    if (currentSentence) {
      const words = currentSentence.sentence;
      const shuffled = shuffle(words.map((w, i) => ({ word: w, id: i })));
      setPlaced([]);
      setAvailable(shuffled);
      setStatus("playing");
      setShowNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSentence]);

  const handleWordClick = useCallback(
    (item: { word: string; id: number }) => {
      if (status !== "playing" || !currentSentence) return;

      const newPlaced = [...placed, item.word];
      const newAvailable = available.filter((a) => a.id !== item.id);
      setPlaced(newPlaced);
      setAvailable(newAvailable);

      if (newPlaced.length === currentSentence.sentence.length) {
        const isCorrect = newPlaced.every((w, i) => w === currentSentence.sentence[i]);
        if (isCorrect) {
          setStatus("correct");
          setScore((s) => s + 1);
        } else {
          setStatus("wrong");
          setPlaced(currentSentence.sentence);
          setAvailable([]);
        }
        setShowNext(true);
      }
    },
    [status, placed, available, currentSentence]
  );

  const handleNext = () => {
    if (round + 1 >= ROUNDS) {
      setIsComplete(true);
    } else {
      setRound((r) => r + 1);
    }
  };

  const handleUndo = () => {
    if (placed.length === 0 || status !== "playing") return;
    const lastWord = placed[placed.length - 1];
    setPlaced(placed.slice(0, -1));
    setAvailable([...available, { word: lastWord, id: Date.now() }]);
  };

  const handleSelectLevel = (l: number) => {
    usedRef.current.clear();
    setLevel(l);
    setRound(0);
    setScore(0);
    setIsComplete(false);
    setShowNext(false);
  };

  const restart = () => {
    usedRef.current.clear();
    setLevel(null);
    setRound(0);
    setScore(0);
    setIsComplete(false);
    setShowNext(false);
  };

  // Level selection
  if (level === null) {
    return (
      <div className="min-h-screen flex flex-col items-center p-4 pt-8" dir="rtl">
        <GameHeader title="✍️ כתיבת מילים" score={0} total={ROUNDS} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mt-8"
        >
          <h2 className="text-2xl font-bold text-center text-foreground mb-6">
            בחרו רמת קושי
          </h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            הרמה קובעת כמה מילים יש במשפט
          </p>
          <div className="grid gap-3">
            {[1, 2, 3, 4, 5].map((l) => (
              <motion.button
                key={l}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectLevel(l)}
                className="bg-card border-2 border-border hover:border-primary rounded-2xl p-5 flex items-center gap-4 transition-colors"
              >
                <span className="text-3xl font-extrabold text-primary w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                  {l}
                </span>
                <div className="text-right flex-1">
                  <p className="font-bold text-foreground">רמה {l}</p>
                  <p className="text-sm text-muted-foreground">
                    הרכיבו משפט מ-{l + 3} מילים
                  </p>
                </div>
                <div className="flex">
                  {Array.from({ length: l }).map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <GameComplete score={score} total={ROUNDS} onRestart={restart} />
      </div>
    );
  }

  if (!currentSentence) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center" dir="rtl">
        <p className="text-xl font-bold text-foreground mb-4">אין מספיק משפטים ברמה זו</p>
        <button onClick={restart} className="text-primary font-semibold">חזרה לבחירת רמה</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 p-4" dir="rtl">
      <GameHeader title={`✍️ כתיבת מילים - רמה ${level}`} score={score} total={ROUNDS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="flex flex-col items-center gap-6 w-full max-w-lg mt-6"
        >
          {/* Hebrew hint button */}
          <HintButton key={`hint-${round}`} hint={currentSentence.hebrewHint} />

          {/* Placed words (slots) */}
          <div className="flex gap-2 min-h-[56px] justify-center flex-wrap" dir="ltr">
            {currentSentence.sentence.map((_, i) => (
              <motion.div
                key={i}
                className={`min-w-[64px] px-3 h-12 rounded-xl border-2 flex items-center justify-center text-base font-bold
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

          {/* Available words */}
          <div className="flex gap-2 flex-wrap justify-center" dir="ltr">
            {available.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                layout
                onClick={() => handleWordClick(item)}
                className="card-bounce min-w-[64px] px-4 h-12 rounded-xl bg-sunshine text-sunshine-foreground text-base font-extrabold shadow-md flex items-center justify-center"
              >
                {item.word}
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

          {showNext && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-lg"
            >
              הבא ←
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WordOrderGame;
