"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import { StatsCard } from "./ui/statsCard"

const stats = [
  {
    title: "Top Assists",
    playerName: "Paulo Dybala",
    playerNumber: "21",
    position: "RWF",
    goals: 16,
    assists: 20,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Top Scorer",
    playerName: "Paulo Dybala",
    playerNumber: "21",
    position: "RWF",
    goals: 16,
    assists: 20,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Player Of The Match",
    playerName: "Paulo Dybala",
    playerNumber: "21",
    position: "RWF",
    goals: 16,
    assists: 20,
    image: "/placeholder.svg?height=400&width=400",
  },
]

export function StatsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="bg-[#14326F] py-12">
      <div className="container relative mx-auto">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <h2 key={stat.title} className="text-2xl font-bold text-white">
                {stat.title}
              </h2>
            ))}
          </div>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%]">
                    <StatsCard {...stat} />
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

