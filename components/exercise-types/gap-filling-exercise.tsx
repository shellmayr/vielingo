"use client"

import { useState, useEffect } from "react"
import { Exercise, GapFillingSentence } from "@/data/exercises"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"

interface GapFillingExerciseProps {
  exercise: Exercise
}

export function GapFillingExercise({ exercise }: GapFillingExerciseProps) {
  const [activeTab, setActiveTab] = useState<"vocabulary" | "practice">("vocabulary")
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [correctAnswers, setCorrectAnswers] = useState<Record<number, boolean[]>>({})
  const [showTranslations, setShowTranslations] = useState<Record<number, boolean>>({})
  const [availableWords, setAvailableWords] = useState<Record<number, string[]>>({})
  const [showHints, setShowHints] = useState<Record<number, boolean>>({})
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({})
  
  const sentences = exercise.content?.gapFillingSentences || []

  // Initialize the available words for each sentence
  useEffect(() => {
    const initialAvailableWords: Record<number, string[]> = {};
    sentences.forEach((sentence, index) => {
      const correctWords = [...sentence.missingWords];
      const distractors = sentence.distractorWords || [];
      
      // Combine correct words and distractors, then shuffle
      initialAvailableWords[index] = [...correctWords, ...distractors].sort(() => Math.random() - 0.5);
    });
    setAvailableWords(initialAvailableWords);
  }, [sentences]);

  // Extract gaps from a sentence
  const extractGaps = (sentence: string): number => {
    return (sentence.match(/\[gap\]/g) || []).length;
  };

  // Handle word selection
  const selectWord = (sentenceIndex: number, word: string) => {
    if (checkedAnswers[sentenceIndex]) return;
    
    // Add word to the answer
    const currentAnswers = answers[sentenceIndex] || [];
    const currentAvailableWords = [...(availableWords[sentenceIndex] || [])];
    
    // Only add if there are still gaps to fill
    if (currentAnswers.length < extractGaps(sentences[sentenceIndex].sentence)) {
      const wordIndex = currentAvailableWords.indexOf(word);
      if (wordIndex !== -1) {
        currentAvailableWords.splice(wordIndex, 1);
        
        setAnswers({
          ...answers,
          [sentenceIndex]: [...currentAnswers, word]
        });
        
        setAvailableWords({
          ...availableWords,
          [sentenceIndex]: currentAvailableWords
        });
      }
    }
  };

  // Remove a word from the answer
  const removeWord = (sentenceIndex: number, wordIndex: number) => {
    if (checkedAnswers[sentenceIndex]) return;
    
    const currentAnswers = [...(answers[sentenceIndex] || [])];
    const currentAvailableWords = [...(availableWords[sentenceIndex] || [])];
    
    const removedWord = currentAnswers[wordIndex];
    currentAnswers.splice(wordIndex, 1);
    
    setAnswers({
      ...answers,
      [sentenceIndex]: currentAnswers
    });
    
    setAvailableWords({
      ...availableWords,
      [sentenceIndex]: [...currentAvailableWords, removedWord]
    });
  };

  // Shuffle the available words
  const shuffleWords = (sentenceIndex: number) => {
    if (checkedAnswers[sentenceIndex]) return;
    
    const currentAvailableWords = [...(availableWords[sentenceIndex] || [])];
    currentAvailableWords.sort(() => Math.random() - 0.5);
    
    setAvailableWords({
      ...availableWords,
      [sentenceIndex]: currentAvailableWords
    });
  };

  // Check answers for a sentence
  const checkAnswers = (sentenceIndex: number) => {
    const sentence = sentences[sentenceIndex];
    const userAnswers = answers[sentenceIndex] || [];
    const expectedAnswers = sentence.missingWords;
    
    // Check each answer
    const results = userAnswers.map((answer, index) => 
      answer.toLowerCase() === expectedAnswers[index].toLowerCase()
    );
    
    setCorrectAnswers({
      ...correctAnswers,
      [sentenceIndex]: results
    });
    
    setCheckedAnswers({
      ...checkedAnswers,
      [sentenceIndex]: true
    });
  };

  // Reset a sentence
  const resetSentence = (sentenceIndex: number) => {
    const sentence = sentences[sentenceIndex];
    
    setAnswers({
      ...answers,
      [sentenceIndex]: []
    });
    
    // Include both correct words and distractors
    const correctWords = [...sentence.missingWords];
    const distractors = sentence.distractorWords || [];
    
    setAvailableWords({
      ...availableWords,
      [sentenceIndex]: [...correctWords, ...distractors].sort(() => Math.random() - 0.5)
    });
    
    setCorrectAnswers({
      ...correctAnswers,
      [sentenceIndex]: []
    });
    
    setCheckedAnswers({
      ...checkedAnswers,
      [sentenceIndex]: false
    });
  };

  // Toggle showing a hint
  const toggleHint = (sentenceIndex: number) => {
    setShowHints({
      ...showHints,
      [sentenceIndex]: !showHints[sentenceIndex]
    });
  };

  // Toggle showing translations
  const toggleTranslation = (sentenceIndex: number) => {
    setShowTranslations({
      ...showTranslations,
      [sentenceIndex]: !showTranslations[sentenceIndex]
    });
  };

  // Render a sentence with gaps filled by user answers
  const renderSentenceWithAnswers = (sentence: GapFillingSentence, sentenceIndex: number) => {
    const userAnswers = answers[sentenceIndex] || [];
    const isChecked = checkedAnswers[sentenceIndex];
    const answerResults = correctAnswers[sentenceIndex] || [];
    
    let filledSentence = sentence.sentence;
    userAnswers.forEach((answer, index) => {
      const className = isChecked
        ? answerResults[index]
          ? "inline-block px-1 py-0.5 mx-0.5 bg-green-100 border border-green-300 rounded text-green-800"
          : "inline-block px-1 py-0.5 mx-0.5 bg-red-100 border border-red-300 rounded text-red-800"
        : "inline-block px-1 py-0.5 mx-0.5 bg-tan-light/20 border border-tan-light/40 rounded";
      
      // Replace the first [gap] with the user's answer
      filledSentence = filledSentence.replace("[gap]", `<span class="${className}">${answer}</span>`);
    });
    
    // Replace any remaining [gap]s with empty placeholders
    const emptyGapClass = "inline-block min-w-16 h-6 mx-0.5 border border-dashed border-sage-dark/30 rounded";
    filledSentence = filledSentence.replace(/\[gap\]/g, `<span class="${emptyGapClass}"></span>`);
    
    return (
      <div 
        className="text-sage-dark text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: filledSentence }}
      />
    );
  };

  const getButtonClass = (isActive: boolean) => {
    return isActive
      ? "bg-tan-light text-white font-medium py-2 px-4 rounded"
      : "bg-cream text-sage-dark hover:bg-sage-light/30 font-medium py-2 px-4 rounded"
  };

  return (
    <div className="space-y-8">
      {/* Exercise image and introduction */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="w-64 h-64 relative rounded-xl shadow-md overflow-hidden">
            <img 
              src={exercise.imageUrl} 
              alt={exercise.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 bg-cream/50 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-sage-dark mb-3">{exercise.title}</h2>
          <p className="text-lg">{exercise.content?.introduction}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 py-4">
        <button
          onClick={() => setActiveTab("vocabulary")}
          className={getButtonClass(activeTab === "vocabulary")}
        >
          Transport Vocabulary
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={getButtonClass(activeTab === "practice")}
        >
          Gap Filling
        </button>
      </div>

      {/* Transport Vocabulary */}
      {activeTab === "vocabulary" && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-sage-dark">Transport Vocabulary</h3>
          <p className="text-sage-dark/80">Learn key vocabulary for transportation and directions in German.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercise.content?.vocabularyItems?.map((item, index) => (
              <div key={index} className="bg-cream rounded-xl overflow-hidden shadow-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-sage-dark">{item.german}</h4>
                    <p className="text-sage-dark/80 text-sm">{item.english}</p>
                    {item.pronunciation && (
                      <p className="text-sage-dark/70 text-sm">[{item.pronunciation}]</p>
                    )}
                  </div>
                  {item.formal !== undefined && (
                    <Badge variant={item.formal ? "blue" : "green"}>
                      {item.formal ? "Formal" : "Informal"}
                    </Badge>
                  )}
                </div>
                {item.context && (
                  <p className="text-sage-dark/80 mt-3 text-sm border-t border-sage-light/20 pt-2">{item.context}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gap Filling Practice */}
      {activeTab === "practice" && (
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-sage-dark">Gap Filling</h3>
          <p className="text-sage-dark/80">Fill in the gaps to complete the German sentences related to transport and directions.</p>
          
          {sentences.map((sentence, sentenceIndex) => (
            <div key={sentenceIndex} className="bg-cream rounded-xl p-6 shadow-md space-y-4">
              {/* Sentence with gaps */}
              <div className="mb-2">
                {renderSentenceWithAnswers(sentence, sentenceIndex)}
              </div>

              {/* Translation - shown when button is clicked */}
              {showTranslations[sentenceIndex] && sentence.translations && (
                <div className="bg-sage-light/10 p-3 rounded-lg text-sage-dark/80 italic">
                  <p>{sentence.translations.english}</p>
                  {checkedAnswers[sentenceIndex] && (
                    <p className="mt-1 font-medium text-sage-dark">{sentence.translations.germanComplete}</p>
                  )}
                </div>
              )}

              {/* Hint - shown when button is clicked */}
              {showHints[sentenceIndex] && sentence.hint && (
                <div className="bg-tan-light/10 p-3 rounded-lg text-sage-dark/80">
                  <p><span className="font-medium">Hint:</span> {sentence.hint}</p>
                </div>
              )}

              {/* User selected words */}
              <div className="flex flex-wrap gap-2 min-h-10 items-center">
                {(answers[sentenceIndex] || []).map((word, wordIndex) => (
                  <button
                    key={wordIndex}
                    className={`px-3 py-1 rounded-md text-white ${
                      checkedAnswers[sentenceIndex]
                        ? correctAnswers[sentenceIndex]?.[wordIndex] 
                          ? "bg-green-600" 
                          : "bg-red-600"
                        : "bg-tan-light"
                    }`}
                    onClick={() => removeWord(sentenceIndex, wordIndex)}
                    disabled={checkedAnswers[sentenceIndex]}
                  >
                    {word}
                  </button>
                ))}
              </div>

              {/* Available words */}
              <div className="pt-2 border-t border-sage-light/20">
                <div className="flex flex-wrap gap-2 items-center">
                  {(availableWords[sentenceIndex] || []).map((word, wordIndex) => (
                    <button
                      key={wordIndex}
                      className="px-3 py-1 rounded-md bg-white border border-sage-light/40 text-sage-dark hover:bg-sage-light/10"
                      onClick={() => selectWord(sentenceIndex, word)}
                      disabled={checkedAnswers[sentenceIndex]}
                    >
                      {word}
                    </button>
                  ))}
                  {(availableWords[sentenceIndex] || []).length > 0 && (
                    <button
                      className="p-1 rounded-md bg-white border border-sage-light/40 text-sage-dark hover:bg-sage-light/10"
                      onClick={() => shuffleWords(sentenceIndex)}
                      disabled={checkedAnswers[sentenceIndex]}
                      title="Shuffle words"
                    >
                      <Shuffle size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                {!checkedAnswers[sentenceIndex] ? (
                  <>
                    <Button
                      onClick={() => checkAnswers(sentenceIndex)}
                      disabled={(answers[sentenceIndex] || []).length !== extractGaps(sentence.sentence)}
                      className="bg-tan-light text-white hover:bg-tan"
                    >
                      Check Answers
                    </Button>
                    <Button
                      onClick={() => resetSentence(sentenceIndex)}
                      variant="outline"
                      className="border-sage-light/40 text-sage-dark hover:bg-sage-light/10"
                      disabled={(answers[sentenceIndex] || []).length === 0}
                    >
                      Reset
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => resetSentence(sentenceIndex)}
                    className="bg-tan-light text-white hover:bg-tan"
                  >
                    Try Again
                  </Button>
                )}
                <Button
                  onClick={() => toggleHint(sentenceIndex)}
                  variant="outline"
                  className="border-sage-light/40 text-sage-dark hover:bg-sage-light/10"
                >
                  {showHints[sentenceIndex] ? "Hide Hint" : "Show Hint"}
                </Button>
                <Button
                  onClick={() => toggleTranslation(sentenceIndex)}
                  variant="outline"
                  className="border-sage-light/40 text-sage-dark hover:bg-sage-light/10"
                >
                  {showTranslations[sentenceIndex] ? "Hide Translation" : "Show Translation"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 