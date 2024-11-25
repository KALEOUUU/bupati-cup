import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Match } from "@/pages/types/dashboard"

interface MatchesListProps {
  matches: Match[]
}

export function MatchList({ matches }: MatchesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pertandingan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {matches.map((match) => (
            <div key={match.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg"
                  alt={match.homeTeam.name}
                  className="h-8 w-8"
                  width={32}
                  height={32}
                />
                <span className="text-sm font-medium">{match.homeTeam.name}</span>
              </div>
              {match.score ? (
                <div className="text-sm font-bold">
                  {match.score.home} - {match.score.away}
                </div>
              ) : null}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{match.awayTeam.name}</span>
                <Image
                  src="/placeholder.svg"
                  alt={match.awayTeam.name}
                  className="h-8 w-8"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

