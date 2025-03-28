import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { AnimalsDisplay } from "@/components/animals-display"

export default function Home() {
  return (
    <div className="min-h-screen bg-sage-green relative overflow-hidden">
      {/* Background clouds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-8 pb-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-sage-dark text-4xl md:text-6xl font-winky leading-tight mb-8">
            Learn to speak with the world,
            <br />
            bringing languages to life.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
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

