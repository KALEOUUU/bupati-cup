import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Player } from "@/pages/types/dashboard";

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => Promise<void>;
}

export default function PlayerCard({ player, onEdit }: PlayerCardProps) {
  const handleEdit = () => onEdit(player);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={player.imageUrl || "/placeholder.svg"}
            alt={player.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
            <h3 className="text-xl font-bold">{player.name}</h3>
            <div className="flex items-center justify-between">
              <span>{player.position}</span>
              <span className="text-2xl font-bold">{player.number}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm">Goals: {player.stats.goals}</div>
            <div className="text-sm">Assists: {player.stats.assists}</div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

