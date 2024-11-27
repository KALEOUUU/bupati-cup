import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  playerName: string
  playerNumber: string
  position: string
  goals: number
  assists: number
  image: string
}

export function StatsCard({
  playerName,
  playerNumber,
  position,
  goals,
  assists,
  image,
}: StatsCardProps) {
  return (
    <div className="p-1">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={image}
              alt={playerName}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{playerName}</h3>
              <span className="text-sm font-medium text-gray-500">{position}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{playerNumber}</span>
              <div className="space-y-1 text-sm text-gray-500">
                <p>Gol : {goals}</p>
                <p>Assists : {assists}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

