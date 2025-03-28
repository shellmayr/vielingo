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
  };
  exerciseType: "vocabulary" | "grammar" | "conversation" | "reading" | "listening";
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
    exerciseType: "conversation",
    content: {
      introduction: "Being able to introduce yourself is one of the first steps in having a conversation in German.",
    }
  },
  {
    id: "food-vocabulary",
    title: "Food & Dining",
    description: "Build your food vocabulary and learn how to order meals at restaurants with confidence.",
    level: "Intermediate",
    duration: "20 min",
    imageUrl: "/images/hare.png",
    tags: ["vocabulary", "dining", "conversation"],
    exerciseType: "vocabulary",
    content: {
      introduction: "Food is an important part of German culture. Learn how to talk about food and order at restaurants.",
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
      introduction: "Talking about your daily routine is a common conversation topic and helps practice present tense verbs.",
    }
  },
  {
    id: "transport-directions",
    title: "Transport & Directions",
    description: "Learn how to ask for and give directions, plus vocabulary for different types of transportation.",
    level: "Advanced",
    duration: "30 min",
    imageUrl: "/images/frog.png",
    tags: ["vocabulary", "travel", "conversation"],
    exerciseType: "conversation",
    content: {
      introduction: "Being able to navigate and ask for directions is essential when traveling in German-speaking countries.",
    }
  },
  {
    id: "hobbies-interests",
    title: "Hobbies & Interests",
    description: "Expand your vocabulary related to hobbies, sports, and leisure activities in German.",
    level: "Beginner",
    duration: "15 min",
    imageUrl: "/images/bear.png",
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
    imageUrl: "/images/hare.png",
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
    imageUrl: "/images/frog.png",
    tags: ["vocabulary", "shopping", "conversation"],
    exerciseType: "vocabulary",
    content: {
      introduction: "Shopping in a German-speaking country requires specific vocabulary and phrases. Let's learn them!",
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