import { ExercisePanel } from "@/components/exercise-panel"
import { Navigation } from "@/components/navigation"
import { SpotlightGlow } from "@/components/spotlight-glow";

export default function ExercisesPage() {
  // Sample exercise data - in a real app this would come from a database or API
  const exercises = [
    {
      id: "basic-greetings",
      title: "Basic Greetings",
      description: "Learn the most common ways to say hello and goodbye in German, with pronunciation practice.",
      level: "Beginner",
      duration: "10 min",
      imageUrl: "/images/frog.png",
    },
    {
      id: "introduce-yourself",
      title: "Introducing Yourself",
      description: "Master the phrases needed to introduce yourself and ask others about their name, origin, and interests.",
      level: "Beginner",
      duration: "15 min",
      imageUrl: "/images/bear.png",
    },
    {
      id: "food-vocabulary",
      title: "Food & Dining",
      description: "Build your food vocabulary and learn how to order meals at restaurants with confidence.",
      level: "Intermediate",
      duration: "20 min",
      imageUrl: "/images/hare.png",
    },
    {
      id: "daily-routines",
      title: "Daily Routines",
      description: "Practice describing your daily activities using present tense verbs and time expressions.",
      level: "Intermediate",
      duration: "25 min",
      imageUrl: "/images/hare.png",
    },
    {
      id: "transport-directions",
      title: "Transport & Directions",
      description: "Learn how to ask for and give directions, plus vocabulary for different types of transportation.",
      level: "Advanced",
      duration: "30 min",
      imageUrl: "/images/frog.png",
    },
  ];

  return (
    <div className="min-h-screen bg-sage-green relative overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-20 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <SpotlightGlow />
          <div className="flex flex-col gap-6">
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