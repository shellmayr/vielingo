import { ExercisePanel } from "@/components/exercise-panel"
import { Navigation } from "@/components/navigation"
import { SpotlightGlow } from "@/components/spotlight-glow"
import { getAllExercises } from "@/data/exercises"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "German Language Exercises | Vielingo",
  description: "Explore our collection of German language exercises designed to help you learn at your own pace. From basic greetings to advanced conversations, we've got you covered.",
}

export default async function ExercisesPage() {
  // Get all exercises from our data file
  const exercises = getAllExercises();

  return (
    <div className="min-h-screen bg-sage-green relative overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-20 py-12">
        <div className="mx-auto max-w-4xl px-4">          
          <div className="bg-cream/30 rounded-3xl p-6 backdrop-blur-sm mb-8">
            <p className="text-sage-dark text-center">
              Explore our collection of German language exercises designed to help you learn at your own pace.
              From basic greetings to advanced conversations, we've got you covered.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 relative">
            <SpotlightGlow />
            {exercises.map((exercise) => (
              <ExercisePanel 
                key={exercise.id}
                exercise={exercise}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 