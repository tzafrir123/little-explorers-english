// Romanian vocabulary - parallel set to words.ts (compact tuple format).
// Tuple: [displayedWord, hebrew, emoji, category]
import type { WordItem } from "./words";

type RoTuple = [string, string, string, string];

const D: RoTuple[] = [
  ["Pisica","חתול","🐱","animals"],
  ["Caine","כלב","🐶","animals"],
  ["Pasare","ציפור","🐦","animals"],
  ["Peste","דג","🐟","animals"],
  ["Leu","אריה","🦁","animals"],
  ["Urs","דוב","🐻","animals"],
  ["Broasca","צפרדע","🐸","animals"],
  ["Rata","ברווז","🦆","animals"],
  ["Cal","סוס","🐴","animals"],
  ["Vaca","פרה","🐄","animals"],
  ["Porc","חזיר","🐷","animals"],
  ["Oaie","כבשה","🐑","animals"],
  ["Iepure","ארנב","🐰","animals"],
  ["Soarece","עכבר","🐭","animals"],
  ["Maimuta","קוף","🐵","animals"],
  ["Elefant","פיל","🐘","animals"],
  ["Tigru","נמר","🐯","animals"],
  ["Girafa","ג'ירפה","🦒","animals"],
  ["Zebra","זברה","🦓","animals"],
  ["Lup","זאב","🐺","animals"],
  ["Vulpe","שועל","🦊","animals"],
  ["Panda","פנדה","🐼","animals"],
  ["Bufnita","ינשוף","🦉","animals"],
  ["Vultur","נשר","🦅","animals"],
  ["Pinguin","פינגווין","🐧","animals"],
  ["Balena","לווייתן","🐋","animals"],
  ["Delfin","דולפין","🐬","animals"],
  ["Rechin","כריש","🦈","animals"],
  ["Sarpe","נחש","🐍","animals"],
  ["Albina","דבורה","🐝","animals"],
  ["Fluture","פרפר","🦋","animals"],
  ["Furnica","נמלה","🐜","animals"],
  ["Gaina","תרנגולת","🐔","animals"],
  ["Camila","גמל","🐫","animals"],
  ["Papagal","תוכי","🦜","animals"],
  ["Crocodil","תנין","🐊","animals"],
  ["Caracatita","תמנון","🐙","animals"],
  ["Gorila","גורילה","🦍","animals"],
  ["Cangur","קנגורו","🦘","animals"],
  ["Veverita","סנאי","🐿️","animals"],
  ["Paianjen","עכביש","🕷️","animals"],
  ["Lebada","ברבור","🦢","animals"],
];

export const wordsRo: WordItem[] = D.map(([english, hebrew, emoji, category]) => ({
  english,
  hebrew,
  emoji,
  category,
}));