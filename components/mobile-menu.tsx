"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-sage-dark">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-cream border-sage-dark/20 w-[250px]">
        <div className="flex flex-col gap-6 mt-10">
          <Button variant="ghost" className="justify-start text-sage-dark text-lg font-winky">
            Languages
          </Button>
          <Button variant="ghost" className="justify-start text-sage-dark text-lg font-winky">
            My Progress
          </Button>
          <Button variant="ghost" className="justify-start text-sage-dark text-lg font-winky">
            Quests
          </Button>
          <Button variant="ghost" className="justify-start text-sage-dark text-lg font-winky">
            Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

