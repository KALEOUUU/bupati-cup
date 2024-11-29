"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Star, Award, UserCheck } from 'lucide-react'
import Messi from "../../public/messi.jpeg"

const stats = [
  {
    title: "Top Scorer",
    icon: Trophy,
    playerName: "Lionel Messi`",
    playerNumber: "10",
    position: "CF",
    team: "Kedungkandang FC",
    goals: 28,
    assists: 12,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Player of the Match",
    icon: Star,
    playerName: "Kevin De Bruyne",
    playerNumber: "17",
    position: "CAM",
    team: "Manchester City",
    goals: 10,
    assists: 20,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Most Valuable Player",
    icon: Award,
    playerName: "Kylian Mbappé",
    playerNumber: "7",
    position: "ST",
    team: "Paris Saint-Germain",
    goals: 25,
    assists: 7,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Best Coach",
    icon: UserCheck,
    playerName: "Pep Guardiola",
    team: "Manchester City",
    winRate: "74%",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800  sm:py-12 md:py-16">
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, index) => (
            <Card key={index} className="bg-white border-none transition-all duration-300 hover:shadow-xl w-full">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <item.icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="w-full aspect-square relative mb-4 rounded-lg overflow-hidden group">
                  <Image
                    src={Messi}
                    alt={item.playerName}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-grow space-y-2">
                  <p className="text-xl font-bold text-gray-900 line-clamp-1">{item.playerName}</p>
                  {item.playerNumber && (
                    <p className="text-lg text-black font-bold">
                      #{item.playerNumber} · {item.position}
                    </p>
                  )}
                  <p className="text-lg text-black line-clamp-1">{item.team}</p>
                  {item.goals !== undefined && item.assists !== undefined ? (
                    <div className="flex justify-between mt-2">
                      <div className="text-center">
                        <span className="text-md font-bold text-black">Goals</span>
                        <p className="text-lg font-bold text-red-600">{item.goals}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-md font-bold text-black">Assists</span>
                        <p className="text-lg font-bold text-red-600">{item.assists}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-md font-bold text-black">Win Rate</span>
                      <span className="text-lg font-bold text-red-600">{item.winRate}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

