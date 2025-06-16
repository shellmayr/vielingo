'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, RotateCcw, Shuffle, Target, Grip } from 'lucide-react';
import { MatchingContent, MatchingPair } from '@/data/exercises';
import { getViennaThemeByName } from '@/data/vienna-content';

interface MatchingExerciseProps {
  content: MatchingContent;
  vienneseTheme?: string;
  onComplete: (score: number, matches: MatchResult[]) => void;
  onProgress?: (progress: number) => void;
}

interface MatchResult {
  leftItem: string;
  rightItem: string;
  isCorrect: boolean;
  timeSpent: number;
}

interface DragItem {
  id: string;
  content: string;
  type: 'left' | 'right';
  isMatched: boolean;
  matchedWith?: string;
}

interface MatchPair {
  id: string;
  leftItem: DragItem;
  rightItem: DragItem;
  isCorrect: boolean;
}

export default function MatchingExercise({
  content,
  vienneseTheme,
  onComplete,
  onProgress
}: MatchingExerciseProps) {
  const [leftItems, setLeftItems] = useState<DragItem[]>([]);
  const [rightItems, setRightItems] = useState<DragItem[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<MatchPair[]>([]);
  const [userMatches, setUserMatches] = useState<MatchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const themeContent = vienneseTheme ? getViennaThemeByName(vienneseTheme as any) : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setStartTime(Date.now());
      initializeItems();
    }
  }, [isClient, content]);

  useEffect(() => {
    if (onProgress) {
      const progress = (matchedPairs.length / content.pairs.length) * 100;
      onProgress(progress);
    }
  }, [matchedPairs, content.pairs.length, onProgress]);

  const initializeItems = () => {
    const shuffledPairs = [...content.pairs].sort(() => Math.random() - 0.5);
    
    const leftDragItems: DragItem[] = shuffledPairs.map((pair, index) => ({
      id: `left-${index}`,
      content: pair.left,
      type: 'left',
      isMatched: false
    }));

    const rightDragItems: DragItem[] = shuffledPairs
      .map((pair, index) => ({
        id: `right-${index}`,
        content: pair.right,
        type: 'right' as const,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setLeftItems(leftDragItems);
    setRightItems(rightDragItems);
    setMatchedPairs([]);
  };

  const shuffleRightItems = () => {
    const availableItems = rightItems.filter(item => !item.isMatched);
    const shuffledAvailable = [...availableItems].sort(() => Math.random() - 0.5);
    const matchedItems = rightItems.filter(item => item.isMatched);
    
    setRightItems([...matchedItems, ...shuffledAvailable]);
    setShuffled(true);
    setTimeout(() => setShuffled(false), 300);
  };

  const resetExercise = () => {
    setUserMatches([]);
    setShowResults(false);
    setIsComplete(false);
    setMatchedPairs([]);
    setStartTime(Date.now());
    initializeItems();
  };

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetItem: DragItem) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.type === targetItem.type) {
      setDraggedItem(null);
      return;
    }

    const leftItem = draggedItem.type === 'left' ? draggedItem : targetItem;
    const rightItem = draggedItem.type === 'right' ? draggedItem : targetItem;

    // Check if this is a correct match
    const correctPair = content.pairs.find(
      pair => pair.left === leftItem.content && pair.right === rightItem.content
    );

    const timeSpent = Date.now() - startTime;
    
    const newMatch: MatchResult = {
      leftItem: leftItem.content,
      rightItem: rightItem.content,
      isCorrect: !!correctPair,
      timeSpent
    };

    // Create matched pair
    const matchPair: MatchPair = {
      id: `match-${Date.now()}`,
      leftItem: { ...leftItem, isMatched: true, matchedWith: rightItem.content },
      rightItem: { ...rightItem, isMatched: true, matchedWith: leftItem.content },
      isCorrect: !!correctPair
    };

    // Update states
    setUserMatches(prev => [...prev, newMatch]);
    setMatchedPairs(prev => [...prev, matchPair]);

    // Update items to mark as matched
    setLeftItems(prev => prev.map(item =>
      item.id === leftItem.id ? { ...item, isMatched: true, matchedWith: rightItem.content } : item
    ));
    setRightItems(prev => prev.map(item =>
      item.id === rightItem.id ? { ...item, isMatched: true, matchedWith: leftItem.content } : item
    ));

    setDraggedItem(null);

    // Check if all matches are complete
    if (matchedPairs.length + 1 === content.pairs.length) {
      setTimeout(() => {
        setIsComplete(true);
        const correctMatches = [...userMatches, newMatch].filter(match => match.isCorrect).length;
        const score = Math.round((correctMatches / content.pairs.length) * 100);
        setShowResults(true);
        onComplete(score, [...userMatches, newMatch]);
      }, 1000);
    }
  };

  const handleUnmatch = (matchId: string) => {
    const matchToRemove = matchedPairs.find(match => match.id === matchId);
    if (!matchToRemove) return;

    // Remove from matches
    setUserMatches(prev => prev.filter(
      match => !(match.leftItem === matchToRemove.leftItem.content && match.rightItem === matchToRemove.rightItem.content)
    ));

    // Remove from matched pairs
    setMatchedPairs(prev => prev.filter(match => match.id !== matchId));

    // Update items to mark as unmatched
    setLeftItems(prev => prev.map(item =>
      item.id === matchToRemove.leftItem.id ? { ...item, isMatched: false, matchedWith: undefined } : item
    ));
    setRightItems(prev => prev.map(item =>
      item.id === matchToRemove.rightItem.id ? { ...item, isMatched: false, matchedWith: undefined } : item
    ));
  };

  const getMatchingTypeIcon = (type: MatchingContent['matchingType']) => {
    switch (type) {
      case 'text-to-text': return '🔤';
      case 'image-to-text': return '🖼️';
      case 'audio-to-text': return '🔊';
      default: return '🔗';
    }
  };

  const renderResults = () => {
    const correctMatches = userMatches.filter(match => match.isCorrect).length;
    const totalMatches = content.pairs.length;
    const score = Math.round((correctMatches / totalMatches) * 100);
    const averageTime = userMatches.reduce((sum, match) => sum + match.timeSpent, 0) / userMatches.length / 1000;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{score}%</div>
          <p className="text-gray-600 text-sm">
            {correctMatches} out of {totalMatches} matches correct
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{Math.round(averageTime)}s</div>
            <p className="text-xs text-gray-600">Average per match</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{content.matchingType.split('-')[0]}</div>
            <p className="text-xs text-gray-600">Exercise type</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Your Matches:</h4>
          {userMatches.map((match, index) => (
            <div key={index} className={`flex items-center justify-between p-2 rounded text-xs ${
              match.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <span>{match.leftItem} ↔ {match.rightItem}</span>
              <span className="font-mono">{(match.timeSpent / 1000).toFixed(1)}s</span>
            </div>
          ))}
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

  if (!isClient) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-4">
        <Card>
          <CardContent className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-gray-600">Loading exercise...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Matching Exercise Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderResults()}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="w-4 h-4" />
              <span>Matching Exercise</span>
              {vienneseTheme && themeContent && (
                <Badge variant="outline" className="text-xs">{themeContent.displayName}</Badge>
              )}
            </CardTitle>
            <div className="flex items-center space-x-3">
              <span className="text-base">{getMatchingTypeIcon(content.matchingType)}</span>
              <Badge variant="outline" className="text-xs">
                {content.matchingType.replace('-', ' → ')}
              </Badge>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shuffleRightItems}
                  disabled={rightItems.filter(item => !item.isMatched).length === 0}
                  className={`h-7 px-2 text-xs ${shuffled ? 'animate-spin' : ''}`}
                >
                  <Shuffle className="w-3 h-3 mr-1" />
                  Shuffle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetExercise}
                  className="h-7 px-2 text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-3 text-sm">{content.instructions}</p>
            <Progress value={(matchedPairs.length / content.pairs.length) * 100} className="w-full h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {matchedPairs.length} of {content.pairs.length} matches complete
            </p>
          </div>

          {/* Matched Pairs Section */}
          {matchedPairs.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-center">Matched Pairs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {matchedPairs.map((match) => (
                  <div
                    key={match.id}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                      match.isCorrect 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="p-2 bg-white rounded border text-xs font-medium">
                        {match.leftItem.content}
                      </div>
                      <div className="text-lg">
                        {match.isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="p-2 bg-white rounded border text-xs font-medium">
                        {match.rightItem.content}
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnmatch(match.id)}
                      className="ml-2 text-gray-500 hover:text-red-600 transition-colors"
                      title="Unmatch"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Items to match */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-center">Left Items</h3>
              <div className="space-y-2 min-h-[300px]">
                {leftItems.filter(item => !item.isMatched).map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item)}
                    className={`p-3 border rounded-lg cursor-move transition-all ${
                      draggedItem?.id === item.id
                        ? 'opacity-50 scale-95 shadow-lg border-blue-500'
                        : 'hover:shadow-md hover:border-blue-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Grip className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{item.content}</span>
                    </div>
                  </div>
                ))}
                {leftItems.filter(item => !item.isMatched).length === 0 && (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    <div className="text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">All items matched!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Items to be matched */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-center">Right Items</h3>
              <div className="space-y-2 min-h-[300px]">
                {rightItems.filter(item => !item.isMatched).map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item)}
                    className={`p-3 border rounded-lg cursor-move transition-all ${
                      draggedItem?.id === item.id
                        ? 'opacity-50 scale-95 shadow-lg border-blue-500'
                        : 'hover:shadow-md hover:border-blue-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Grip className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{item.content}</span>
                    </div>
                  </div>
                ))}
                {rightItems.filter(item => !item.isMatched).length === 0 && (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    <div className="text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">All items matched!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>How to play:</strong> Drag items from either column and drop them onto items from the other column to create matches. Matched pairs will appear above and can be unmatched if needed.
            </p>
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