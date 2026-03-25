// Sentence templates for fill-in-the-blank game
// Each sentence has words that can be blanked out
// Format: { sentence: string[], blanks: number[] (indices of words that can be blanked) }

export interface SentenceTemplate {
  sentence: string[];
  hebrewHint: string;
}

// Large vocabulary bank - 1000+ unique words used across sentences
export const sentenceTemplates: SentenceTemplate[] = [
  // Animals & Nature
  { sentence: ["The", "cat", "is", "sleeping", "on", "the", "bed"], hebrewHint: "החתול ישן על המיטה" },
  { sentence: ["A", "big", "dog", "runs", "in", "the", "park"], hebrewHint: "כלב גדול רץ בפארק" },
  { sentence: ["The", "bird", "can", "fly", "very", "high"], hebrewHint: "הציפור יכולה לעוף גבוה מאוד" },
  { sentence: ["Fish", "live", "in", "the", "blue", "sea"], hebrewHint: "דגים חיים בים הכחול" },
  { sentence: ["The", "lion", "is", "the", "king", "of", "animals"], hebrewHint: "האריה הוא מלך החיות" },
  { sentence: ["Bears", "love", "to", "eat", "sweet", "honey"], hebrewHint: "דובים אוהבים לאכול דבש מתוק" },
  { sentence: ["The", "frog", "jumped", "into", "the", "cold", "water"], hebrewHint: "הצפרדע קפצה למים הקרים" },
  { sentence: ["Ducks", "swim", "in", "the", "small", "pond"], hebrewHint: "ברווזים שוחים בבריכה הקטנה" },
  { sentence: ["The", "horse", "runs", "fast", "on", "the", "field"], hebrewHint: "הסוס רץ מהר בשדה" },
  { sentence: ["Cows", "give", "us", "fresh", "white", "milk"], hebrewHint: "פרות נותנות לנו חלב לבן טרי" },
  { sentence: ["The", "rabbit", "has", "long", "soft", "ears"], hebrewHint: "לארנב יש אוזניים ארוכות ורכות" },
  { sentence: ["A", "small", "mouse", "ate", "the", "yellow", "cheese"], hebrewHint: "עכבר קטן אכל את הגבינה הצהובה" },
  { sentence: ["Monkeys", "climb", "tall", "green", "trees", "quickly"], hebrewHint: "קופים מטפסים על עצים ירוקים גבוהים מהר" },
  { sentence: ["The", "elephant", "has", "a", "very", "long", "nose"], hebrewHint: "לפיל יש אף מאוד ארוך" },
  { sentence: ["Tigers", "have", "beautiful", "orange", "and", "black", "stripes"], hebrewHint: "לנמרים יש פסים כתומים ושחורים יפים" },
  { sentence: ["The", "giraffe", "has", "a", "very", "long", "neck"], hebrewHint: "לג'ירפה יש צוואר מאוד ארוך" },
  { sentence: ["Wolves", "howl", "at", "the", "bright", "full", "moon"], hebrewHint: "זאבים מילילים לירח המלא הבהיר" },
  { sentence: ["The", "fox", "is", "very", "smart", "and", "quick"], hebrewHint: "השועל מאוד חכם ומהיר" },
  { sentence: ["Penguins", "live", "in", "the", "cold", "white", "snow"], hebrewHint: "פינגווינים חיים בשלג הלבן והקר" },
  { sentence: ["The", "whale", "swims", "deep", "in", "the", "ocean"], hebrewHint: "הלווייתן שוחה עמוק באוקיינוס" },
  { sentence: ["Dolphins", "are", "very", "friendly", "and", "playful", "animals"], hebrewHint: "דולפינים הם חיות ידידותיות ושובבות מאוד" },
  { sentence: ["The", "turtle", "walks", "very", "slowly", "on", "land"], hebrewHint: "הצב הולך מאוד לאט על היבשה" },
  { sentence: ["Butterflies", "have", "colorful", "and", "pretty", "wings"], hebrewHint: "לפרפרים יש כנפיים צבעוניות ויפות" },
  { sentence: ["The", "snake", "moves", "quietly", "through", "the", "grass"], hebrewHint: "הנחש זז בשקט דרך הדשא" },
  { sentence: ["Bees", "make", "sweet", "golden", "honey", "for", "us"], hebrewHint: "דבורים מכינות דבש זהוב מתוק בשבילנו" },
  
  // Food & Drinks
  { sentence: ["I", "eat", "a", "red", "apple", "every", "morning"], hebrewHint: "אני אוכל תפוח אדום כל בוקר" },
  { sentence: ["She", "drinks", "cold", "orange", "juice", "for", "breakfast"], hebrewHint: "היא שותה מיץ תפוזים קר לארוחת בוקר" },
  { sentence: ["We", "bake", "a", "big", "chocolate", "cake", "today"], hebrewHint: "אנחנו אופים עוגת שוקולד גדולה היום" },
  { sentence: ["The", "pizza", "is", "hot", "and", "very", "tasty"], hebrewHint: "הפיצה חמה ומאוד טעימה" },
  { sentence: ["Mom", "makes", "fresh", "warm", "bread", "every", "day"], hebrewHint: "אמא מכינה לחם חם וטרי כל יום" },
  { sentence: ["I", "like", "sweet", "vanilla", "ice", "cream", "best"], hebrewHint: "אני הכי אוהב גלידת וניל מתוקה" },
  { sentence: ["The", "banana", "is", "yellow", "and", "very", "sweet"], hebrewHint: "הבננה צהובה ומאוד מתוקה" },
  { sentence: ["We", "drink", "warm", "milk", "before", "going", "to", "sleep"], hebrewHint: "אנחנו שותים חלב חם לפני השינה" },
  { sentence: ["He", "puts", "butter", "on", "his", "morning", "toast"], hebrewHint: "הוא שם חמאה על הטוסט של הבוקר" },
  { sentence: ["The", "soup", "is", "very", "hot", "and", "delicious"], hebrewHint: "המרק מאוד חם וטעים" },
  { sentence: ["She", "likes", "to", "eat", "fresh", "green", "salad"], hebrewHint: "היא אוהבת לאכול סלט ירוק טרי" },
  { sentence: ["We", "had", "rice", "and", "chicken", "for", "dinner"], hebrewHint: "אכלנו אורז ועוף לארוחת ערב" },
  { sentence: ["The", "cookies", "smell", "so", "good", "and", "sweet"], hebrewHint: "העוגיות מריחות כל כך טוב ומתוק" },
  { sentence: ["He", "eats", "two", "eggs", "every", "single", "morning"], hebrewHint: "הוא אוכל שתי ביצים כל בוקר" },
  { sentence: ["I", "want", "a", "big", "piece", "of", "watermelon"], hebrewHint: "אני רוצה חתיכה גדולה של אבטיח" },
  { sentence: ["The", "grapes", "are", "purple", "and", "very", "juicy"], hebrewHint: "הענבים סגולים ומאוד עסיסיים" },
  { sentence: ["She", "made", "a", "healthy", "fruit", "smoothie", "today"], hebrewHint: "היא הכינה שייק פירות בריא היום" },
  { sentence: ["We", "love", "eating", "popcorn", "at", "the", "movies"], hebrewHint: "אנחנו אוהבים לאכול פופקורן בקולנוע" },
  { sentence: ["The", "sandwich", "has", "cheese", "and", "fresh", "tomato"], hebrewHint: "בסנדוויץ' יש גבינה ועגבנייה טרייה" },
  { sentence: ["Dad", "grills", "meat", "and", "corn", "every", "weekend"], hebrewHint: "אבא צולה בשר ותירס כל סוף שבוע" },
  
  // School & Learning
  { sentence: ["I", "go", "to", "school", "every", "single", "day"], hebrewHint: "אני הולך לבית ספר כל יום" },
  { sentence: ["The", "teacher", "reads", "a", "story", "to", "us"], hebrewHint: "המורה קוראת לנו סיפור" },
  { sentence: ["We", "learn", "new", "English", "words", "in", "class"], hebrewHint: "אנחנו לומדים מילים חדשות באנגלית בכיתה" },
  { sentence: ["She", "writes", "with", "a", "blue", "pen", "today"], hebrewHint: "היא כותבת עם עט כחול היום" },
  { sentence: ["The", "children", "play", "outside", "during", "the", "break"], hebrewHint: "הילדים משחקים בחוץ בהפסקה" },
  { sentence: ["He", "draws", "a", "beautiful", "picture", "of", "flowers"], hebrewHint: "הוא מצייר תמונה יפה של פרחים" },
  { sentence: ["We", "sing", "happy", "songs", "in", "music", "class"], hebrewHint: "אנחנו שרים שירים שמחים בשיעור מוזיקה" },
  { sentence: ["The", "students", "sit", "quietly", "in", "their", "chairs"], hebrewHint: "התלמידים יושבים בשקט על הכיסאות שלהם" },
  { sentence: ["I", "read", "my", "favorite", "book", "every", "night"], hebrewHint: "אני קורא את הספר האהוב עלי כל לילה" },
  { sentence: ["She", "counts", "from", "one", "to", "ten", "perfectly"], hebrewHint: "היא סופרת מאחד עד עשר בצורה מושלמת" },
  { sentence: ["The", "math", "test", "was", "easy", "and", "fun"], hebrewHint: "מבחן החשבון היה קל וכיף" },
  { sentence: ["We", "paint", "with", "many", "bright", "beautiful", "colors"], hebrewHint: "אנחנו צובעים עם הרבה צבעים יפים ובהירים" },
  { sentence: ["He", "opens", "his", "heavy", "school", "bag", "slowly"], hebrewHint: "הוא פותח את תיק בית הספר הכבד שלו לאט" },
  { sentence: ["The", "bell", "rings", "at", "eight", "every", "morning"], hebrewHint: "הפעמון מצלצל בשמונה כל בוקר" },
  
  // Family & Home
  { sentence: ["My", "family", "lives", "in", "a", "big", "house"], hebrewHint: "המשפחה שלי גרה בבית גדול" },
  { sentence: ["Mom", "cooks", "dinner", "in", "the", "warm", "kitchen"], hebrewHint: "אמא מבשלת ארוחת ערב במטבח החם" },
  { sentence: ["Dad", "reads", "the", "morning", "newspaper", "every", "day"], hebrewHint: "אבא קורא את העיתון של הבוקר כל יום" },
  { sentence: ["My", "sister", "plays", "with", "her", "little", "dolls"], hebrewHint: "אחותי משחקת עם הבובות הקטנות שלה" },
  { sentence: ["The", "baby", "sleeps", "in", "a", "small", "crib"], hebrewHint: "התינוק ישן בעריסה קטנה" },
  { sentence: ["We", "watch", "funny", "movies", "together", "every", "Friday"], hebrewHint: "אנחנו צופים בסרטים מצחיקים ביחד כל שישי" },
  { sentence: ["Grandma", "bakes", "the", "best", "cookies", "for", "us"], hebrewHint: "סבתא אופה את העוגיות הכי טובות בשבילנו" },
  { sentence: ["My", "brother", "is", "taller", "than", "me", "now"], hebrewHint: "אחי גבוה ממני עכשיו" },
  { sentence: ["We", "clean", "our", "rooms", "every", "single", "Saturday"], hebrewHint: "אנחנו מנקים את החדרים שלנו כל שבת" },
  { sentence: ["The", "garden", "has", "many", "red", "and", "pink", "flowers"], hebrewHint: "בגינה יש הרבה פרחים אדומים וורודים" },
  
  // Weather & Seasons
  { sentence: ["The", "sun", "shines", "bright", "in", "the", "sky"], hebrewHint: "השמש זורחת בהיר בשמיים" },
  { sentence: ["It", "rains", "a", "lot", "in", "cold", "winter"], hebrewHint: "יורד הרבה גשם בחורף הקר" },
  { sentence: ["Snow", "falls", "gently", "on", "the", "quiet", "ground"], hebrewHint: "שלג יורד בעדינות על הקרקע השקטה" },
  { sentence: ["The", "wind", "blows", "hard", "through", "the", "trees"], hebrewHint: "הרוח נושבת חזק דרך העצים" },
  { sentence: ["Spring", "brings", "many", "beautiful", "colorful", "new", "flowers"], hebrewHint: "האביב מביא הרבה פרחים צבעוניים יפים חדשים" },
  { sentence: ["Summer", "is", "hot", "and", "we", "go", "swimming"], hebrewHint: "הקיץ חם ואנחנו הולכים לשחות" },
  { sentence: ["Autumn", "leaves", "turn", "red", "orange", "and", "gold"], hebrewHint: "עלי הסתיו הופכים לאדום כתום וזהב" },
  { sentence: ["The", "rainbow", "appears", "after", "the", "big", "rain"], hebrewHint: "הקשת מופיעה אחרי הגשם הגדול" },
  { sentence: ["Dark", "clouds", "cover", "the", "whole", "blue", "sky"], hebrewHint: "עננים כהים מכסים את כל השמיים הכחולים" },
  { sentence: ["We", "build", "a", "big", "funny", "white", "snowman"], hebrewHint: "אנחנו בונים בובת שלג לבנה גדולה ומצחיקה" },
  
  // Body & Health
  { sentence: ["I", "wash", "my", "hands", "with", "warm", "water"], hebrewHint: "אני שוטף את הידיים שלי במים חמים" },
  { sentence: ["She", "brushes", "her", "white", "teeth", "every", "morning"], hebrewHint: "היא מצחצחת את השיניים הלבנות שלה כל בוקר" },
  { sentence: ["The", "doctor", "checks", "my", "eyes", "and", "ears"], hebrewHint: "הרופא בודק את העיניים והאוזניים שלי" },
  { sentence: ["He", "runs", "fast", "with", "his", "strong", "legs"], hebrewHint: "הוא רץ מהר עם הרגליים החזקות שלו" },
  { sentence: ["We", "need", "to", "sleep", "eight", "hours", "daily"], hebrewHint: "אנחנו צריכים לישון שמונה שעות ביום" },
  { sentence: ["My", "heart", "beats", "fast", "when", "I", "run"], hebrewHint: "הלב שלי פועם מהר כשאני רץ" },
  { sentence: ["She", "has", "long", "brown", "curly", "beautiful", "hair"], hebrewHint: "יש לה שיער חום מתולתל ארוך ויפה" },
  { sentence: ["The", "nose", "helps", "us", "smell", "nice", "things"], hebrewHint: "האף עוזר לנו להריח דברים נחמדים" },
  
  // Colors & Shapes
  { sentence: ["The", "sky", "is", "blue", "on", "sunny", "days"], hebrewHint: "השמיים כחולים בימים שטופי שמש" },
  { sentence: ["Roses", "are", "red", "and", "violets", "are", "blue"], hebrewHint: "ורדים הם אדומים וסגלים הם כחולים" },
  { sentence: ["The", "grass", "is", "always", "green", "in", "spring"], hebrewHint: "הדשא תמיד ירוק באביב" },
  { sentence: ["She", "wears", "a", "pretty", "pink", "summer", "dress"], hebrewHint: "היא לובשת שמלת קיץ ורודה יפה" },
  { sentence: ["The", "night", "sky", "looks", "very", "dark", "black"], hebrewHint: "שמי הלילה נראים כהים מאוד ושחורים" },
  { sentence: ["He", "draws", "a", "perfect", "round", "yellow", "circle"], hebrewHint: "הוא מצייר עיגול צהוב עגול מושלם" },
  { sentence: ["The", "square", "box", "is", "brown", "and", "big"], hebrewHint: "הקופסה המרובעת חומה וגדולה" },
  { sentence: ["White", "snow", "covers", "the", "tall", "green", "mountains"], hebrewHint: "שלג לבן מכסה את ההרים הירוקים הגבוהים" },
  
  // Transport & Travel
  { sentence: ["The", "red", "bus", "stops", "at", "the", "station"], hebrewHint: "האוטובוס האדום עוצר בתחנה" },
  { sentence: ["We", "fly", "in", "a", "big", "white", "airplane"], hebrewHint: "אנחנו טסים במטוס לבן גדול" },
  { sentence: ["The", "train", "goes", "very", "fast", "on", "tracks"], hebrewHint: "הרכבת נוסעת מאוד מהר על פסים" },
  { sentence: ["She", "rides", "her", "new", "blue", "bicycle", "daily"], hebrewHint: "היא רוכבת על האופניים הכחולים החדשים שלה יומיום" },
  { sentence: ["The", "ship", "sails", "across", "the", "deep", "ocean"], hebrewHint: "הספינה שטה מעבר לאוקיינוס העמוק" },
  { sentence: ["Dad", "drives", "his", "car", "to", "work", "daily"], hebrewHint: "אבא נוהג במכונית שלו לעבודה יומיום" },
  { sentence: ["The", "rocket", "flies", "high", "into", "dark", "space"], hebrewHint: "הטיל טס גבוה אל החלל הכהה" },
  { sentence: ["We", "take", "a", "yellow", "taxi", "to", "school"], hebrewHint: "אנחנו לוקחים מונית צהובה לבית הספר" },
  { sentence: ["The", "boat", "floats", "on", "the", "calm", "lake"], hebrewHint: "הסירה צפה על האגם השקט" },
  
  // Actions & Daily Life
  { sentence: ["I", "wake", "up", "early", "every", "single", "morning"], hebrewHint: "אני מתעורר מוקדם כל בוקר" },
  { sentence: ["She", "jumps", "high", "over", "the", "small", "fence"], hebrewHint: "היא קופצת גבוה מעל הגדר הקטנה" },
  { sentence: ["We", "play", "fun", "games", "in", "the", "park"], hebrewHint: "אנחנו משחקים משחקים כיפיים בפארק" },
  { sentence: ["He", "throws", "the", "ball", "very", "far", "away"], hebrewHint: "הוא זורק את הכדור מאוד רחוק" },
  { sentence: ["The", "girl", "dances", "happily", "in", "the", "rain"], hebrewHint: "הילדה רוקדת בשמחה בגשם" },
  { sentence: ["I", "help", "my", "mom", "cook", "dinner", "tonight"], hebrewHint: "אני עוזר לאמא לבשל ארוחת ערב הערב" },
  { sentence: ["She", "opens", "the", "door", "and", "walks", "inside"], hebrewHint: "היא פותחת את הדלת ונכנסת פנימה" },
  { sentence: ["We", "laugh", "together", "at", "the", "funny", "joke"], hebrewHint: "אנחנו צוחקים ביחד על הבדיחה המצחיקה" },
  { sentence: ["He", "climbs", "up", "the", "tall", "old", "tree"], hebrewHint: "הוא מטפס על העץ הגבוה והישן" },
  { sentence: ["They", "swim", "in", "the", "warm", "blue", "pool"], hebrewHint: "הם שוחים בבריכה הכחולה והחמה" },
  
  // Emotions & Feelings
  { sentence: ["I", "am", "very", "happy", "today", "at", "school"], hebrewHint: "אני מאוד שמח היום בבית הספר" },
  { sentence: ["She", "feels", "sad", "because", "her", "friend", "left"], hebrewHint: "היא מרגישה עצובה כי החברה שלה עזבה" },
  { sentence: ["The", "boy", "is", "excited", "about", "his", "birthday"], hebrewHint: "הילד נרגש לגבי יום ההולדת שלו" },
  { sentence: ["We", "are", "proud", "of", "our", "good", "work"], hebrewHint: "אנחנו גאים בעבודה הטובה שלנו" },
  { sentence: ["He", "is", "scared", "of", "the", "dark", "night"], hebrewHint: "הוא מפחד מהלילה החשוך" },
  { sentence: ["She", "is", "brave", "and", "strong", "every", "day"], hebrewHint: "היא אמיצה וחזקה כל יום" },
  { sentence: ["The", "children", "are", "tired", "after", "long", "play"], hebrewHint: "הילדים עייפים אחרי משחק ארוך" },
  { sentence: ["I", "love", "my", "kind", "and", "caring", "family"], hebrewHint: "אני אוהב את המשפחה החמה והאכפתית שלי" },
  
  // Places & Buildings
  { sentence: ["The", "castle", "stands", "tall", "on", "the", "hill"], hebrewHint: "הטירה עומדת גבוה על הגבעה" },
  { sentence: ["We", "go", "to", "the", "big", "library", "weekly"], hebrewHint: "אנחנו הולכים לספרייה הגדולה כל שבוע" },
  { sentence: ["The", "hospital", "helps", "many", "sick", "people", "daily"], hebrewHint: "בית החולים עוזר להרבה אנשים חולים יומיום" },
  { sentence: ["She", "lives", "near", "the", "beautiful", "sandy", "beach"], hebrewHint: "היא גרה ליד החוף החולי היפה" },
  { sentence: ["The", "park", "is", "full", "of", "happy", "children"], hebrewHint: "הפארק מלא בילדים שמחים" },
  { sentence: ["We", "visit", "the", "old", "museum", "every", "month"], hebrewHint: "אנחנו מבקרים במוזיאון הישן כל חודש" },
  { sentence: ["The", "bridge", "connects", "two", "sides", "of", "town"], hebrewHint: "הגשר מחבר שני צדדים של העיר" },
  { sentence: ["He", "shops", "at", "the", "big", "busy", "market"], hebrewHint: "הוא קונה בשוק הגדול והעמוס" },
  
  // Sports & Games
  { sentence: ["I", "play", "soccer", "with", "my", "best", "friends"], hebrewHint: "אני משחק כדורגל עם החברים הכי טובים שלי" },
  { sentence: ["She", "wins", "the", "race", "every", "single", "time"], hebrewHint: "היא מנצחת במירוץ כל פעם" },
  { sentence: ["We", "practice", "tennis", "on", "the", "new", "court"], hebrewHint: "אנחנו מתאמנים בטניס במגרש החדש" },
  { sentence: ["He", "scores", "a", "great", "goal", "in", "soccer"], hebrewHint: "הוא מבקיע שער מעולה בכדורגל" },
  { sentence: ["The", "team", "plays", "well", "together", "every", "game"], hebrewHint: "הקבוצה משחקת טוב ביחד כל משחק" },
  { sentence: ["She", "swims", "fast", "across", "the", "long", "pool"], hebrewHint: "היא שוחה מהר לאורך הבריכה הארוכה" },
  { sentence: ["We", "ride", "bikes", "along", "the", "quiet", "path"], hebrewHint: "אנחנו רוכבים על אופניים לאורך השביל השקט" },
  { sentence: ["He", "catches", "the", "ball", "with", "both", "hands"], hebrewHint: "הוא תופס את הכדור עם שתי הידיים" },
  
  // Clothing & Appearance
  { sentence: ["She", "wears", "a", "warm", "red", "winter", "coat"], hebrewHint: "היא לובשת מעיל חורף אדום חם" },
  { sentence: ["He", "puts", "on", "his", "new", "white", "shoes"], hebrewHint: "הוא נועל את הנעליים הלבנות החדשות שלו" },
  { sentence: ["The", "hat", "keeps", "my", "head", "nice", "and", "warm"], hebrewHint: "הכובע שומר על הראש שלי חם ונעים" },
  { sentence: ["I", "wear", "my", "favorite", "blue", "cotton", "shirt"], hebrewHint: "אני לובש את החולצה הכחולה האהובה עלי" },
  { sentence: ["She", "ties", "her", "pretty", "yellow", "hair", "ribbon"], hebrewHint: "היא קושרת את סרט השיער הצהוב היפה שלה" },
  { sentence: ["The", "gloves", "keep", "our", "hands", "very", "warm"], hebrewHint: "הכפפות שומרות על הידיים שלנו חמות מאוד" },
  
  // Time & Numbers
  { sentence: ["There", "are", "seven", "days", "in", "a", "week"], hebrewHint: "יש שבעה ימים בשבוע" },
  { sentence: ["I", "count", "ten", "bright", "stars", "in", "the", "sky"], hebrewHint: "אני סופר עשרה כוכבים בהירים בשמיים" },
  { sentence: ["She", "wakes", "up", "at", "seven", "every", "morning"], hebrewHint: "היא מתעוררת בשבע כל בוקר" },
  { sentence: ["We", "have", "three", "meals", "a", "day", "always"], hebrewHint: "יש לנו שלוש ארוחות ביום תמיד" },
  { sentence: ["The", "clock", "shows", "twelve", "at", "noon", "exactly"], hebrewHint: "השעון מראה שתיים עשרה בצהריים בדיוק" },
  { sentence: ["He", "sleeps", "for", "nine", "long", "hours", "nightly"], hebrewHint: "הוא ישן תשע שעות ארוכות בלילה" },
  
  // Objects & Things
  { sentence: ["The", "key", "opens", "the", "big", "wooden", "door"], hebrewHint: "המפתח פותח את הדלת הגדולה מעץ" },
  { sentence: ["She", "reads", "under", "the", "bright", "table", "lamp"], hebrewHint: "היא קוראת מתחת למנורת השולחן הבהירה" },
  { sentence: ["The", "mirror", "hangs", "on", "the", "white", "wall"], hebrewHint: "המראה תלויה על הקיר הלבן" },
  { sentence: ["He", "plays", "beautiful", "songs", "on", "the", "piano"], hebrewHint: "הוא מנגן שירים יפים על הפסנתר" },
  { sentence: ["The", "candle", "burns", "bright", "in", "the", "dark"], hebrewHint: "הנר דולק בהיר בחושך" },
  { sentence: ["She", "takes", "photos", "with", "her", "new", "camera"], hebrewHint: "היא מצלמת תמונות עם המצלמה החדשה שלה" },
  { sentence: ["The", "umbrella", "protects", "us", "from", "the", "rain"], hebrewHint: "המטרייה מגינה עלינו מהגשם" },
  { sentence: ["He", "cuts", "paper", "with", "sharp", "silver", "scissors"], hebrewHint: "הוא חותך נייר עם מספריים כסופות חדות" },
  
  // Nature & Environment
  { sentence: ["The", "river", "flows", "down", "the", "green", "valley"], hebrewHint: "הנהר זורם למטה בעמק הירוק" },
  { sentence: ["Tall", "trees", "grow", "in", "the", "deep", "forest"], hebrewHint: "עצים גבוהים גדלים ביער העמוק" },
  { sentence: ["The", "volcano", "erupts", "with", "hot", "red", "lava"], hebrewHint: "הר הגעש מתפרץ עם לבה אדומה חמה" },
  { sentence: ["Beautiful", "flowers", "bloom", "in", "the", "warm", "spring"], hebrewHint: "פרחים יפים פורחים באביב החם" },
  { sentence: ["The", "ocean", "waves", "crash", "on", "the", "shore"], hebrewHint: "גלי האוקיינוס מתנפצים על החוף" },
  { sentence: ["Stars", "twinkle", "brightly", "in", "the", "dark", "sky"], hebrewHint: "כוכבים מנצנצים בבהירות בשמיים הכהים" },
  { sentence: ["The", "desert", "is", "very", "hot", "and", "dry"], hebrewHint: "המדבר מאוד חם ויבש" },
  { sentence: ["Green", "plants", "need", "water", "and", "bright", "sunlight"], hebrewHint: "צמחים ירוקים צריכים מים ואור שמש בהיר" },
  
  // Fantasy & Imagination
  { sentence: ["The", "dragon", "breathes", "hot", "fire", "from", "above"], hebrewHint: "הדרקון נושף אש חמה מלמעלה" },
  { sentence: ["A", "magical", "unicorn", "runs", "through", "the", "forest"], hebrewHint: "חד קרן קסום רץ דרך היער" },
  { sentence: ["The", "wizard", "casts", "a", "powerful", "magic", "spell"], hebrewHint: "הקוסם מטיל כישוף קסם חזק" },
  { sentence: ["A", "brave", "knight", "fights", "the", "evil", "dragon"], hebrewHint: "אביר אמיץ נלחם בדרקון הרשע" },
  { sentence: ["The", "fairy", "flies", "with", "her", "shiny", "wings"], hebrewHint: "הפייה עפה עם הכנפיים המבריקות שלה" },
  { sentence: ["Pirates", "search", "for", "hidden", "gold", "treasure", "maps"], hebrewHint: "פיראטים מחפשים מפות אוצר זהב מוסתרות" },
  { sentence: ["The", "ghost", "appears", "only", "at", "dark", "midnight"], hebrewHint: "הרוח מופיעה רק בחצות החשוכה" },
  { sentence: ["A", "mermaid", "sings", "beautiful", "songs", "under", "water"], hebrewHint: "בת ים שרה שירים יפים מתחת למים" },
  
  // Professions & Jobs
  { sentence: ["The", "firefighter", "puts", "out", "the", "big", "fire"], hebrewHint: "הכבאי מכבה את האש הגדולה" },
  { sentence: ["A", "pilot", "flies", "the", "large", "white", "airplane"], hebrewHint: "טייס מטיס את המטוס הגדול והלבן" },
  { sentence: ["The", "chef", "cooks", "delicious", "food", "every", "night"], hebrewHint: "השף מבשל אוכל טעים כל לילה" },
  { sentence: ["A", "nurse", "takes", "good", "care", "of", "patients"], hebrewHint: "אחות מטפלת היטב בחולים" },
  { sentence: ["The", "farmer", "grows", "fresh", "vegetables", "and", "fruits"], hebrewHint: "החקלאי מגדל ירקות ופירות טריים" },
  { sentence: ["A", "builder", "constructs", "new", "tall", "strong", "buildings"], hebrewHint: "בנאי בונה בניינים חדשים גבוהים וחזקים" },
  { sentence: ["The", "artist", "paints", "beautiful", "colorful", "nature", "pictures"], hebrewHint: "האמן מצייר תמונות טבע צבעוניות ויפות" },
  { sentence: ["A", "scientist", "discovers", "new", "and", "amazing", "things"], hebrewHint: "מדען מגלה דברים חדשים ומדהימים" },
  
  // Manners & Social
  { sentence: ["Please", "say", "thank", "you", "to", "your", "friend"], hebrewHint: "בבקשה תגיד תודה לחבר שלך" },
  { sentence: ["We", "share", "our", "toys", "with", "good", "friends"], hebrewHint: "אנחנו חולקים את הצעצועים שלנו עם חברים טובים" },
  { sentence: ["He", "says", "sorry", "when", "he", "makes", "mistakes"], hebrewHint: "הוא אומר סליחה כשהוא עושה טעויות" },
  { sentence: ["She", "helps", "the", "old", "lady", "cross", "safely"], hebrewHint: "היא עוזרת לגברת הזקנה לחצות בבטחה" },
  { sentence: ["We", "wait", "our", "turn", "in", "the", "line"], hebrewHint: "אנחנו מחכים לתור שלנו בתור" },
  { sentence: ["Kind", "words", "make", "other", "people", "feel", "happy"], hebrewHint: "מילים טובות גורמות לאנשים אחרים להרגיש שמחים" },
  
  // Space & Science
  { sentence: ["The", "moon", "shines", "bright", "at", "night", "always"], hebrewHint: "הירח מאיר בהיר בלילה תמיד" },
  { sentence: ["Planets", "orbit", "around", "our", "hot", "bright", "sun"], hebrewHint: "כוכבי לכת מקיפים את השמש החמה והבהירה שלנו" },
  { sentence: ["The", "rocket", "launches", "into", "the", "dark", "space"], hebrewHint: "הטיל משגר אל תוך החלל הכהה" },
  { sentence: ["Stars", "are", "very", "far", "away", "from", "earth"], hebrewHint: "כוכבים נמצאים מאוד רחוק מכדור הארץ" },
  { sentence: ["The", "astronaut", "floats", "inside", "the", "space", "station"], hebrewHint: "האסטרונאוט מרחף בתוך תחנת החלל" },
  
  // Music & Art
  { sentence: ["She", "plays", "the", "guitar", "very", "well", "now"], hebrewHint: "היא מנגנת בגיטרה מאוד טוב עכשיו" },
  { sentence: ["The", "children", "sing", "a", "beautiful", "happy", "song"], hebrewHint: "הילדים שרים שיר יפה ושמח" },
  { sentence: ["He", "drums", "loudly", "during", "the", "school", "concert"], hebrewHint: "הוא מתופף בקול רם במהלך קונצרט בית הספר" },
  { sentence: ["We", "dance", "together", "to", "fun", "pop", "music"], hebrewHint: "אנחנו רוקדים ביחד למוזיקת פופ כיפית" },
  { sentence: ["The", "painting", "shows", "a", "beautiful", "sunset", "scene"], hebrewHint: "הציור מראה סצנת שקיעה יפה" },
  
  // Technology
  { sentence: ["I", "use", "my", "new", "tablet", "for", "learning"], hebrewHint: "אני משתמש בטאבלט החדש שלי ללמידה" },
  { sentence: ["She", "types", "fast", "on", "the", "computer", "keyboard"], hebrewHint: "היא מקלידה מהר על מקלדת המחשב" },
  { sentence: ["The", "phone", "rings", "loud", "in", "the", "morning"], hebrewHint: "הטלפון מצלצל בקול רם בבוקר" },
  { sentence: ["We", "watch", "videos", "on", "the", "big", "screen"], hebrewHint: "אנחנו צופים בסרטונים על המסך הגדול" },
  { sentence: ["He", "takes", "amazing", "photos", "with", "his", "phone"], hebrewHint: "הוא מצלם תמונות מדהימות עם הטלפון שלו" },
  
  // Holidays & Celebrations
  { sentence: ["We", "celebrate", "birthdays", "with", "cake", "and", "balloons"], hebrewHint: "אנחנו חוגגים ימי הולדת עם עוגה ובלונים" },
  { sentence: ["The", "children", "open", "their", "holiday", "presents", "happily"], hebrewHint: "הילדים פותחים את מתנות החג בשמחה" },
  { sentence: ["She", "decorates", "the", "house", "with", "bright", "lights"], hebrewHint: "היא מקשטת את הבית עם אורות בהירים" },
  { sentence: ["We", "sing", "special", "songs", "during", "the", "holidays"], hebrewHint: "אנחנו שרים שירים מיוחדים במהלך החגים" },
  { sentence: ["He", "gives", "flowers", "to", "his", "dear", "mom"], hebrewHint: "הוא נותן פרחים לאמא היקרה שלו" },
  
  // Hygiene & Routine
  { sentence: ["I", "take", "a", "warm", "shower", "every", "evening"], hebrewHint: "אני לוקח מקלחת חמה כל ערב" },
  { sentence: ["She", "combs", "her", "long", "hair", "every", "morning"], hebrewHint: "היא מסרקת את השיער הארוך שלה כל בוקר" },
  { sentence: ["We", "clean", "the", "house", "together", "on", "Fridays"], hebrewHint: "אנחנו מנקים את הבית ביחד בימי שישי" },
  { sentence: ["He", "makes", "his", "bed", "neatly", "every", "day"], hebrewHint: "הוא מסדר את המיטה שלו בסדר כל יום" },
  
  // Comparisons & Descriptions
  { sentence: ["The", "elephant", "is", "bigger", "than", "the", "mouse"], hebrewHint: "הפיל גדול יותר מהעכבר" },
  { sentence: ["Summer", "days", "are", "longer", "than", "winter", "days"], hebrewHint: "ימי הקיץ ארוכים יותר מימי החורף" },
  { sentence: ["The", "cheetah", "runs", "faster", "than", "all", "animals"], hebrewHint: "הברדלס רץ מהר יותר מכל החיות" },
  { sentence: ["Ice", "cream", "is", "colder", "than", "warm", "soup"], hebrewHint: "גלידה קרה יותר ממרק חם" },
  { sentence: ["The", "mountain", "is", "higher", "than", "the", "hill"], hebrewHint: "ההר גבוה יותר מהגבעה" },
  { sentence: ["Honey", "tastes", "sweeter", "than", "plain", "white", "bread"], hebrewHint: "דבש טעים יותר מתוק מלחם לבן רגיל" },
  
  // Questions & Curiosity
  { sentence: ["What", "color", "is", "the", "sky", "at", "night"], hebrewHint: "באיזה צבע השמיים בלילה" },
  { sentence: ["How", "many", "legs", "does", "a", "spider", "have"], hebrewHint: "כמה רגליים יש לעכביש" },
  { sentence: ["Where", "do", "polar", "bears", "live", "in", "nature"], hebrewHint: "איפה דובי קוטב חיים בטבע" },
  { sentence: ["Why", "do", "birds", "fly", "south", "in", "winter"], hebrewHint: "למה ציפורים עפות דרומה בחורף" },
  
  // More complex sentences
  { sentence: ["The", "old", "man", "walks", "slowly", "with", "his", "dog"], hebrewHint: "האיש הזקן הולך לאט עם הכלב שלו" },
  { sentence: ["My", "little", "sister", "loves", "playing", "with", "water"], hebrewHint: "אחותי הקטנה אוהבת לשחק עם מים" },
  { sentence: ["The", "tall", "building", "touches", "the", "gray", "clouds"], hebrewHint: "הבניין הגבוה נוגע בעננים האפורים" },
  { sentence: ["We", "plant", "small", "seeds", "in", "the", "garden"], hebrewHint: "אנחנו שותלים זרעים קטנים בגינה" },
  { sentence: ["The", "kitten", "plays", "with", "a", "small", "yarn", "ball"], hebrewHint: "החתלתול משחק עם כדור חוט קטן" },
  { sentence: ["Birds", "build", "their", "nests", "high", "in", "trees"], hebrewHint: "ציפורים בונות את הקנים שלהן גבוה בעצים" },
  { sentence: ["The", "clown", "makes", "everyone", "laugh", "at", "circus"], hebrewHint: "הליצן גורם לכולם לצחוק בקרקס" },
  { sentence: ["She", "feeds", "the", "hungry", "fish", "in", "morning"], hebrewHint: "היא מאכילה את הדגים הרעבים בבוקר" },
  { sentence: ["We", "pick", "ripe", "apples", "from", "the", "tree"], hebrewHint: "אנחנו קוטפים תפוחים בשלים מהעץ" },
  { sentence: ["The", "puppy", "wags", "its", "happy", "little", "tail"], hebrewHint: "הגור מכשכש בזנב הקטן והשמח שלו" },
  { sentence: ["He", "builds", "a", "tall", "tower", "with", "blocks"], hebrewHint: "הוא בונה מגדל גבוה עם קוביות" },
  { sentence: ["The", "butterfly", "lands", "softly", "on", "the", "flower"], hebrewHint: "הפרפר נוחת ברכות על הפרח" },
  { sentence: ["She", "pours", "cold", "water", "into", "the", "glass"], hebrewHint: "היא מוזגת מים קרים לתוך הכוס" },
  { sentence: ["We", "fly", "colorful", "kites", "on", "windy", "days"], hebrewHint: "אנחנו מעיפים עפיפונים צבעוניים בימים סוערים" },
  { sentence: ["The", "squirrel", "hides", "nuts", "inside", "the", "tree"], hebrewHint: "הסנאי מחביא אגוזים בתוך העץ" },
  { sentence: ["He", "rides", "a", "brown", "horse", "through", "fields"], hebrewHint: "הוא רוכב על סוס חום דרך שדות" },
  { sentence: ["The", "moon", "rises", "slowly", "over", "the", "mountains"], hebrewHint: "הירח עולה לאט מעל ההרים" },
  { sentence: ["She", "blows", "big", "round", "soap", "bubbles", "outside"], hebrewHint: "היא מנפחת בועות סבון עגולות גדולות בחוץ" },
  { sentence: ["We", "roast", "sweet", "marshmallows", "over", "the", "fire"], hebrewHint: "אנחנו צולים מרשמלו מתוקים מעל האש" },
  { sentence: ["The", "owl", "hoots", "loudly", "in", "dark", "night"], hebrewHint: "הינשוף צועק בקול בלילה החשוך" },
  { sentence: ["He", "stacks", "colorful", "cups", "into", "a", "pyramid"], hebrewHint: "הוא מערם כוסות צבעוניות לפירמידה" },
  { sentence: ["The", "snowflakes", "fall", "gently", "from", "gray", "clouds"], hebrewHint: "פתיתי שלג נופלים בעדינות מעננים אפורים" },
  { sentence: ["She", "waters", "the", "thirsty", "plants", "every", "morning"], hebrewHint: "היא משקה את הצמחים הצמאים כל בוקר" },
  { sentence: ["We", "collect", "pretty", "shells", "on", "the", "beach"], hebrewHint: "אנחנו אוספים צדפים יפים על החוף" },
  { sentence: ["The", "train", "whistles", "loud", "at", "the", "station"], hebrewHint: "הרכבת שורקת בקול רם בתחנה" },
  { sentence: ["He", "folds", "paper", "into", "small", "colorful", "boats"], hebrewHint: "הוא מקפל נייר לסירות צבעוניות קטנות" },
  { sentence: ["The", "spider", "weaves", "a", "delicate", "silky", "web"], hebrewHint: "העכביש אורג קורי עכביש עדינים ומשייים" },
  { sentence: ["She", "arranges", "fresh", "flowers", "in", "a", "vase"], hebrewHint: "היא מסדרת פרחים טריים באגרטל" },
  { sentence: ["We", "chase", "fireflies", "in", "the", "warm", "evening"], hebrewHint: "אנחנו רודפים אחרי גחליליות בערב החם" },
  { sentence: ["The", "peacock", "shows", "its", "beautiful", "colorful", "feathers"], hebrewHint: "הטווס מציג את הנוצות הצבעוניות היפות שלו" },
  { sentence: ["He", "paddles", "a", "small", "canoe", "down", "river"], hebrewHint: "הוא חותר בסירה קטנה במורד הנהר" },
  { sentence: ["The", "baker", "makes", "fresh", "warm", "crusty", "bread"], hebrewHint: "האופה מכין לחם טרי חם ופריך" },
  { sentence: ["She", "threads", "colorful", "beads", "onto", "a", "string"], hebrewHint: "היא משחילה חרוזים צבעוניים על חוט" },
  { sentence: ["We", "watch", "dolphins", "jump", "out", "of", "water"], hebrewHint: "אנחנו צופים בדולפינים קופצים מהמים" },
  { sentence: ["The", "leaves", "rustle", "softly", "in", "gentle", "breeze"], hebrewHint: "העלים רוששים בעדינות ברוח קלה" },
  { sentence: ["He", "carves", "a", "scary", "face", "on", "pumpkin"], hebrewHint: "הוא חורט פרצוף מפחיד על דלעת" },
  { sentence: ["The", "caterpillar", "turns", "into", "a", "pretty", "butterfly"], hebrewHint: "הזחל הופך לפרפר יפה" },
  { sentence: ["She", "polishes", "her", "shiny", "black", "leather", "shoes"], hebrewHint: "היא מצחצחת את הנעליים המבריקות השחורות שלה" },
  { sentence: ["We", "gather", "dry", "sticks", "for", "the", "campfire"], hebrewHint: "אנחנו אוספים מקלות יבשים למדורה" },
  { sentence: ["The", "hamster", "runs", "fast", "on", "its", "wheel"], hebrewHint: "האוגר רץ מהר על הגלגל שלו" },
  { sentence: ["He", "balances", "carefully", "on", "the", "narrow", "beam"], hebrewHint: "הוא מתאזן בזהירות על הקורה הצרה" },
  { sentence: ["The", "seagull", "flies", "low", "over", "the", "waves"], hebrewHint: "השחף עף נמוך מעל הגלים" },
  { sentence: ["She", "knits", "a", "warm", "soft", "wool", "scarf"], hebrewHint: "היא סורגת צעיף צמר חם ורך" },
  { sentence: ["We", "splash", "happily", "in", "the", "warm", "puddles"], hebrewHint: "אנחנו מתיזים בשמחה בשלוליות החמות" },
  { sentence: ["The", "lighthouse", "guides", "ships", "through", "dark", "storms"], hebrewHint: "המגדלור מנחה ספינות דרך סערות חשוכות" },
  { sentence: ["He", "sketches", "a", "funny", "cartoon", "character", "quickly"], hebrewHint: "הוא מסרטט דמות מצוירת מצחיקה במהירות" },
  { sentence: ["The", "robin", "sings", "sweetly", "every", "spring", "morning"], hebrewHint: "האדום חזה שר במתיקות כל בוקר אביב" },
  { sentence: ["She", "stirs", "the", "thick", "creamy", "tomato", "soup"], hebrewHint: "היא מערבבת את מרק העגבניות הסמיך והשמנתי" },
  { sentence: ["We", "discover", "hidden", "caves", "near", "the", "mountain"], hebrewHint: "אנחנו מגלים מערות מוסתרות ליד ההר" },
  { sentence: ["The", "hedgehog", "curls", "into", "a", "tight", "ball"], hebrewHint: "הקיפוד מתכדר לכדור צפוף" },
  { sentence: ["He", "juggles", "three", "bright", "red", "rubber", "balls"], hebrewHint: "הוא מלהטט בשלושה כדורי גומי אדומים בהירים" },
  { sentence: ["The", "creek", "babbles", "over", "smooth", "round", "stones"], hebrewHint: "הנחל מפכה מעל אבנים חלקות ועגולות" },
  { sentence: ["She", "peels", "a", "ripe", "sweet", "yellow", "banana"], hebrewHint: "היא קולפת בננה צהובה בשלה ומתוקה" },
  { sentence: ["We", "spot", "a", "rare", "golden", "eagle", "soaring"], hebrewHint: "אנחנו מבחינים בנשר זהוב נדיר מרחף" },
  { sentence: ["The", "fireplace", "crackles", "warmly", "on", "cold", "nights"], hebrewHint: "האח מפצפץ בחום בלילות קרים" },
  { sentence: ["He", "assembles", "a", "complex", "colorful", "jigsaw", "puzzle"], hebrewHint: "הוא מרכיב פאזל צבעוני מורכב" },
];

