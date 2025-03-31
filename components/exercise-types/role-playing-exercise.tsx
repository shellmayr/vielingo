"use client"

import { useState, useEffect, useRef } from "react"
import { Exercise, RolePlayingDialogue, RolePlayingTurn, RolePlayingOption } from "@/data/exercises"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ConversationLine {
  speaker: "User" | "Partner";
  text: string;
}

interface RolePlayingExerciseProps {
  exercise: Exercise
}

export function RolePlayingExercise({ exercise }: RolePlayingExerciseProps) {
  const [activeTab, setActiveTab] = useState<"vocabulary" | "rolePlaying">("vocabulary")
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  
  const dialogues = exercise.content?.rolePlayingDialogues || []
  const vocabularyItems = exercise.content?.vocabularyItems || []
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0)
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<ConversationLine[]>([])
  const historyContainerRef = useRef<HTMLDivElement>(null);

  const dialogue = dialogues[currentDialogueIndex]
  const turn = dialogue?.turns[currentTurnIndex]

  useEffect(() => {
    if (historyContainerRef.current) {
      const { scrollHeight } = historyContainerRef.current;
      historyContainerRef.current.scrollTop = scrollHeight;
    }
  }, [conversationHistory]);

  useEffect(() => {
    if (dialogue && dialogue.initialPrompt) {
      setConversationHistory([{ speaker: "Partner", text: dialogue.initialPrompt }])
      // Start directly at the first User turn if it exists
      const firstUserTurnIndex = dialogue.turns.findIndex(t => t.speaker === "User");
      setCurrentTurnIndex(firstUserTurnIndex >= 0 ? firstUserTurnIndex : 0);
      setSelectedOption(null)
      setShowFeedback(false)
    }
  }, [dialogue, dialogue?.initialPrompt])

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowFeedback(false)
  }

  const handleCheckAnswer = () => {
    setShowFeedback(true)
    const chosenOption = turn?.options?.[selectedOption!]
    if (chosenOption) {
      setConversationHistory(prev => [...prev, { speaker: "User", text: chosenOption.text }])
    }
  }

  // This function now handles advancing state after User checks answer
  // It will automatically add the partner's next line and move to the next User turn
  const handleAdvanceAfterUserAnswer = () => {
    const chosenOption = turn?.options?.[selectedOption!];
    let partnerTurnIndex = currentTurnIndex + 1; // Assume partner is next

    // Check if the chosen option dictates the next turn explicitly
    if (chosenOption?.nextTurnIndex !== undefined) {
      partnerTurnIndex = chosenOption.nextTurnIndex;
    }
    
    let finalPartnerTextToAdd: string | null = null;
    
    // Check if partner turn exists and get their text
    if (partnerTurnIndex < dialogue.turns.length && dialogue.turns[partnerTurnIndex].speaker === "Partner") {
      const partnerTurnData = dialogue.turns[partnerTurnIndex];
      const partnerResponseText = turn?.response || partnerTurnData.prompt;
       if (typeof partnerResponseText === 'string' && partnerResponseText.trim() !== '') {
         finalPartnerTextToAdd = partnerResponseText;
       }
    } 
    // If the next turn isn't the partner, check if current user turn had a response anyway
    else if (turn?.response && typeof turn.response === 'string' && turn.response.trim() !== '') {
       finalPartnerTextToAdd = turn.response;
    }

    // Add partner text to history if available
    if (finalPartnerTextToAdd) {
      setConversationHistory(prev => [...prev, { speaker: "Partner", text: finalPartnerTextToAdd! }]);
    }

    // Find the index of the *next* User turn
    let nextUserTurnIndex = -1;
    for (let i = partnerTurnIndex + 1; i < dialogue.turns.length; i++) {
      if (dialogue.turns[i].speaker === "User") {
        nextUserTurnIndex = i;
        break;
      }
       // If we encounter another partner prompt before finding a user turn, add it.
      else if (dialogue.turns[i].speaker === "Partner" && dialogue.turns[i].prompt) {
         const nextPartnerText = dialogue.turns[i].prompt;
         if(typeof nextPartnerText === 'string' && nextPartnerText.trim() !== '') {
            setConversationHistory(prev => [...prev, { speaker: "Partner", text: nextPartnerText}]);
         }
      }
    }

    // Move to the next user turn or handle dialogue end
    if (nextUserTurnIndex !== -1) {
       setCurrentTurnIndex(nextUserTurnIndex);
       setSelectedOption(null);
       setShowFeedback(false);
    } else {
      // Handle end of dialogue (no more User turns)
      console.log("Dialogue finished - No more user turns");
      // Optionally add a final message or disable UI
       // Check if the *last known partner turn* had a final line
       if (partnerTurnIndex < dialogue.turns.length && dialogue.turns[partnerTurnIndex].prompt && dialogue.turns[partnerTurnIndex].speaker === "Partner" && !finalPartnerTextToAdd) {
          const lastPartnerText = dialogue.turns[partnerTurnIndex].prompt;
          if(typeof lastPartnerText === 'string' && lastPartnerText.trim() !== '') {
             setConversationHistory(prev => [...prev, { speaker: "Partner", text: lastPartnerText}]);
          }
       }
       setCurrentTurnIndex(dialogue.turns.length); // Move index past the end
    }
  };

  // Function to toggle card flip for vocabulary
  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Button style for tabs
  const getButtonClass = (isActive: boolean) => {
    return isActive
      ? "bg-tan-light text-white font-medium py-2 px-4 rounded"
      : "bg-cream text-sage-dark hover:bg-sage-light/30 font-medium py-2 px-4 rounded"
  }

  // Check if the dialogue has ended
  const isDialogueFinished = currentTurnIndex >= dialogue?.turns.length;

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
          disabled={vocabularyItems.length === 0}
        >
          Vocabulary
        </button>
        <button
          onClick={() => setActiveTab("rolePlaying")}
          className={getButtonClass(activeTab === "rolePlaying")}
          disabled={dialogues.length === 0}
        >
          Role Playing
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

      {/* Role Playing Dialogue */}
      {activeTab === "rolePlaying" && dialogue && (
        <Card className="bg-cream shadow-md">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-xl font-bold text-sage-dark mb-4 text-center">{dialogue.title}</h3>
            
            {/* Conversation History */}
            <div 
              ref={historyContainerRef}
              className="space-y-3 max-h-60 overflow-y-auto pr-2 border border-sage-light/20 rounded-lg p-4 bg-white/50"
              style={{ scrollBehavior: 'smooth' }}
            >
              {conversationHistory.map((line, index) => (
                <div key={index} className={`flex ${line.speaker === 'User' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`p-3 rounded-lg text-sm max-w-[80%] ${ 
                    line.speaker === 'User' ? "bg-tan-light/80 text-white" : "bg-sage-light/50 text-sage-dark" 
                  }`}>
                    {line.text}
                  </div>
                </div>
              ))}
            </div>

            {/* User Options (if User turn and dialogue not finished) */}
            {turn?.speaker === "User" && !isDialogueFinished && turn.options && (
              <div className="space-y-3 pt-4 border-t border-sage-light/30">
                <p className="text-sage-dark/80 text-sm font-medium mb-2">Choose your response:</p>
                {turn.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-2 px-3 whitespace-normal ${ 
                      selectedOption === index 
                        ? showFeedback 
                          ? option.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50' 
                          : 'border-tan-light bg-tan-light/10' 
                        : 'border-sage-light/40 hover:bg-sage-light/10'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showFeedback}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            )}

            {/* Feedback Area */} 
            {showFeedback && turn?.options?.[selectedOption!]?.feedback && !isDialogueFinished && (
              <div className={`p-3 rounded-lg text-sm ${ 
                turn.options?.[selectedOption!]?.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' 
              }`}>
                <p className="font-medium">
                  {turn.options?.[selectedOption!]?.correct ? "Correct! 👏" : "Suggestion:"}
                </p>
                <p>{turn.options?.[selectedOption!]?.feedback}</p>
              </div>
            )}

            {/* Action Buttons */}
            {turn?.speaker === "User" && !isDialogueFinished && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-sage-light/30">
                {!showFeedback ? (
                  <Button 
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="bg-tan-light hover:bg-tan"
                  >
                    Check Answer
                  </Button>
                ) : (
                  turn.options?.[selectedOption!] && (
                    <Button 
                      onClick={handleAdvanceAfterUserAnswer} 
                      className="bg-tan-light hover:bg-tan"
                    >
                      Next
                    </Button>
                  )
                )}
              </div>
            )}

            {/* Dialogue End Message */}
            {isDialogueFinished && (
               <p className="text-center text-sage-dark/80 italic py-4">(Dialogue complete)</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 