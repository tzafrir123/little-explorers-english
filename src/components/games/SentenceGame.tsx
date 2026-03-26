import { useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameHeader from "../GameHeader";
import GameComplete from "../GameComplete";
import { sentenceTemplates, distractorWords, SentenceTemplate } from "@/data/sentences";
import { shuffle } from "@/data/words";

const TOTAL_ROUNDS = 8;

function getRandomItems<T>(arr: T[], count: number, exclude?: T[]): T[] {
  const available = exclude ? arr.filter(item => !exclude.includes(item)) : [...arr];
  const shuffled = available.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateDistractorWord(correctWord: string): string {
  const lower = correctWord.toLowerCase();
  // Try to find a distractor from the same category
  for (const [, words] of Object.entries(distractorWords)) {
    if (words.includes(lower)) {
      const others = words.filter(w => w !== lower);
      if (others.length > 0) {
        return others[Math.floor(Math.random() * others.length)];
      }
    }
  }
  // Fallback: pick from nouns
  const others = distractorWords.nouns.filter(w => w !== lower);
  return others[Math.floor(Math.random() * others.length)];
}

function generateOptions(
  template: SentenceTemplate,
  blankIndices: number[],
  optionCount: number = 4
): string[][] {
  const correctAnswer = blankIndices.map(i => template.sentence[i]);
  const options: string[][] = [correctAnswer];

  const attempts = 0;
  while (options.length < optionCount && options.length < 100) {
    const wrongAnswer = blankIndices.map(i => {
      const correct = template.sentence[i];
      return generateDistractorWord(correct);
    });
    // Make sure this option isn't a duplicate
    const wrongKey = wrongAnswer.join("|").toLowerCase();
    const isDuplicate = options.some(o => o.join("|").toLowerCase() === wrongKey);
    if (!isDuplicate) {
      options.push(wrongAnswer);
    }
    if (options.length >= optionCount) break;
    // Safety: break after many attempts
    if (options.length === attempts) break;
  }

  return shuffle(options);
}

function selectBlankIndices(sentence: string[], level: number): number[] {
  // Skip common articles/prepositions for blanking - prefer content words
  const contentIndices = sentence.reduce<number[]>((acc, word, i) => {
    const lower = word.toLowerCase();
    const skipWords = ["the", "a", "an", "is", "are", "am", "was", "were", "in", "on", "at", "to", "of", "and", "or", "but", "for", "with", "its", "his", "her", "my", "our", "their"];
    if (!skipWords.includes(lower)) {
      acc.push(i);
    }
    return acc;
  }, []);

  // If not enough content words, also use function words
  const available = contentIndices.length >= level ? contentIndices : sentence.map((_, i) => i);
  const shuffled = shuffle(available);
  return shuffled.slice(0, Math.min(level, sentence.length - 1)).sort((a, b) => a - b);
}

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

interface SentenceGameProps {
  onBack: () => void;
}

const SentenceGame = ({ onBack }: SentenceGameProps) => {
  const [level, setLevel] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const usedTemplatesRef = useRef<Set<number>>(new Set());

  const getUnusedTemplate = useCallback((): { template: SentenceTemplate; index: number } => {
    const available = sentenceTemplates
      .map((t, i) => ({ template: t, index: i }))
      .filter(({ index }) => !usedTemplatesRef.current.has(index));
    
    if (available.length === 0) {
      usedTemplatesRef.current.clear();
      const idx = Math.floor(Math.random() * sentenceTemplates.length);
      return { template: sentenceTemplates[idx], index: idx };
    }
    
    const picked = available[Math.floor(Math.random() * available.length)];
    return picked;
  }, []);

  const currentPuzzle = useMemo(() => {
    if (level === null) return null;

    const { template, index } = getUnusedTemplate();
    usedTemplatesRef.current.add(index);

    const blankIndices = selectBlankIndices(template.sentence, level);
    const options = generateOptions(template, blankIndices);
    const correctAnswer = blankIndices.map(i => template.sentence[i]);

    return { template, blankIndices, options, correctAnswer };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, round]);

  const handleSelectLevel = (l: number) => {
    usedTemplatesRef.current.clear();
    setLevel(l);
    setRound(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameComplete(false);
  };

  const handleAnswer = (optionIndex: number) => {
    if (showResult || !currentPuzzle) return;
    setSelected(optionIndex);
    setShowResult(true);

    const selectedOption = currentPuzzle.options[optionIndex];
    const correct = selectedOption.every((w, i) => w.toLowerCase() === currentPuzzle.correctAnswer[i].toLowerCase());
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (round + 1 >= TOTAL_ROUNDS) {
        setGameComplete(true);
      } else {
        setRound(r => r + 1);
        setSelected(null);
        setShowResult(false);
      }
    }, 1500);
  };

  const handleRestart = () => {
    usedTemplatesRef.current.clear();
    setRound(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameComplete(false);
    setLevel(null);
  };

  // Level selection screen
  if (level === null) {
    return (
      <div className="min-h-screen flex flex-col items-center p-4 pt-8" dir="rtl">
        <GameHeader
          title="השלמת מילים במשפט"
          score={0}
          total={TOTAL_ROUNDS}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mt-8"
        >
          <h2 className="text-2xl font-bold text-center text-foreground mb-6">
            בחרו רמת קושי
          </h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            הרמה קובעת כמה מילים חסרות בכל משפט
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
                    {l === 1 && "השלימו מילה אחת חסרה"}
                    {l === 2 && "השלימו 2 מילים חסרות"}
                    {l === 3 && "השלימו 3 מילים חסרות"}
                    {l === 4 && "השלימו 4 מילים חסרות"}
                    {l === 5 && "השלימו 5 מילים חסרות"}
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

  if (gameComplete) {
    return (
      <GameComplete
        score={score}
        total={TOTAL_ROUNDS}
        onRestart={handleRestart}
      />
    );
  }

  if (!currentPuzzle) return null;

  const { template, blankIndices, options } = currentPuzzle;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-8" dir="rtl">
      <GameHeader
        title={`השלמת מילים - רמה ${level}`}
        score={score}
        total={TOTAL_ROUNDS}
      />

      <div className="w-full max-w-lg mt-6">
        {/* Hint button */}
        <HintButton key={`hint-${round}`} hint={template.hebrewHint} />

        {/* Sentence with blanks */}
        <motion.div
          key={`sentence-${round}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-6 shadow-lg border-2 border-border mb-6"
          dir="ltr"
        >
          <div className="flex flex-wrap gap-2 justify-center text-xl font-medium leading-relaxed">
            {template.sentence.map((word, i) => {
              const isBlank = blankIndices.includes(i);
              if (isBlank) {
                // Show the correct answer if result is shown
                if (showResult && isCorrect) {
                  return (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-xl font-bold border-2 border-green-300"
                    >
                      {word}
                    </motion.span>
                  );
                }
                if (showResult && !isCorrect) {
                  return (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-xl font-bold border-2 border-red-300"
                    >
                      {word}
                    </motion.span>
                  );
                }
                return (
                  <span
                    key={i}
                    className="px-4 py-1 border-b-3 border-dashed border-primary/50 text-primary font-bold min-w-[60px] text-center"
                  >
                    ___
                  </span>
                );
              }
              return (
                <span key={i} className="text-foreground">
                  {word}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Answer options */}
        <div className="grid gap-3">
          <AnimatePresence mode="wait">
            {options.map((option, idx) => {
              let btnClass = "bg-card border-2 border-border hover:border-primary";
              if (showResult && selected === idx) {
                const selectedCorrect = option.every(
                  (w, i) => w.toLowerCase() === currentPuzzle.correctAnswer[i].toLowerCase()
                );
                btnClass = selectedCorrect
                  ? "bg-green-100 border-2 border-green-400"
                  : "bg-red-100 border-2 border-red-400";
              } else if (showResult) {
                const isThisCorrect = option.every(
                  (w, i) => w.toLowerCase() === currentPuzzle.correctAnswer[i].toLowerCase()
                );
                if (isThisCorrect) {
                  btnClass = "bg-green-50 border-2 border-green-300";
                }
              }

              return (
                <motion.button
                  key={`${round}-${idx}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`${btnClass} rounded-2xl p-4 text-center transition-all`}
                  dir="ltr"
                >
                  <span className="text-lg font-semibold text-foreground">
                    {option.join(", ")}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Result feedback */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-4"
            >
              <span className="text-4xl">
                {isCorrect ? "🎉" : "😕"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SentenceGame;
