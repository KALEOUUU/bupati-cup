import React from "react";
import { useFetchData } from "@/feature/fetchData";

const StandingsTable = () => {
  const { data: clasements } = useFetchData();

  const renderGroups = () => {
    return clasements.map((group: any, groupIndex: number) => (
      <div key={groupIndex} className="mb-8">
        {/* Nama Grup */}
        <div className="bg-red-500 text-white p-4">
          <h2 className="text-center text-xl font-bold">Clasement Group {group.group_name}</h2>
        </div>

        {/* Tabel Data Klub */}
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
                {group.club_list.map((item: any, index: number) => (
                  <tr
                    key={item.id}
                    className={`
                      hover:bg-gray-50 transition-colors
                      ${index === 0 ? "border-l-4 border-l-green-500" : ""}
                      ${index > 0 ? "border-l-4 border-l-red-500" : ""}
                    `}
                  >
                    <td className="w-16 p-3 text-center border-r text-primaryRed">{index + 1}</td>
                    <td className="w-64 p-3 font-medium border-r text-primaryRed">{item.nama}</td>
                    <td className="w-16 p-3 text-center border-r text-primaryRed">{item.main}</td>
                    <td className="w-16 p-3 text-center border-r text-primaryRed">{item.menang}</td>
                    <td className="w-16 p-3 text-center border-r text-primaryRed">{item.seri}</td>
                    <td className="w-16 p-3 text-center border-r text-primaryRed">{item.kalah}</td>
                    <td className={`w-16 p-3 text-center border-r ${item.kebobolan > item.goal ? "text-red-600" : "text-green-600"}`}>{item.kebobolan}</td>
                    <td className={`w-16 p-3 text-center border-r ${item.goal > item.kebobolan ? "text-green-600" : "text-red-600"}`}>{item.goal}</td>
                    <td className={`w-16 p-3 text-center border-r ${item.selisih >= 0 ? "text-green-600" : "text-red-600"}`}>{item.selisih >= 0 ? `+${item.selisih}` : item.selisih}</td>
                    <td className="w-24 p-3 text-center font-bold border-r text-primaryRed">{item.poin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          {clasements ? renderGroups() : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;
