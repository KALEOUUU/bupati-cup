import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="bg-[#EDF2F7] py-6">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-[2fr,1fr] mx-auto max-w">
          <Card className="overflow-hidden ml-[180px]">
            <CardContent className="p-0">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/placeholder.svg"
                  alt="Featured Match"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  Pertandingan panas antara club macan VS club singa
                </h2>
                <p className="text-muted-foreground">
                  Pertandingan berakhir dengan hasil imbang tanpa ada pemenang dengan hasil akhir 2 - 2!
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/placeholder.svg"
                      alt={`Related Match ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-center">
              <Image
                src="/placeholder.svg"
                alt={`Partner ${i}`}
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

