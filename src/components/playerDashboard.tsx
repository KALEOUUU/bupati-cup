// components/PlayerDashboard.tsx
import { useState } from "react";
import { PlayerCard } from "@/components/playerCard";
import { EditPlayerModal } from "@/components/editPlayer";

interface PlayerData {
  id: string;
  name: string;
  position: string;
  number: number;
  stats: {
    goals: number;
    assists: number;
  };
  imageUrl: string;
}

export function PlayerDashboard() {
  const [players, setPlayers] = useState<PlayerData[]>([
    {
      id: "1",
      name: "Paulo Dybala",
      position: "RWF",
      number: 21,
      stats: { goals: 16, assists: 20 },
      imageUrl: "/dybala.jpg",
    },
    // Add more players here...
  ]);

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (player: PlayerData) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleSave = (updatedPlayer: PlayerData) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} onEdit={handleEdit} />
      ))}
      <EditPlayerModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
