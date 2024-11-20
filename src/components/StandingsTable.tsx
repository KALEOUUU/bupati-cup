import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

interface Club {
  id: number;
  nama: string;
  main: number;
  menang: number;
  seri: number;
  kalah: number;
  kebobolan: number;
  goal: number;
  selisih: number;
  poin: number;
}

interface ClasementGroup {
  group_name: string;
  club_list: Club[];
}

const Clasement: React.FC = () => {
  const [clasements, setClasements] = useState<ClasementGroup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/user/clasement');
      
      if (response.data && Array.isArray(response.data.message)) {
        // Sort club lists by points in descending order for each group
        const sortedClasements = response.data.message.map(group => ({
          ...group,
          club_list: [...group.club_list].sort((a, b) => b.poin - a.poin)
        }));
        
        setClasements(sortedClasements);
        setError(null);
      } else {
        setError("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching klasemen data:", error);
      setError("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, []); 

  if (isLoading) return <div className="text-center p-4 text-primaryRed">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          {clasements.length > 0 ? (
            clasements.map((group) => (
              <div key={group.group_name} className="mb-8">
                <div className="bg-red-500 text-white p-4">
                  <h2 className="text-center text-xl font-bold">Klasemen Group {group.group_name}</h2>
                </div>

                <div className="p-6 bg-white">
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full border-collapse bg-white">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="w-16 p-3 text-center font-semibold border-b border-r first:rounded-tl-lg text-primaryRed">Pos</th>
                          <th className="w-64 p-3 text-left font-semibold border-b border-r text-primaryRed">Club</th>
                          <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">M</th>
                          <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">W</th>
                          <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">D</th>
                          <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">L</th>
                          <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">K</th>
                          <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">G</th>
                          <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">+/-</th>
                          <th className="w-24 p-3 text-center font-semibold border-b border-r text-primaryRed">P</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.club_list.map((club, clubIndex) => (
                          <tr
                            key={club.id}
                            className={`
                              hover:bg-gray-50 transition-colors
                              ${clubIndex === 0 ? "border-l-4 border-l-green-500 bg-green-50" : ""}
                              ${clubIndex > 0 && clubIndex < 2 ? "border-l-4 border-l-yellow-500" : ""}
                              ${clubIndex >= 2 ? "border-l-4 border-l-red-500" : ""}
                            `}
                          >
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{clubIndex + 1}</td>
                            <td className="w-64 p-3 font-medium border-r text-primaryRed">{club.nama}</td>
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{club.main}</td>
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{club.menang}</td>
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{club.seri}</td>
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{club.kalah}</td>
                            <td className={`w-16 p-3 text-center border-r ${club.kebobolan > club.goal ? "text-red-600" : "text-green-600"}`}>{club.kebobolan}</td>
                            <td className={`w-16 p-3 text-center border-r ${club.goal > club.kebobolan ? "text-green-600" : "text-red-600"}`}>{club.goal}</td>
                            <td className={`w-16 p-3 text-center border-r ${club.selisih >= 0 ? "text-green-600" : "text-red-600"}`}>{club.selisih >= 0 ? `+${club.selisih}` : club.selisih}</td>
                            <td className="w-24 p-3 text-center font-bold border-r text-primaryRed">{club.poin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-primaryRed p-4">Tidak ada data klasemen</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clasement;