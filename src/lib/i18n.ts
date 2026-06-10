// Lightweight language helpers for the kids game
// Supported learning languages: English (default) and Romanian

export type Lang = "en" | "ro";

export const LANG_NAMES_HE: Record<Lang, string> = {
  en: "אנגלית",
  ro: "רומנית",
};

export const SPEECH_LOCALES: Record<Lang, string> = {
  en: "en-US",
  ro: "ro-RO",
};

// Used in prompts like "?מה השם ב<שפה>"
export const langNameHebrew = (lang: Lang) => LANG_NAMES_HE[lang];