"use client"

import { Logo } from "@/components/logo"
import { MobileMenu } from "@/components/mobile-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const linkStyle = "font-medium transition-all duration-300 py-2 px-5 rounded-full";
  const activeLinkStyle = "bg-tan-light text-white shadow-sm";
  const inactiveLinkStyle = "text-sage-dark bg-transparent hover:bg-sage-light/40";

  return (
    <header className="relative z-40">
      <nav className="mx-auto max-w-6xl px-4 py-4">
        <div className="bg-cream rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Logo />
                <span className="text-sage-dark text-xl font-mogra z-50">vielingo</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3 z-50">
            <Link 
              href="/" 
              className={`${linkStyle} ${isActive('/') ? activeLinkStyle : inactiveLinkStyle}`}
            >
              Home
            </Link>
            <Link 
              href="/exercises" 
              className={`${linkStyle} ${isActive('/exercises') ? activeLinkStyle : inactiveLinkStyle}`}
            >
              Exercises
            </Link>
          </div>

          <MobileMenu />
        </div>
      </nav>
    </header>
  )
} 