import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

// Define types for the top scorer data
interface TopScorer {
  nama: string;
  goal: number;
  assist: number;
  club: string;
}

const TopScorerTable: React.FC = () => {
  const [players, setPlayers] = useState<TopScorer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/user/topscore');
      
      if (response.data && Array.isArray(response.data.message)) {
        // Sort players by goals in descending order
        const sortedPlayers = response.data.message.sort((a: TopScorer, b: TopScorer) => b.goal - a.goal);
        
        setPlayers(sortedPlayers);
        setError(null);
      } else {
        setError("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching top scorer data:", error);
      setError("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <div className="text-center p-4 text-primaryRed">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <div className="bg-red-500 text-white p-4">
            <h2 className="text-center text-xl font-bold">Top Scorers</h2>
          </div>

          <div className="p-6 bg-white">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">Pos</th>
                    <th className="w-64 p-3 text-left font-semibold border-b border-r text-primaryRed">Player</th>
                    <th className="w-64 p-3 text-left font-semibold border-b border-r text-primaryRed">Club</th>
                    <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">Goals</th>
                    <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">Assists</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr
                      key={player.nama}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="w-16 p-3 text-center border-r text-primaryRed">{index + 1}</td>
                      <td className="w-64 p-3 font-medium border-r text-primaryRed">{player.nama}</td>
                      <td className="w-64 p-3 font-medium border-r text-primaryRed">{player.club}</td>
                      <td className="w-16 p-3 text-center border-r text-primaryRed">{player.goal}</td>
                      <td className="w-16 p-3 text-center border-r text-primaryRed">{player.assist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {players.length === 0 && (
              <p className="text-center text-primaryRed p-4">No top scorers data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopScorerTable;