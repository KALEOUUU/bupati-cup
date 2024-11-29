'use client';

import { useState } from 'react';
import { CoachCard } from '@/components/coachCard'; // Update to import the CoachCard component
import { Sidebar } from '@/components/sideBar';

interface Coach {
  id: number;
  name: string;
  club: string;
  image: string;
  achievements?: {
    coachOfMatch: boolean;
  };
}

export default function CoachDashboard() {
  const [coaches, setCoaches] = useState<Coach[]>([
    {
      id: 1,
      name: 'Pep Guardiola',
      club: 'Manchester City',
      image: '/path-to-guardiola-image.jpg',
      achievements: {
        coachOfMatch: false,
      },
    },
    {
      id: 2,
      name: 'Jürgen Klopp',
      club: 'Liverpool',
      image: '/path-to-klopp-image.jpg',
      achievements: {
        coachOfMatch: false,
      },
    },
    // ... other coaches
  ]);

  const handleAchievementUpdate = (coachId: number, achievements: Coach['achievements']) => {
    console.log(`Updating achievements for coach ${coachId}:`, achievements);
    setCoaches((prevCoaches) =>
      prevCoaches.map((coach) =>
        coach.id === coachId ? { ...coach, achievements } : coach
      )
    );
    // Here you would typically update your database
  };

  return (
    <div className="flex h-screen bg-red-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">Coach Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              onAchievementUpdate={handleAchievementUpdate}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
