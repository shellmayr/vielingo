import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Exercise {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  imageUrl: string
}

interface ExercisePanelProps {
  exercise: Exercise
}

export function ExercisePanel({ exercise }: ExercisePanelProps) {
  // Function to determine the badge variant based on level
  const getLevelVariant = (level: string) => {
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
    <Link href={`/exercises/${exercise.id}`} className="group">
      <div className="bg-cream rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-stretch relative z-30">
        {/* Image area */}
        <div className="w-full md:w-1/4 relative h-[180px] md:h-auto">
          <div className="absolute inset-0 bg-sage-dark/20 group-hover:bg-sage-dark/0 transition-all duration-300"></div>
          {exercise.imageUrl ? (
            <Image
              src={exercise.imageUrl}
              alt={exercise.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-sage-light flex items-center justify-center">
              <span className="text-sage-dark text-lg font-medium">No Image</span>
            </div>
          )}
        </div>
        
        {/* Content area */}
        <div className="flex-1 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <h3 className="text-xl font-winky text-sage-dark group-hover:text-sage-dark/80 transition-colors duration-300">
              {exercise.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant={getLevelVariant(exercise.level)}>
                {exercise.level}
              </Badge>
              <span className="text-xs font-medium text-sage-dark/70">
                {exercise.duration}
              </span>
            </div>
          </div>
          
          <p className="text-sage-dark/80 mb-4">
            {exercise.description}
          </p>
          
          <div className="flex justify-end">
            <span className="text-tan font-medium group-hover:translate-x-1 transition-transform duration-300 flex items-center">
              Start Exercise
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
} 