"use client"

import { useState } from "react"
import { Exercise, PracticeScenario, QuizQuestion, GrammarRule } from "@/data/exercises"
import { Badge } from "@/components/ui/badge"

interface GrammarExerciseProps {
  exercise: Exercise
}

export function GrammarExercise({ exercise }: GrammarExerciseProps) {
  const [activeTab, setActiveTab] = useState<"rules" | "practice" | "quiz">("rules")
  const [selectedScenarioAnswers, setSelectedScenarioAnswers] = useState<Record<number, string>>({})
  const [scenarioSubmitted, setScenarioSubmitted] = useState<Record<number, boolean>>({})
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({})

  // Access the grammar content from the exercise
  const grammarRules = exercise.content?.grammarRules || []
  const practiceScenarios = exercise.content?.practiceScenarios || []
  const quizQuestions = exercise.content?.quizQuestions || []

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
          onClick={() => { setActiveTab("rules"); resetAllAnswers(); }}
          className={getButtonClass(activeTab === "rules")}
        >
          Grammar Rules
        </button>
        <button
          onClick={() => { setActiveTab("practice"); resetAllAnswers(); }}
          className={getButtonClass(activeTab === "practice")}
          disabled={practiceScenarios.length === 0}
        >
          Practice Sentences
        </button>
        <button
          onClick={() => { setActiveTab("quiz"); resetAllAnswers(); }}
          className={getButtonClass(activeTab === "quiz")}
          disabled={quizQuestions.length === 0}
        >
          Quiz
        </button>
      </div>

      {/* Grammar Rules */}
      {activeTab === "rules" && (
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-sage-dark">Grammar Rules</h3>
          <p className="text-sage-dark/80">Learn the structure and patterns of German grammar.</p>
          
          <div className="space-y-10">
            {grammarRules.map((rule, ruleIndex) => (
              <div key={ruleIndex} className="bg-cream rounded-xl p-6 shadow-md">
                <h4 className="text-lg font-winky text-sage-dark mb-3">{rule.title}</h4>
                <p className="text-sage-dark/80 mb-5">{rule.explanation}</p>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-sage-dark">Examples:</h5>
                  <div className="space-y-4 pl-2">
                    {rule.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-white p-4 rounded-lg border border-sage-light/30">
                        <p className="font-medium text-sage-dark">{example.german}</p>
                        <p className="text-sage-dark/80 mt-1">{example.english}</p>
                        {example.note && (
                          <p className="text-tan-light mt-2 text-sm italic">{example.note}</p>
                        )}
                      </div>
                    ))}
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
          <h3 className="text-xl font-bold text-sage-dark">Practice Sentences</h3>
          <p className="text-sage-dark/80">Apply the grammar rules by selecting the correct form.</p>
          
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
          <p className="text-sage-dark/80">Test your understanding of these grammar concepts.</p>
          
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