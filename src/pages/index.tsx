import { SiteHeader } from "@/components/header"
import { HeroSection } from "@/components/hero"
import { StatsSection } from "@/components/statsSection"
import  LeagueTable  from "@/components/table"
import { Footer }      from "@/components/Footer"
import ScrollLogo from "@/components/scrolllogo"
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <center>
        <h1 className="text-5xl text-primaryRed font-bold">Suported By</h1>
        </center>
        <ScrollLogo />
        <StatsSection />
        <LeagueTable />
      </main>
      <Footer />
    </div>
  )
}

