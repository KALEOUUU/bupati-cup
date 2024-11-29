"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trophy } from "lucide-react";

interface Coach {
  id: number;
  name: string;
  club: string;
  image: string;
  achievements?: {
    coachOfMatch: boolean;
  };
}

interface CoachCardProps {
  coach: Coach;
  onAchievementUpdate?: (coachId: number, achievements: Coach["achievements"]) => void;
  onClose?: () => void; // Tambahkan properti ini
}

export function CoachCard({ coach, onAchievementUpdate, onClose }: CoachCardProps) {
  const [editCoach, setEditCoach] = useState({
    name: coach.name,
    image: coach.image,
    club: coach.club,
  });

  const [achievements, setAchievements] = useState(coach.achievements || {
    coachOfMatch: false,
  });

  const handleSave = () => {
    console.log("Saving coach details:", editCoach);
    onClose?.(); // Panggil onClose jika tersedia
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditCoach((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleAchievement = () => {
    setAchievements((prev) => {
      const newAchievements = {
        ...prev,
        coachOfMatch: !prev.coachOfMatch,
      };
      onAchievementUpdate?.(coach.id, newAchievements);
      return newAchievements;
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow text-black">
      <div className="relative h-48">
        <Image
          src={editCoach.image}
          alt={coach.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h3 className="text-xl font-semibold">{editCoach.name}</h3>
          <p className="text-sm">{editCoach.club}</p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-center">
          <Button
            variant={achievements.coachOfMatch ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 ${
              achievements.coachOfMatch ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50"
            }`}
            onClick={toggleAchievement}
          >
            <Trophy className="h-4 w-4" />
            <span className="text-xs">Coach of The Match</span>
          </Button>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              Edit Coach Details
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Edit Coach Info</h4>
                <p className="text-sm text-muted-foreground">
                  Update the coach&apos;s information
                </p>
              </div>
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editCoach.name}
                    onChange={(e) =>
                      setEditCoach((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="club">Club</Label>
                  <Input
                    id="club"
                    value={editCoach.club}
                    onChange={(e) =>
                      setEditCoach((prev) => ({
                        ...prev,
                        club: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="photo">Coach Photo</Label>
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
