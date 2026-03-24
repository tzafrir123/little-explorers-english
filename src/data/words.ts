export interface WordItem {
  english: string;
  hebrew: string;
  emoji: string;
  category: string;
}

export const words: WordItem[] = [
  // Animals
  { english: "Cat", hebrew: "חתול", emoji: "🐱", category: "animals" },
  { english: "Dog", hebrew: "כלב", emoji: "🐶", category: "animals" },
  { english: "Bird", hebrew: "ציפור", emoji: "🐦", category: "animals" },
  { english: "Fish", hebrew: "דג", emoji: "🐟", category: "animals" },
  { english: "Lion", hebrew: "אריה", emoji: "🦁", category: "animals" },
  { english: "Bear", hebrew: "דוב", emoji: "🐻", category: "animals" },
  { english: "Frog", hebrew: "צפרדע", emoji: "🐸", category: "animals" },
  { english: "Duck", hebrew: "ברווז", emoji: "🦆", category: "animals" },
  // Food
  { english: "Apple", hebrew: "תפוח", emoji: "🍎", category: "food" },
  { english: "Banana", hebrew: "בננה", emoji: "🍌", category: "food" },
  { english: "Bread", hebrew: "לחם", emoji: "🍞", category: "food" },
  { english: "Milk", hebrew: "חלב", emoji: "🥛", category: "food" },
  { english: "Cake", hebrew: "עוגה", emoji: "🎂", category: "food" },
  { english: "Pizza", hebrew: "פיצה", emoji: "🍕", category: "food" },
  { english: "Egg", hebrew: "ביצה", emoji: "🥚", category: "food" },
  { english: "Ice Cream", hebrew: "גלידה", emoji: "🍦", category: "food" },
  // Body
  { english: "Hand", hebrew: "יד", emoji: "✋", category: "body" },
  { english: "Eye", hebrew: "עין", emoji: "👁️", category: "body" },
  { english: "Ear", hebrew: "אוזן", emoji: "👂", category: "body" },
  { english: "Nose", hebrew: "אף", emoji: "👃", category: "body" },
  // Colors
  { english: "Red", hebrew: "אדום", emoji: "🔴", category: "colors" },
  { english: "Blue", hebrew: "כחול", emoji: "🔵", category: "colors" },
  { english: "Green", hebrew: "ירוק", emoji: "🟢", category: "colors" },
  { english: "Yellow", hebrew: "צהוב", emoji: "🟡", category: "colors" },
  // Objects
  { english: "Sun", hebrew: "שמש", emoji: "☀️", category: "nature" },
  { english: "Moon", hebrew: "ירח", emoji: "🌙", category: "nature" },
  { english: "Star", hebrew: "כוכב", emoji: "⭐", category: "nature" },
  { english: "Tree", hebrew: "עץ", emoji: "🌳", category: "nature" },
  { english: "Book", hebrew: "ספר", emoji: "📖", category: "objects" },
  { english: "Ball", hebrew: "כדור", emoji: "⚽", category: "objects" },
  { english: "House", hebrew: "בית", emoji: "🏠", category: "objects" },
  { english: "Car", hebrew: "מכונית", emoji: "🚗", category: "objects" },
];

export function getRandomWords(count: number, exclude?: WordItem[]): WordItem[] {
  const available = exclude
    ? words.filter((w) => !exclude.some((e) => e.english === w.english))
    : [...words];
  const shuffled = available.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
