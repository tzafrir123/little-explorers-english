import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { getRandomWords, shuffle, WordItem } from "@/data/words";
import GameHeader from "@/components/GameHeader";
import GameComplete from "@/components/GameComplete";

const PAIRS = 14;

interface Card {
  id: number;
  wordItem: WordItem;
  type: "word" | "emoji";
  matched: boolean;
}

function generateCards(): Card[] {
  const selected = getRandomWords(PAIRS);
  const cards: Card[] = [];
  selected.forEach((word, i) => {
    cards.push({ id: i * 2, wordItem: word, type: "word", matched: false });
    cards.push({ id: i * 2 + 1, wordItem: word, type: "emoji", matched: false });
  });
  return shuffle(cards);
}

const cardBackColors = [
  "bg-primary", "bg-sky", "bg-sunshine", "bg-accent",
  "bg-secondary", "bg-grass",
];

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>(generateCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const handleFlip = useCallback(
    (id: number) => {
      if (isChecking) return;
      if (flipped.includes(id)) return;
      const card = cards.find((c) => c.id === id);
      if (!card || card.matched) return;

      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setIsChecking(true);
        const [firstId, secondId] = newFlipped;
        const first = cards.find((c) => c.id === firstId)!;
        const second = cards.find((c) => c.id === secondId)!;

        if (
          first.wordItem.english === second.wordItem.english &&
          first.type !== second.type
        ) {
          // Match!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, matched: true }
                  : c
              )
            );
            setMatched((m) => {
              const newM = m + 1;
              if (newM >= PAIRS) {
                setTimeout(() => setIsComplete(true), 500);
              }
              return newM;
            });
            setFlipped([]);
            setIsChecking(false);
          }, 600);
        } else {
          // No match - show close button
          setShowCloseButton(true);
        }
      }
    },
    [flipped, cards, isChecking]
  );

  const handleCloseCards = () => {
    setFlipped([]);
    setIsChecking(false);
    setShowCloseButton(false);
  };

  const restart = () => {
    setCards(generateCards());
    setFlipped([]);
    setMatched(0);
    setIsComplete(false);
    setIsChecking(false);
    setShowCloseButton(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <GameComplete score={matched} total={PAIRS} onRestart={restart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 p-4" dir="rtl">
      <GameHeader title="🧠 משחק זיכרון" score={matched} total={PAIRS} />

      <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id);
          const isMatched = card.matched;
          const colorIndex = card.id % cardBackColors.length;

          return (
            <motion.button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              whileTap={{ scale: 0.95 }}
              animate={isMatched ? { scale: 0, opacity: 0 } : {}}
              transition={{ duration: 0.3 }}
              className={`relative aspect-square rounded-2xl shadow-lg font-extrabold text-lg transition-all duration-300 border-2 border-border overflow-hidden ${
                isMatched ? "pointer-events-none" : ""
              }`}
              disabled={isMatched}
            >
              {isFlipped || isMatched ? (
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  className="w-full h-full flex items-center justify-center bg-card rounded-2xl p-1"
                >
                  {card.type === "emoji" ? (
                    <span className="text-3xl sm:text-4xl">{card.wordItem.emoji}</span>
                  ) : (
                    <span className="text-xs sm:text-sm font-extrabold text-foreground leading-tight text-center">
                      {card.wordItem.english}
                    </span>
                  )}
                </motion.div>
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${cardBackColors[colorIndex]} rounded-2xl`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <span className="text-white/80 font-extrabold text-[10px] sm:text-xs">
                      MEMORY
                    </span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {showCloseButton && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleCloseCards}
          className="mt-4 px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-lg"
        >
          ✕ סגור
        </motion.button>
      )}
    </div>
  );
};

export default MemoryGame;
