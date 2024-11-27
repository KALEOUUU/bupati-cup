"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  image: string;
  stats: {
    goals: number;
    assists: number;
  };
}

interface PlayerCardProps {
  player: Player;
  onUpdate: (updatedPlayer: Player) => void;
}

export function PlayerCard({ player, onUpdate }: PlayerCardProps) {
  const [editedStats, setEditedStats] = useState(player.stats);
  const [editedPlayer, setEditedPlayer] = useState({
    name: player.name,
    position: player.position,
    number: player.number,
    image: player.image,
  });

  const handleSave = () => {
    onUpdate({
      ...player,
      ...editedPlayer,
      stats: editedStats,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedPlayer((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow text-black">
      <div className="relative h-48">
        <Image
          src={editedPlayer.image}
          alt={player.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h3 className="text-xl font-semibold">{editedPlayer.name}</h3>
          <div className="flex justify-between items-center">
            <p>{editedPlayer.position}</p>
            <span className="text-2xl font-bold">{editedPlayer.number}</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm">Goals: {editedStats.goals}</p>
          <p className="text-sm">Assists: {editedStats.assists}</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Edit
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Edit Player Info</h4>
                <p className="text-sm text-muted-foreground">
                  Update the player&apos;s information
                </p>
              </div>
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={editedPlayer.name}
                    onChange={(e) =>
                      setEditedPlayer((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="position">Player Position</Label>
                  <Select
                    name="position"
                    value={editedPlayer.position}
                    onValueChange={(value) =>
                      setEditedPlayer((prev) => ({
                        ...prev,
                        position: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GK">Goalkeeper</SelectItem>
                      <SelectItem value="DF">Defender</SelectItem>
                      <SelectItem value="MF">Midfielder</SelectItem>
                      <SelectItem value="FW">Striker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="number">Number</Label>
                  <Input
                    id="number"
                    type="number"
                    value={editedPlayer.number}
                    onChange={(e) =>
                      setEditedPlayer((prev) => ({
                        ...prev,
                        number: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="photo">Player Photo</Label>
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    className="text-black"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <div>
                  <Label htmlFor="goals">Goals</Label>
                  <Input
                    id="goals"
                    type="number"
                    value={editedStats.goals}
                    onChange={(e) =>
                      setEditedStats((prev) => ({
                        ...prev,
                        goals: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="assists">Assists</Label>
                  <Input
                    id="assists"
                    type="number"
                    value={editedStats.assists}
                    onChange={(e) =>
                      setEditedStats((prev) => ({
                        ...prev,
                        assists: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>
              <Button type="submit" onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
