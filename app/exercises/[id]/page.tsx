import { Navigation } from "@/components/navigation"
import { BackgroundClouds } from "@/components/background-clouds"
import { BackgroundGlow } from "@/components/background-glow"
import Link from "next/link"

interface ExercisePageProps {
  params: {
    id: string
  }
}

export default function ExercisePage({ params }: ExercisePageProps) {
  const { id } = params

  return (
    <div className="min-h-screen bg-sage-green relative overflow-hidden">
      {/* Background effects */}
      <BackgroundGlow />
      <BackgroundClouds />

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
            <h1 className="text-3xl md:text-4xl font-winky text-sage-dark mb-6 relative z-50">
              Exercise: {id}
            </h1>
            
            <div className="prose prose-sage max-w-none">
              <p>This is a placeholder for the {id} exercise content.</p>
              <p>In a real application, this page would contain:</p>
              <ul>
                <li>Interactive exercise activities</li>
                <li>Audio pronunciation guides</li>
                <li>Vocabulary practice</li>
                <li>Grammar explanations</li>
                <li>Progress tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 