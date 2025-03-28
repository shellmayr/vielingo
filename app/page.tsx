import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { SpeechBubble } from "@/components/speech-bubble"
import { MobileMenu } from "@/components/mobile-menu"

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
      <header className="relative z-10">
        <nav className="mx-auto max-w-6xl px-4 py-4">
          <div className="bg-cream rounded-full px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-sage-dark text-xl font-winky">VieLinGo</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button className="text-sage-dark font-medium">Languages</button>
              <button className="text-sage-dark font-medium">My Progress</button>
              <button className="text-sage-dark font-medium">Quests</button>
              <button className="text-sage-dark font-medium">Settings</button>
            </div>

            <MobileMenu />
          </div>
        </nav>
      </header>

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
            <Button
              variant="outline"
              className="bg-sage-light/70 border-sage-dark/20 text-sage-dark rounded-full px-8 py-6 text-lg font-medium"
            >
              Preview Worlds
            </Button>
          </div>
        </div>

        {/* Animal Characters */}
        <div className="relative mt-16 flex justify-center">
          <div className="relative max-w-3xl w-full">
            {/* Main animal illustration */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/animals.png"
                alt="Animals learning languages"
                width={600}
                height={400}
                className="object-contain"
                priority
              />
            </div>

            {/* Speech bubbles */}
            <div className="absolute top-[0px] left-[25%] animate-float-slow">
              <SpeechBubble text="Grüß Dich" position={{}} />
            </div>

            <div className="absolute top-[150px] right-[30%] animate-float-slow" style={{ animationDelay: "1.5s" }}>
              <SpeechBubble text="Hallo" position={{}} />
            </div>

            <div className="absolute top-[-50px] left-[50%] animate-float-slow" style={{ animationDelay: "0.8s" }}>
              <SpeechBubble text="Servus" position={{}} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

