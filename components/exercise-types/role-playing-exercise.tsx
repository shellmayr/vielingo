"use client"

import { useState, useEffect, useRef } from "react"
import { Exercise, RolePlayingDialogue, RolePlayingTurn, RolePlayingOption } from "@/data/exercises"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ConversationLine {
  speaker: "User" | "Partner";
  text: string;
}

interface RolePlayingExerciseProps {
  exercise: Exercise
}

export function RolePlayingExercise({ exercise }: RolePlayingExerciseProps) {
  const dialogues = exercise.content?.rolePlayingDialogues || []
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

  // Check if the dialogue has ended
  const isDialogueFinished = currentTurnIndex >= dialogue.turns.length;

  if (!dialogue) { // Check only for dialogue existence initially
    return <div>Loading dialogue...</div>
  }
  if (!turn && !isDialogueFinished) { // Check for turn existence only if not finished
     return <div>Loading turn...</div>
  }

  const selectedOptionData = turn?.options?.[selectedOption!]; // Use optional chaining
  const feedback = selectedOptionData?.feedback;
  const isCorrect = selectedOptionData?.correct;

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

      {/* Dialogue Area */}
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

          {/* RENDER NOTHING FOR PARTNER TURN - handled automatically */}
          
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
          {showFeedback && feedback && !isDialogueFinished && (
            <div className={`p-3 rounded-lg text-sm ${ 
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' 
            }`}>
              <p className="font-medium">
                {isCorrect ? "Correct! 👏" : "Suggestion:"}
              </p>
              <p>{feedback}</p>
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
                selectedOptionData && (
                  // Use the new handler function here
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
    </div>
  )
} 