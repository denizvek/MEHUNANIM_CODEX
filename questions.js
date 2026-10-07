// מאגר השאלות למבחן מחוננים - כיתה ב'
// כולל שאלות מהקבצים + שאלות נוספות שנוצרו

const QUESTIONS_DATABASE = {
    // קטגוריות
    categories: [
        { id: 'verbal_analogies', name: 'אנלוגיות מילוליות', emoji: '🔤', description: 'מציאת קשר בין מילים' },
        { id: 'visual_analogies', name: 'אנלוגיות צורניות', emoji: '🔷', description: 'מציאת קשר בין צורות', hasImages: true },
        { id: 'word_problems', name: 'בעיות מילוליות', emoji: '📐', description: 'בעיות חשבון בסיפור' },
        { id: 'sequences', name: 'סדרות מספרים', emoji: '🔢', description: 'מציאת החוקיות' },
        { id: 'visual_sequences', name: 'סדרות צורניות', emoji: '🔶', description: 'מציאת הדפוס בצורות', hasImages: true },
        { id: 'general_knowledge', name: 'ידע כללי', emoji: '🌍', description: 'שאלות ידע' },
        { id: 'vocabulary', name: 'אוצר מילים', emoji: '📚', description: 'משמעות מילים וביטויים' },
        { id: 'matrices', name: 'מטריצות', emoji: '⬛', description: 'השלמת דפוסים', hasImages: true },
        { id: 'odd_one_out', name: 'יוצא דופן', emoji: '🎯', description: 'מציאת השונה' },
        { id: 'fractions', name: 'שברים והמרות', emoji: '🔢', description: 'חישובים עם שברים' },
        { id: 'mixed', name: 'תרגול מעורב', emoji: '🎲', description: 'מכל הנושאים' }
    ],

    // שאלות
    questions: [
        // ========== אנלוגיות מילוליות ==========
        {
            id: 1,
            category: 'verbal_analogies',
            type: 'text',
            question: 'בית ספר : ללמד = מטבח : _______',
            answers: ['סכינים', 'מנור', 'אוכל', 'לבשל', 'מקרר'],
            correctIndex: 3,
            hint: 'חשוב: מה עושים בבית ספר? ומה עושים במטבח?'
        },
        {
            id: 2,
            category: 'verbal_analogies',
            type: 'text',
            question: 'מצרים : קהיר = סוריה : _______',
            answers: ['לבנון', 'עולם', 'דמשק', 'עמאן'],
            correctIndex: 2,
            hint: 'חשוב: מה הקשר בין מצרים לקהיר? קהיר היא הבירה של מצרים.'
        },
        {
            id: 3,
            category: 'verbal_analogies',
            type: 'text',
            question: 'רופא : בית חולים = מורה : _______',
            answers: ['ספר', 'בית ספר', 'תלמיד', 'לוח'],
            correctIndex: 1,
            hint: 'חשוב: איפה עובד רופא? ואיפה עובד מורה?'
        },
        {
            id: 4,
            category: 'verbal_analogies',
            type: 'text',
            question: 'יום : לילה = קיץ : _______',
            answers: ['חם', 'חורף', 'שמש', 'גשם'],
            correctIndex: 1,
            hint: 'יום ולילה הם הפכים. מה ההפך של קיץ?'
        },
        {
            id: 5,
            category: 'verbal_analogies',
            type: 'text',
            question: 'עין : לראות = אוזן : _______',
            answers: ['לשמוע', 'ראש', 'צליל', 'גוף'],
            correctIndex: 0,
            hint: 'מה עושים עם עין? ומה עושים עם אוזן?'
        },
        {
            id: 6,
            category: 'verbal_analogies',
            type: 'text',
            question: 'ציפור : קן = דג : _______',
            answers: ['מים', 'ים', 'אקווריום', 'סנפיר'],
            correctIndex: 2,
            hint: 'הקן הוא הבית של הציפור. מה הבית של דג?'
        },
        {
            id: 7,
            category: 'verbal_analogies',
            type: 'text',
            question: 'ספר : לקרוא = כדור : _______',
            answers: ['עגול', 'לשחק', 'ילד', 'צבעוני'],
            correctIndex: 1,
            hint: 'מה עושים עם ספר? ומה עושים עם כדור?'
        },
        {
            id: 8,
            category: 'verbal_analogies',
            type: 'text',
            question: 'אריה : שאגה = כלב : _______',
            answers: ['רגל', 'נביחה', 'פרווה', 'זנב'],
            correctIndex: 1,
            hint: 'איזה קול משמיע אריה? ואיזה קול משמיע כלב?'
        },
        {
            id: 9,
            category: 'verbal_analogies',
            type: 'text',
            question: 'עפרון : לכתוב = מספריים : _______',
            answers: ['נייר', 'לגזור', 'חד', 'יד'],
            correctIndex: 1,
            hint: 'מה עושים עם עפרון? ומה עושים עם מספריים?'
        },
        {
            id: 10,
            category: 'verbal_analogies',
            type: 'text',
            question: 'רגל : נעל = יד : _______',
            answers: ['אצבע', 'כפפה', 'זרוע', 'ציפורן'],
            correctIndex: 1,
            hint: 'מה לובשים על הרגל? ומה לובשים על היד?'
        },
        {
            id: 11,
            category: 'verbal_analogies',
            type: 'text',
            question: 'מסרק : קרח = אגוזים : _______',
            answers: ['סנאי', 'צעיף', 'לחם', 'חסר שיניים'],
            correctIndex: 3,
            hint: 'מסרק בלי שיניים נראה כמו קרח (חלק). אגוזים בלי שיניים - איך אפשר לפצח?'
        },
        {
            id: 12,
            category: 'verbal_analogies',
            type: 'text',
            question: 'אתון : עיר = לביאה : _______',
            answers: ['ילד', 'בכר', 'כפיר', 'תיש'],
            correctIndex: 2,
            hint: 'אתון היא חמור נקבה, עיר הוא חמור צעיר. לביאה היא אריה נקבה, ומה הצעיר?'
        },
        {
            id: 13,
            category: 'verbal_analogies',
            type: 'text',
            question: 'תפוזים : קוטפים = ענבים : _______',
            answers: ['מיץ', 'בוצרים', 'לימון', 'תמרים'],
            correctIndex: 1,
            hint: 'תפוזים קוטפים, וענבים? יש פועל מיוחד לקטיפת ענבים.'
        },
        {
            id: 14,
            category: 'verbal_analogies',
            type: 'text',
            question: 'תרנגול : קורא = סוס : _______',
            answers: ['פרה', 'הומה', 'צוהל', 'שוחה'],
            correctIndex: 2,
            hint: 'תרנגול קורא (קוקוריקו). איזה קול עושה סוס?'
        },
        {
            id: 15,
            category: 'verbal_analogies',
            type: 'text',
            question: 'ראש השנה : תשרי = פסח : _______',
            answers: ['אביב', 'פסח', 'אדר', 'ניסן'],
            correctIndex: 3,
            hint: 'ראש השנה חל בחודש תשרי. באיזה חודש חל פסח?'
        },
        {
            id: 16,
            category: 'verbal_analogies',
            type: 'text',
            question: 'אח : אחות = דוד : _______',
            answers: ['סבא', 'דודה', 'אבא', 'בן'],
            correctIndex: 1,
            hint: 'אח ואחות הם אותו קשר משפחתי בזכר ונקבה. מה הנקבה של דוד?'
        },
        {
            id: 17,
            category: 'verbal_analogies',
            type: 'text',
            question: 'גשם : מטריה = שמש : _______',
            answers: ['ענן', 'כובע', 'קיץ', 'חם'],
            correctIndex: 1,
            hint: 'מטריה מגינה מגשם. מה מגן מהשמש?'
        },
        {
            id: 18,
            category: 'verbal_analogies',
            type: 'text',
            question: 'ירח : לילה = שמש : _______',
            answers: ['כוכב', 'יום', 'חם', 'אור'],
            correctIndex: 1,
            hint: 'ירח מאיר בלילה, שמש מאירה ב...?'
        },
        {
            id: 19,
            category: 'verbal_analogies',
            type: 'text',
            question: 'מלך : מלכה = נסיך : _______',
            answers: ['נסיכה', 'שר', 'אביר', 'ילד'],
            correctIndex: 0,
            hint: 'מלך ומלכה הם זוג מלכותי. מה הנקבה של נסיך?'
        },
        {
            id: 20,
            category: 'verbal_analogies',
            type: 'text',
            question: 'חלב : פרה = ביצה : _______',
            answers: ['תרנגולת', 'עוף', 'לחם', 'גבינה'],
            correctIndex: 0,
            hint: 'מי נותן חלב? פרה. מי נותן ביצים?'
        },

        // ========== אנלוגיות צורניות (עם תמונות) ==========
        {
            id: 501,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_001.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 0,
            hint: 'חפש את הקשר בין שתי הצורות הראשונות והפעל אותו על הצורה השלישית.'
        },
        {
            id: 502,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_002.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 1,
            hint: 'שים לב לשינויים בגודל, צבע או כיוון בין הצורות.'
        },
        {
            id: 503,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_003.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 2,
            hint: 'בדוק האם יש סיבוב, שיקוף או שינוי בכמות האלמנטים.'
        },
        {
            id: 504,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_004.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 0,
            hint: 'האם הצורה מתהפכת? משתקפת? גדלה או קטנה?'
        },
        {
            id: 505,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_005.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 3,
            hint: 'חשוב על הכלל שקושר את שתי הצורות הראשונות.'
        },
        {
            id: 506,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_006.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 1,
            hint: 'שים לב לדפוס החוזר על עצמו.'
        },
        {
            id: 507,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_007.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 2,
            hint: 'בדוק מה השתנה מהצורה הראשונה לשנייה.'
        },
        {
            id: 508,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_008.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 0,
            hint: 'אותו הכלל צריך לחול גם על הזוג השני.'
        },
        {
            id: 509,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_009.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 1,
            hint: 'האם יש קשר בין הצבעים או הצורות?'
        },
        {
            id: 510,
            category: 'visual_analogies',
            type: 'image',
            questionImage: 'images/visual_analogies/visual_analogies_010.png',
            question: 'מצא את הצורה שמשלימה את האנלוגיה:',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 3,
            hint: 'נסה למצוא את החוקיות.'
        },

        // ========== מטריצות (עם תמונות) ==========
        {
            id: 601,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_001.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 0,
            hint: 'בדוק את הדפוס בכל שורה ובכל עמודה.'
        },
        {
            id: 602,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_002.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 2,
            hint: 'מה משותף לכל שורה? מה משותף לכל עמודה?'
        },
        {
            id: 603,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_003.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 1,
            hint: 'חפש דפוס שחוזר על עצמו.'
        },
        {
            id: 604,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_004.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 3,
            hint: 'שים לב לשינויים מתא לתא.'
        },
        {
            id: 605,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_005.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 4,
            hint: 'האם יש סיבוב או שיקוף?'
        },
        {
            id: 606,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_006.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 0,
            hint: 'בדוק את האלכסון.'
        },
        {
            id: 607,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_007.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 2,
            hint: 'כמה אלמנטים יש בכל שורה?'
        },
        {
            id: 608,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_008.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 5,
            hint: 'חשוב על הלוגיקה של הטבלה.'
        },
        {
            id: 609,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_009.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 1,
            hint: 'מה חסר כדי להשלים את הדפוס?'
        },
        {
            id: 610,
            category: 'matrices',
            type: 'image',
            questionImage: 'images/matrices/matrices_010.png',
            question: 'איזו צורה משלימה את המטריצה?',
            answers: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
            correctIndex: 4,
            hint: 'התשובה צריכה להתאים לשורה ולעמודה.'
        },

        // ========== סדרות צורניות (עם תמונות) ==========
        {
            id: 701,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_001.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 0,
            hint: 'חפש את הדפוס שחוזר על עצמו.'
        },
        {
            id: 702,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_002.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 2,
            hint: 'מה משתנה מצורה לצורה?'
        },
        {
            id: 703,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_003.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 1,
            hint: 'האם יש תנועה סיבובית?'
        },
        {
            id: 704,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_004.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 3,
            hint: 'שים לב לכיוון השינויים.'
        },
        {
            id: 705,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_005.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 0,
            hint: 'בדוק את מספר האלמנטים בכל שלב.'
        },
        {
            id: 706,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_006.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 2,
            hint: 'חשוב על סיבוב או שיקוף.'
        },
        {
            id: 707,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_007.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 1,
            hint: 'מה הכלל שמנחה את הסדרה?'
        },
        {
            id: 708,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_008.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 3,
            hint: 'עקוב אחרי השינויים בסדר.'
        },
        {
            id: 709,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_009.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 0,
            hint: 'האם הגודל משתנה? הצבע? הכמות?'
        },
        {
            id: 710,
            category: 'visual_sequences',
            type: 'image',
            questionImage: 'images/visual_sequences/visual_sequences_010.png',
            question: 'מה הצורה הבאה בסדרה?',
            answers: ['א', 'ב', 'ג', 'ד'],
            correctIndex: 2,
            hint: 'מצא את החוקיות והמשך אותה.'
        },

        // ========== בעיות מילוליות ==========
        {
            id: 101,
            category: 'word_problems',
            type: 'text',
            question: 'חבילת מדבקות עולה 2 שקלים, בכל חבילה 5 מדבקות. עמית קנתה 20 מדבקות, כמה שילמה?',
            answers: ['10 ש"ח', '8 ש"ח', '40 ש"ח', '20 ש"ח'],
            correctIndex: 1,
            hint: 'קודם חשוב: כמה חבילות צריך כדי לקבל 20 מדבקות? (20÷5=4) ואז כפול מחיר חבילה (4×2).'
        },
        {
            id: 102,
            category: 'word_problems',
            type: 'text',
            question: 'לדני יש 15 גולות. הוא נתן לחברו 6 גולות וקיבל מאמא עוד 4. כמה גולות יש לו עכשיו?',
            answers: ['13', '25', '15', '11'],
            correctIndex: 0,
            hint: 'התחל עם 15, הורד 6 (נתן), והוסף 4 (קיבל). 15-6+4=?'
        },
        {
            id: 103,
            category: 'word_problems',
            type: 'text',
            question: 'בכיתה יש 24 תלמידים. מחציתם בנים. כמה בנות יש בכיתה?',
            answers: ['24', '12', '48', '6'],
            correctIndex: 1,
            hint: 'מחצית זה חצי. 24÷2=?'
        },
        {
            id: 104,
            category: 'word_problems',
            type: 'text',
            question: 'קופסת עפרונות מכילה 12 עפרונות. רוני קנה 3 קופסאות. כמה עפרונות יש לו?',
            answers: ['15', '36', '9', '24'],
            correctIndex: 1,
            hint: '3 קופסאות כפול 12 עפרונות בכל קופסה. 3×12=?'
        },
        {
            id: 105,
            category: 'word_problems',
            type: 'text',
            question: 'לשרה יש 30 ש"ח. היא קנתה צעצוע ב-18 ש"ח. כמה כסף נשאר לה?',
            answers: ['48 ש"ח', '12 ש"ח', '18 ש"ח', '30 ש"ח'],
            correctIndex: 1,
            hint: 'מה שהיה פחות מה שקנתה: 30-18=?'
        },
        {
            id: 106,
            category: 'word_problems',
            type: 'text',
            question: 'באוטובוס היו 25 נוסעים. בתחנה ירדו 8 ועלו 5. כמה נוסעים באוטובוס עכשיו?',
            answers: ['38', '22', '17', '30'],
            correctIndex: 1,
            hint: 'התחל עם 25, הורד את מי שירד (8), והוסף את מי שעלה (5). 25-8+5=?'
        },
        {
            id: 107,
            category: 'word_problems',
            type: 'text',
            question: 'אורך מלבן הוא 8 ס"מ ורוחבו 3 ס"מ. מה ההיקף שלו?',
            answers: ['11 ס"מ', '22 ס"מ', '24 ס"מ', '16 ס"מ'],
            correctIndex: 1,
            hint: 'היקף מלבן = 2×(אורך+רוחב) = 2×(8+3) = 2×11 = ?'
        },
        {
            id: 108,
            category: 'word_problems',
            type: 'text',
            question: 'יוסי אסף 45 בולים. הוא חילק אותם שווה בשווה ל-5 אלבומים. כמה בולים בכל אלבום?',
            answers: ['9', '40', '50', '225'],
            correctIndex: 0,
            hint: 'לחלק שווה בשווה = חילוק: 45÷5=?'
        },
        {
            id: 109,
            category: 'word_problems',
            type: 'text',
            question: 'גיל אבא הוא 36 והוא גדול מבנו פי 4. בן כמה הבן?',
            answers: ['32', '40', '9', '144'],
            correctIndex: 2,
            hint: 'אם אבא גדול פי 4, אז גיל הבן הוא 36÷4=?'
        },
        {
            id: 110,
            category: 'word_problems',
            type: 'text',
            question: 'בחנות יש 100 תפוחים. נמכרו 37 בבוקר ו-28 אחר הצהריים. כמה תפוחים נשארו?',
            answers: ['35', '65', '72', '45'],
            correctIndex: 0,
            hint: 'מה שהיה פחות מה שנמכר: 100-37-28=?'
        },

        // ========== סדרות מספרים ==========
        {
            id: 201,
            category: 'sequences',
            type: 'text',
            question: '1, 5, 2, 6, 3, __',
            answers: ['7', '1', '10', '15'],
            correctIndex: 0,
            hint: 'יש כאן שתי סדרות משולבות: 1,2,3... ו-5,6,?...'
        },
        {
            id: 202,
            category: 'sequences',
            type: 'text',
            question: '2, 4, 6, 8, __',
            answers: ['9', '10', '12', '14'],
            correctIndex: 1,
            hint: 'סדרה של מספרים זוגיים. כל פעם מוסיפים 2.'
        },
        {
            id: 203,
            category: 'sequences',
            type: 'text',
            question: '1, 4, 9, 16, __',
            answers: ['20', '25', '24', '36'],
            correctIndex: 1,
            hint: 'אלה מספרים ריבועיים: 1², 2², 3², 4², 5²=?'
        },
        {
            id: 204,
            category: 'sequences',
            type: 'text',
            question: '3, 6, 12, 24, __',
            answers: ['30', '36', '48', '72'],
            correctIndex: 2,
            hint: 'כל מספר כפול 2 מהקודם. 24×2=?'
        },
        {
            id: 205,
            category: 'sequences',
            type: 'text',
            question: '100, 90, 80, 70, __',
            answers: ['50', '60', '65', '75'],
            correctIndex: 1,
            hint: 'סדרה יורדת, כל פעם מורידים 10.'
        },
        {
            id: 206,
            category: 'sequences',
            type: 'text',
            question: '1, 1, 2, 3, 5, 8, __',
            answers: ['10', '11', '13', '15'],
            correctIndex: 2,
            hint: 'זו סדרת פיבונאצ\'י: כל מספר הוא סכום שני הקודמים. 5+8=?'
        },
        {
            id: 207,
            category: 'sequences',
            type: 'text',
            question: '5, 10, 15, 20, __',
            answers: ['22', '25', '30', '35'],
            correctIndex: 1,
            hint: 'לוח הכפל של 5: 5×1, 5×2, 5×3, 5×4, 5×5=?'
        },
        {
            id: 208,
            category: 'sequences',
            type: 'text',
            question: '1, 2, 4, 7, 11, __',
            answers: ['14', '15', '16', '18'],
            correctIndex: 2,
            hint: 'ההפרשים גדלים: +1, +2, +3, +4, +5. אז 11+5=?'
        },
        {
            id: 209,
            category: 'sequences',
            type: 'text',
            question: '81, 27, 9, 3, __',
            answers: ['0', '1', '2', '6'],
            correctIndex: 1,
            hint: 'כל מספר מחולק ב-3. 3÷3=?'
        },
        {
            id: 210,
            category: 'sequences',
            type: 'text',
            question: '2, 3, 5, 7, 11, __',
            answers: ['12', '13', '14', '15'],
            correctIndex: 1,
            hint: 'אלה מספרים ראשוניים (מתחלקים רק ב-1 ובעצמם). המספר הראשוני הבא אחרי 11 הוא?'
        },

        // ========== שברים והמרות ==========
        {
            id: 151,
            category: 'fractions',
            type: 'text',
            question: 'הדרך לבית הספר ברכיבה על אופניים אורכת ½ שעה, הדרך באוטובוס אורכת 20 דקות. כמה זמן יחסוך דן אם יסע באוטובוס?',
            answers: ['15 דקות', 'אין הבדל', '2 דקות', '10 דקות'],
            correctIndex: 3,
            hint: '½ שעה = 30 דקות. ההפרש: 30-20 = ?'
        },
        {
            id: 152,
            category: 'fractions',
            type: 'text',
            question: 'כדי לעלות לרכבת ההרים צריך להיות בגובה של 1 מטר ו-30 ס"מ לפחות. הגובה של יואבי הוא 95 ס"מ. כמה ס"מ חסרים לו?',
            answers: ['40', '35', '30', '90'],
            correctIndex: 1,
            hint: '1 מטר = 100 ס"מ. אז 1.30 מטר = 130 ס"מ. חסר: 130-95=?'
        },
        {
            id: 153,
            category: 'fractions',
            type: 'text',
            question: 'מחיר ½ קילוגרם שוקולד 20 שקלים. מה המחיר של 4 קילוגרמים שוקולד?',
            answers: ['80 ש"ח', '100 ש"ח', '180 ש"ח', '160 ש"ח'],
            correctIndex: 3,
            hint: 'אם ½ ק"ג = 20₪, אז 1 ק"ג = 40₪. ו-4 ק"ג = ?'
        },
        {
            id: 154,
            category: 'fractions',
            type: 'text',
            question: 'כדי להכין 60 פנקייקים צריך 2 קילוגרמים קמח. לקרן יש 700 גרם קמח. כמה גרמים חסרים לה?',
            answers: ['1 ק"ג', '1,300 גרם', '10 גרם', '1,400 גרם'],
            correctIndex: 1,
            hint: '2 ק"ג = 2000 גרם. חסר: 2000-700=?'
        },
        {
            id: 155,
            category: 'fractions',
            type: 'text',
            question: 'לדני יש 2 מטר של חוט. הוא השתמש ב-80 ס"מ. כמה נשאר לו?',
            answers: ['120 ס"מ', '180 ס"מ', '20 ס"מ', '280 ס"מ'],
            correctIndex: 0,
            hint: '2 מטר = 200 ס"מ. נשאר: 200-80=?'
        },

        // ========== ידע כללי ==========
        {
            id: 301,
            category: 'general_knowledge',
            type: 'text',
            question: 'מיהו המלחין אשר הלחין אף שהיה חרש?',
            answers: ['לודוויג ואן בטהובן', 'לאונרדו דה וינצ\'י', 'וולפגנג אמדאוס מוצרט', 'יוזף היידן'],
            correctIndex: 0,
            hint: 'מלחין גרמני מפורסם שאיבד את שמיעתו אבל המשיך להלחין יצירות מופת.'
        },
        {
            id: 302,
            category: 'general_knowledge',
            type: 'text',
            question: 'מהו כוכב הלכת הגדול ביותר במערכת השמש?',
            answers: ['מאדים', 'שבתאי', 'צדק', 'נפטון'],
            correctIndex: 2,
            hint: 'כוכב לכת ענק עם כתם אדום גדול.'
        },
        {
            id: 303,
            category: 'general_knowledge',
            type: 'text',
            question: 'כמה ימים יש בשנה מעוברת?',
            answers: ['365', '366', '364', '360'],
            correctIndex: 1,
            hint: 'בשנה רגילה יש 365 ימים. בשנה מעוברת מוסיפים יום אחד.'
        },
        {
            id: 304,
            category: 'general_knowledge',
            type: 'text',
            question: 'איזה חג חוגגים בט"ו בשבט?',
            answers: ['חג האורים', 'ראש השנה לאילנות', 'חג הפסח', 'יום העצמאות'],
            correctIndex: 1,
            hint: 'בחג הזה נוהגים לשתול עצים ולאכול פירות יבשים.'
        },
        {
            id: 305,
            category: 'general_knowledge',
            type: 'text',
            question: 'מה שם בירת צרפת?',
            answers: ['לונדון', 'רומא', 'פריז', 'ברלין'],
            correctIndex: 2,
            hint: 'עיר שבה נמצא מגדל אייפל.'
        },
        {
            id: 306,
            category: 'general_knowledge',
            type: 'text',
            question: 'כמה צבעים יש בקשת בענן?',
            answers: ['5', '6', '7', '8'],
            correctIndex: 2,
            hint: 'אדום, כתום, צהוב, ירוק, כחול, כחול כהה, סגול.'
        },
        {
            id: 307,
            category: 'general_knowledge',
            type: 'text',
            question: 'איזה חיה היא החיה היבשתית המהירה בעולם?',
            answers: ['אריה', 'ברדלס', 'סוס', 'יען'],
            correctIndex: 1,
            hint: 'חתול גדול עם נקודות שחורות שחי באפריקה.'
        },
        {
            id: 308,
            category: 'general_knowledge',
            type: 'text',
            question: 'מהו האיבר הגדול ביותר בגוף האדם?',
            answers: ['הלב', 'המוח', 'העור', 'הכבד'],
            correctIndex: 2,
            hint: 'האיבר הזה מכסה את כל הגוף מבחוץ.'
        },
        {
            id: 309,
            category: 'general_knowledge',
            type: 'text',
            question: 'באיזו שנה קמה מדינת ישראל?',
            answers: ['1945', '1948', '1950', '1967'],
            correctIndex: 1,
            hint: 'מדינת ישראל הוכרזה על ידי דוד בן גוריון ב-14 במאי.'
        },
        {
            id: 310,
            category: 'general_knowledge',
            type: 'text',
            question: 'מה שם הנהר הארוך בעולם?',
            answers: ['הנילוס', 'האמזונס', 'הירדן', 'המיסיסיפי'],
            correctIndex: 0,
            hint: 'נהר שזורם באפריקה ועובר דרך מצרים.'
        },

        // ========== אוצר מילים ==========
        {
            id: 351,
            category: 'vocabulary',
            type: 'text',
            question: 'מה המשמעות של הביטוי "קשה עורף"?',
            answers: ['עקשן', 'שמח', 'כועס', 'מרדן'],
            correctIndex: 0,
            hint: 'אדם שלא מוותר ולא משנה את דעתו.'
        },
        {
            id: 352,
            category: 'vocabulary',
            type: 'text',
            question: '"חמה" היא מילה נרדפת ל:',
            answers: ['ירח', 'זעה', 'כוכבים', 'שמש'],
            correctIndex: 3,
            hint: 'מילה עברית ישנה לגוף שמיימי שמאיר ומחמם.'
        },
        {
            id: 353,
            category: 'vocabulary',
            type: 'text',
            question: 'מה ההפך של "ענק"?',
            answers: ['גדול', 'זעיר', 'רחב', 'כבד'],
            correctIndex: 1,
            hint: 'ענק = גדול מאוד. מה קטן מאוד?'
        },
        {
            id: 354,
            category: 'vocabulary',
            type: 'text',
            question: 'מה המשמעות של "מהיר"?',
            answers: ['איטי', 'זריז', 'כבד', 'שקט'],
            correctIndex: 1,
            hint: 'מהיר = עושה דברים מהר = ?'
        },
        {
            id: 355,
            category: 'vocabulary',
            type: 'text',
            question: '"ספרן" הוא אדם שעובד ב:',
            answers: ['מספרה', 'ספרייה', 'מכולת', 'בנק'],
            correctIndex: 1,
            hint: 'ספרן קשור לספרים. איפה יש הרבה ספרים?'
        },

        // ========== יוצא דופן ==========
        {
            id: 401,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך לקבוצה? כלב, חתול, ציפור, דג, שולחן',
            answers: ['כלב', 'חתול', 'ציפור', 'דג', 'שולחן'],
            correctIndex: 4,
            hint: 'ארבעה מהם הם יצורים חיים. אחד הוא חפץ.'
        },
        {
            id: 402,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? תפוח, בננה, גזר, ענבים, אבטיח',
            answers: ['תפוח', 'בננה', 'גזר', 'ענבים', 'אבטיח'],
            correctIndex: 2,
            hint: 'ארבעה מהם הם פירות. אחד הוא ירק.'
        },
        {
            id: 403,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? אדום, כחול, ירוק, גדול, צהוב',
            answers: ['אדום', 'כחול', 'ירוק', 'גדול', 'צהוב'],
            correctIndex: 3,
            hint: 'ארבעה מהם הם צבעים. אחד מתאר גודל.'
        },
        {
            id: 404,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? אוטובוס, רכבת, מטוס, ספינה, עץ',
            answers: ['אוטובוס', 'רכבת', 'מטוס', 'ספינה', 'עץ'],
            correctIndex: 4,
            hint: 'ארבעה מהם הם כלי תחבורה. אחד הוא צמח.'
        },
        {
            id: 405,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? שולחן, כיסא, ארון, מיטה, טלוויזיה',
            answers: ['שולחן', 'כיסא', 'ארון', 'מיטה', 'טלוויזיה'],
            correctIndex: 4,
            hint: 'ארבעה מהם הם רהיטים. אחד הוא מכשיר חשמלי.'
        },
        {
            id: 406,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? ינואר, פברואר, שבת, מרץ, אפריל',
            answers: ['ינואר', 'פברואר', 'שבת', 'מרץ', 'אפריל'],
            correctIndex: 2,
            hint: 'ארבעה מהם הם חודשים. אחד הוא יום בשבוע.'
        },
        {
            id: 407,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? גיטרה, פסנתר, כינור, תוף, ספר',
            answers: ['גיטרה', 'פסנתר', 'כינור', 'תוף', 'ספר'],
            correctIndex: 4,
            hint: 'ארבעה מהם הם כלי נגינה.'
        },
        {
            id: 408,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? 2, 4, 6, 7, 8',
            answers: ['2', '4', '6', '7', '8'],
            correctIndex: 3,
            hint: 'ארבעה מהם הם מספרים זוגיים. אחד הוא אי-זוגי.'
        },
        {
            id: 409,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? כדורגל, כדורסל, טניס, שחמט, כדורעף',
            answers: ['כדורגל', 'כדורסל', 'טניס', 'שחמט', 'כדורעף'],
            correctIndex: 3,
            hint: 'ארבעה מהם הם משחקים עם כדור. אחד הוא משחק לוח.'
        },
        {
            id: 410,
            category: 'odd_one_out',
            type: 'text',
            question: 'מה לא שייך? עיפרון, מחק, מחברת, סרגל, סוכריה',
            answers: ['עיפרון', 'מחק', 'מחברת', 'סרגל', 'סוכריה'],
            correctIndex: 4,
            hint: 'ארבעה מהם הם ציוד לבית ספר. אחד הוא ממתק.'
        }
    ]
};
