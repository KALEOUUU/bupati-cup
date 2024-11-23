import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface TeamStats {
  position: number;
  name: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  form: ('W' | 'L' | 'D')[];
}

export function LeagueTable() {
  const teams: TeamStats[] = Array(10).fill(null).map((_, i) => ({
    position: i + 1,
    name: "Setan Merah",
    played: i === 9 ? 4 : 10,
    won: 2,
    lost: i === 9 ? 7 : 0,
    points: i === 9 ? 14 : 20,
    form: i === 9 ? ['L', 'L', 'L', 'D', 'L'] : ['W', 'W', 'W', 'W', 'W']
  }))

  return (
    <section className="bg-[#EDF2F7] py-12">
      <div className="container ml-[120px]">
        <Card>
          <CardHeader>
            <CardTitle>Klasement Liga immortal Cup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-b-3xl">
              <table className="w-full justify-center">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Pos</th>
                    <th className="text-left p-4 font-medium">Team</th>
                    <th className="text-center p-4 font-medium">Menang</th>
                    <th className="text-center p-4 font-medium">Seri</th>
                    <th className="text-center p-4 font-medium">Kalah</th>
                    <th className="text-center p-4 font-medium">Poin</th>
                    <th className="text-center p-4 font-medium">5 Terakhir</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.position} className="border-b">
                      <td className="p-4">{team.position}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="relative w-6 h-6">
                            <Image
                              src="/placeholder.svg"
                              alt={team.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          {team.name}
                        </div>
                      </td>
                      <td className="text-center p-4">{team.played}</td>
                      <td className="text-center p-4">{team.won}</td>
                      <td className="text-center p-4">{team.lost}</td>
                      <td className="text-center p-4">{team.points}</td>
                      <td className="p-4">
                        <div className="flex gap-1 justify-center">
                          {team.form.map((result, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                result === 'W' ? 'bg-green-500' :
                                result === 'L' ? 'bg-red-500' :
                                'bg-yellow-500'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

