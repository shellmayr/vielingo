import { ExercisePanel } from "@/components/exercise-panel"
import { Navigation } from "@/components/navigation"
import { SpotlightGlow } from "@/components/spotlight-glow"
import { Pagination } from "@/components/pagination"
import { getAllExercises } from "@/data/exercises"
import { Metadata } from "next"
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge'; // Required for ImageResponse

export async function generateMetadata(
  { searchParams }: ExercisesPageProps,
  // parent: ResolvingMetadata // Optional: to access metadata from parent routes
): Promise<Metadata> {
  // Optionally, you could use searchParams or fetch data here
  // For now, we'll return the static metadata
  return {
    title: "German Language Exercises | Vielingo",
    description: "Explore our collection of German language exercises designed to help you learn at your own pace. From basic greetings to advanced conversations, we've got you covered.",
  }
}

export async function generateImageMetadata({ searchParams }: ExercisesPageProps) {
  // You could use searchParams here if the image depended on them
  const imageUrl = new URL('/bear_small.png', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000').toString();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={imageUrl} alt="Vielingo Bear" width="256" height="256" />
        <p style={{ marginTop: 20, fontSize: 32 }}>Vielingo German Language Exercises</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // You can also pass custom fonts here if needed
    }
  );
}

interface ExercisesPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ExercisesPage({ searchParams }: ExercisesPageProps) {
  // Get all exercises from our data file
  const allExercises = getAllExercises();
  
  // Pagination settings
  const itemsPerPage = 3;
  const currentPage = Number(searchParams.page) || 1;
  
  // Calculate pagination
  const totalPages = Math.ceil(allExercises.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExercises = allExercises.slice(startIndex, endIndex);

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