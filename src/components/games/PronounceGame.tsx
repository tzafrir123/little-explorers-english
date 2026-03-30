import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomWords, WordItem } from "@/data/words";
import GameHeader from "@/components/GameHeader";
import GameComplete from "@/components/GameComplete";
import { Mic, MicOff, Volume2 } from "lucide-react";

const ROUNDS = 12;
const MAX_ATTEMPTS = 3;

const SpeechRecognitionAPI =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

const PronounceGame = () => {
  const usedWordsRef = useRef<WordItem[]>([]);
  const recognitionRef = useRef<any>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordItem>(() => {
    const w = getRandomWords(1, [])[0];
    usedWordsRef.current = [w];
    return w;
  });
  const [showHint, setShowHint] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [status, setStatus] = useState<"playing" | "correct" | "failed">("playing");
  const [lastResult, setLastResult] = useState<string>("");
  const [isComplete, setIsComplete] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [noSupport, setNoSupport] = useState(!SpeechRecognitionAPI);

  const targetWord = currentWord.english.toLowerCase();

  const speakWord = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(currentWord.english);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }, [currentWord]);

  const handleResult = useCallback(
    (transcript: string) => {
      const spoken = transcript.toLowerCase().trim();
      setLastResult(spoken);

      if (spoken === targetWord || spoken.includes(targetWord)) {
        setStatus("correct");
        setScore((s) => s + 1);
        setShowNext(true);
      } else {
        const newAttempts = attemptsLeft - 1;
        setAttemptsLeft(newAttempts);
        if (newAttempts <= 0) {
          setStatus("failed");
          setShowNext(true);
          // Speak the correct word
          setTimeout(() => speakWord(), 500);
        }
      }
    },
    [targetWord, attemptsLeft, speakWord]
  );

  const toggleRecording = useCallback(() => {
    if (!SpeechRecognitionAPI) {
      setNoSupport(true);
      return;
    }

    if (isRecording) {
      // Stop recording
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    // Start recording
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event: any) => {
      const results = event.results[0];
      // Check all alternatives
      for (let i = 0; i < results.length; i++) {
        const transcript = results[i].transcript;
        const spoken = transcript.toLowerCase().trim();
        if (spoken === targetWord || spoken.includes(targetWord)) {
          handleResult(transcript);
          return;
        }
      }
      // None matched, use first result
      handleResult(results[0].transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [isRecording, targetWord, handleResult]);

  const handleNext = () => {
    if (round + 1 >= ROUNDS) {
      setIsComplete(true);
    } else {
      const next = getRandomWords(1, usedWordsRef.current)[0];
      usedWordsRef.current = [...usedWordsRef.current, next];
      setRound((r) => r + 1);
      setCurrentWord(next);
      setShowHint(false);
      setAttemptsLeft(MAX_ATTEMPTS);
      setStatus("playing");
      setLastResult("");
      setShowNext(false);
    }
  };

  const restart = () => {
    usedWordsRef.current = [];
    const w = getRandomWords(1, [])[0];
    usedWordsRef.current = [w];
    setRound(0);
    setScore(0);
    setCurrentWord(w);
    setShowHint(false);
    setAttemptsLeft(MAX_ATTEMPTS);
    setStatus("playing");
    setLastResult("");
    setIsComplete(false);
    setShowNext(false);
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
      <GameHeader title="🗣️ בטא את המילה" score={score} total={ROUNDS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="flex flex-col items-center gap-5 w-full max-w-md"
        >
          {/* Word image */}
          <div className="text-8xl">{currentWord.emoji}</div>
          <p className="text-xl font-bold text-foreground">{currentWord.hebrew}</p>

          {/* Hint button */}
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            {showHint ? `💡 ${currentWord.english}` : "💡 רמז"}
          </button>

          {/* No support message */}
          {noSupport && (
            <div className="bg-destructive/10 text-destructive rounded-2xl p-4 text-center text-sm font-semibold">
              הדפדפן שלך לא תומך בזיהוי דיבור. נסו דפדפן Chrome.
            </div>
          )}

          {/* Instructions */}
          <div className="bg-card rounded-2xl p-4 text-center text-sm text-muted-foreground border border-border">
            <p>🎤 לחצו על כפתור ההקלטה כדי להתחיל</p>
            <p>🛑 לחצו שוב כדי לעצור את ההקלטה</p>
          </div>

          {/* Record button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleRecording}
            disabled={status !== "playing" || noSupport}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              isRecording
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "bg-primary text-primary-foreground"
            } disabled:opacity-50`}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </motion.button>
          <p className="text-sm text-muted-foreground font-medium">
            {isRecording ? "מקליט... לחצו שוב לעצירה" : "לחצו להקלטה"}
          </p>

          {/* Attempts left */}
          {status === "playing" && attemptsLeft < MAX_ATTEMPTS && (
            <p className="text-sm font-bold text-destructive">
              נסיונות נותרו: {attemptsLeft}
            </p>
          )}

          {/* Last recognized text */}
          {lastResult && status === "playing" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              שמעתי: <span className="font-bold text-foreground" dir="ltr">{lastResult}</span>
            </motion.p>
          )}

          {/* Correct feedback */}
          {status === "correct" && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <p className="text-2xl font-extrabold text-grass-foreground">✅ מצוין!</p>
              <p className="text-lg font-bold text-foreground" dir="ltr">{currentWord.english}</p>
            </motion.div>
          )}

          {/* Failed feedback */}
          {status === "failed" && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-lg font-extrabold text-destructive">
                התשובה הנכונה: <span dir="ltr">{currentWord.english}</span>
              </p>
              <button
                onClick={speakWord}
                className="flex items-center gap-2 px-4 py-2 bg-sky/20 text-foreground rounded-xl font-semibold hover:bg-sky/30 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                שמע שוב
              </button>
            </motion.div>
          )}

          {/* Next button */}
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

export default PronounceGame;
