'use client';

import { useState, useEffect } from 'react';
import { CoachCard } from '@/components/coachCard';
import { Sidebar } from '@/components/sideBar';
import axios from 'axios';
import Cookie from 'js-cookie';

interface Coach {
  id: number;
  nama: string;
  club: string;
  foto: string;
  achievements?: {
    coachOfMatch: boolean;
  };
}

export default function CoachDashboard() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [error, setError] = useState('');

  const fetchCoaches = async () => {
    try {
      const token = Cookie.get('token');
      const response = await axios.get('http://localhost:3000/api/v1/admin/coach', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoaches(response.data.message);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Failed to fetch coaches');
      } else {
        setError('An error occurred while fetching coaches');
      }
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const handleDeleteCoach = async (coachId: number) => {
    try {
      const token = Cookie.get('token');
      await axios.delete(`http://localhost:3000/api/v1/admin/coach/${coachId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCoaches(); // Refresh data after deletion
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Failed to delete coach');
      } else {
        setError('An error occurred while deleting coach');
      }
      console.error('Delete error:', err);
    }
  };

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
        {error && (
          <div className="text-red-600 mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              onAchievementUpdate={handleAchievementUpdate}
              onDelete={() => handleDeleteCoach(coach.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
