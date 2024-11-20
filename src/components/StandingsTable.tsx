import React from "react";

// Define types
type ClubList = {
  id: number;
  nama: string;
  main: number;
  poin: number;
  menang: number;
  kalah: number;
  seri: number;
  goal: number;
  kebobolan: number;
  selisih: number;
};

type Data = {
  group_name: string;
  club_list: ClubList[];
};

// Tipe StandingsTableProps diperbaiki menjadi data: Data
interface StandingsTableProps {
  data: Data;  // Menggunakan nama `data` sesuai dengan nama props yang diterima
}

const StandingsTable: React.FC<StandingsTableProps> = ({ data }) => {
  const standings = data || [];

  // Conditional rendering should be fixed here:
  if (!standings.group_name || standings.group_name.length === 0) {
    return <h1>Under maintenance</h1>;
  }

  return (
    <div className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <div className="bg-red-500 text-white p-4">
            <h2 className="text-center text-xl font-bold">Clasement Group {data.group_name}</h2>
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
                    <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">K</th>  {/* Kebobolan */}
                    <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">G</th>  {/* Goal */}
                    <th className="w-16 p-3 text-center font-semibold border-b border-r text-primaryRed">+/-</th>  {/* Goal Difference */}
                    <th className="w-24 p-3 text-center font-semibold border-b border-r text-primaryRed">P</th>  {/* Points */}
                  </tr>
                </thead>
                <tbody>
                  {standings.club_list.map((team, index) => (
                    <tr
                      key={index}
                      className={`
                        hover:bg-gray-50 transition-colors
                        ${index < 4 ? 'border-l-4 border-l-green-500' : ''}
                        ${index >= standings.club_list.length - 3 ? 'border-l-4 border-l-red-500' : ''}
                      `}
                    >
                      <td className={`w-16 p-3 text-center border-r text-primaryRed ${index === standings.club_list.length - 1 ? 'first:rounded-bl-lg' : 'border-b'}`}>{team.id}</td>
                      <td className={`w-64 p-3 font-medium border-r text-primaryRed ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>{team.nama}</td>
                      <td className={`w-16 p-3 text-center border-r text-primaryRed ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>{team.main}</td>
                      <td className={`w-16 p-3 text-center border-r text-primaryRed ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>{team.menang}</td>
                      <td className={`w-16 p-3 text-center border-r text-primaryRed ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>{team.seri}</td>
                      <td className={`w-16 p-3 text-center border-r text-primaryRed ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>{team.kalah}</td>
                      <td className={`w-16 p-3 text-center border-r ${team.kebobolan > team.goal ? 'text-red-600' : 'text-green-600'} ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>
                        {team.kebobolan}
                      </td>
                      <td className={`w-16 p-3 text-center border-r ${team.goal > team.kebobolan ? 'text-green-600' : 'text-red-600'} ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>
                        {team.goal}
                      </td>
                      <td className={`w-16 p-3 text-center border-r ${team.selisih >= 0 ? 'text-green-600' : 'text-red-600'} ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>
                        {team.selisih >= 0 ? `+${team.selisih}` : `-${Math.abs(team.selisih)}`}
                      </td>
                      <td className={`w-24 p-3 text-center font-bold border-r text-primaryRed ${index === standings.club_list.length - 1 ? '' : 'border-b'}`}>{team.poin}</td>
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

export default StandingsTable;
