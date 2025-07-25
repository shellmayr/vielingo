import { ExercisePanel } from "@/components/exercise-panel"
import { Navigation } from "@/components/navigation"
import { SpotlightGlow } from "@/components/spotlight-glow"
import { Pagination } from "@/components/pagination"
import { getAllExercises } from "@/data/exercises"
import * as Sentry from "@sentry/nextjs";

export const runtime = 'edge'; // Required for ImageResponse

interface ExercisesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ExercisesPage({ searchParams }: ExercisesPageProps) {
  // Get all exercises from our data file
  const allExercises = getAllExercises();
  
  // Pagination settings
  const itemsPerPage = 3;
  const currentPage = Number((await searchParams).page) || 1;
  
  // Declare variables outside the span so they can be used in JSX
  let totalPages: number = 0;
  let currentExercises: any[] = [];
  
  // Calculate pagination
  await Sentry.startSpan({
    name: 'Calculate Pagination',
  }, async () => {
    totalPages = Math.ceil(allExercises.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    currentExercises = allExercises.slice(startIndex, endIndex);
  });

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
            {currentExercises.map((exercise) => (
              <ExercisePanel 
                key={exercise.id}
                exercise={exercise}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </main>
    </div>
  )
} 