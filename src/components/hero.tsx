import Image from "next/image"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { socket } from "@/config/config"

import defaultNews1 from "@/assets/news.jpg"
import defaultNews2 from "@/assets/news2.jpg"
import defaultNews3 from "@/assets/news3.jpg"

type newstype = {
  id: number,
  judul: string, // Mengubah judul menjadi title
  deskripsi: string, // Mengubah deskription menjadi description
  foto: any, // Mengubah foto menjadi image
  link: string
}

const defaultNews = [
  {
    id: 1,
    judul: "SMK TELKOM MALANG X TIMNAS INDONESIA",
    deskripsi: "kontribusi SMK Telkom Malang dalam sepak bola indonesia",
    foto: defaultNews1,
    link: "https://timesindonesia.co.id/indonesia-positif/469929/smk-telkom-malang-berkontribusi-di-timnas-indonesia-yang-tampil-di-piala-dunia-u17-2023"
  },
  {
    id: 2,
    judul: "DIESNATALIS SMK TELKOM MALANG",
    deskripsi: "kolaborasi SMK Telkom dengan industri",
    foto: defaultNews2,
    link: "https://timesindonesia.co.id/indonesia-positif/470774/dies-natalis-ke31-lulusan-smk-telkom-malang-siap-bersaing-di-level-global-moklet-go-global"
  },
  {
    id: 3,
    judul: "SMK TELKOM BERMAIN PADA DBL",
    deskripsi: "kolaborasi SMK Telkom dengan industri",
    foto: defaultNews3,
    link: "https://www.dbl.id/s/profile/13763/smk-telkom-malang"
  }
]

export function HeroSection() {
  const [news, setNews] = React.useState<newstype[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const newsData = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get("http://localhost:5000/news")
      if (res.data && res.data.length > 0) {
        setNews(res.data)
      } else {
        setNews(defaultNews)
      }
    } catch (error) {
      console.error("Error fetching news:", error)
      setNews(defaultNews)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    newsData()

    socket.on("change_data_news", newsData)

    return () => {
      socket.off("change_data_news", newsData)
    }
  }, [])

  if (isLoading) {
    return (
      <center>
        <div className="w-[calc(100%-20px)] h-[500px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primaryRed"></div>
        </div>
      </center>
    )
  }

  if (!news.length) return null

  return (
    <center>
      <section className="w-[calc(100%-20px)] overflow-y-hidden">
        <div className="p-[50px] max-lg:p-[25px] max-md:p-[10px]">
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Featured Article */}
            <Card className="md:col-span-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <a href={news[0].link} target="_blank">
                    <Image
                      src={news[0].foto}
                      alt={news[0].judul}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                  </a>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 text-left">
                      {news[0].judul}
                    </h2>
                    <p className="text-white/90 text-left max-sm:hidden">
                      {news[0].deskripsi}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Articles */}
            <div className="flex flex-col gap-4">
              {news.slice(1).map((article) => (
                <Card key={article.id} className="overflow-hidden flex-1">
                  <CardContent className="p-0">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      
                        <Image
                          src={article.foto}
                          alt={article.judul}
                          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                        />
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex flex-col justify-end">
                          <h3 className="text-lg font-semibold text-white mb-2 text-left">
                            {article.judul}
                          </h3>
                          <a href={article.link} target="_blank" className="self-start">
                          <Button size="sm" className=" bg-primaryRed text-white transition-all duration-500 ease-in-out hover:bg-white hover:text-primaryRed">
                            View More
                          </Button>
                          </a>
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
