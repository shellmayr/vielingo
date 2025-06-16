'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Headphones, 
  Clock, 
  Eye, 
  EyeOff,
  SkipBack,
  SkipForward,
  CheckCircle,
  XCircle,
  Gauge,
  FileText,
  Repeat
} from 'lucide-react';
import { ListeningComprehensionContent, ListeningQuestion, AudioFile } from '@/data/exercises';
import { getViennaThemeByName } from '@/data/vienna-content';
import { audioManager, AudioPlayer } from '@/lib/audio-manager';

interface ListeningComprehensionExerciseProps {
  content: ListeningComprehensionContent;
  vienneseTheme?: string;
  onComplete: (score: number, answers: UserAnswer[]) => void;
  onProgress?: (progress: number) => void;
}

interface UserAnswer {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
  timeSpent: number;
  playCount: number;
}

interface AudioControlsState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  playbackRate: number;
  isLoaded: boolean;
  showTranscript: boolean;
  isMuted: boolean;
}

export default function ListeningComprehensionExercise({
  content,
  vienneseTheme,
  onComplete,
  onProgress
}: ListeningComprehensionExerciseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayer | null>(null);
  const [playCount, setPlayCount] = useState(0);
  const [segmentPlayCount, setSegmentPlayCount] = useState<Record<number, number>>({});
  
  const [audioControls, setAudioControls] = useState<AudioControlsState>({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    volume: 0.8,
    playbackRate: 1.0,
    isLoaded: false,
    showTranscript: false,
    isMuted: false
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const themeContent = vienneseTheme ? getViennaThemeByName(vienneseTheme as any) : null;

  // Initialize audio player
  useEffect(() => {
    const initAudioPlayer = async () => {
      try {
        const player = audioManager.createAudioPlayer(content.audioFile, {
          volume: audioControls.volume,
          playbackRate: audioControls.playbackRate
        });

        // Set up event listeners
        player.on('loadedmetadata', () => {
          setAudioControls(prev => ({
            ...prev,
            duration: player.getDuration(),
            isLoaded: true
          }));
        });

        player.on('timeupdate', () => {
          setAudioControls(prev => ({
            ...prev,
            currentTime: player.getCurrentTime()
          }));
        });

        player.on('play', () => {
          setAudioControls(prev => ({ ...prev, isPlaying: true }));
        });

        player.on('pause', () => {
          setAudioControls(prev => ({ ...prev, isPlaying: false }));
        });

        player.on('ended', () => {
          setAudioControls(prev => ({ ...prev, isPlaying: false }));
        });

        setAudioPlayer(player);
      } catch (error) {
        console.error('Failed to initialize audio player:', error);
      }
    };

    initAudioPlayer();

    return () => {
      if (audioPlayer) {
        audioPlayer.destroy();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [content.audioFile]);

  // Update progress tracking
  useEffect(() => {
    if (onProgress) {
      const progress = ((currentQuestionIndex + (selectedAnswer ? 0.5 : 0)) / content.questions.length) * 100;
      onProgress(progress);
    }
  }, [currentQuestionIndex, selectedAnswer, content.questions.length, onProgress]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const currentQuestion = content.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === content.questions.length - 1;

  const handlePlay = useCallback(async () => {
    if (!audioPlayer) return;

    try {
      if (audioControls.isPlaying) {
        audioPlayer.pause();
      } else {
        await audioPlayer.play();
        setPlayCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Audio play error:', error);
    }
  }, [audioPlayer, audioControls.isPlaying]);

  const handleSeek = useCallback((time: number) => {
    if (!audioPlayer) return;
    audioPlayer.setCurrentTime(time);
  }, [audioPlayer]);

  const handleVolumeChange = useCallback((volume: number[]) => {
    if (!audioPlayer) return;
    const newVolume = volume[0];
    audioPlayer.setVolume(newVolume);
    setAudioControls(prev => ({ 
      ...prev, 
      volume: newVolume,
      isMuted: newVolume === 0
    }));
  }, [audioPlayer]);

  const handlePlaybackRateChange = useCallback((rate: number) => {
    if (!audioPlayer) return;
    audioPlayer.setPlaybackRate(rate);
    setAudioControls(prev => ({ ...prev, playbackRate: rate }));
  }, [audioPlayer]);

  const handleToggleMute = useCallback(() => {
    if (!audioPlayer) return;
    if (audioControls.isMuted) {
      audioPlayer.setVolume(audioControls.volume || 0.8);
      setAudioControls(prev => ({ ...prev, isMuted: false }));
    } else {
      audioPlayer.setVolume(0);
      setAudioControls(prev => ({ ...prev, isMuted: true }));
    }
  }, [audioPlayer, audioControls.isMuted, audioControls.volume]);

  const handleSkipBackward = useCallback(() => {
    if (!audioPlayer) return;
    const newTime = Math.max(0, audioControls.currentTime - 10);
    audioPlayer.setCurrentTime(newTime);
  }, [audioPlayer, audioControls.currentTime]);

  const handleSkipForward = useCallback(() => {
    if (!audioPlayer) return;
    const newTime = Math.min(audioControls.duration, audioControls.currentTime + 10);
    audioPlayer.setCurrentTime(newTime);
  }, [audioPlayer, audioControls.currentTime, audioControls.duration]);

  const handlePlaySegment = useCallback(async (startTime: number, endTime: number) => {
    if (!audioPlayer) return;
    
    try {
      await audioPlayer.playSegment(startTime, endTime);
      setSegmentPlayCount(prev => ({
        ...prev,
        [currentQuestionIndex]: (prev[currentQuestionIndex] || 0) + 1
      }));
    } catch (error) {
      console.error('Segment play error:', error);
    }
  }, [audioPlayer, currentQuestionIndex]);

  const handleRepeatSegment = useCallback(async () => {
    if (!audioPlayer || !currentQuestion.timestamp) return;
    
    const startTime = Math.max(0, currentQuestion.timestamp - 5);
    const endTime = Math.min(audioControls.duration, currentQuestion.timestamp + 15);
    
    await handlePlaySegment(startTime, endTime);
  }, [audioPlayer, currentQuestion.timestamp, audioControls.duration, handlePlaySegment]);

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
      timeSpent,
      playCount: segmentPlayCount[currentQuestionIndex] || 0
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (isLastQuestion) {
      const correctAnswers = updatedAnswers.filter(a => a.isCorrect).length;
      const score = Math.round((correctAnswers / content.questions.length) * 100);
      setShowResults(true);
      onComplete(score, updatedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlaybackRateColor = (rate: number): string => {
    if (rate < 1) return 'text-blue-600';
    if (rate > 1) return 'text-red-600';
    return 'text-gray-600';
  };

  const renderAudioControls = () => (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Headphones className="w-5 h-5" />
            <span>Audio Player</span>
            {content.audioFile.accent && (
              <Badge variant="outline">
                {content.audioFile.accent === 'viennese' ? '🇦🇹 Vienna' : '🇩🇪 Standard'}
              </Badge>
            )}
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAudioControls(prev => ({ ...prev, showTranscript: !prev.showTranscript }))}
                  >
                    {audioControls.showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    Transcript
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle audio transcript</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Badge variant="outline">
              {formatTime(audioControls.duration)} total
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Waveform/Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatTime(audioControls.currentTime)}</span>
            <span>{formatTime(audioControls.duration)}</span>
          </div>
          <Slider
            value={[audioControls.currentTime]}
            max={audioControls.duration || 100}
            step={0.1}
            className="w-full"
            onValueChange={(value) => handleSeek(value[0])}
            disabled={!audioControls.isLoaded}
          />
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSkipBackward}
            disabled={!audioControls.isLoaded}
          >
            <SkipBack className="w-4 h-4" />
            10s
          </Button>

          <Button
            onClick={handlePlay}
            disabled={!audioControls.isLoaded}
            size="lg"
            className="h-12 w-12 rounded-full"
          >
            {audioControls.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSkipForward}
            disabled={!audioControls.isLoaded}
          >
            <SkipForward className="w-4 h-4" />
            10s
          </Button>
        </div>

        {/* Secondary Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleMute}
            >
              {audioControls.isMuted || audioControls.volume === 0 ? 
                <VolumeX className="w-4 h-4" /> : 
                <Volume2 className="w-4 h-4" />
              }
            </Button>
            <Slider
              value={[audioControls.isMuted ? 0 : audioControls.volume]}
              max={1}
              step={0.1}
              className="flex-1"
              onValueChange={handleVolumeChange}
            />
          </div>

          {/* Playback Speed */}
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4" />
            <div className="flex space-x-1">
              {[0.75, 1.0, 1.25].map((rate) => (
                <Button
                  key={rate}
                  variant={audioControls.playbackRate === rate ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePlaybackRateChange(rate)}
                  className={`text-xs ${getPlaybackRateColor(rate)}`}
                >
                  {rate}x
                </Button>
              ))}
            </div>
          </div>

          {/* Question-specific controls */}
          <div className="flex items-center space-x-2">
            {currentQuestion.timestamp && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRepeatSegment}
                    >
                      <Repeat className="w-4 h-4" />
                      Segment
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Replay relevant audio segment for this question</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* Transcript */}
        {audioControls.showTranscript && content.transcript && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4" />
              <span className="font-medium text-sm">Transcript</span>
              <Badge variant="outline" className="text-xs">
                {content.audioFile.speaker || 'Speaker'}
              </Badge>
            </div>
            <div className="text-sm leading-relaxed text-gray-700">
              {content.transcript}
            </div>
          </div>
        )}

        {/* Audio Statistics */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="p-2 bg-blue-50 rounded">
            <div className="font-bold text-blue-600">{playCount}</div>
            <div className="text-gray-600">Total Plays</div>
          </div>
          <div className="p-2 bg-green-50 rounded">
            <div className="font-bold text-green-600">{segmentPlayCount[currentQuestionIndex] || 0}</div>
            <div className="text-gray-600">Question Replays</div>
          </div>
          <div className="p-2 bg-purple-50 rounded">
            <div className="font-bold text-purple-600">{audioControls.playbackRate}x</div>
            <div className="text-gray-600">Current Speed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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

      case 'fill-in-blank':
        return (
          <div className="space-y-3">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Fill in the missing word or phrase..."
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              maxLength={50}
            />
            <p className="text-sm text-gray-500">
              Type exactly what you hear. Pay attention to pronunciation and spelling.
            </p>
          </div>
        );

      case 'ordering':
        // For ordering questions, we'd need a more complex interface
        // For now, treat as multiple choice with ordered options
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              Select the correct order based on what you heard:
            </p>
            {currentQuestion.options?.map((option, index) => (
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
                  <span className="text-sm">{option}</span>
                </div>
              </div>
            ))}
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
    const totalPlayCount = userAnswers.reduce((sum, a) => sum + a.playCount, 0);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{score}%</div>
          <p className="text-gray-600">
            {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{Math.round(averageTimePerQuestion)}s</div>
            <p className="text-sm text-gray-600">Average per question</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalPlayCount}</div>
            <p className="text-sm text-gray-600">Total replays</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{formatTime(audioControls.duration)}</div>
            <p className="text-sm text-gray-600">Audio length</p>
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
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-medium">{question.question}</p>
                      {question.timestamp && (
                        <Badge variant="outline" className="text-xs">
                          {formatTime(question.timestamp)}
                        </Badge>
                      )}
                    </div>
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
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>⏱️ {Math.round(answer.timeSpent / 1000)}s</span>
                        <span>🔄 {answer.playCount} replays</span>
                      </div>
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
            <Headphones className="w-5 h-5" />
            <span>Listening Comprehension Results</span>
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
      {/* Audio Player */}
      {renderAudioControls()}

      {/* Questions Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Headphones className="w-5 h-5" />
              <span>Listening Questions</span>
              {vienneseTheme && themeContent && (
                <Badge variant="outline">{themeContent.displayName}</Badge>
              )}
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Progress value={(currentQuestionIndex / content.questions.length) * 100} className="w-32" />
              <span className="text-sm text-gray-600">
                {currentQuestionIndex + 1}/{content.questions.length}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {currentQuestion.type.replace('-', ' ')}
                </Badge>
                {currentQuestion.timestamp && (
                  <Badge variant="outline" className="text-xs">
                    ⏰ {formatTime(currentQuestion.timestamp)}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  Question {currentQuestionIndex + 1}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
              
              {renderQuestion()}
              
              <div className="flex justify-between items-center pt-4">
                <div className="flex items-center space-x-2">
                  {currentQuestion.timestamp && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRepeatSegment}
                    >
                      <Repeat className="w-4 h-4 mr-1" />
                      Replay Segment
                    </Button>
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
        </CardContent>
      </Card>
    </div>
  );
} 