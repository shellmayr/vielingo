'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';
import { ComplexGrammarContent, GrammarQuestion } from '@/data/exercises';
import { getViennaThemeByName } from '@/data/vienna-content';

interface AdvancedGrammarExerciseProps {
  content: ComplexGrammarContent;
  vienneseTheme?: string;
  onComplete: (score: number, answers: GrammarAnswer[]) => void;
  onProgress?: (progress: number) => void;
}

interface GrammarAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export default function AdvancedGrammarExercise({
  content,
  vienneseTheme,
  onComplete,
  onProgress
}: AdvancedGrammarExerciseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<GrammarAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const themeContent = vienneseTheme ? getViennaThemeByName(vienneseTheme as any) : null;

  const currentQuestion = content.questions[currentQuestionIndex];
  const totalQuestions = content.questions.length;
  const progress = ((currentQuestionIndex + (selectedAnswer ? 1 : 0)) / totalQuestions) * 100;

  useEffect(() => {
    if (onProgress) {
      onProgress(progress);
    }
  }, [progress, onProgress]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newAnswer: GrammarAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
    } else {
      setIsComplete(true);
      const correctAnswers = updatedAnswers.filter(answer => answer.isCorrect).length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      setTimeout(() => {
        setShowResults(true);
        onComplete(score, updatedAnswers);
      }, 1000);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const previousAnswer = userAnswers[currentQuestionIndex - 1];
      setSelectedAnswer(previousAnswer?.selectedAnswer || '');
    }
  };

  const resetExercise = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer('');
    setShowResults(false);
    setIsComplete(false);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
  };

  const getGrammarTypeIcon = (type: ComplexGrammarContent['grammarType']) => {
    switch (type) {
      case 'subjunctive': return '🎭';
      case 'passive-voice': return '🔄';
      case 'complex-conjunctions': return '🔗';
      case 'advanced-cases': return '📐';
      default: return '📚';
    }
  };

  const renderResults = () => {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const averageTime = userAnswers.reduce((sum, answer) => sum + answer.timeSpent, 0) / userAnswers.length / 1000;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{score}%</div>
          <p className="text-gray-600 text-sm">
            {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{Math.round(averageTime)}s</div>
            <p className="text-xs text-gray-600">Average per question</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{content.grammarType}</div>
            <p className="text-xs text-gray-600">Grammar focus</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-base font-semibold">Question Review</h3>
          {content.questions.map((question, index) => {
            const userAnswer = userAnswers.find(answer => answer.questionId === question.id);
            const isCorrect = userAnswer?.isCorrect;
            
            return (
              <div key={question.id} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-sm font-medium">Question {index + 1}:</span>
                      <p className="text-sm mt-1">{question.question}</p>
                    </div>
                    
                    {question.context && (
                      <div className="mb-2 p-2 bg-gray-50 rounded text-xs">
                        <span className="font-medium">Context:</span> {question.context}
                      </div>
                    )}

                    <div className="space-y-1 mb-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`text-xs p-2 rounded ${
                            option === question.correctAnswer
                              ? 'bg-green-100 text-green-800 font-medium'
                              : option === userAnswer?.selectedAnswer && !isCorrect
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-50'
                          }`}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                          {option === question.correctAnswer && ' ✓'}
                          {option === userAnswer?.selectedAnswer && !isCorrect && ' ✗'}
                        </div>
                      ))}
                    </div>
                    
                    {question.explanation && (
                      <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                        <p><span className="font-medium">Explanation:</span> {question.explanation}</p>
                      </div>
                    )}

                    {question.culturalNote && (
                      <div className="mt-2 p-3 bg-amber-50 rounded text-sm">
                        <p><span className="font-medium">Cultural Note:</span> {question.culturalNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {vienneseTheme && themeContent && (
          <div className="mt-4 p-3 bg-amber-50 rounded-lg">
            <h4 className="font-semibold text-sm text-amber-800 mb-1">Cultural Context</h4>
            <p className="text-xs text-amber-700">{themeContent.description}</p>
          </div>
        )}

        <div className="flex justify-center space-x-2 pt-2">
          <Button onClick={resetExercise} variant="outline" size="sm">
            <RotateCcw className="w-3 h-3 mr-1" />
            Try Again
          </Button>
        </div>
      </div>
    );
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Advanced Grammar Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderResults()}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <BookOpen className="w-4 h-4" />
              <span>Advanced Grammar</span>
              {vienneseTheme && themeContent && (
                <Badge variant="outline" className="text-xs">{themeContent.displayName}</Badge>
              )}
            </CardTitle>
            <div className="flex items-center space-x-3">
              <span className="text-base">{getGrammarTypeIcon(content.grammarType)}</span>
              <Badge variant="outline" className="text-xs">
                {content.grammarType.replace('-', ' ')}
              </Badge>
              <div className="text-xs text-gray-500">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(progress)}% complete
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold mb-2">
                Question {currentQuestionIndex + 1}
              </h3>
              <p className="text-sm mb-3">{currentQuestion.question}</p>
              
              {currentQuestion.context && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-700">
                    <span className="font-medium">Context:</span> {currentQuestion.context}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Choose the correct answer:</h4>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-3 border rounded-lg transition-all ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-xs font-medium text-gray-500 mt-0.5">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-sm">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {currentQuestion.hint && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-yellow-800">Hint:</p>
                    <p className="text-xs text-yellow-700">{currentQuestion.hint}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              size="sm"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>

          {isComplete && !showResults && (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
              <h3 className="text-base font-semibold text-green-800 mb-1">Exercise Complete!</h3>
              <p className="text-sm text-green-700">Calculating your results...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cultural Context */}
      {vienneseTheme && themeContent && (
        <Card className="mt-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cultural Context</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-gray-700">{themeContent.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 