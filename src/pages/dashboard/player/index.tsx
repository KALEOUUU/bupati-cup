'use client'

import { useState, useMemo } from 'react'
import { PlayerCard } from '@/components/playerCard'
import { Sidebar } from '@/components/sideBar'
import { SearchBar } from '@/components/searchBar'

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  goals: number;
  assists: number;
  image: string;
}

export default function PlayerDashboard() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: 'Cristiano Ronaldo',
      position: 'Forward',
      number: 7,
      goals: 12,
      assists: 8,
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 2,
      name: 'Lionel Messi',
      position: 'Forward',
      number: 10,
      goals: 15,
      assists: 10,
      image: '/placeholder.svg?height=200&width=200'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('')

  const handleStatsUpdate = (playerId: number, stats: { goals: number; assists: number }) => {
    console.log(`Updating stats for player ${playerId}:`, stats)
    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, ...stats }
        : player
    ));
    // Here you would typically update your database
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredPlayers = useMemo(() => {
    return players.filter(player =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.position.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [players, searchQuery])

  return (
    <div className="flex h-screen bg-red-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 text-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Player Dashboard</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onStatsUpdate={handleStatsUpdate}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

