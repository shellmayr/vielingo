import { Logo } from "@/components/logo"
import { MobileMenu } from "@/components/mobile-menu"
import Link from "next/link"

export function Navigation() {
  return (
    <header className="relative z-40">
      <nav className="mx-auto max-w-6xl px-4 py-4">
        <div className="bg-cream rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Logo />
                <span className="text-sage-dark text-xl font-winky z-50">VieLinGo</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 z-50">
            <Link href="/" className="text-sage-dark font-medium hover:text-sage-dark/80 transition-colors">
              Home
            </Link>
            <Link href="/exercises" className="text-sage-dark font-medium hover:text-sage-dark/80 transition-colors">
              Exercises
            </Link>
          </div>

          <MobileMenu />
        </div>
      </nav>
    </header>
  )
} 