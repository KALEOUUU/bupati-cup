import { Sidebar } from "@/components/sideBar";
// import { TeamCard } from "@/components/teamCard";
// import { MatchList } from "@/components/matchList";
import { PlayerCard } from "@/components/playerCard";

// const teams = [
//   {
//     id: "1",
//     name: "Setan Merah",
//     group: "A",
//     stats: {
//       matches: 10,
//       wins: 2,
//       losses: 0,
//       points: 22,
//     },
//   },
//   {
//     id: "2",
//     name: "Setan Setan",
//     group: "B",
//     stats: {
//       matches: 10,
//       wins: 2,
//       losses: 0,
//       points: 22,
//     },
//   },
// ];

const players = [
  {
    id: "1",
    name: "Cristiano Ronaldo",
    number: 7,
    position: "Forward",
    stats: {
      goals: 12,
      assists: 8,
    },
    imageUrl: "/ronaldo.jpg",
  },
  {
    id: "2",
    name: "Lionel Messi",
    number: 10,
    position: "Forward",
    stats: {
      goals: 15,
      assists: 10,
    },
    imageUrl: "/messi.jpg",
  },
  {
    id: "3",
    name: "Paul Pogba",
    number: 6,
    position: "Midfielder",
    stats: {
      goals: 5,
      assists: 12,
    },
    imageUrl: "/pogba.jpg",
  },
];

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
          {/* Players Section */}
          <div className="lg:col-span-1 xl:col-span-2">
            <div className="grid gap-8 md:grid-cols-2">
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onEdit={(player) => console.log("Editing player:", player)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
