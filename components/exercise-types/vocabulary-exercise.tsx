"use client"

import { useState } from "react"
import { Exercise, VocabularyItem } from "@/data/exercises"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface VocabularyExerciseProps {
  exercise: Exercise
}

export function VocabularyExercise({ exercise }: VocabularyExerciseProps) {
  const [activeTab, setActiveTab] = useState<"vocabulary" | "practice" | "quiz">("vocabulary")
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  const [selectedScenarioAnswers, setSelectedScenarioAnswers] = useState<Record<number, string>>({})
  const [scenarioSubmitted, setScenarioSubmitted] = useState<Record<number, boolean>>({})
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({})

  const vocabularyItems = exercise.content?.vocabularyItems || []
  const practiceScenarios = exercise.content?.practiceScenarios || []
  const quizQuestions = exercise.content?.quizQuestions || []

  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const selectScenarioAnswer = (scenarioIndex: number, answer: string) => {
    if (scenarioSubmitted[scenarioIndex]) return

    setSelectedScenarioAnswers(prev => ({
      ...prev,
      [scenarioIndex]: answer
    }))
  }

  const submitScenarioAnswer = (scenarioIndex: number) => {
    setScenarioSubmitted(prev => ({
      ...prev,
      [scenarioIndex]: true
    }))
  }

  const selectQuizAnswer = (questionIndex: number, answer: string) => {
    if (quizSubmitted[questionIndex]) return

    setSelectedQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const submitQuizAnswer = (questionIndex: number) => {
    setQuizSubmitted(prev => ({
      ...prev,
      [questionIndex]: true
    }))
  }

  const resetAllAnswers = () => {
    setSelectedScenarioAnswers({})
    setScenarioSubmitted({})
    setSelectedQuizAnswers({})
    setQuizSubmitted({})
    setFlippedCards({})
  }

  const getButtonClass = (isActive: boolean) => {
    return isActive
      ? "bg-tan-light text-white font-medium py-2 px-4 rounded"
      : "bg-cream text-sage-dark hover:bg-sage-light/30 font-medium py-2 px-4 rounded"
  }

  return (
    <div className="space-y-8">
      {/* Exercise introduction */}
      <div className="bg-cream/50 p-6 rounded-xl">
        <p className="text-lg">{exercise.content?.introduction}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 py-4">
        <button
          onClick={() => { setActiveTab("vocabulary"); resetAllAnswers(); }}
          className={getButtonClass(activeTab === "vocabulary")}
        >
          Vocabulary
        </button>
        <button
          onClick={() => { setActiveTab("practice"); resetAllAnswers(); }}
          className={getButtonClass(activeTab === "practice")}
          disabled={practiceScenarios.length === 0}
        >
          Practice Scenarios
        </button>
        <button
          onClick={() => { setActiveTab("quiz"); resetAllAnswers(); }}
          className={getButtonClass(activeTab === "quiz")}
          disabled={quizQuestions.length === 0}
        >
          Quiz
        </button>
      </div>

      {/* Vocabulary Flashcards */}
      {activeTab === "vocabulary" && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-sage-dark">Vocabulary Flashcards</h3>
          <p className="text-sage-dark/80">Click on a card to see its translation and details.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vocabularyItems.map((item, index) => (
              <div
                key={index}
                className={`bg-cream rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-500 transform ${
                  flippedCards[index] ? "bg-sage-light/20" : ""
                }`}
                style={{ height: "180px" }}
                onClick={() => toggleCardFlip(index)}
              >
                <div className="relative h-full">
                  <div className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-500 ${
                    flippedCards[index] ? "opacity-0" : "opacity-100"
                  }`}>
                    <div>
                      <h3 className="text-2xl font-winky text-sage-dark">{item.german}</h3>
                      {item.pronunciation && (
                        <p className="text-sage-dark/70 mt-1">[{item.pronunciation}]</p>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      {item.formal !== undefined && (
                        <Badge variant={item.formal ? "blue" : "green"}>
                          {item.formal ? "Formal" : "Informal"}
                        </Badge>
                      )}
                      <div className="text-tan text-sm">Click to flip</div>
                    </div>
                  </div>
                  
                  <div className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-500 ${
                    flippedCards[index] ? "opacity-100" : "opacity-0"
                  }`}>
                    <div>
                      <h3 className="text-xl font-medium text-sage-dark">{item.english}</h3>
                      {item.context && (
                        <p className="text-sage-dark/80 mt-2">{item.context}</p>
                      )}
                    </div>
                    <div className="flex justify-end items-center">
                      <div className="text-tan text-sm">Click to flip back</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice Scenarios */}
      {activeTab === "practice" && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-sage-dark">Practice Scenarios</h3>
          <p className="text-sage-dark/80">Choose the most appropriate response for each scenario.</p>
          
          <div className="space-y-8">
            {practiceScenarios.map((scenario, index) => (
              <div key={index} className="bg-cream rounded-xl p-6 shadow-md">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-sage-light/30 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage-dark" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-sage-dark">{scenario.situation}</p>
                      <p className="mt-2 text-sage-dark/80">{scenario.question}</p>
                    </div>
                  </div>
                  
                  <div className="pl-10 space-y-3">
                    {scenario.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className={`block w-full text-left p-3 rounded-lg transition-colors ${
                          selectedScenarioAnswers[index] === option
                            ? scenarioSubmitted[index]
                              ? option === scenario.correctAnswer
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                              : "bg-tan-light/20 text-sage-dark"
                            : "bg-white text-sage-dark hover:bg-sage-light/10"
                        }`}
                        onClick={() => selectScenarioAnswer(index, option)}
                        disabled={scenarioSubmitted[index]}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {!scenarioSubmitted[index] ? (
                    <div className="pl-10">
                      <button
                        className="bg-tan-light text-white py-2 px-4 rounded disabled:opacity-50"
                        onClick={() => submitScenarioAnswer(index)}
                        disabled={!selectedScenarioAnswers[index]}
                      >
                        Check Answer
                      </button>
                    </div>
                  ) : (
                    <div className="pl-10 mt-4 bg-sage-light/20 p-4 rounded-lg">
                      <p className="font-medium text-sage-dark">
                        {selectedScenarioAnswers[index] === scenario.correctAnswer
                          ? "Correct! 👏"
                          : "Not quite right 🤔"}
                      </p>
                      <p className="mt-2 text-sage-dark/80">{scenario.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Questions */}
      {activeTab === "quiz" && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-sage-dark">Quiz</h3>
          <p className="text-sage-dark/80">Test your knowledge of German greetings.</p>
          
          <div className="space-y-8">
            {quizQuestions.map((question, index) => (
              <div key={index} className="bg-cream rounded-xl p-6 shadow-md">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-sage-dark">{question.question}</h4>
                  
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className={`block w-full text-left p-3 rounded-lg transition-colors ${
                          selectedQuizAnswers[index] === option
                            ? quizSubmitted[index]
                              ? option === question.correctAnswer
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                              : "bg-tan-light/20 text-sage-dark"
                            : "bg-white text-sage-dark hover:bg-sage-light/10"
                        }`}
                        onClick={() => selectQuizAnswer(index, option)}
                        disabled={quizSubmitted[index]}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {!quizSubmitted[index] ? (
                    <div>
                      <button
                        className="bg-tan-light text-white py-2 px-4 rounded disabled:opacity-50"
                        onClick={() => submitQuizAnswer(index)}
                        disabled={!selectedQuizAnswers[index]}
                      >
                        Submit Answer
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 bg-sage-light/20 p-4 rounded-lg">
                      <p className="font-medium text-sage-dark">
                        {selectedQuizAnswers[index] === question.correctAnswer
                          ? "Correct! 👏"
                          : "Not quite right 🤔"}
                      </p>
                      <p className="mt-2 text-sage-dark/80">{question.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 