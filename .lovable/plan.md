

## Plan

### Task 1: Update SpellWordGame wrong answer behavior
**Current**: When wrong, replaces placed letters with correct answer in the same row (red).
**Change**: Keep the wrong answer displayed in red, and show the correct answer in green boxes below (exactly like WordOrderGame). Remove the auto-replace logic. Add `wrongPlaced` state.

**File**: `src/components/games/SpellWordGame.tsx`
- Add `wrongPlaced` state
- On wrong: save wrong letters to `wrongPlaced`, keep them displayed in red
- Show correct answer in green boxes below with "✅ התשובה הנכונה:" label
- Remove the setTimeout/auto-advance logic, rely on "הבא" button only

### Task 2: Add "בטא את המילה" (Pronounce the Word) game
A new pronunciation game using the Web Speech Recognition API (`webkitSpeechRecognition` / `SpeechRecognition`).

**New files**:
- `src/components/games/PronounceGame.tsx`
- `src/pages/PronouncePage.tsx`

**Modified files**:
- `src/pages/Index.tsx` — add game card after Memory, with emoji 🗣️, title "בטא את המילה", description "בטאו את המילה בצורה הנכונה"
- `src/App.tsx` — add route `/game/pronounce`

**Game logic**:
- 12 rounds, no word repetition (uses `usedWordsRef` pattern)
- Each round shows: emoji image + Hebrew word
- "רמז" button reveals the English word (how to pronounce it)
- Record button: first click starts recording, second click stops. Instructions displayed on page
- Uses `webkitSpeechRecognition` with `lang: 'en-US'` to capture speech
- Compare recognized text (lowercased) against target word (lowercased)
- If correct → score +1, show "הבא" button
- If wrong → decrement attempts (start at 3). Show remaining attempts
- After 3 failed attempts → use `SpeechSynthesis` API to speak the correct word, show "הבא" button
- Uses same visual style as other games (GameHeader, GameComplete, framer-motion animations)

**Speech APIs used** (browser built-in, no external dependencies):
- `SpeechRecognition` / `webkitSpeechRecognition` for listening
- `SpeechSynthesisUtterance` for speaking the correct answer

