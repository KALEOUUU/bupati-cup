import Messi from "../../public/messi.jpeg"
import Image from "next/image"
import * as React from "react"
import ScrolLogo from "../components/scrolllogo"
import useEmblaCarousel from "embla-carousel-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Pertandingan panas antara club macan VS club singa",
    description: "Pertandingan berakhir dengan hasil imbang tanpa ada pemenang dengan hasil akhir 2 - 2!",
    image: "/placeholder.svg?height=900&width=1600",
  },
  {
    id: 2,
    title: "Match Highlights",
    description: "Key moments from the thrilling draw",
    image: "/placeholder.svg?height=900&width=1600",
  },
  {
    id: 3,
    title: "Post Match Analysis",
    description: "Tactical breakdown of the game",
    image: "/placeholder.svg?height=900&width=1600",
  },
]


export function HeroSection() {

  return (
    <center>
      <section className="w-[calc(100%-20px)]">
     <div className="p-[50px] max-lg:p-[25px] max-md:p-[10px]">
       {/* News Grid */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Featured Article */}
        <Card className="md:col-span-2 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <Image
                src={Messi}
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 "
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 text-left">
                  {newsData[0].title}
                </h2>
                <p className="text-white/90 text-left max-sm:hidden">
                  {newsData[0].description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Articles */}
        <div className="flex flex-col gap-4">
          {newsData.slice(1).map((article) => (
            <Card key={article.id} className="overflow-hidden flex-1">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <Image
                    src={Messi}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex flex-col justify-end">
                      <h3 className="text-lg font-semibold text-white mb-2 text-left">
                        {article.title}
                      </h3>
                      <Button  size="sm" className="self-start bg-primaryRed text-white transition-all duration-500 ease-in-out hover:bg-white hover:text-primaryRed">
                        View More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
     </div>
    </section>
    </center>
  )
}


