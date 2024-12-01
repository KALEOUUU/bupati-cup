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
import axios from 'axios';
import Cookie from 'js-cookie';

interface Player {
  id: number;
  name: string;
  position: string;
  number: number | string;
  goals: number;
  assists: number;
  image: string | File;
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
  const [editedPlayer, setEditedPlayer] = useState<Player>({
    ...player,
    image: player.image,
    number: player.number?.toString() || ''
  });
  const [goals, setGoals] = useState(player.goals);
  const [assists, setAssists] = useState(player.assists);
  const [achievements, setAchievements] = useState(player.achievements || {
    playerOfMatch: false,
    mostValuable: false,
    mvp: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError('');

      const token = Cookie.get('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Validate number range
      const jerseyNumber = parseInt(editedPlayer.number?.toString() || '');
      if (isNaN(jerseyNumber) || jerseyNumber < 1 || jerseyNumber > 99) {
        throw new Error('Jersey number must be between 1 and 99');
      }

      // Validate required fields
      if (!editedPlayer.name.trim()) {
        throw new Error('Player name is required');
      }
      if (!editedPlayer.position) {
        throw new Error('Player position is required');
      }

      const formData = new FormData();
      formData.append('nama', editedPlayer.name.trim());
      formData.append('posisi', editedPlayer.position);
      formData.append('no', jerseyNumber.toString());
      formData.append('goals', goals.toString());
      formData.append('assists', assists.toString());
      formData.append('achievements', JSON.stringify(achievements));

      if (editedPlayer.image instanceof File) {
        // Validate file type
        if (!editedPlayer.image.type.startsWith('image/')) {
          throw new Error('Invalid file type. Please upload an image file.');
        }
        formData.append('photo', editedPlayer.image);
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/pemain/${player.id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (!response.data) {
        throw new Error('No data received from server');
      }

      console.log('Player updated successfully:', response.data);

      // Update local state with server response
      const updatedPlayer = response.data;
      setEditedPlayer(updatedPlayer);
      setGoals(updatedPlayer.goals);
      setAssists(updatedPlayer.assists);
      setAchievements(updatedPlayer.achievements);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          setError('Request timed out. Please try again.');
        } else if (err.response) {
          // Server responded with error
          setError(`Error updating player: ${err.response.data?.message || err.message}`);
        } else if (err.request) {
          // Request made but no response
          setError('Network error. Please check your connection and try again.');
        } else {
          setError(`Error updating player: ${err.message}`);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while updating player. Please try again.');
      }
      console.error('Update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
          throw new Error('Photo size must be less than 2MB');
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error('Invalid file type. Please upload an image file.');
        }

        setEditedPlayer(prev => ({
          ...prev,
          image: file
        }));
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while processing the image');
      }
      e.target.value = ''; // Reset file input
    }
  };

  const updateStats = async (type: 'goals' | 'assists', increment: boolean) => {
    try {
      const setter = type === 'goals' ? setGoals : setAssists;
      const currentValue = type === 'goals' ? goals : assists;
      const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
      
      const token = Cookie.get('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/pemain/${player.id}/stats`,
        {
          goals: type === 'goals' ? newValue : goals,
          assists: type === 'assists' ? newValue : assists
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000
        }
      );

      if (!response.data) {
        throw new Error('No data received from server');
      }

      setter(newValue);
      onStatsUpdate(player.id, { 
        goals: type === 'goals' ? newValue : goals, 
        assists: type === 'assists' ? newValue : assists 
      });

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          setError('Request timed out. Please try again.');
        } else if (err.response) {
          setError(`Error updating stats: ${err.response.data?.message || err.message}`);
        } else if (err.request) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError(`Error updating stats: ${err.message}`);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while updating stats');
      }
      console.error('Stats update error:', err);
    }
  };

  const toggleAchievement = async (type: keyof Player['achievements']) => {
    try {
      const token = Cookie.get('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const newAchievements = {
        ...achievements,
        [type]: !achievements[type]
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/pemain/${player.id}/achievements`,
        { achievements: newAchievements },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000
        }
      );

      if (!response.data) {
        throw new Error('No data received from server');
      }

      setAchievements(newAchievements);
      onAchievementUpdate?.(player.id, newAchievements);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          setError('Request timed out. Please try again.');
        } else if (err.response) {
          setError(`Error updating achievements: ${err.response.data?.message || err.message}`);
        } else if (err.request) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError(`Error updating achievements: ${err.message}`);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while updating achievements');
      }
      console.error('Achievement update error:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow text-black">
      <div className="relative h-48">
        <Image
          src={editedPlayer.image instanceof File ? URL.createObjectURL(editedPlayer.image) : editedPlayer.image}
          alt={editedPlayer.name}
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
                disabled={isLoading}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease goals</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => updateStats('goals', true)}
                disabled={isLoading}
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
                disabled={isLoading}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease assists</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => updateStats('assists', true)}
                disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}
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
                    disabled={isLoading}
                    required
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
                    disabled={isLoading}
                  >
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GK">Goalkeeper (Penjaga Gawang)</SelectItem>
                      <SelectItem value="CB">Center Back (Bek Tengah)</SelectItem>
                      <SelectItem value="RB">Right Back (Bek Kanan)</SelectItem>
                      <SelectItem value="LB">Left Back (Bek Kiri)</SelectItem>
                      <SelectItem value="DMF">Defensive Midfielder (Gelandang Bertahan)</SelectItem>
                      <SelectItem value="CMF">Central Midfielder (Gelandang Tengah)</SelectItem>
                      <SelectItem value="RMF">Right Midfielder (Gelandang Kanan)</SelectItem>
                      <SelectItem value="LMF">Left Midfielder (Gelandang Kiri)</SelectItem>
                      <SelectItem value="CF">Center Forward (Penyerang Tengah)</SelectItem>
                      <SelectItem value="WF">Wing Forward (Penyerang Sayap)</SelectItem>
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
                        number: e.target.value,
                      }))
                    }
                    min="1"
                    max="99"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="photo">Player Photo (Max 2MB)</Label>
                  <Input
                    id="photo"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSave} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
