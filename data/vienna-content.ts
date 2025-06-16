export interface ViennaThemeContent {
  theme: "wiener-wohnen" | "heurigenkultur" | "kaffeehauskultur" | "alltagsgeschichten" | "wiener-grant-schmaeh" | "fiaker";
  displayName: string;
  description: string;
  culturalSignificance: string;
  imageUrl?: string;
  keyVocabulary: ViennaVocabularyItem[];
  readingTexts: ViennaReadingText[];
  listeningScenarios: ViennaListeningScenario[];
  grammarContexts: ViennaGrammarContext[];
  culturalNotes: CulturalNote[];
}

export interface ViennaVocabularyItem {
  austrianGerman: string;
  standardGerman?: string;
  english: string;
  pronunciation?: string;
  usage: string;
  formality: "formal" | "informal" | "neutral";
  category: string;
}

export interface ViennaReadingText {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  textType: "article" | "forum-post" | "official-document" | "news" | "opinion";
  content: string;
  wordCount: number;
  keyGrammarFocus?: string[];
  culturalContext: string;
}

export interface ViennaListeningScenario {
  id: string;
  title: string;
  scenario: string;
  difficulty: "easy" | "medium" | "hard";
  speakers: number;
  accent: "standard" | "viennese" | "mixed";
  duration: number;
  context: string;
}

