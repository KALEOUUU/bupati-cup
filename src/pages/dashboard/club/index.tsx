import { Sidebar } from "@/components/sideBar"
import { TeamCard } from "@/components/teamCard"
import { MatchList } from "@/components/matchList"

const teams = [
  {
    id: "1",
    name: "Setan Merah",
    group: "A",
    stats: {
      matches: 10,
      wins: 2,
      losses: 0,
      points: 22,
    },
  },
  {
    id: "2",
    name: "Setan Setan",
    group: "B",
    stats: {
      matches: 10,
      wins: 2,
      losses: 0,
      points: 22,
    },
  },
]

const matches = [
  {
    id: "1",
    homeTeam: teams[0],
    awayTeam: teams[1],
    score: {
      home: 2,
      away: 0,
    },
    date: "Rabu, 20 Nov 2024",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#FFF1F2]">
      <div className="w-64 bg-background">
        <Sidebar />
      </div>
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="space-y-8 lg:col-span-1 xl:col-span-2">
            <div className="grid gap-8 md:grid-cols-2">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <MatchList matches={matches} />
          </div>
        </div>
      </main>
    </div>
  )
}

