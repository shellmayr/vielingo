"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoText } from "@/components/logo-text"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-sage-dark">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-cream border-sage-dark/20 w-[250px]">
        <div className="flex items-center gap-2 mb-8 mt-6">
          <LogoText />
        </div>
        
        <div className="flex flex-col gap-4">
          <Link 
            href="/"
            className={`py-3 px-4 rounded-lg text-sage-dark text-lg font-medium transition-colors ${
              isActive('/') ? 'bg-tan-light text-white' : 'hover:bg-sage-light/20'
            }`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            href="/exercises"
            className={`py-3 px-4 rounded-lg text-sage-dark text-lg font-medium transition-colors ${
              isActive('/exercises') ? 'bg-tan-light text-white' : 'hover:bg-sage-light/20'
            }`}
            onClick={() => setOpen(false)}
          >
            Exercises
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

