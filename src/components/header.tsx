import Link from "next/link"
// import { Search } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#14387F] text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8 mr-10">
        <Link href="/" className="text-xl font-bold ml-[60px]">
            IMMORTAL CUP
          </Link>
          <nav className="hidden md:flex gap-8 ">
            <Link href="/news" className="text-sm font-medium hover:text-white/80 ">
              News
            </Link>
            <Link href="/klasement" className="text-sm font-medium hover:text-white/80">
              Klasement
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

