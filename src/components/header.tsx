import Link from "next/link"
// import { Search } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primaryRed text-white">
    <div className="container flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-20">
      <div className="flex gap-4 sm:gap-6 xl:gap-10 justify-center py-4 sm:py-2 file:overflow-hidden">
        <Link href="/" className="text-2xl font-bold max-sm:text-[17px] overflow-hidden">
          <i>BUPATI CUP </i>
        </Link>
        <div className="flex gap-4 sm:gap-6">
          <Link href="/news" className="text-2xl font-bold hover:text-white/80 max-md:hidden">
            <i>News</i>
          </Link>
          <Link href="/klasement" className="text-2xl font-bold hover:text-white/80 max-md:hidden">
            <i>Klasement</i>
          </Link>
        </div>
      </div>
    </div>
  </header>
  )
}

