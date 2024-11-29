import { SiteHeader } from "@/components/header"
import { HeroSection } from "@/components/hero"
import { StatsSection } from "@/components/statsSection"
import  LeagueTable  from "@/components/table"
import { Footer }      from "@/components/Footer"
import ScrollLogo from "@/components/scrolllogo"
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ScrollLogo/>
        <StatsSection />
        <LeagueTable />
      </main>
      <Footer />
    </div>
  )
}

