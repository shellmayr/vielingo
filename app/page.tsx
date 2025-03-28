import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { AnimalsDisplay } from "@/components/animals-display"

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
            <Button className="bg-tan hover:bg-tan/90 text-white rounded-full px-8 py-6 text-lg font-medium">
              Start Your Journey
            </Button>
          </div>
        </div>

        {/* Animals with speech bubbles */}
        <AnimalsDisplay />
      </main>
    </div>
  )
}

