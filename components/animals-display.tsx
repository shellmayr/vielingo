import Image from "next/image"
import { SpeechBubble } from "@/components/speech-bubble"
import { SpotlightGlow } from "@/components/spotlight-glow"

export function AnimalsDisplay() {
  return (
    <div className="relative mt-16 flex justify-center">
      <div className="relative max-w-3xl w-full">
        {/* Animal spotlight glow */}
        <SpotlightGlow />
        
        {/* Main animal illustration */}
        <div className="flex justify-center mb-8 relative z-10">
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
        <div className="absolute top-[0px] left-[25%] animate-float-slow z-30">
          <SpeechBubble text="Grüß Dich" position={{}} />
        </div>

        <div className="absolute top-[150px] right-[30%] animate-float-slow z-30" style={{ animationDelay: "1.5s" }}>
          <SpeechBubble text="Hallo" position={{}} />
        </div>

        <div className="absolute top-[-50px] left-[50%] animate-float-slow z-30" style={{ animationDelay: "0.8s" }}>
          <SpeechBubble text="Servus" position={{}} />
        </div>
      </div>
    </div>
  )
} 