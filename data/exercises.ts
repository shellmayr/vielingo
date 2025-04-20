export interface Exercise {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  imageUrl: string;
  tags?: string[];
  content?: {
    introduction?: string;
    sections?: {
      title: string;
      content: string;
    }[];
    vocabularyItems?: VocabularyItem[];
    practiceScenarios?: PracticeScenario[];
    quizQuestions?: QuizQuestion[];
    grammarRules?: GrammarRule[];
    gapFillingSentences?: GapFillingSentence[];
    rolePlayingDialogues?: RolePlayingDialogue[];
  };
  exerciseType: "vocabulary" | "grammar" | "conversation" | "reading" | "listening" | "gapFilling" | "rolePlaying";
}

export interface GrammarRule {
  title: string;
  explanation: string;
  examples: {
    german: string;
    english: string;
    note?: string;
  }[];
}

export interface VocabularyItem {
  german: string;
  english: string;
  pronunciation?: string;
  context?: string;
  formal?: boolean;
  audio?: string;
}

export interface PracticeScenario {
  situation: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GapFillingSentence {
  sentence: string; // The sentence with [gaps] for missing words
  missingWords: string[]; // Array of words that fill the gaps
  distractorWords?: string[]; // Additional plausible but incorrect options
  translations?: {
    english: string; // The English translation of the full sentence
    germanComplete: string; // The complete German sentence (no gaps)
  };
  hint?: string; // Optional hint to help the user
}

export interface RolePlayingDialogue {
  title: string;
  initialPrompt: string;
  turns: RolePlayingTurn[];
}

export interface RolePlayingTurn {
  speaker: "User" | "Partner";
  prompt?: string;
  options?: RolePlayingOption[];
  response?: string;
}

export interface RolePlayingOption {
  text: string;
  correct: boolean;
  feedback?: string;
  nextTurnIndex?: number;
}

export const exercises: Exercise[] = [
  {
    id: "basic-greetings",
    title: "Basic Greetings",
    description: "Learn the most common ways to say hello and goodbye in German, with pronunciation practice.",
    level: "Beginner",
    duration: "10 min",
    imageUrl: "/images/frog.png",
    tags: ["vocabulary", "speaking", "beginner"],
    exerciseType: "vocabulary",
    content: {
      introduction: "Greetings are essential for any conversation. Let's learn how to say hello and goodbye in German, along with the context for when to use each phrase.",
      vocabularyItems: [
        {
          german: "Hallo",
          english: "Hello",
          pronunciation: "HAH-loh",
          context: "Universal greeting, can be used in almost any situation",
          formal: false,
          audio: "/audio/hallo.mp3"
        },
        {
          german: "Guten Morgen",
          english: "Good morning",
          pronunciation: "GOO-ten MOR-gen",
          context: "Used in the morning until about 11 AM",
          formal: true,
          audio: "/audio/guten-morgen.mp3"
        },
        {
          german: "Guten Tag",
          english: "Good day",
          pronunciation: "GOO-ten tahk",
          context: "Used during the day (from late morning to about 6 PM)",
          formal: true,
          audio: "/audio/guten-tag.mp3"
        },
        {
          german: "Guten Abend",
          english: "Good evening",
          pronunciation: "GOO-ten AH-bent",
          context: "Used in the evening (after 6 PM)",
          formal: true,
          audio: "/audio/guten-abend.mp3"
        },
        {
          german: "Grüß Dich",
          english: "Hello (greeting you)",
          pronunciation: "grüs dikh",
          context: "Informal greeting used among friends and family",
          formal: false,
          audio: "/audio/gruss-dich.mp3"
        },
        {
          german: "Servus",
          english: "Hi / Bye",
          pronunciation: "SEHR-vus",
          context: "Informal greeting used in southern Germany and Austria, can be used for hello and goodbye",
          formal: false,
          audio: "/audio/servus.mp3"
        },
        {
          german: "Auf Wiedersehen",
          english: "Goodbye",
          pronunciation: "owf VEE-der-zey-en",
          context: "Formal way to say goodbye",
          formal: true,
          audio: "/audio/auf-wiedersehen.mp3"
        },
        {
          german: "Tschüss",
          english: "Bye",
          pronunciation: "chüs",
          context: "Informal way to say goodbye",
          formal: false,
          audio: "/audio/tschuss.mp3"
        },
        {
          german: "Bis später",
          english: "See you later",
          pronunciation: "bis SHPAY-ter",
          context: "Informal goodbye when you expect to see the person again soon",
          formal: false,
          audio: "/audio/bis-spater.mp3"
        },
        {
          german: "Bis bald",
          english: "See you soon",
          pronunciation: "bis balt",
          context: "Casual goodbye between friends",
          formal: false,
          audio: "/audio/bis-bald.mp3"
        }
      ],
      practiceScenarios: [
        {
          situation: "You meet your professor at 9 AM on campus.",
          question: "What would be the most appropriate greeting?",
          options: ["Hallo", "Guten Morgen", "Servus", "Tschüss"],
          correctAnswer: "Guten Morgen",
          explanation: "Since it's morning and this is a formal situation with your professor, 'Guten Morgen' is the most appropriate greeting."
        },
        {
          situation: "You're saying goodbye to a friend and you'll see them again tomorrow.",
          question: "Which phrase would be most appropriate?",
          options: ["Auf Wiedersehen", "Bis später", "Bis bald", "Guten Abend"],
          correctAnswer: "Bis später",
          explanation: "'Bis später' or 'Bis bald' would both work as you'll see them again soon, but 'Bis später' is slightly more specific for 'see you later'."
        },
        {
          situation: "You run into a friend at a café at 2 PM.",
          question: "How would you greet them?",
          options: ["Guten Tag", "Guten Morgen", "Hallo", "Auf Wiedersehen"],
          correctAnswer: "Hallo",
          explanation: "While 'Guten Tag' would be acceptable, 'Hallo' is more natural between friends at any time of day."
        }
      ],
      quizQuestions: [
        {
          question: "Which greeting is NOT typically used in the morning?",
          options: ["Guten Morgen", "Hallo", "Guten Abend", "Grüß Dich"],
          correctAnswer: "Guten Abend",
          explanation: "'Guten Abend' means 'Good evening' and is used in the evening, not in the morning."
        },
        {
          question: "Which of these expressions can be used for both hello and goodbye?",
          options: ["Hallo", "Auf Wiedersehen", "Servus", "Guten Tag"],
          correctAnswer: "Servus",
          explanation: "'Servus' is unique in that it can be used both when greeting someone and when saying goodbye in southern German-speaking regions."
        },
        {
          question: "What is the most formal way to say goodbye in German?",
          options: ["Tschüss", "Bis später", "Servus", "Auf Wiedersehen"],
          correctAnswer: "Auf Wiedersehen",
          explanation: "'Auf Wiedersehen' is the most formal option for saying goodbye."
        }
      ]
    }
  },
  {
    id: "introduce-yourself",
    title: "Introducing Yourself",
    description: "Master the phrases needed to introduce yourself and ask others about their name, origin, and interests.",
    level: "Beginner",
    duration: "15 min",
    imageUrl: "/images/bear.png",
    tags: ["vocabulary", "speaking", "conversation"],
    exerciseType: "rolePlaying",
    content: {
      introduction: "Being able to introduce yourself is one of the first steps in having a conversation in German. Let's practice in a role-playing scenario.",
      rolePlayingDialogues: [
        {
          title: "Meeting Someone New at a Party",
          initialPrompt: "Hallo, ich bin Alex. Wie heißt du?",
          turns: [
            {
              speaker: "Partner",
              prompt: "Hallo, ich bin Alex. Wie heißt du?",
            },
            {
              speaker: "User",
              options: [
                { text: "Ich heiße Maria.", correct: true, feedback: "Great! This is the standard way to state your name." },
                { text: "Mein Name ist Maria.", correct: true, feedback: "Also correct, a slightly more formal way to say your name." },
                { text: "Ich bin Maria.", correct: true, feedback: "Simple and common, good choice!" },
                { text: "Du bist Maria?", correct: false, feedback: "This is a question asking if the other person is Maria." }
              ]
            },
            {
              speaker: "Partner",
              prompt: "Schön dich kennenzulernen, Maria. Woher kommst du?",
            },
            {
              speaker: "User",
              options: [
                { text: "Ich komme aus Spanien.", correct: true, feedback: "Perfect! You correctly used 'Ich komme aus...' followed by the country." },
                { text: "Ich bin aus Spanien.", correct: true, feedback: "Also correct and common." },
                { text: "Ich wohne in Spanien.", correct: false, feedback: "This means 'I live in Spain'. While related, it doesn't directly answer 'Where are you from?'" },
                { text: "Spanien.", correct: false, feedback: "A bit too short for a conversation. It's better to use a full sentence." }
              ]
            },
            {
              speaker: "Partner",
              prompt: "Ah, Spanien! Sehr schön. Was machst du gerne in deiner Freizeit?",
            },
            {
              speaker: "User",
              options: [
                { text: "Ich lese gerne Bücher und höre Musik.", correct: true, feedback: "Excellent! You used 'Ich ... gerne...' to talk about hobbies." },
                { text: "Meine Hobbys sind Bücher lesen und Musik hören.", correct: true, feedback: "Also a great way to list your hobbies." },
                { text: "Ich mag Bücher und Musik.", correct: false, feedback: "This means 'I like books and music', but doesn't directly answer what you like *doing*." },
                { text: "Freizeit ist gut.", correct: false, feedback: "This means 'Free time is good', which doesn't answer the question." }
              ]
            },
            {
              speaker: "Partner",
              prompt: "Das klingt interessant! War schön mit dir zu plaudern. Bis später vielleicht!",
            },
            {
              speaker: "User",
              options: [
                { text: "Tschüss!", correct: true, feedback: "Good informal goodbye."}, 
                { text: "Bis später!", correct: true, feedback: "Also a good option, implying you might see them again."}, 
                { text: "Auf Wiedersehen.", correct: false, feedback: "This is a bit too formal for a casual party setting."}, 
                { text: "Danke.", correct: false, feedback: "'Thank you' doesn't quite fit as a goodbye here."} 
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id: "food-vocabulary",
    title: "Viennese Food & Kaffeehaus Culture",
    description: "Navigate the culinary delights (and quirks) of Vienna, from Schnitzel to Sachertorte.",
    level: "Intermediate",
    duration: "25 min",
    imageUrl: "/images/bear_eating.png",
    tags: ["vocabulary", "dining", "conversation", "vienna", "austria"],
    exerciseType: "rolePlaying",
    content: {
      introduction: "Welcome to Vienna! Let's learn some essential food terms and practice ordering in a typical Kaffeehaus – watch out for the grumpy waiters!",
      vocabularyItems: [
        { german: "das Wiener Schnitzel", english: "Viennese Schnitzel", context: "Thin, breaded, pan-fried veal cutlet. The *real* deal.", pronunciation: "VEE-ner SHNIT-sel" },
        { german: "der Apfelstrudel", english: "Apple Strudel", context: "Delicious pastry, often served warm with vanilla sauce or ice cream.", pronunciation: "AP-fel-shtroo-del" },
        { german: "die Sachertorte", english: "Sacher Torte", context: "Famous Viennese chocolate cake with apricot jam. Often source of debate!", pronunciation: "ZAH-kher-tor-teh" },
        { german: "der Tafelspitz", english: "Boiled Beef", context: "Classic Viennese dish, boiled beef served with horseradish and other sides.", pronunciation: "TAH-fel-shpitz" },
        { german: "das Gulasch", english: "Goulash", context: "Hearty beef stew, often served with dumplings (Semmelknödel).", pronunciation: "GOO-lash" },
        { german: "die Melange", english: "Melange (Coffee)", context: "Typical Viennese coffee, similar to a cappuccino but often with less milk foam.", pronunciation: "Meh-LAHNJE" },
        { german: "der Einspänner", english: "Einspänner (Coffee)", context: "Strong black coffee served in a glass with a large dollop of whipped cream.", pronunciation: "AIN-shpen-ner" },
        { german: "das Krügerl", english: "Large Beer (0.5L)", context: "Standard size for a draught beer.", pronunciation: "KRÜ-gerl" },
        { german: "das Seidl", english: "Small Beer (0.3L)", context: "A smaller beer measure.", pronunciation: "ZAI-del" },
        { german: "der Spritzer / G'spritzter", english: "Wine Spritzer", context: "Wine mixed with sparkling water. Very popular.", pronunciation: "SHPRIT-ser / G'SHPRIT-ster" },
        { german: "die Eierspeis'", english: "Scrambled Eggs (Austrian Dialect)", context: "Common breakfast item.", pronunciation: "EYE-er-shpeis" },
        { german: "die Palatschinke", english: "Crêpe / Thin Pancake", context: "Often served sweet (with jam/chocolate) or sometimes savory.", pronunciation: "Pa-la-CHIN-keh" },
        { german: "der Kellner / die Kellnerin", english: "Waiter / Waitress", context: "Address them respectfully, even if they seem grumpy!", pronunciation: "KEL-ner / KEL-ne-rin" },
        { german: "Zahlen, bitte!", english: "The bill, please!", context: "How to ask for the check.", pronunciation: "TSAH-len, BIT-teh", formal: true },
        { german: "Schmäh", english: "Viennese Charm/Wit (can be sarcastic)", context: "A unique aspect of Viennese interaction. Don't always take it literally!", pronunciation: "Shmay" },
      ],
      rolePlayingDialogues: [
        {
          title: "Ordering in a Viennese Kaffeehaus",
          initialPrompt: "(The waiter approaches your table, looking slightly impatient) \"Ja, bitte? Was darf's sein?\"",
          turns: [
            {
              speaker: "Partner",
              prompt: "Ja, bitte? Was darf's sein?"
            },
            {
              speaker: "User",
              options: [
                { text: "Ich hätte gern eine Melange und ein Stück Sachertorte.", correct: true, feedback: "Sehr gut! Clear and polite order." },
                { text: "Geben Sie mir eine Melange und Sachertorte.", correct: false, feedback: "A bit too direct, 'Ich hätte gern' (I would like) is more polite." },
                { text: "Kaffee und Kuchen, bitte.", correct: false, feedback: "Too general. Specify *which* coffee and cake you want." },
                { text: "Was empfehlen Sie?", correct: true, feedback: "Good question, but be prepared for a potentially curt answer!" }
              ],
            },
            {
              speaker: "Partner",
              prompt: "Eine Melange, eine Sachertorte. Passt.",
              response: "Eine Melange, eine Sachertorte. Passt."
            },
            {
              speaker: "User",
              options: [
                { text: "Entschuldigung, könnten wir bitte zahlen?", correct: true, feedback: "Polite and correct way to ask for the bill." },
                { text: "Zahlen!", correct: false, feedback: "Way too abrupt! The waiter might ignore you just for that." },
                { text: "Die Rechnung, bitte.", correct: true, feedback: "Also correct, uses 'Die Rechnung' for bill." },
                { text: "Was kostet das?", correct: false, feedback: "This asks 'What does that cost?', not directly for the bill to pay." }
              ]
            },
            {
              speaker: "Partner",
              prompt: "(Slams the bill holder onto the table) So, das macht dann 12 Euro 50.",
              response: "(Slams the bill holder onto the table) So, das macht dann 12 Euro 50."
            },
            {
              speaker: "User",
              options: [
                { text: "Hier sind 14 Euro, stimmt so.", correct: true, feedback: "Perfect. You state the total amount including tip ('stimmt so' means 'keep the change')." },
                { text: "12 Euro 50.", correct: false, feedback: "This is just the exact amount. In Austria, tipping is customary, usually rounding up." },
                { text: "Bitte schön, 15 Euro.", correct: true, feedback: "Also good, giving a higher amount implies the rest is a tip." },
                { text: "Passt schon.", correct: false, feedback: "This means 'It's okay' but doesn't clearly indicate payment or tip amount." }
              ]
            },
            {
              speaker: "Partner",
              prompt: "Danke. Schönen Tag noch.",
              response: "Danke. Schönen Tag noch."
            }
          ]
        }
      ]
    }
  },
  {
    id: "daily-routines",
    title: "Daily Routines",
    description: "Practice describing your daily activities using present tense verbs and time expressions.",
    level: "Intermediate",
    duration: "25 min",
    imageUrl: "/images/hare.png",
    tags: ["grammar", "vocabulary", "everyday"],
    exerciseType: "grammar",
    content: {
      introduction: "Talking about your daily routine is a common conversation topic and helps practice present tense verbs. In this exercise, you'll learn how to describe your daily activities in German using present tense (Präsens) and time expressions.",
      grammarRules: [
        {
          title: "Regular Verbs in Present Tense",
          explanation: "In German, regular verbs follow a predictable pattern in the present tense. You take the verb stem (infinitive minus -en) and add the appropriate ending based on the subject.",
          examples: [
            {
              german: "arbeiten (to work) → ich arbeite, du arbeitest, er/sie/es arbeitet, wir arbeiten, ihr arbeitet, sie/Sie arbeiten",
              english: "The endings are: -e, -st, -t, -en, -t, -en",
              note: "Notice how the stem 'arbeit-' remains the same and we just add different endings."
            },
            {
              german: "Ich arbeite jeden Tag von neun bis fünf.",
              english: "I work every day from nine to five."
            },
            {
              german: "Du lernst Deutsch.",
              english: "You are learning German.",
              note: "The verb 'lernen' (to learn) follows the same pattern."
            }
          ]
        },
        {
          title: "Irregular Verbs in Present Tense",
          explanation: "Some common German verbs are irregular and change their stem vowel in the present tense, usually in the 2nd and 3rd person singular forms (du/er/sie/es).",
          examples: [
            {
              german: "schlafen (to sleep) → ich schlafe, du schläfst, er/sie/es schläft, wir schlafen, ihr schlaft, sie/Sie schlafen",
              english: "Notice how the 'a' becomes 'ä' in the du and er/sie/es forms."
            },
            {
              german: "Er schläft acht Stunden pro Nacht.",
              english: "He sleeps eight hours per night."
            },
            {
              german: "fahren (to drive/go) → ich fahre, du fährst, er/sie/es fährt, wir fahren, ihr fahrt, sie/Sie fahren",
              english: "Another example of a stem-changing verb."
            }
          ]
        },
        {
          title: "Separable Prefix Verbs",
          explanation: "Many German verbs have separable prefixes. In the present tense, the prefix separates from the verb and moves to the end of the clause.",
          examples: [
            {
              german: "aufstehen (to get up) → ich stehe auf, du stehst auf, er/sie/es steht auf...",
              english: "The prefix 'auf' separates and moves to the end."
            },
            {
              german: "Ich stehe jeden Morgen um sieben Uhr auf.",
              english: "I get up at seven o'clock every morning."
            },
            {
              german: "anziehen (to put on) → Ich ziehe meine Kleidung an.",
              english: "I put on my clothes."
            }
          ]
        },
        {
          title: "Time Expressions for Daily Routines",
          explanation: "Time expressions are crucial for talking about when activities happen. Here are some common expressions used with daily routines.",
          examples: [
            {
              german: "jeden Tag / jeden Morgen / jeden Abend",
              english: "every day / every morning / every evening"
            },
            {
              german: "morgens, mittags, abends, nachts",
              english: "in the morning, at noon, in the evening, at night",
              note: "Add -s to the time of day to express 'in the...'"
            },
            {
              german: "um [time] Uhr",
              english: "at [time] o'clock",
              note: "For example: 'um acht Uhr' (at eight o'clock)"
            },
            {
              german: "nach dem Frühstück / vor dem Abendessen",
              english: "after breakfast / before dinner"
            }
          ]
        }
      ],
      practiceScenarios: [
        {
          situation: "You want to say that you wake up at 7 AM every day.",
          question: "Which sentence is correct?",
          options: [
            "Ich wache um sieben Uhr jeden Tag auf.",
            "Ich aufwache um sieben Uhr jeden Tag.",
            "Ich wache auf um sieben Uhr jeden Tag.",
            "Ich aufwache jeden Tag um sieben Uhr."
          ],
          correctAnswer: "Ich wache um sieben Uhr jeden Tag auf.",
          explanation: "With separable verbs like 'aufwachen', the prefix 'auf' moves to the end of the clause in the present tense."
        },
        {
          situation: "You want to say that your sister sleeps until 9 AM on weekends.",
          question: "Which sentence is correct?",
          options: [
            "Meine Schwester schlaft bis neun Uhr am Wochenende.",
            "Meine Schwester schläft bis neun Uhr am Wochenende.",
            "Meine Schwester schlafe bis neun Uhr am Wochenende.",
            "Meine Schwester schlafen bis neun Uhr am Wochenende."
          ],
          correctAnswer: "Meine Schwester schläft bis neun Uhr am Wochenende.",
          explanation: "The verb 'schlafen' is irregular and changes from 'a' to 'ä' in the 3rd person singular (er/sie/es) form."
        },
        {
          situation: "You want to say that you eat breakfast at 8 AM.",
          question: "Which sentence is correct?",
          options: [
            "Ich frühstücke um acht Uhr.",
            "Ich frühstückst um acht Uhr.",
            "Ich isse Frühstück um acht Uhr.",
            "Ich esse Frühstück bei acht Uhr."
          ],
          correctAnswer: "Ich frühstücke um acht Uhr.",
          explanation: "The verb 'frühstücken' (to have breakfast) is regular and follows the standard conjugation pattern. The first-person singular form adds '-e' to the stem."
        },
        {
          situation: "You want to ask someone what time they go to work.",
          question: "Which question is correct?",
          options: [
            "Wann gehst du zur Arbeit?",
            "Wann du gehst zur Arbeit?",
            "Wann du zur Arbeit gehst?",
            "Wann zur Arbeit gehst du?"
          ],
          correctAnswer: "Wann gehst du zur Arbeit?",
          explanation: "In German questions with question words like 'wann' (when), the verb comes second and the subject third."
        }
      ],
      quizQuestions: [
        {
          question: "Which of these verbs is NOT irregular in the present tense?",
          options: ["schlafen", "arbeiten", "fahren", "lesen"],
          correctAnswer: "arbeiten",
          explanation: "'Arbeiten' is a regular verb that doesn't change its stem in any form of the present tense. The others are all irregular and change their stem vowel in certain forms."
        },
        {
          question: "What happens to separable prefix verbs in the present tense?",
          options: [
            "The prefix stays attached to the verb",
            "The prefix is omitted entirely",
            "The prefix moves to the end of the clause",
            "The prefix changes to a different form"
          ],
          correctAnswer: "The prefix moves to the end of the clause",
          explanation: "With separable prefix verbs, the prefix separates from the verb and moves to the end of the clause in the present tense."
        },
        {
          question: "Which time expression correctly uses the dative case?",
          options: [
            "jeden Morgen",
            "nach dem Frühstück",
            "um acht Uhr",
            "jeden Tag"
          ],
          correctAnswer: "nach dem Frühstück",
          explanation: "The preposition 'nach' (after) always takes the dative case, so we use 'dem Frühstück' rather than 'das Frühstück'."
        },
        {
          question: "Which is the correct present tense conjugation of 'fahren' for 'wir'?",
          options: ["wir fahren", "wir fahrt", "wir fähren", "wir fahrst"],
          correctAnswer: "wir fahren",
          explanation: "The correct conjugation for 'wir' (we) with 'fahren' is 'wir fahren'. The stem vowel change only occurs in the du and er/sie/es forms."
        }
      ]
    }
  },
  {
    id: "transport-directions",
    title: "Transport & Directions",
    description: "Learn how to ask for and give directions, plus vocabulary for different types of transportation.",
    level: "Advanced",
    duration: "30 min",
    imageUrl: "/images/hare_bike.png",
    tags: ["vocabulary", "travel", "conversation"],
    exerciseType: "gapFilling",
    content: {
      introduction: "Being able to navigate and ask for directions is essential when traveling in German-speaking countries. This exercise will help you learn key phrases and vocabulary for transportation and giving/asking for directions.",
      vocabularyItems: [
        {
          german: "der Bahnhof",
          english: "train station",
          pronunciation: "dair BAHN-hohf",
          context: "One of the most important transportation hubs in German cities"
        },
        {
          german: "die Haltestelle",
          english: "stop (bus/tram)",
          pronunciation: "dee HAL-teh-shtel-eh",
          context: "Where you wait for public transportation"
        },
        {
          german: "die U-Bahn",
          english: "subway/metro",
          pronunciation: "dee OO-bahn",
          context: "Underground train system in larger cities"
        },
        {
          german: "die S-Bahn",
          english: "suburban/city train",
          pronunciation: "dee ESS-bahn",
          context: "Connects the city center with outlying areas"
        },
        {
          german: "der Bus",
          english: "bus",
          pronunciation: "dair BOOS",
          context: "Common form of public transport in all cities"
        },
        {
          german: "die Straßenbahn",
          english: "tram/streetcar",
          pronunciation: "dee SHTRAH-sen-bahn",
          context: "Rail transport that runs on streets in many German cities"
        },
        {
          german: "das Fahrrad",
          english: "bicycle",
          pronunciation: "das FAHR-raht",
          context: "Very popular means of transportation in Germany"
        },
        {
          german: "zu Fuß gehen",
          english: "to walk/go by foot",
          pronunciation: "tsoo FOOS gay-en",
          context: "Often the best way to explore city centers"
        },
        {
          german: "die Kreuzung",
          english: "intersection/crossing",
          pronunciation: "dee KROY-tsung",
          context: "Where two or more roads meet"
        },
        {
          german: "die Ampel",
          english: "traffic light",
          pronunciation: "dee AM-pel",
          context: "Regulates traffic at intersections"
        },
        {
          german: "links",
          english: "left",
          pronunciation: "links",
          context: "Used when giving directions"
        },
        {
          german: "rechts",
          english: "right",
          pronunciation: "rechts",
          context: "Used when giving directions"
        },
        {
          german: "geradeaus",
          english: "straight ahead",
          pronunciation: "geh-RAH-deh-ows",
          context: "Used when giving directions"
        },
        {
          german: "die Karte",
          english: "map",
          pronunciation: "dee KAR-teh",
          context: "Helpful when navigating"
        },
        {
          german: "Wie komme ich zum/zur...?",
          english: "How do I get to the...?",
          pronunciation: "vee KOM-eh ich tsoom/tsoor",
          context: "Common phrase for asking directions",
          formal: true
        }
      ],
      gapFillingSentences: [
        {
          sentence: "Entschuldigung, wie komme ich zum [gap]?",
          missingWords: ["Bahnhof"],
          distractorWords: ["Kuchen", "Haustier", "Bleistift", "Garten"],
          translations: {
            english: "Excuse me, how do I get to the train station?",
            germanComplete: "Entschuldigung, wie komme ich zum Bahnhof?"
          },
          hint: "This is where trains arrive and depart."
        },
        {
          sentence: "Die nächste [gap] ist nur fünf Minuten zu Fuß.",
          missingWords: ["Haltestelle"],
          distractorWords: ["Tablette", "Schildkröte", "Musikgruppe", "Süßigkeit"],
          translations: {
            english: "The next stop is only five minutes on foot.",
            germanComplete: "Die nächste Haltestelle ist nur fünf Minuten zu Fuß."
          },
          hint: "Where you wait for the bus or tram."
        },
        {
          sentence: "Gehen Sie [gap] an der Kreuzung und dann die zweite Straße rechts.",
          missingWords: ["links"],
          distractorWords: ["blau", "schnell", "gestern", "ruhig"],
          translations: {
            english: "Go left at the intersection and then take the second street on the right.",
            germanComplete: "Gehen Sie links an der Kreuzung und dann die zweite Straße rechts."
          },
          hint: "The opposite of right."
        },
        {
          sentence: "Ich fahre lieber mit dem [gap] als mit dem Auto.",
          missingWords: ["Fahrrad"],
          distractorWords: ["Kissen", "Löffel", "Regenschirm", "Teppich"],
          translations: {
            english: "I prefer to ride the bicycle rather than the car.",
            germanComplete: "Ich fahre lieber mit dem Fahrrad als mit dem Auto."
          },
          hint: "A two-wheeled, eco-friendly vehicle."
        },
        {
          sentence: "Die [gap] fährt alle 10 Minuten zum Hauptbahnhof.",
          missingWords: ["Straßenbahn"],
          distractorWords: ["Banane", "Wolke", "Katze", "Zeitung"],
          translations: {
            english: "The tram runs every 10 minutes to the main station.",
            germanComplete: "Die Straßenbahn fährt alle 10 Minuten zum Hauptbahnhof."
          },
          hint: "A rail vehicle that runs on streets."
        },
        {
          sentence: "Warten Sie an der [gap], bis sie grün wird.",
          missingWords: ["Ampel"],
          distractorWords: ["Tasse", "Pizza", "Blume", "Uhr"],
          translations: {
            english: "Wait at the traffic light until it turns green.",
            germanComplete: "Warten Sie an der Ampel, bis sie grün wird."
          },
          hint: "It changes from red to yellow to green."
        },
        {
          sentence: "Um zum Museum zu kommen, nehmen Sie die [gap] Linie 3 bis Marktplatz.",
          missingWords: ["U-Bahn"],
          distractorWords: ["Sonne", "Maus", "Schere", "Milch"],
          translations: {
            english: "To get to the museum, take the subway line 3 to Market Square.",
            germanComplete: "Um zum Museum zu kommen, nehmen Sie die U-Bahn Linie 3 bis Marktplatz."
          },
          hint: "An underground train system."
        },
        {
          sentence: "Fahren Sie drei Stationen mit dem [gap] und steigen Sie am Rathaus aus.",
          missingWords: ["Bus"],
          distractorWords: ["Käse", "Fenster", "Pullover", "Seife"],
          translations: {
            english: "Take the bus for three stops and get off at City Hall.",
            germanComplete: "Fahren Sie drei Stationen mit dem Bus und steigen Sie am Rathaus aus."
          },
          hint: "A common form of public transportation on wheels."
        },
        {
          sentence: "Gehen Sie an der nächsten [gap] über die Straße und dann geradeaus.",
          missingWords: ["Kreuzung"],
          distractorWords: ["Birne", "Jacke", "Kamera", "Briefmarke"],
          translations: {
            english: "Cross the street at the next intersection and then go straight ahead.",
            germanComplete: "Gehen Sie an der nächsten Kreuzung über die Straße und dann geradeaus."
          },
          hint: "Where two roads meet."
        },
        {
          sentence: "Ich muss jetzt [gap], mein Zug fährt in 15 Minuten ab.",
          missingWords: ["gehen"],
          distractorWords: ["kochen", "schlafen", "singen", "malen"],
          translations: {
            english: "I have to go now, my train leaves in 15 minutes.",
            germanComplete: "Ich muss jetzt gehen, mein Zug fährt in 15 Minuten ab."
          },
          hint: "The action of moving on foot."
        }
      ]
    }
  },
  {
    id: "hobbies-interests",
    title: "Hobbies & Interests",
    description: "Expand your vocabulary related to hobbies, sports, and leisure activities in German.",
    level: "Beginner",
    duration: "15 min",
    imageUrl: "/images/owl_knit.png",
    tags: ["vocabulary", "conversation", "leisure"],
    exerciseType: "vocabulary",
    content: {
      introduction: "Talking about hobbies and interests is a great way to connect with German speakers.",
    }
  },
  {
    id: "weather-seasons",
    title: "Weather & Seasons",
    description: "Learn vocabulary and expressions to talk about weather, seasons, and climate in German.",
    level: "Intermediate",
    duration: "20 min",
    imageUrl: "/images/mouse_rain.png",
    tags: ["vocabulary", "everyday", "nature"],
    exerciseType: "vocabulary",
    content: {
      introduction: "The weather is always a good conversation starter. Learn how to discuss weather and seasons in German.",
    }
  },
  {
    id: "shopping-vocabulary",
    title: "Shopping Vocabulary",
    description: "Build vocabulary for shopping situations, including clothing, sizes, prices, and common phrases.",
    level: "Intermediate",
    duration: "25 min",
    imageUrl: "/images/frog_shop.png",
    tags: ["vocabulary", "shopping", "conversation"],
    exerciseType: "vocabulary",
    content: {
      introduction: "Shopping in a German-speaking country requires specific vocabulary and phrases. Let's learn them!",
    }
  },
  {
    id: "wiener-schimpfwoerter",
    title: "Wiener Schimpfwörter",
    description: "Learn the colorful world of Viennese insults, complaints, and grumpy expressions.",
    level: "Advanced",
    duration: "30 min",
    imageUrl: "/images/bear_roadrage.png",
    tags: ["vocabulary", "vienna", "austria", "slang", "culture"],
    exerciseType: "rolePlaying",
    content: {
      // ... existing content ...
    }
  },
  {
    id: "connector-chaos",
    title: "Connector Chaos",
    description: "Master the art of complex sentence construction with advanced German connectors.",
    level: "Advanced",
    duration: "25 min",
    imageUrl: "/images/beaver_logs.png",
    tags: ["grammar", "writing", "advanced", "connectors"],
    exerciseType: "gapFilling",
    content: {
      introduction: "Deutsche Konjunktionen sind der Schlüssel zu natürlichen, fließenden Sätzen. In dieser Übung lernst du, wie man typische deutsche Ausdrücke wie 'zwar ... aber', 'dennoch', 'sodass', 'während' und 'dadurch' richtig verwendet, um deine Sätze lebendiger und authentischer zu machen.",
      vocabularyItems: [
        {
          german: "zwar ... aber",
          english: "while it's true that ... but",
          context: "Used to acknowledge a point before presenting a contrasting one, very common in everyday German"
        },
        {
          german: "dennoch",
          english: "nevertheless, nonetheless",
          context: "Used to express that something happens despite previous circumstances, more formal than 'trotzdem'"
        },
        {
          german: "sodass",
          english: "so that, such that",
          context: "Indicates a consequence or result, often used in formal writing and speech"
        },
        {
          german: "während",
          english: "while, whereas",
          context: "Can indicate simultaneous actions or contrast between two situations"
        },
        {
          german: "dadurch",
          english: "thereby, through this",
          context: "Indicates a means or method by which something is achieved, common in academic and formal contexts"
        }
      ],
      grammarRules: [
        {
          title: "Position der Konjunktionen",
          explanation: "Manche Konjunktionen (wie 'dennoch') beeinflussen die Satzstellung nicht, während andere (wie 'sodass') das Verb ans Ende des Satzes verschieben. Achte auch auf die richtige Kommasetzung!",
          examples: [
            {
              german: "Es regnet in Strömen, dennoch gehe ich spazieren.",
              english: "It's pouring rain, nevertheless I'm going for a walk."
            },
            {
              german: "Es regnet so stark, sodass ich zu Hause bleiben muss.",
              english: "It's raining so hard that I have to stay home."
            }
          ]
        }
      ],
      gapFillingSentences: [
        {
          sentence: "Die Prüfung war wirklich schwer, [gap] habe ich sie mit Bravour bestanden.",
          missingWords: ["dennoch"],
          distractorWords: ["zwar", "sodass", "während", "dadurch"],
          translations: {
            english: "The exam was really difficult, nevertheless I passed it with flying colors.",
            germanComplete: "Die Prüfung war wirklich schwer, dennoch habe ich sie mit Bravour bestanden."
          },
          hint: "Diese Konjunktion drückt aus, dass etwas trotz vorheriger Umstände passiert."
        },
        {
          sentence: "[gap] das Wetter herrlich ist, [gap] müssen wir heute leider drinnen bleiben.",
          missingWords: ["Zwar", "aber"],
          distractorWords: ["Während", "dennoch", "sodass", "dadurch"],
          translations: {
            english: "While the weather is beautiful, unfortunately we have to stay inside today.",
            germanComplete: "Zwar ist das Wetter herrlich, aber wir müssen heute leider drinnen bleiben."
          },
          hint: "Dies ist eine zweiteilige Konjunktion, die einen Gegensatz ausdrückt."
        },
        {
          sentence: "Ich habe mich so sehr angestrengt, [gap] ich die Prüfung mit Auszeichnung bestehen konnte.",
          missingWords: ["sodass"],
          distractorWords: ["zwar", "dennoch", "während", "dadurch"],
          translations: {
            english: "I worked so hard that I could pass the exam with distinction.",
            germanComplete: "Ich habe mich so sehr angestrengt, sodass ich die Prüfung mit Auszeichnung bestehen konnte."
          },
          hint: "Diese Konjunktion zeigt eine Folge oder ein Ergebnis an."
        },
        {
          sentence: "[gap] ich koche, höre ich gerne klassische Musik.",
          missingWords: ["Während"],
          distractorWords: ["Zwar", "dennoch", "sodass", "dadurch"],
          translations: {
            english: "While I cook, I like to listen to classical music.",
            germanComplete: "Während ich koche, höre ich gerne klassische Musik."
          },
          hint: "Diese Konjunktion zeigt gleichzeitige Handlungen an."
        },
        {
          sentence: "Ich habe jeden Tag geübt. [gap] konnte ich meine Deutschkenntnisse deutlich verbessern.",
          missingWords: ["Dadurch"],
          distractorWords: ["Zwar", "dennoch", "sodass", "während"],
          translations: {
            english: "I practiced every day. Through this, I could significantly improve my German skills.",
            germanComplete: "Ich habe jeden Tag geübt. Dadurch konnte ich meine Deutschkenntnisse deutlich verbessern."
          },
          hint: "Diese Konjunktion zeigt ein Mittel oder eine Methode an."
        },
        {
          sentence: "[gap] der Film spannend war, [gap] hat er mir nicht so gut gefallen wie das Buch.",
          missingWords: ["Zwar", "aber"],
          distractorWords: ["Während", "dennoch", "sodass", "dadurch"],
          translations: {
            english: "While the movie was exciting, I didn't like it as much as the book.",
            germanComplete: "Zwar war der Film spannend, aber er hat mir nicht so gut gefallen wie das Buch."
          },
          hint: "Dies ist eine zweiteilige Konjunktion, die einen Gegensatz ausdrückt."
        },
        {
          sentence: "Es war eiskalt draußen, [gap] haben wir einen wunderschönen Winterspaziergang gemacht.",
          missingWords: ["dennoch"],
          distractorWords: ["zwar", "sodass", "während", "dadurch"],
          translations: {
            english: "It was freezing outside, nevertheless we took a beautiful winter walk.",
            germanComplete: "Es war eiskalt draußen, dennoch haben wir einen wunderschönen Winterspaziergang gemacht."
          },
          hint: "Diese Konjunktion drückt aus, dass etwas trotz vorheriger Umstände passiert."
        }
      ],
      practiceScenarios: [
        {
          situation: "Du schreibst einen Aufsatz über Umweltschutz.",
          question: "Welche Konjunktion passt am besten in diesen Satz: 'Die Regierung hat neue Gesetze eingeführt, _____ die Luftqualität sich deutlich verbessert hat.'",
          options: [
            "sodass",
            "während",
            "dennoch",
            "dadurch"
          ],
          correctAnswer: "sodass",
          explanation: "'Sodass' ist hier richtig, weil es das Ergebnis der Regierungsmaßnahmen zeigt. Der vollständige Satz bedeutet: 'Die Regierung hat neue Gesetze eingeführt, sodass die Luftqualität sich deutlich verbessert hat.'"
        },
        {
          situation: "Du beschreibst zwei gegensätzliche Situationen.",
          question: "Welches Konjunktionspaar passt am besten in diesen Satz: '_____ das Restaurant teuer ist, _____ ist das Essen wirklich ausgezeichnet.'",
          options: [
            "Zwar ... aber",
            "Während ... dennoch",
            "Dadurch ... sodass",
            "Dennoch ... während"
          ],
          correctAnswer: "Zwar ... aber",
          explanation: "'Zwar ... aber' ist hier richtig, weil es einen Gegensatz zwischen dem teuren Restaurant und dem ausgezeichneten Essen herstellt."
        }
      ]
    }
  },
];

export function getAllExercises(): Exercise[] {
  return exercises;
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(exercise => exercise.id === id);
}

export function getExercisesByLevel(level: Exercise["level"]): Exercise[] {
  return exercises.filter(exercise => exercise.level === level);
}

export function getExercisesByTag(tag: string): Exercise[] {
  return exercises.filter(exercise => exercise.tags?.includes(tag));
} 