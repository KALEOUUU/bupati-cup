import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Team } from "@/pages/types/dashboard"
import { EditClub } from "./editClub"

interface TeamCardProps {
  team: Team
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-center">
            <Image
              src={team.photo}
              alt={team.club_nama}
              className="h-24 w-24"
              width={96}
              height={96}
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{team.club_nama}</h3>
            </div>
          </div>
          <EditClub
            team={team}
            trigger={
              <Button variant="outline" size="sm" className="text-[#BE1E2D] bg-[#FFF1F2] hover:bg-[#BE1E2D] hover:text-[#FFF1F2]">
                Edit
              </Button>
            }
          />
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="font-medium">M</div>
              <div>{team.main}</div>
            </div>
            <div>
              <div className="font-medium">S</div>
              <div>{team.menang}</div>
            </div>
            <div>
              <div className="font-medium">K</div>
              <div>{team.kalah}</div>
            </div>
            <div>
              <div className="font-medium">Poin</div>
              <div>{team.poin}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

