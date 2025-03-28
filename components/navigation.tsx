import { Logo } from "@/components/logo"
import { MobileMenu } from "@/components/mobile-menu"

export function Navigation() {
  return (
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
  )
} 