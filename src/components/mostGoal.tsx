import React from "react";

// Define types for the new data
interface TopScorer {
  nama: string;
  goals: number;
  assists: number;
  club: string
}

interface TopScorerTableProps {
  data: TopScorer[];
}

const TopScorerTable: React.FC<TopScorerTableProps> = ({}) => {
  const topScorers = [
    {
      playerName: "Cristiano Ronaldo",
      teamName: "Manchester United",
      goals: 25,
      assists: 7,
    },
    {
      playerName: "Mohamed Salah",
      teamName: "Liverpool",
      goals: 22,
      assists: 9,
    },
    {
      playerName: "Harry Kane",
      teamName: "Tottenham Hotspur",
      goals: 20,
      assists: 5,
    },
  ];

  return (
    <div className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
          Top Scorers
        </h1>

        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <div className="bg-red-500 text-white p-4">
            <h2 className="text-center text-xl font-bold">Top Scorers</h2>
          </div>

          <div className="p-6 bg-white">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-1/5 p-3 text-center font-semibold border-b border-r first:rounded-tl-lg text-red-600">Player</th>
                    <th className="w-1/4 p-3 text-center font-semibold border-b border-r text-red-600">Team</th>
                    <th className="w-1/6 p-3 text-center font-semibold border-b border-r text-red-600">Goals</th>
                    <th className="w-1/6 p-3 text-center font-semibold border-b border-r text-red-600">Assists</th>
                  </tr>
                </thead>
                <tbody>
                  {topScorers.map((player, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 text-center border-r text-red-600">{player.playerName}</td>
                      <td className="p-3 text-center border-r text-red-600">{player.teamName}</td>
                      <td className="p-3 text-center border-r text-red-600">{player.goals}</td>
                      <td className="p-3 text-center border-r text-red-600">{player.assists}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopScorerTable;
