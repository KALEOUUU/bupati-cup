import { socket } from "@/config/config";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

// Define types for the top scorer data
interface TopScorer {
    nama: string;
    goal: number;
    club: string;
    logo: string;
}

const TopScorerTable = () => {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState<TopScorer[]>();

    const fetcher = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://be-most.smktelkom.mlg/api/v1/user/topscores`);
            setPlayers(res.data.message);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    useState(() => {
        fetcher();

        socket.on("update_top_scores", async () => await fetcher());

        return () => {
            socket.off("update_top_scores");
        };
    });

    if (loading) {
        return (
            <center>
                <div className="w-[calc(100%-20px)] h-[500px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primaryRed"></div>
                </div>
            </center>
        );
    }

    return (
        <div className="w-full px-4 py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="w-full rounded-lg overflow-hidden shadow-lg">
                    <div className="bg-primaryRed text-white p-4">
                        <h2 className="text-center text-xl font-bold">Top Scorers</h2>
                    </div>

                    <div className="p-6 bg-white">
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-3 text-center font-semibold border-b border-r text-primaryRed">Pos</th>
                                        <th className="p-3 text-left font-semibold border-b border-r text-primaryRed">Player</th>
                                        <th className="p-3 text-left font-semibold border-b border-r text-primaryRed">Club</th>
                                        <th className="p-3 text-center font-semibold border-b border-r text-primaryRed">Goals</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {players == undefined || players.length == 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center p-3">
                                                <h1>Scores is processing</h1>
                                            </td>
                                        </tr>
                                    ) : (
                                        players.map((player, index) => (
                                            <tr key={player.nama} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-3 text-center border-r text-primaryRed">{index + 1}</td>
                                                <td className="p-3 font-medium border-r text-primaryRed">
                                                    {player.nama}
                                                </td>
                                                <td className="p-3 font-medium border-r text-primaryRed">
                                                    <div className="flex items-center gap-3">
                                                        <div className="block w-8 h-8 bg-gray-200 rounded-md overflow-hidden">
                                                            <Image
                                                                src={player.logo}
                                                                alt={`${player.club} logo`}
                                                                width={32}
                                                                height={32}
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <span className="max-sm:hidden">{player.club}</span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-center border-r text-primaryRed">{player.goal}</td>
                                            </tr>
                                        ))
                                    )}
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
