'use client'

import { useState, useEffect, useMemo } from 'react'
import { PlayerCard } from '@/components/playerCard'
import { Sidebar } from '@/components/sideBar'
import { SearchBar } from '@/components/searchBar'
import axios from 'axios'
import Cookie from 'js-cookie'

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
  const [players, setPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchPlayers = async () => {
    try {
      const token = Cookie.get('token')
      const response = await axios.get('http://localhost:3000/api/v1/admin/pemain', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPlayers(response.data.message)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Failed to fetch players')
      } else {
        setError('An error occurred while fetching players')
      }
      console.error('Fetch error:', err)
    }
  }

  const searchPlayers = async (query: string) => {
    try {
      const token = Cookie.get('token')
      const response = await axios.get(`http://localhost:3000/api/v1/admin/pemain?search=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPlayers(response.data.message)
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to search players')
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  const handleUpdatePlayer = async (playerId: number, playerData: FormData) => {
    try {
      const token = Cookie.get('token')
      await axios.put(`http://localhost:3000/api/v1/admin/pemain/${playerId}`, playerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      fetchPlayers()
    } catch (err) {
      console.error('Update player error:', err)
      setError('Failed to update player')
    }
  }

  const handleDeletePlayer = async (playerId: number) => {
    try {
      const token = Cookie.get('token')
      await axios.delete(`http://localhost:3000/api/v1/admin/pemain/${playerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchPlayers()
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete player')
    }
  }

  const handleStatsUpdate = async (playerId: number, stats: { goals: number; assists: number }, prevStats: { goals: number; assists: number }) => {
    if (isUpdating) {
      return
    }

    try {
      setIsUpdating(true)
      const token = Cookie.get('token')
      if (!token) {
        throw new Error('Authentication token not found')
      }

      if (stats.goals < 0 || stats.assists < 0) {
        throw new Error('Statistics cannot be negative')
      }

      const goalsDiff = stats.goals - prevStats.goals
      const assistsDiff = stats.assists - prevStats.assists

      if (Math.abs(goalsDiff) > 1 || Math.abs(assistsDiff) > 1) {
        throw new Error('Can only update stats by 1 at a time')
      }

      if (goalsDiff !== 0) {
        const goalEndpoint = goalsDiff > 0 ? 'plus-goal' : 'minus-goal'
        
        try {
          const goalResponse = await axios.put(
            `http://localhost:3000/api/v1/admin/pemain/${goalEndpoint}/${playerId}`, 
            {},
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )

          if (goalResponse.data.message === "limits") {
            throw new Error('Cannot reduce goals below 0')
          }

          if (!goalResponse.data.message) {
            throw new Error('Failed to update goals')
          }
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.status === 400) {
            throw new Error('Invalid goal update request')
          }
          throw err
        }
      }

      if (assistsDiff !== 0) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const assistEndpoint = assistsDiff > 0 ? 'plus-assist' : 'minus-assist'
        
        try {
          const assistResponse = await axios.put(
            `http://localhost:3000/api/v1/admin/pemain/${assistEndpoint}/${playerId}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )

          if (!assistResponse.data.message) {
            throw new Error('Failed to update assists')
          }
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.status === 400) {
            throw new Error('Invalid assist update request') 
          }
          throw err
        }
      }

      await fetchPlayers()
    } catch (err) {
      console.error('Update stats error:', err)
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to update player statistics')
      } else {
        setError((err as Error).message || 'Failed to update player statistics')
      }
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query) {
      searchPlayers(query)
    } else {
      fetchPlayers()
    }
  }

  const filteredPlayers = useMemo(() => {
    return players.filter(player =>
      (player.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (player.position?.toLowerCase() || '').includes(searchQuery.toLowerCase())
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
        {error && (
          <div className="text-red-600 mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard
              nama={player.name}
              key={player.id}
              player={player}
              onStatsUpdate={(stats: { goals: number; assists: number }) => handleStatsUpdate(player.id, stats, {
                goals: player.goals,
                assists: player.assists
              })}
              onDelete={() => handleDeletePlayer(player.id)}
              onUpdate={(data: FormData) => handleUpdatePlayer(player.id, data)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
