import { NewsCard } from "@/components/newsCard"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { Sponsor } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <NewsCard
              large
              title="Pertandingan panas antara club macan VS club singa"
              content="TimnasClub Macan, Herve Renard, bakal mundur dari jabatannya setelah kalah 2-2 dari Timnas Indonesia di matchday keenam Grup C Kualifikasi Piala Dunia 2026 zona Asia? Setelah Timnas Arab Saudi kalah 2-2 dari Timnas Indonesia, Herve Renard didesak mundur dari jabatannya."
              image="/placeholder.svg?height=400&width=800"
              label="News"
            />
          </div>
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <NewsCard
                key={i}
                title="SMK Telkom Malang berkontribusi dalam Timnas U-17 tahun 2023"
                image="/placeholder.svg?height=200&width=300"
                label="News"
              />
            ))}
          </div>
        </div>
      </main>
      <Sponsor/>
      <Footer />
    </div>
  )
}

