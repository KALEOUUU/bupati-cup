import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { socket } from "@/config/config";

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
  logo?: string;
}

interface ClasementGroup {
  group: string;
  list_club: Club[];
}

const Clasement: React.FC = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetcher = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/user/clasements")

      // Ensure the response contains the expected format
      if (response.data && Array.isArray(response.data.message)) {
        setError(null);
        
        // Sort club list by points descending
        const sortedData = response.data.message.map((group: ClasementGroup) => ({
          ...group,
          list_club: group.list_club.sort((a, b) => b.poin - a.poin),
        }));
        
        setData(sortedData)
      } else {
        alert("silahkan rrefresh halaman")
        setError("Invalid data format received");
      }
    } catch (error) {
      setError("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher()

    socket.on("change_data_group", async () => await fetcher())

    return () => {
      socket.off("change_data_news")
    }

  }, [])

  return (
    <div className="w-full px-2 py-8 bg-gray-50">
      <div className="mx-auto">
        <div className="grid grid-cols-2 w-full gap-[1rem] rounded-lg overflow-hidden shadow-lg max-lg:grid-cols-1">
          {isLoading ? (
            <p className="text-center text-primaryRed p-4">Loading...</p>
          ) : error ? (
            <p className="text-center text-primaryRed p-4">Error: {error}</p>
          ) : data && data.length > 0 ? (
            data.map((group: ClasementGroup) => (
              <div key={group.group} className="mb-8">
                <div className="bg-primaryRed rounded-t-lg text-white p-2">
                  <h2 className="text-center text-xl font-bold">Klasemen Group {group.group}</h2>
                </div>

                <div className="p-3 bg-white">
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
                        {group.list_club.map((club, clubIndex) => (
                          <tr
                            key={club.id}
                            className={`
                              hover:bg-gray-50 transition-colors
                              ${clubIndex === 0 ? "border-l-4 border-l-green-500 bg-green-50" : ""}
                              ${clubIndex > 0 && clubIndex < 2 ? "border-l-4 border-l-yellow-200" : ""}
                              ${clubIndex >= 2 ? "border-l-4 border-l-red-500" : ""}
                            `}
                          >
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{clubIndex + 1}</td>
                            <td className="w-64 p-3 font-medium border-r text-primaryRed">
                              <div className="flex items-center gap-2">
                                {club.logo ? (
                                  <div className="relative w-6 h-6 flex-shrink-0">
                                    <Image
                                      src={club.logo}
                                      alt={`${club.nama} logo`}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0" />
                                )}
                                <span className="text-primaryRed max-sm:hidden">{club.nama}</span>
                              </div>
                            </td>
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{club.main}</td>
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{club.menang}</td>
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{club.seri}</td>
                            <td className="w-16 p-3 text-center border-r text-primaryRed">{club.kalah}</td>
                            <td className={`w-16 p-3 text-center border-r ${club.kebobolan > club.goal ? "text-primaryRed" : "text-green-600"}`}>{club.kebobolan}</td>
                            <td className={`w-16 p-3 text-center border-r ${club.goal > club.kebobolan ? "text-green-600" : "text-primaryRed"}`}>{club.goal}</td>
                            <td className={`w-16 p-3 text-center border-r ${club.goal - club.kebobolan >= 0 ? "text-green-600" : "text-primaryRed"}`}>
                              {club.goal - club.kebobolan >= 0 ? `+${club.goal - club.kebobolan}` : `${club.goal - club.kebobolan}`}
                            </td>
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
