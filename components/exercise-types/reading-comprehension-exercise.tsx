'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, BookOpen, Eye, EyeOff, Lightbulb, CheckCircle, XCircle, Info } from 'lucide-react';
import { ReadingComprehensionContent, ReadingQuestion, VocabularyItem } from '@/data/exercises';
import { getViennaThemeByName } from '@/data/vienna-content';

interface ReadingComprehensionExerciseProps {
  content: ReadingComprehensionContent;
  vienneseTheme?: string;
  onComplete: (score: number, answers: UserAnswer[]) => void;
  onProgress?: (progress: number) => void;
}

interface UserAnswer {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
  timeSpent: number;
}

interface HighlightedText {
  text: string;
  explanation: string;
  vocabularyItem?: VocabularyItem;
}

export default function ReadingComprehensionExercise({
  content,
  vienneseTheme,
  onComplete,
  onProgress
}: ReadingComprehensionExerciseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [readingTime, setReadingTime] = useState<number>(0);
  const [showVocabularyHelp, setShowVocabularyHelp] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<HighlightedText[]>([]);
  const [showTranslationHelp, setShowTranslationHelp] = useState(false);
  const [isTextRead, setIsTextRead] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const themeContent = vienneseTheme ? getViennaThemeByName(vienneseTheme as any) : null;

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  useEffect(() => {
    // Track reading progress
    if (onProgress) {
      const progress = ((currentQuestionIndex + (selectedAnswer ? 0.5 : 0)) / content.questions.length) * 100;
      onProgress(progress);
    }
  }, [currentQuestionIndex, selectedAnswer, content.questions.length, onProgress]);

  useEffect(() => {
    // Initialize highlighted words from vocabulary support
    if (content.vocabularySupport) {
      const highlights = content.vocabularySupport.map(item => ({
        text: item.german,
        explanation: `${item.english}${item.context ? ' - ' + item.context : ''}`,
        vocabularyItem: item
      }));
      setHighlightedWords(highlights);
    }
  }, [content.vocabularySupport]);

  const currentQuestion = content.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === content.questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newAnswer: UserAnswer = {
      questionIndex: currentQuestionIndex,
      answer: selectedAnswer,
      isCorrect,
      timeSpent
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Calculate final score
      const correctAnswers = updatedAnswers.filter(a => a.isCorrect).length;
      const score = Math.round((correctAnswers / content.questions.length) * 100);
      setShowResults(true);
      onComplete(score, updatedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    }
  };

  const handleTextRead = () => {
    if (!isTextRead) {
      setReadingTime(Date.now() - startTime);
      setIsTextRead(true);
    }
  };

  const renderHighlightedText = (text: string) => {
    if (!showVocabularyHelp || highlightedWords.length === 0) {
      return text;
    }

    let highlightedText = text;
    highlightedWords.forEach((highlight, index) => {
      const regex = new RegExp(`\\b${highlight.text}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<mark class="bg-yellow-200 cursor-pointer" data-highlight="${index}">${highlight.text}</mark>`);
    });

    return highlightedText;
  };

  const handleWordClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'MARK') {
      const highlightIndex = parseInt(target.getAttribute('data-highlight') || '0');
      const highlight = highlightedWords[highlightIndex];
      if (highlight) {
        // Show tooltip or modal with word explanation
        console.log('Word clicked:', highlight);
      }
    }
  };

  const getReadingTimeRecommendation = () => {
    const wordsPerMinute = 200; // Average reading speed for B2 level
    const recommendedMinutes = Math.ceil(content.wordCount / wordsPerMinute);
    return recommendedMinutes;
  };

  const getQuestionTypeIcon = (type: ReadingQuestion['type']) => {
    switch (type) {
      case 'multiple-choice':
        return '🔘';
      case 'true-false-not-given':
        return '✓✗?';
      case 'short-answer':
        return '✍️';
      default:
        return '❓';
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswer === option ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'true-false-not-given':
        const tfngOptions = ['True', 'False', 'Not Given'];
        return (
          <div className="space-y-3">
            {tfngOptions.map((option, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswer === option ? 'border-green-500 bg-green-500' : 'border-gray-300'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{option}</span>
                  {option === 'Not Given' && (
                    <span className="text-xs text-gray-500">(Information not mentioned in text)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'short-answer':
        return (
          <div className="space-y-3">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your answer here..."
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              maxLength={100}
            />
            <p className="text-sm text-gray-500">
              Tip: Keep your answer concise and specific to the question.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = content.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const averageTimePerQuestion = userAnswers.reduce((sum, a) => sum + a.timeSpent, 0) / userAnswers.length / 1000;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{score}%</div>
          <p className="text-gray-600">
            {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{Math.round(averageTimePerQuestion)}s</div>
            <p className="text-sm text-gray-600">Average per question</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{Math.round(readingTime / 1000)}s</div>
            <p className="text-sm text-gray-600">Reading time</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Question Review</h3>
          {userAnswers.map((answer, index) => {
            const question = content.questions[answer.questionIndex];
            return (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  {answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium mb-2">{question.question}</p>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Your answer:</span>{' '}
                        <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {answer.answer}
                        </span>
                      </p>
                      {!answer.isCorrect && (
                        <p>
                          <span className="font-medium">Correct answer:</span>{' '}
                          <span className="text-green-600">{question.correctAnswer}</span>
                        </p>
                      )}
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm">
                          <span className="font-medium">Explanation:</span> {question.feedback.explanation}
                        </p>
                        {question.feedback.culturalContext && (
                          <p className="text-sm mt-2">
                            <span className="font-medium">Cultural Context:</span> {question.feedback.culturalContext}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
            <span>Reading Comprehension Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderResults()}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Reading Comprehension</span>
              {vienneseTheme && themeContent && (
                                 <Badge variant="outline">{themeContent.displayName}</Badge>
              )}
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>~{getReadingTimeRecommendation()} min read</span>
              </div>
              <Badge variant="outline">
                {content.wordCount} words
              </Badge>
              <Badge variant="outline">
                {content.textType}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Reading Text</TabsTrigger>
              <TabsTrigger value="questions">Questions ({currentQuestionIndex + 1}/{content.questions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowVocabularyHelp(!showVocabularyHelp)}
                        >
                          {showVocabularyHelp ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          Vocabulary Help
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Highlight Austrian German terms and difficult vocabulary</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {content.vocabularySupport && content.vocabularySupport.length > 0 && (
                                         <Badge variant="outline">
                       {content.vocabularySupport.length} vocab items
                     </Badge>
                  )}
                </div>

                <Button
                  onClick={handleTextRead}
                  disabled={isTextRead}
                  size="sm"
                  className="ml-auto"
                >
                  {isTextRead ? 'Text Read ✓' : 'Mark as Read'}
                </Button>
              </div>

              <div
                ref={textRef}
                className="prose prose-lg max-w-none p-6 bg-gray-50 rounded-lg leading-relaxed"
                onClick={handleWordClick}
                dangerouslySetInnerHTML={{
                  __html: renderHighlightedText(content.text)
                }}
              />

              {content.vocabularySupport && content.vocabularySupport.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Vocabulary Support</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {content.vocabularySupport.map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-white">
                        <div className="font-medium text-sm">{item.german}</div>
                        <div className="text-xs text-gray-600">{item.english}</div>
                        {item.pronunciation && (
                          <div className="text-xs text-blue-600">[{item.pronunciation}]</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="questions" className="space-y-6">
              <div className="flex items-center justify-between">
                <Progress value={(currentQuestionIndex / content.questions.length) * 100} className="flex-1 mr-4" />
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {content.questions.length}
                </span>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getQuestionTypeIcon(currentQuestion.type)}</span>
                    <Badge variant="outline" className="text-xs">
                      {currentQuestion.type.replace('-', ' ')}
                    </Badge>
                                         <Badge variant={currentQuestion.difficulty === 'easy' ? 'green' : currentQuestion.difficulty === 'medium' ? 'outline' : 'default'}>
                       {currentQuestion.difficulty}
                     </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
                  {renderQuestion()}
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center space-x-2">
                      {currentQuestion.feedback.grammarReference && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Info className="w-4 h-4" />
                                Grammar Tip
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{currentQuestion.feedback.grammarReference}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!selectedAnswer}
                      className="ml-auto"
                    >
                      {isLastQuestion ? 'Finish Exercise' : 'Next Question'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 