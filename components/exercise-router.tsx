import { Exercise } from "@/data/exercises"
import { VocabularyExercise } from "@/components/exercise-types/vocabulary-exercise"
import { GrammarExercise } from "@/components/exercise-types/grammar-exercise"
import { GapFillingExercise } from "@/components/exercise-types/gap-filling-exercise"
import { RolePlayingExercise } from "@/components/exercise-types/role-playing-exercise"

interface ExerciseRouterProps {
  exercise: Exercise
}

export function ExerciseRouter({ exercise }: ExerciseRouterProps) {
  // Based on the exercise type, render the appropriate component
  switch (exercise.exerciseType) {
    case "vocabulary":
      return <VocabularyExercise exercise={exercise} />
      
    case "grammar":
      return <GrammarExercise exercise={exercise} />
    
    case "gapFilling":
      return <GapFillingExercise exercise={exercise} />
      
    case "rolePlaying":
      return <RolePlayingExercise exercise={exercise} />
      
    case "conversation":
      // For now, we'll show a placeholder since we haven't implemented conversation exercises
      return (
        <div className="bg-cream p-8 rounded-xl text-center">
          <h3 className="text-xl font-bold text-sage-dark mb-4">Conversation Exercise</h3>
          <p className="text-sage-dark/80">Conversation exercises are coming soon!</p>
        </div>
      )
      
    case "reading":
      // For now, we'll show a placeholder since we haven't implemented reading exercises
      return (
        <div className="bg-cream p-8 rounded-xl text-center">
          <h3 className="text-xl font-bold text-sage-dark mb-4">Reading Exercise</h3>
          <p className="text-sage-dark/80">Reading exercises are coming soon!</p>
        </div>
      )
      
    case "listening":
      // For now, we'll show a placeholder since we haven't implemented listening exercises
      return (
        <div className="bg-cream p-8 rounded-xl text-center">
          <h3 className="text-xl font-bold text-sage-dark mb-4">Listening Exercise</h3>
          <p className="text-sage-dark/80">Listening exercises are coming soon!</p>
        </div>
      )
      
    default:
      // If we don't recognize the exercise type, show a generic message
      return (
        <div className="bg-cream p-8 rounded-xl text-center">
          <h3 className="text-xl font-bold text-sage-dark mb-4">Unknown Exercise Type</h3>
          <p className="text-sage-dark/80">This exercise type is not yet implemented.</p>
        </div>
      )
  }
} 