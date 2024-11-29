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
import { Minus, Plus, Trophy, Star, Medal } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  goals: number;
  assists: number;
  image: string;
  achievements?: {
    playerOfMatch: boolean;
    mostValuable: boolean;
    mvp: boolean;
  };
}

interface PlayerCardProps {
  player: Player;
  onStatsUpdate: (playerId: number, stats: { goals: number; assists: number }) => void;
  onAchievementUpdate?: (playerId: number, achievements: Player['achievements']) => void;
}

export function PlayerCard({ player, onStatsUpdate, onAchievementUpdate }: PlayerCardProps) {
  const [editedPlayer, setEditedPlayer] = useState({
    name: player.name,
    position: player.position,
    number: player.number,
    image: player.image,
  });
  const [goals, setGoals] = useState(player.goals);
  const [assists, setAssists] = useState(player.assists);
  const [achievements, setAchievements] = useState(player.achievements || {
    playerOfMatch: false,
    mostValuable: false,
    mvp: false,
  });

  const handleSave = () => {
    // Here you would typically update your database or state management
    console.log("Saving player details:", editedPlayer);
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

  const updateStats = (type: 'goals' | 'assists', increment: boolean) => {
    const setter = type === 'goals' ? setGoals : setAssists;
    const currentValue = type === 'goals' ? goals : assists;
    const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
    setter(newValue);
    onStatsUpdate(player.id, { goals: type === 'goals' ? newValue : goals, assists: type === 'assists' ? newValue : assists });
  };

  const toggleAchievement = (type: keyof Player['achievements']) => {
    setAchievements(prev => {
      const newAchievements = {
        ...prev,
        [type]: !prev[type]
      };
      onAchievementUpdate?.(player.id, newAchievements);
      return newAchievements;
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow text-black">
      <div className="relative h-48">
        <Image
          src={editedPlayer.image}
          alt={player.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h3 className="text-xl font-semibold">{editedPlayer.name}</h3>
          <div className="flex justify-between items-center">
            <p>{editedPlayer.position}</p>
            <span className="text-2xl font-bold">{editedPlayer.number}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Goals: {goals}</span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => updateStats('goals', false)}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease goals</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => updateStats('goals', true)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase goals</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Assists: {assists}</span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => updateStats('assists', false)}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease assists</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => updateStats('assists', true)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase assists</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            variant={achievements.playerOfMatch ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 ${
              achievements.playerOfMatch ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50'
            }`}
            onClick={() => toggleAchievement('playerOfMatch')}
          >
            <Trophy className="h-4 w-4" />
            <span className="text-xs">POTM</span>
          </Button>
          <Button
            variant={achievements.mostValuable ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 ${
              achievements.mostValuable ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50'
            }`}
            onClick={() => toggleAchievement('mostValuable')}
          >
            <Star className="h-4 w-4" />
            <span className="text-xs">MVP</span>
          </Button>
          <Button
            variant={achievements.mvp ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 ${
              achievements.mvp ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50'
            }`}
            onClick={() => toggleAchievement('mvp')}
          >
            <Medal className="h-4 w-4" />
            <span className="text-xs">Best Player</span>
          </Button>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              Edit Player Details
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
                    value={editedPlayer.position}
                    onValueChange={(value) =>
                      setEditedPlayer((prev) => ({
                        ...prev,
                        position: value,
                      }))
                    }
                  >
                    <SelectTrigger id="position">
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
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

