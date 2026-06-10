
## מטרה
לאפשר לילד לבחור בעת ההרשמה את שפת הלימוד (אנגלית כברירת מחדל, או רומנית). השפה תישמר על הפרופיל ותשפיע על המילים, ההנחיות וההגייה הקולית במשחקים. משתמשים קיימים יישארו באנגלית.

## שינויי DB
- הוספת עמודה `language text not null default 'en'` בטבלת `profiles` (ערכים אפשריים: `'en'`, `'ro'`).
- עדכון כל המשתמשים הקיימים ל-`'en'` (נעשה אוטומטית ע"י ה-default).
- עדכון `handle_new_user` כך שיקרא `raw_user_meta_data->>'language'` ויאחסן אותה (ברירת מחדל `'en'`).
- עדכון ה-Edge Function `signup` כך שיקבל `language` ויעבירה ל-`user_metadata`.

## שינויי מאגרי תוכן
### `src/data/words.ts`
- מבנה חדש לפריט מילה:
  ```ts
  interface WordItem {
    en: string;      // היה english
    ro: string;      // חדש
    hebrew: string;
    emoji: string;
    category: string;
  }
  ```
- הרחבה ל-500 פריטים ייחודיים (היום ~277), כל פריט עם תרגום אנגלי + רומני + עברית + אימוג'י.
- `getRandomWords` יקבל פרמטר נוסף `lang: 'en' | 'ro'` ויחזיר אותו `WordItem` (כל הקומפוננטות יקראו `word[lang]` במקום `word.english`).

### `src/data/sentences.ts`
- מבנה חדש:
  ```ts
  interface SentenceTemplate {
    en: string[];
    ro: string[];
    hebrewHint: string;
  }
  ```
- הרחבה כך שיהיו 500 משפטים (היום ~480 משפטים באנגלית), עם תרגום רומני מקביל לכל אחד.

## שכבת שפה באפליקציה
- הוספת `language` ל-interface `Profile` ב-`AuthContext.tsx`, וחשיפתו דרך ה-context.
- יצירת hook קטן `useLang()` שיחזיר `profile?.language ?? 'en'` לקריאה נוחה במשחקים.
- מילון UI קטן ב-`src/lib/i18n.ts` עם המחרוזות הדינמיות (שמות שפות, השאלות שמתייח