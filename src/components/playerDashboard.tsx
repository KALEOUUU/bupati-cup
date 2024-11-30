// components/PlayerDashboard.tsx
import { useEffect, useState } from "react";
import { PlayerCard } from "@/components/playerCard";
import { EditPlayerModal } from "@/components/editPlayer";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

interface PlayerData {
  id: string;
  name: string;
  position: string;
  number: number;
  goals: number;
  assists: number;
  imageUrl: string;
  club: string;
  stats: {
    goals: number;
    assists: number;
  }
}

interface MVP {
  id: string;
  player: PlayerData;
}

interface GOAT {
  id: string;
  player: PlayerData;
}

export function PlayerDashboard() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mvp, setMvp] = useState<MVP | null>(null);
  const [goat, setGoat] = useState<GOAT | null>(null);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:3000/api/v1/admin/pemain", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Transform API response to match PlayerData interface
      const transformedPlayers = response.data.message.map((player: any) => ({
        id: player.id,
        name: player.nama,
        position: player.posisi,
        number: player.no,
        goals: player.goal,
        assists: player.assist,
        imageUrl: player.photo,
        club: player.club,
        stats: {
          goals: player.goal,
          assists: player.assist
        }
      }));
      
      setPlayers(transformedPlayers);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data pemain");
    } finally {
      setLoading(false);
    }
  };

  const fetchMvp = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:3000/api/v1/admin/mvp", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Transform MVP data
      const mvpData = response.data.message[0];
      if (mvpData) {
        setMvp({
          id: mvpData.id,
          player: {
            id: mvpData.player.id,
            name: mvpData.player.nama,
            position: mvpData.player.posisi,
            number: mvpData.player.no,
            goals: mvpData.player.goal,
            assists: mvpData.player.assist,
            imageUrl: mvpData.player.photo,
            club: mvpData.player.club,
            stats: {
              goals: mvpData.player.goal,
              assists: mvpData.player.assist
            }
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGoat = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:3000/api/v1/admin/manOfTheMatch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Transform GOAT data
      const goatData = response.data.message[0];
      if (goatData) {
        setGoat({
          id: goatData.id,
          player: {
            id: goatData.player.id,
            name: goatData.player.nama,
            position: goatData.player.posisi,
            number: goatData.player.no,
            goals: goatData.player.goal,
            assists: goatData.player.assist,
            imageUrl: goatData.player.photo,
            club: goatData.player.club,
            stats: {
              goals: goatData.player.goal,
              assists: goatData.player.assist
            }
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (player: PlayerData) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedPlayer: PlayerData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const formData = new FormData();
      formData.append("nama", updatedPlayer.name);
      formData.append("no", String(updatedPlayer.number));
      formData.append("posisi", updatedPlayer.position);
      
      await axios.put(
        `http://localhost:3000/api/v1/admin/pemain/${updatedPlayer.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      await fetchPlayers();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Gagal mengupdate pemain");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pemain ini?")) return;
    
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:3000/api/v1/admin/pemain/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchPlayers();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus pemain");
    } finally {
      setLoading(false);
    }
  };

  const handleSetMvp = async (player: PlayerData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (mvp?.player.id === player.id) {
        await axios.delete(`http://localhost:3000/api/v1/admin/mvp/${mvp.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(
          "http://localhost:3000/api/v1/admin/mvp",
          { id: player.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      await fetchMvp();
    } catch (error) {
      console.error(error);
      alert("Gagal mengatur MVP");
    } finally {
      setLoading(false);
    }
  };

  const handleSetGoat = async (player: PlayerData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (goat?.player.id === player.id) {
        await axios.delete(`http://localhost:3000/api/v1/admin/manOfTheMatch/${goat.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(
          "http://localhost:3000/api/v1/admin/manOfTheMatch",
          { id: player.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      await fetchGoat();
    } catch (error) {
      console.error(error);
      alert("Gagal mengatur Man of The Match");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchMvp();
    fetchGoat();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {players.map((player) => (
        <PlayerCard 
          key={player.id} 
          player={player} 
          onEdit={handleEdit}
          onDelete={() => handleDelete(player.id)}
          onSetMvp={() => handleSetMvp(player)}
          onSetGoat={() => handleSetGoat(player)}
          isMvp={mvp?.player.id === player.id}
          isGoat={goat?.player.id === player.id}
        />
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
