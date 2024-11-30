"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award} from 'lucide-react'
import axios from "axios"
import { socket } from "@/config/config"

interface PlayerData {
  name: string;
  club: string;
  goal: number | string;
  assist: number | string;
  no: number | string;
  posisi: string;
  foto: string;
}

interface CoachData {
  foto: string;
  name: string;
  club: string;
}

interface message {
  type: string,
  data: PlayerData[] | CoachData[]
}

export default function StatsSection() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [dataHighlight, setData] = React.useState<message[]>([])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/highligh")
      setData(res.data.message)
    } catch (error) {
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()

    socket.on("change_data_highlight", async () => {
      fetchData()
    } )

    return () => {
      socket.off("change_data_news")
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
  
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dataHighlight.map((highlight, index) => (
            highlight.data.map((item: any, dataIndex: number) => (
              <Card key={`${index}-${dataIndex}`} className="bg-white border-none transition-all duration-300 hover:shadow-xl w-full">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{highlight.type}</h3>
                    <Award className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="w-full aspect-square relative mb-4 rounded-lg overflow-hidden group">
                    <Image
                      src={item.foto}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <p className="text-xl font-bold text-gray-900 line-clamp-1">{item.name}</p>
                    {'posisi' in item && (
                      <p className="text-lg text-black font-bold">
                        #{item.no} · {item.posisi}
                      </p>
                    )}
                    <p className="text-lg text-black line-clamp-1">{item.club}</p>
                    {'goal' in item ? (
                      <div className="flex justify-between mt-2">
                        <div className="text-center">
                          <span className="text-md font-bold text-black">Goals</span>
                          <p className="text-lg font-bold text-red-600">{item.goal}</p>
                        </div>
                        <div className="text-center">
                          <span className="text-md font-bold text-black">Assists</span>
                          <p className="text-lg font-bold text-red-600">{item.assist}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))
          ))}
        </div>
      </div>
    </section>
  )
}