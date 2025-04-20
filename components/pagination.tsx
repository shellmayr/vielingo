"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
}

export function Pagination({ currentPage, totalPages, itemsPerPage }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const handlePageChange = (page: number) => {
    router.push(createPageURL(page))
  }

  // Calculate the range of pages to show
  const getPageRange = () => {
    const range = []
    const maxVisiblePages = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let end = Math.min(totalPages, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
      range.push(i)
    }

    return range
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          currentPage === 1
            ? "bg-cream/10 text-sage-dark/30 border-sage-light/5 cursor-not-allowed"
            : "bg-cream/40 hover:bg-cream/60 text-sage-dark border-sage-light/30 hover:border-sage-light/40 shadow-sm hover:shadow-md"
        }`}
      >
        Previous
      </Button>

      {getPageRange().map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            page === currentPage
              ? "bg-tan text-white hover:bg-tan-dark shadow-lg scale-105 border-tan hover:border-tan-dark"
              : "bg-cream/20 hover:bg-cream/40 text-sage-dark/50 border-sage-light/10 hover:border-sage-light/20"
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-cream/10 text-sage-dark/30 border-sage-light/5 cursor-not-allowed"
            : "bg-cream/40 hover:bg-cream/60 text-sage-dark border-sage-light/30 hover:border-sage-light/40 shadow-sm hover:shadow-md"
        }`}
      >
        Next
      </Button>
    </div>
  )
} 