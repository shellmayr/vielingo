import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { getExerciseById, Exercise, getAllExercises } from "@/data/exercises"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import { ExerciseRouter } from "@/components/exercise-router"

interface ExercisePageProps {
  params: {
    id: string
  }
}

// Generate static routes for all exercises
export function generateStaticParams() {
  const exercises = getAllExercises();
  return exercises.map(exercise => ({
    id: exercise.id,
  }));
}

export default function ExercisePage({ params }: ExercisePageProps) {
  const { id } = params;
  const exercise = getExerciseById(id);
  
  // If exercise not found, show 404 page
  if (!exercise) {
    notFound();
  }

  const getLevelVariant = (level: Exercise["level"]) => {
    switch (level) {
      case "Beginner":
        return "green"
      case "Intermediate":
        return "blue"
      case "Advanced":
        return "purple"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-sage-green relative overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-20 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-6">
            <Link 
              href="/exercises" 
              className="text-sage-dark flex items-center hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Exercises
            </Link>
          </div>

          <div className="bg-cream rounded-2xl p-8 shadow-md relative z-30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <h1 className="text-3xl md:text-4xl font-winky text-sage-dark relative z-50">
                {exercise.title}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant={getLevelVariant(exercise.level)}>
                  {exercise.level}
                </Badge>
                <span className="text-xs font-medium text-sage-dark/70">
                  {exercise.duration}
                </span>
              </div>
            </div>
            
            {/* Tags */}
            {exercise.tags && exercise.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {exercise.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Exercise content */}
            <ExerciseRouter exercise={exercise} />
          </div>
        </div>
      </main>
    </div>
  )
} 