import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { AnimalsDisplay } from "@/components/animals-display"
import { Metadata } from 'next'

// Basic metadata for the home page
export const metadata: Metadata = {
  title: "Vielingo | Learn German Effectively",
  description: "Vielingo helps you learn German through interactive exercises and a personalized learning experience. Start your journey to fluency today!",
}

export async function generateImageMetadata() {
  // We're not using params or searchParams here, so they are omitted
  return [{
    url: '/bear.png', // Assuming bear.png is in the public folder
    width: 1200,
    height: 630,
    alt: 'Vielingo - Learn German Effectively',
  }]
}

export default function Home() {
  return (
    <div className="min-h-screen bg-sage-green relative overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-20 pt-8 pb-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-sage-dark text-4xl md:text-6xl font-winky leading-tight mb-8 relative z-50">
            Learn German, with your furry friends (and Frank the frog)
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 relative z-50">
            <Button className="bg-tan hover:bg-tan/90 text-white rounded-full px-8 py-6 text-lg font-medium" asChild>
              <a href="/exercises">Start Your Journey</a>
            </Button>
          </div>
        </div>

        {/* Animals with speech bubbles */}
        <AnimalsDisplay />
      </main>
    </div>
  )
}