// Distractor words organized by part of speech for generating wrong answers
export const distractorWords = {
  nouns: [
    "cat", "dog", "bird", "fish", "lion", "bear", "frog", "duck", "horse", "cow",
    "pig", "sheep", "goat", "rabbit", "mouse", "monkey", "elephant", "tiger", "giraffe", "zebra",
    "wolf", "fox", "deer", "panda", "owl", "eagle", "penguin", "whale", "dolphin", "shark",
    "turtle", "snake", "bee", "butterfly", "ant", "snail", "crab", "chicken", "bat", "camel",
    "apple", "banana", "bread", "milk", "cake", "pizza", "egg", "orange", "grape", "lemon",
    "tomato", "carrot", "corn", "potato", "rice", "cheese", "candy", "cookie", "chocolate", "donut",
    "hand", "eye", "ear", "nose", "mouth", "foot", "leg", "tooth", "heart", "brain",
    "sun", "moon", "star", "tree", "flower", "cloud", "rain", "snow", "wind", "fire",
    "water", "mountain", "river", "sea", "rainbow", "leaf", "rock", "wave", "volcano", "cactus",
    "book", "ball", "house", "car", "phone", "clock", "key", "door", "chair", "table",
    "bed", "lamp", "pen", "pencil", "bag", "hat", "shoe", "shirt", "pants", "dress",
    "crown", "ring", "mirror", "candle", "brush", "soap", "towel", "broom", "scissors", "gift",
    "bus", "train", "plane", "ship", "bike", "rocket", "taxi", "truck", "boat", "tractor",
    "baby", "boy", "girl", "king", "queen", "doctor", "teacher", "police", "farmer", "chef",
    "castle", "park", "beach", "island", "bridge", "tower", "tent", "garden", "forest", "desert",
    "soccer", "tennis", "guitar", "piano", "drum", "camera", "map", "flag", "bell", "ladder",
    "hammer", "umbrella", "glasses", "watch", "magnet", "diamond", "medal", "trophy", "sword", "shield",
    "ghost", "dragon", "unicorn", "fairy", "wizard", "pirate", "ninja", "robot", "clown", "angel",
    "planet", "comet", "meteor", "space", "earth", "sky", "ocean", "valley", "hill", "field",
    "kitchen", "bedroom", "classroom", "library", "hospital", "museum", "station", "market", "circus", "stadium",
    "winter", "summer", "spring", "autumn", "morning", "evening", "night", "noon", "midnight", "dawn",
    "family", "sister", "brother", "mother", "father", "grandma", "grandpa", "friend", "neighbor", "stranger",
    "color", "shape", "circle", "square", "triangle", "line", "point", "corner", "edge", "side",
    "song", "dance", "music", "story", "poem", "joke", "game", "race", "team", "goal",
    "world", "country", "city", "town", "village", "road", "street", "path", "track", "trail",
    "breakfast", "lunch", "dinner", "snack", "meal", "feast", "picnic", "party", "celebration", "birthday",
    "shirt", "coat", "jacket", "sweater", "scarf", "gloves", "boots", "sandals", "socks", "belt",
    "painting", "drawing", "sculpture", "photograph", "portrait", "landscape", "sunset", "sunrise", "scene", "view",
    "lesson", "homework", "test", "exam", "grade", "prize", "reward", "challenge", "puzzle", "riddle",
    "tooth", "tongue", "bone", "muscle", "skin", "blood", "breath", "voice", "smile", "tear",
    "nest", "web", "shell", "feather", "wing", "tail", "paw", "claw", "horn", "fur",
    "seed", "root", "stem", "branch", "trunk", "bark", "petal", "thorn", "vine", "moss",
    "bubble", "string", "rope", "chain", "wire", "thread", "ribbon", "tape", "glue", "pin",
    "cup", "plate", "bowl", "spoon", "fork", "knife", "pot", "pan", "oven", "stove",
    "pillow", "blanket", "curtain", "carpet", "shelf", "drawer", "closet", "window", "roof", "floor",
    "wheel", "engine", "tire", "seat", "pedal", "brake", "horn", "light", "mirror", "trunk",
    "treasure", "secret", "mystery", "adventure", "journey", "quest", "mission", "voyage", "trip", "tour",
    "letter", "word", "sentence", "page", "chapter", "title", "author", "reader", "writer", "poet"
  ],
  verbs: [
    "run", "walk", "jump", "fly", "swim", "climb", "dance", "sing", "play", "eat",
    "drink", "sleep", "wake", "read", "write", "draw", "paint", "cook", "bake", "clean",
    "wash", "brush", "comb", "dress", "wear", "open", "close", "push", "pull", "lift",
    "throw", "catch", "kick", "hit", "cut", "break", "fix", "build", "make", "create",
    "find", "hide", "seek", "look", "see", "watch", "hear", "listen", "smell", "taste",
    "touch", "feel", "think", "know", "learn", "teach", "study", "practice", "try", "help",
    "give", "take", "bring", "carry", "hold", "drop", "pick", "choose", "collect", "gather",
    "grow", "plant", "bloom", "shine", "glow", "burn", "melt", "freeze", "pour", "flow",
    "blow", "shake", "spin", "turn", "roll", "slide", "bounce", "float", "sink", "rise",
    "fall", "land", "crash", "stop", "start", "begin", "finish", "end", "wait", "hurry",
    "love", "like", "want", "need", "hope", "wish", "dream", "believe", "imagine", "wonder",
    "laugh", "cry", "smile", "frown", "shout", "whisper", "talk", "speak", "tell", "ask",
    "answer", "count", "measure", "weigh", "sort", "arrange", "organize", "plan", "prepare", "set",
    "feeds", "waters", "guards", "protects", "saves", "rescues", "serves", "shares", "trades", "sells",
    "drives", "rides", "sails", "paddles", "rows", "steers", "guides", "leads", "follows", "chases"
  ],
  adjectives: [
    "big", "small", "tall", "short", "long", "wide", "narrow", "thick", "thin", "round",
    "flat", "deep", "shallow", "high", "low", "fast", "slow", "quick", "loud", "quiet",
    "hot", "cold", "warm", "cool", "wet", "dry", "soft", "hard", "smooth", "rough",
    "bright", "dark", "light", "heavy", "strong", "weak", "young", "old", "new", "fresh",
    "clean", "dirty", "neat", "messy", "pretty", "ugly", "beautiful", "handsome", "cute", "lovely",
    "happy", "sad", "angry", "scared", "brave", "shy", "proud", "kind", "mean", "nice",
    "funny", "serious", "silly", "smart", "clever", "wise", "foolish", "lazy", "busy", "tired",
    "hungry", "thirsty", "full", "empty", "rich", "poor", "safe", "dangerous", "healthy", "sick",
    "sweet", "sour", "bitter", "salty", "spicy", "tasty", "delicious", "yummy", "gross", "plain",
    "red", "blue", "green", "yellow", "purple", "orange", "brown", "black", "white", "pink",
    "golden", "silver", "colorful", "striped", "spotted", "shiny", "dull", "clear", "cloudy", "foggy",
    "friendly", "playful", "gentle", "fierce", "wild", "tame", "loyal", "faithful", "curious", "careful",
    "magical", "special", "amazing", "wonderful", "fantastic", "incredible", "awesome", "terrible", "horrible", "perfect"
  ],
  adverbs: [
    "very", "really", "quite", "always", "never", "often", "sometimes", "usually", "rarely", "seldom",
    "quickly", "slowly", "fast", "hard", "well", "badly", "loudly", "quietly", "softly", "gently",
    "happily", "sadly", "angrily", "bravely", "kindly", "nicely", "carefully", "carelessly", "easily", "hardly",
    "here", "there", "everywhere", "nowhere", "somewhere", "inside", "outside", "above", "below", "between",
    "today", "tomorrow", "yesterday", "now", "then", "soon", "later", "early", "late", "already",
    "together", "alone", "apart", "away", "back", "forward", "again", "once", "twice", "daily"
  ],
  prepositions: [
    "in", "on", "at", "to", "from", "with", "without", "for", "of", "by",
    "about", "into", "onto", "over", "under", "above", "below", "between", "behind", "beside",
    "near", "far", "through", "across", "along", "around", "during", "before", "after", "until"
  ],
  pronouns: [
    "I", "you", "he", "she", "it", "we", "they", "me", "him", "her",
    "us", "them", "my", "your", "his", "its", "our", "their", "mine", "yours"
  ],
  articles: ["the", "a", "an", "this", "that", "these", "those", "some", "any", "every"],
  conjunctions: ["and", "but", "or", "so", "yet", "nor", "for", "because", "although", "while"]
};

// Get unique vocabulary count
export function getSentenceVocabularyCount(): number {
  const allWords = new Set<string>();
  sentenceTemplates.forEach(t => t.sentence.forEach(w => allWords.add(w.toLowerCase())));
  Object.values(distractorWords).forEach(arr => arr.forEach(w => allWords.add(w.toLowerCase())));
  return allWords.size;
}