export interface ViennaGrammarContext {
  grammaticalStructure: string;
  explanation: string;
  viennaExample: string;
  translation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface CulturalNote {
  title: string;
  content: string;
  importance: "essential" | "helpful" | "interesting";
  relatedVocabulary?: string[];
}

export const viennaThemes: ViennaThemeContent[] = [
  {
    theme: "wiener-wohnen",
    displayName: "Wiener Wohnen & Gemeindebau",
    description: "Vienna's unique social housing system and community living",
    culturalSignificance: "Vienna's public housing system houses over 60% of residents and represents a cornerstone of the city's social fabric. The Gemeindebau (municipal housing) system has been integral to Viennese life since the 1920s.",
    imageUrl: "/images/vienna/gemeindebau.jpg",
    keyVocabulary: [
      {
        austrianGerman: "Gemeindebau",
        english: "municipal housing",
        pronunciation: "ge-MINE-de-bow",
        usage: "Large-scale public housing complexes built by the city of Vienna",
        formality: "formal",
        category: "housing"
      },
      {
        austrianGerman: "Mieter*in",
        english: "tenant",
        pronunciation: "MEE-ter-in",
        usage: "Gender-inclusive term for tenant used in official documents",
        formality: "formal",
        category: "housing"
      },
      {
        austrianGerman: "Wohnberatung",
        english: "housing consultation",
        pronunciation: "VOHN-be-rah-tung",
        usage: "Official service for housing advice and applications",
        formality: "formal",
        category: "administrative"
      },
      {
        austrianGerman: "Hausordnung",
        english: "house rules",
        pronunciation: "HOUSE-ord-nung",
        usage: "Rules governing behavior in residential buildings",
        formality: "formal",
        category: "housing"
      },
      {
        austrianGerman: "Hausverwaltung",
        english: "property management",
        pronunciation: "HOUSE-fer-val-tung",
        usage: "Company or office managing residential properties",
        formality: "formal",
        category: "administrative"
      }
    ],
    readingTexts: [
      {
        id: "gemeindebau-history",
        title: "Geschichte des Wiener Gemeindebaus",
        difficulty: "medium",
        textType: "article",
        content: "Der Wiener Gemeindebau hat eine über hundertjährige Geschichte und ist weltweit einzigartig. Nach dem Ersten Weltkrieg herrschte in Wien große Wohnungsnot. Die Sozialdemokratische Arbeiterpartei, die ab 1919 die Stadt regierte, entwickelte ein revolutionäres Wohnbauprogramm. Mit der Luxussteuer finanziert, entstanden zwischen 1923 und 1934 etwa 64.000 Gemeindewohnungen. Der Karl-Marx-Hof, 1930 fertiggestellt, war mit 1.382 Metern Länge der längste zusammenhängende Wohnbau der Welt. Heute leben etwa 500.000 Menschen in Wiener Gemeindewohnungen, was etwa einem Viertel der Bevölkerung entspricht. Das System basiert auf dem Prinzip, dass Wohnen ein Grundrecht ist und nicht der Spekulation unterliegen soll.",
        wordCount: 142,
        keyGrammarFocus: ["Passiv", "Partizip II als Adjektiv", "Temporale Nebensätze"],
        culturalContext: "The text explains the historical and social significance of Vienna's unique public housing system, which differs greatly from housing policies in other major cities."
      },
      {
        id: "wohnung-suchen",
        title: "Wohnungssuche in Wien: Tipps für Neuankömmlinge",
        difficulty: "easy",
        textType: "forum-post",
        content: "Hallo zusammen! Ich bin neu in Wien und suche eine Wohnung. Kann mir jemand Tipps geben? Ich habe gehört, dass es hier Gemeindewohnungen gibt – wie funktioniert das? Und was ist ein 'Wiener Wohn-Ticket'? Außerdem sehe ich immer wieder Abkürzungen wie 'Zim.', 'Kü.', 'Bad' in den Anzeigen. Was bedeuten diese? Ich komme aus Deutschland und kenne mich mit dem österreichischen System nicht aus. Über hilfreiche Antworten würde ich mich sehr freuen! Danke im Voraus. LG, Sarah",
        wordCount: 89,
        keyGrammarFocus: ["Modalverben", "Interrogativpronomen", "Höfliche Bitten"],
        culturalContext: "A typical forum post showing how newcomers navigate Vienna's housing market, including specific Austrian terminology and abbreviations."
      }
    ],
    listeningScenarios: [
      {
        id: "housing-office-call",
        title: "Anruf bei der Wohnberatung",
        scenario: "A resident calls Wiener Wohnen's housing consultation service to ask about apartment applications",
        difficulty: "medium",
        speakers: 2,
        accent: "standard",
        duration: 180,
        context: "Formal phone conversation with official housing authority"
      },
      {
        id: "neighbors-discussion",
        title: "Nachbarschaftsgespräch über Hausordnung",
        scenario: "Two neighbors in a Gemeindebau discuss new house rules",
        difficulty: "easy",
        speakers: 2,
        accent: "viennese",
        duration: 120,
        context: "Informal conversation between neighbors"
      }
    ],
    grammarContexts: [
      {
        grammaticalStructure: "Passiv mit Modalverben",
        explanation: "In official housing documents, passive voice with modal verbs is frequently used",
        viennaExample: "Die Anträge müssen bis zum Monatsende eingereicht werden.",
        translation: "The applications must be submitted by the end of the month.",
        difficulty: "medium"
      },
      {
        grammaticalStructure: "Nominalisierung in Amtssprache",
        explanation: "Administrative language often uses nominalization for formal tone",
        viennaExample: "Die Bearbeitung der Wohnungsanträge erfolgt nach Eingangsdatum.",
        translation: "The processing of housing applications is done according to receipt date.",
        difficulty: "hard"
      }
    ],
    culturalNotes: [
      {
        title: "Red Vienna Heritage",
        content: "Vienna's social housing system originated from the 'Red Vienna' period (1919-1934) when the Social Democratic Party implemented progressive social policies. This legacy continues to influence Vienna's approach to affordable housing today.",
        importance: "essential",
        relatedVocabulary: ["Rotes Wien", "Sozialdemokratie", "Luxussteuer"]
      },
      {
        title: "Housing Application Process",
        content: "To qualify for a Gemeindewohnung, applicants need the 'Wiener Wohn-Ticket' and must meet specific criteria including income limits and residency requirements. The process reflects Vienna's commitment to providing affordable housing for residents.",
        importance: "helpful",
        relatedVocabulary: ["Wiener Wohn-Ticket", "Anspruchsberechtigung", "Einkommensgrenzen"]
      }
    ]
  },
  {
    theme: "heurigenkultur",
    displayName: "Heurigenkultur",
    description: "Traditional Viennese wine taverns and wine culture",
    culturalSignificance: "Heurigenkultur is recognized by UNESCO as intangible cultural heritage. These family-run wine taverns serve their own wine and represent a unique Viennese tradition of socializing and enjoying local wines in a relaxed atmosphere.",
    imageUrl: "/images/vienna/heuriger.jpg",
    keyVocabulary: [
      {
        austrianGerman: "Heuriger",
        english: "wine tavern / new wine",
        pronunciation: "HOY-ri-ger",
        usage: "Both the establishment and the current year's wine",
        formality: "informal",
        category: "food-drink"
      },
      {
        austrianGerman: "Ausg'steckt",
        standardGerman: "Ausgesteckt",
        english: "open (sign at Heuriger)",
        pronunciation: "OWS-ge-shteckt",
        usage: "Traditional sign indicating the Heuriger is open",
        formality: "informal",
        category: "culture"
      },
      {
        austrianGerman: "Gemischter Satz",
        english: "mixed variety wine",
        pronunciation: "ge-MISH-ter zats",
        usage: "Traditional Viennese white wine blend",
        formality: "neutral",
        category: "food-drink"
      },
      {
        austrianGerman: "Brettljause",
        english: "cold cuts platter",
        pronunciation: "BRETL-yau-ze",
        usage: "Traditional Austrian cold meal served on a wooden board",
        formality: "informal",
        category: "food-drink"
      },
      {
        austrianGerman: "Staubiger",
        standardGerman: "Staubiger (Wein)",
        english: "cloudy young wine",
        pronunciation: "SHTAU-bi-ger",
        usage: "Very young, slightly cloudy wine typical at Heurigers",
        formality: "informal",
        category: "food-drink"
      }
    ],
    readingTexts: [
      {
        id: "heuriger-tradition",
        title: "Die Tradition der Wiener Heurigen",
        difficulty: "medium",
        textType: "article",
        content: "Die Wiener Heurigenkultur reicht bis ins 18. Jahrhundert zurück, als Kaiser Joseph II. den Winzern erlaubte, ihre eigenen Weine auszuschenken. Das erkennbare Zeichen eines geöffneten Heurigen ist der Föhrenbuschen über der Eingangstür, begleitet vom Schild 'Ausg'steckt'. Diese Tradition ist bis heute lebendig geblieben. In den Weinbergen am Stadtrand, besonders in Grinzing, Sievering und Stammersdorf, öffnen die Winzerfamilien ihre Stuben und Gärten für Gäste. Serviert wird der junge Wein des aktuellen Jahres, oft noch trüb und süffig, begleitet von einer kalten Jause. Der Heuriger ist mehr als nur ein Gastronomiebetrieb – er ist ein Ort der Gemeinschaft, wo Wiener und Touristen gleichermaßen die entspannte Atmosphäre genießen. Die UNESCO hat diese einzigartige Kultur als immaterielles Kulturerbe anerkannt.",
        wordCount: 156,
        keyGrammarFocus: ["Temporale Präpositionen", "Partizip II als Adjektiv", "Komparativ und Superlativ"],
        culturalContext: "Explains the historical roots and cultural significance of Vienna's wine tavern culture, including traditional practices that continue today."
      }
    ],
    listeningScenarios: [
      {
        id: "heuriger-ordering",
        title: "Bestellung im Heuriger",
        scenario: "Friends order wine and food at a traditional Heuriger",
        difficulty: "easy",
        speakers: 3,
        accent: "viennese",
        duration: 150,
        context: "Casual conversation in traditional wine tavern setting"
      }
    ],
    grammarContexts: [
      {
        grammaticalStructure: "Adjektivdeklination bei Weinbeschreibungen",
        explanation: "Adjective endings are crucial when describing wines and food at Heurigers",
        viennaExample: "Ein junger, süffiger Weißwein aus dem sonnigen Weingarten.",
        translation: "A young, easy-drinking white wine from the sunny vineyard.",
        difficulty: "medium"
      }
    ],
    culturalNotes: [
      {
        title: "Föhrenbuschen Tradition",
        content: "The pine branch (Föhrenbuschen) hung outside a Heuriger signals it's open. This centuries-old tradition helps visitors identify which wine taverns are currently serving.",
        importance: "essential",
        relatedVocabulary: ["Föhrenbuschen", "Ausg'steckt", "Winzer"]
      }
    ]
  },
  {
    theme: "kaffeehauskultur",
    displayName: "Kaffeehauskultur",
    description: "Vienna's legendary coffee house culture",
    culturalSignificance: "Viennese coffee houses are UNESCO-recognized cultural heritage sites, historically serving as meeting places for writers, artists, and intellectuals. They represent a unique social institution where 'time and space are consumed, but only the coffee is found on the bill.'",
    imageUrl: "/images/vienna/kaffeehaus.jpg",
    keyVocabulary: [
      {
        austrianGerman: "Melange",
        english: "coffee with steamed milk",
        pronunciation: "me-LAHN-zhe",
        usage: "Most popular Viennese coffee specialty, similar to cappuccino",
        formality: "neutral",
        category: "food-drink"
      },
      {
        austrianGerman: "Kleiner Brauner",
        english: "small black coffee with milk",
        pronunciation: "KLINE-er BROW-ner",
        usage: "Small black coffee served with a small pitcher of milk",
        formality: "neutral",
        category: "food-drink"
      },
      {
        austrianGerman: "Zeitungsstock",
        english: "newspaper holder",
        pronunciation: "TSITE-ungs-shtock",
        usage: "Traditional wooden rack holding newspapers in coffee houses",
        formality: "neutral",
        category: "culture"
      },
      {
        austrianGerman: "Schanigarten",
        standardGerman: "Schanigarten",
        english: "outdoor seating area",
        pronunciation: "SHAH-ni-gar-ten",
        usage: "Outdoor seating area of restaurants and cafés",
        formality: "neutral",
        category: "general"
      }
    ],
    readingTexts: [
      {
        id: "kaffeehaus-geschichte",
        title: "Die goldene Ära der Wiener Kaffeehäuser",
        difficulty: "hard",
        textType: "article",
        content: "Das Wiener Kaffeehaus entstand im 17. Jahrhundert und entwickelte sich zu einer einzigartigen Institution. Im Fin de Siècle waren Kaffeehäuser wie das Central, Griensteidl und Herrenhof Treffpunkte der Intellektuellen. Hier entstanden literarische Werke, wurden politische Diskussionen geführt und künstlerische Bewegungen geboren. Der Zeitungsstock, die Marmorplatten der Tische und die Thonet-Stühle prägten die Atmosphäre. Stefan Zweig beschrieb das Kaffeehaus als 'eine Art demokratischer Club', in dem jeder für den Preis einer Tasse Kaffee stundenlang verweilen konnte. Diese Tradition überlebte zwei Weltkriege und prägt noch heute das kulturelle Leben Wiens. 2011 wurde die Wiener Kaffeehauskultur von der UNESCO zum immateriellen Kulturerbe der Menschheit erklärt.",
        wordCount: 143,
        keyGrammarFocus: ["Präteritum", "Relativsätze", "Indirekte Rede"],
        culturalContext: "Historical overview of Vienna's coffee house culture, emphasizing its role in intellectual and artistic life."
      }
    ],
    listeningScenarios: [
      {
        id: "cafe-ordering",
        title: "Kaffeebestellung im traditionsreichen Café",
        scenario: "Tourist learns to order coffee in a traditional Viennese coffee house",
        difficulty: "easy",
        speakers: 2,
        accent: "standard",
        duration: 90,
        context: "Formal service interaction in traditional coffee house"
      }
    ],
    grammarContexts: [
      {
        grammaticalStructure: "Konjunktiv II für historische Vorstellungen",
        explanation: "Used when imagining what historical figures might have thought or done",
        viennaExample: "Stefan Zweig hätte wohl nie gedacht, dass seine Beschreibung so berühmt werden würde.",
        translation: "Stefan Zweig probably never would have thought that his description would become so famous.",
        difficulty: "hard"
      }
    ],
    culturalNotes: [
      {
        title: "Coffee House Etiquette",
        content: "In traditional Viennese coffee houses, it's acceptable to sit for hours with just one coffee. The waiter (traditionally called 'Herr Ober') serves coffee on a silver tray with a glass of water. Newspapers are provided free of charge.",
        importance: "helpful",
        relatedVocabulary: ["Herr Ober", "Silbertablett", "Zeitungsstock"]
      }
    ]
  },
  {
    theme: "alltagsgeschichten",
    displayName: "Alltagsgeschichten",
    description: "Everyday life stories from Vienna",
    culturalSignificance: "Based on the documentary tradition of Elizabeth T. Spira's 'Alltagsgeschichten,' this theme captures authentic Viennese daily life, speech patterns, and social interactions that reflect the real experience of living in Vienna.",
    imageUrl: "/images/vienna/alltag.jpg",
    keyVocabulary: [
      {
        austrianGerman: "Jause",
        english: "snack, light meal",
        pronunciation: "YAU-ze",
        usage: "Traditional Austrian term for afternoon snack or light meal",
        formality: "informal",
        category: "food-drink"
      },
      {
        austrianGerman: "Semmel",
        standardGerman: "Brötchen",
        english: "bread roll",
        pronunciation: "ZEM-mel",
        usage: "Austrian term for bread roll",
        formality: "neutral",
        category: "food-drink"
      },
      {
        austrianGerman: "Sackerl",
        standardGerman: "Tüte",
        english: "small bag",
        pronunciation: "ZACK-erl",
        usage: "Austrian diminutive for bag, very commonly used",
        formality: "informal",
        category: "general"
      },
      {
        austrianGerman: "Grätzl",
        english: "neighborhood",
        pronunciation: "GRET-tsel",
        usage: "Viennese term for a small neighborhood or district area",
        formality: "informal",
        category: "general"
      }
    ],
    readingTexts: [
      {
        id: "wien-alltag",
        title: "Ein typischer Tag in Wien",
        difficulty: "easy",
        textType: "opinion",
        content: "Mein Alltag in Wien beginnt meist früh. Um sieben Uhr gehe ich zur Bäckerei und hole meine gewohnten Semmeln. Die Verkäuferin kennt mich schon und fragt: 'Die üblichen zwei Kaisersemmeln?' Nach dem Frühstück fahre ich mit der U-Bahn ins Büro. Wien hat ein fantastisches öffentliches Verkehrssystem – man kommt überall hin. Zu Mittag gehe ich oft ins Gasthaus um die Ecke. Dort gibt es typisch österreichische Küche zu fairen Preisen. Am Nachmittag, nach der Arbeit, treffe ich mich manchmal mit Freunden auf einen Kaffee. Das gehört zur Wiener Lebensart dazu. Am Abend spaziere ich gerne durch mein Grätzl und beobachte das Leben auf der Straße. Wien ist eine Stadt, die man zu Fuß entdecken muss.",
        wordCount: 132,
        keyGrammarFocus: ["Modalverben", "Temporale Adverbien", "Lokale Präpositionen"],
        culturalContext: "Describes a typical day in Vienna from a resident's perspective, showing daily routines and local customs."
      }
    ],
    listeningScenarios: [
      {
        id: "bakery-visit",
        title: "Beim Bäcker",
        scenario: "Daily visit to the local bakery with familiar staff interaction",
        difficulty: "easy",
        speakers: 2,
        accent: "viennese",
        duration: 60,
        context: "Routine interaction between customer and shop staff"
      }
    ],
    grammarContexts: [
      {
        grammaticalStructure: "Modalverben für Gewohnheiten",
        explanation: "Modal verbs expressing habits and routines in daily life",
        viennaExample: "Ich muss jeden Morgen zur Bäckerei gehen.",
        translation: "I have to go to the bakery every morning.",
        difficulty: "easy"
      }
    ],
    culturalNotes: [
      {
        title: "Viennese Daily Rhythms",
        content: "Vienna has distinct daily rhythms: early morning bakery visits, substantial lunch breaks, afternoon coffee culture, and evening neighborhood strolls. Understanding these patterns helps integrate into Viennese life.",
        importance: "helpful",
        relatedVocabulary: ["Lebensrhythmus", "Mittagspause", "Feierabend"]
      }
    ]
  },
  {
    theme: "wiener-grant-schmaeh",
    displayName: "Wiener Grant & Schmäh",
    description: "The characteristic Viennese personality traits of grumpiness and charm",
    culturalSignificance: "'Wiener Grant' (Viennese grumpiness) and 'Wiener Schmäh' (Viennese charm/humor) are considered quintessential Viennese characteristics. Understanding these cultural traits is essential for navigating social interactions in Vienna.",
    imageUrl: "/images/vienna/schmaeh.jpg",
    keyVocabulary: [
      {
        austrianGerman: "Grant",
        english: "grumpiness, sulkiness",
        pronunciation: "grant",
        usage: "Characteristic Viennese bad mood or complaint",
        formality: "informal",
        category: "culture"
      },
      {
        austrianGerman: "Schmäh",
        english: "charm, humor, wit",
        pronunciation: "shmay",
        usage: "Uniquely Viennese form of humor, often ironic or self-deprecating",
        formality: "informal",
        category: "culture"
      },
      {
        austrianGerman: "Grant haben",
        english: "to be in a bad mood",
        pronunciation: "grant HAH-ben",
        usage: "To be grumpy or dissatisfied, typical Viennese expression",
        formality: "informal",
        category: "culture"
      },
      {
        austrianGerman: "Schmäh führen",
        english: "to chat charmingly",
        pronunciation: "shmay FÜH-ren",
        usage: "To engage in charming, witty conversation",
        formality: "informal",
        category: "culture"
      }
    ],
    readingTexts: [
      {
        id: "grant-und-schmaeh",
        title: "Grant und Schmäh: Die Wiener Seele verstehen",
        difficulty: "medium",
        textType: "opinion",
        content: "Der Wiener Grant ist weltberühmt – diese besondere Art des Unzufriedenseins, die paradoxerweise sympathisch wirkt. 'Es könnte schöner sein', sagt der Wiener, auch wenn gerade die Sonne scheint. Doch hinter dem Grant versteckt sich oft der Schmäh – jene charmante Art des Wieners, mit Ironie und Selbstironie durchs Leben zu gehen. Der echte Wiener Schmäh ist niemals verletzend, sondern verbindet Menschen. Er zeigt sich in der Art, wie ein Kellner im Kaffeehaus die Bestellung aufnimmt, oder wie Nachbarn miteinander reden. Grant und Schmäh gehören zusammen wie die zwei Seiten einer Medaille. Sie machen den Wiener menschlich und authentisch. Touristen verstehen oft nicht, dass der grantige Wiener eigentlich herzlich ist – man muss nur den Code knacken.",
        wordCount: 141,
        keyGrammarFocus: ["Konjunktiv II", "Modalpartikeln", "Indirekte Charakterisierung"],
        culturalContext: "Explains the paradoxical nature of Viennese personality traits and how they function in social interactions."
      }
    ],
    listeningScenarios: [
      {
        id: "cafe-grant",
        title: "Grant im Kaffeehaus",
        scenario: "A waiter displays typical Viennese 'Grant' while serving customers",
        difficulty: "medium",
        speakers: 2,
        accent: "viennese",
        duration: 120,
        context: "Service interaction showcasing cultural personality traits"
      }
    ],
    grammarContexts: [
      {
        grammaticalStructure: "Modalpartikeln für Wiener Grant",
        explanation: "Modal particles like 'halt', 'eh', 'ja' express typical Viennese attitudes",
        viennaExample: "Das ist halt so, kann man eh nix machen.",
        translation: "That's just how it is, can't do anything about it anyway.",
        difficulty: "medium"
      }
    ],
    culturalNotes: [
      {
        title: "Understanding Viennese Irony",
        content: "Viennese humor often employs understatement and irony. What might sound negative is often actually affectionate. Learning to read between the lines is crucial for understanding Viennese social interactions.",
        importance: "essential",
        relatedVocabulary: ["Ironie", "Untertreibung", "zwischen den Zeilen lesen"]
      }
    ]
  },
  {
    theme: "fiaker",
    displayName: "Fiaker",
    description: "Vienna's traditional horse-drawn carriages",
    culturalSignificance: "Fiaker have been part of Vienna's cityscape since the late 17th century. These horse-drawn carriages, originally from French 'fiacre,' represent Vienna's connection to its imperial past and continue to be a popular tourist attraction and city symbol.",
    imageUrl: "/images/vienna/fiaker.jpg",
    keyVocabulary: [
      {
        austrianGerman: "Fiaker",
        english: "horse-drawn carriage",
        pronunciation: "fee-AH-ker",
        usage: "Traditional Viennese horse-drawn carriage for tourism",
        formality: "neutral",
        category: "culture"
      },
      {
        austrianGerman: "Fiakerkutsche",
        english: "carriage coach",
        pronunciation: "fee-AH-ker-kut-she",
        usage: "The actual carriage part of the Fiaker",
        formality: "neutral",
        category: "culture"
      },
      {
        austrianGerman: "Melonenhut",
        standardGerman: "Bowler Hut",
        english: "bowler hat",
        pronunciation: "me-LOH-nen-hoot",
        usage: "Traditional hat worn by Fiaker drivers",
        formality: "formal",
        category: "culture"
      }
    ],
    readingTexts: [
      {
        id: "fiaker-geschichte",
        title: "Die Geschichte der Wiener Fiaker",
        difficulty: "medium",
        textType: "article",
        content: "Die Geschichte der Wiener Fiaker beginnt im Jahr 1693, als die ersten Mietdroschken durch die Straßen der Kaiserstadt fuhren. Der Name 'Fiaker' stammt vom französischen 'fiacre', benannt nach dem Heiligen Fiacrius, dessen Bildnis an den ersten Pariser Mietdroschken hing. In Wien entwickelte sich der Fiaker zu einem Symbol der k.u.k. Monarchie. Die Kutscher trugen traditionell einen Melonenhut und einen dunklen Gehrock. Heute gibt es noch etwa 20 lizenzierte Fiaker in Wien, die hauptsächlich Touristen durch die Innenstadt kutschieren. Die Routen führen vorbei an der Hofburg, dem Stephansdom und der Ringstraße. Obwohl sie ein touristisches Angebot sind, bleiben die Fiaker ein authentisches Stück Wiener Geschichte und Kultur.",
        wordCount: 131,
        keyGrammarFocus: ["Präteritum", "Ortsangaben", "Obwohl-Sätze"],
        culturalContext: "Historical overview of Vienna's Fiaker tradition from imperial times to modern tourism."
      }
    ],
    listeningScenarios: [
      {
        id: "fiaker-tour",
        title: "Fiaker-Rundfahrt",
        scenario: "Tourist takes a Fiaker tour with commentary about Vienna's sights",
        difficulty: "medium",
        speakers: 2,
        accent: "standard",
        duration: 240,
        context: "Tourist service with historical commentary"
      }
    ],
    grammarContexts: [
      {
        grammaticalStructure: "Lokale Präpositionen für Stadtrundfahrt",
        explanation: "Prepositions of place and direction for describing city tour routes",
        viennaExample: "Wir fahren vorbei an der Hofburg zur Ringstraße entlang.",
        translation: "We drive past the Hofburg along the Ringstraße.",
        difficulty: "medium"
      }
    ],
    culturalNotes: [
      {
        title: "Fiaker Regulations and Traditions",
        content: "Fiaker drivers must have special licenses and follow strict regulations. They traditionally wore bowler hats and dark coats, a tradition many maintain today. The horses have specific rest requirements and routes are regulated by the city.",
        importance: "interesting",
        relatedVocabulary: ["Lizenz", "Kutscherlizenz", "Pferderuhe"]
      }
    ]
  }
];

export function getViennaThemeByName(theme: "wiener-wohnen" | "heurigenkultur" | "kaffeehauskultur" | "alltagsgeschichten" | "wiener-grant-schmaeh" | "fiaker"): ViennaThemeContent | undefined {
  return viennaThemes.find(t => t.theme === theme);
}

export function getAllViennaThemes(): ViennaThemeContent[] {
  return viennaThemes;
}

export function getVocabularyByTheme(theme: string): ViennaVocabularyItem[] {
  const themeContent = viennaThemes.find(t => t.theme === theme);
  return themeContent?.keyVocabulary || [];
}

export function getReadingTextsByTheme(theme: string): ViennaReadingText[] {
  const themeContent = viennaThemes.find(t => t.theme === theme);
  return themeContent?.readingTexts || [];
}

export function getCulturalNotesByImportance(importance: "essential" | "helpful" | "interesting"): CulturalNote[] {
  return viennaThemes
    .flatMap(theme => theme.culturalNotes)
    .filter(note => note.importance === importance);
} 