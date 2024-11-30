'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from "@/components/sideBar"
import { TeamCard } from "@/components/teamCard"
import { MatchList } from "@/components/matchList"
import axios from 'axios'

interface Team {
  id: string
  name: string
  group: string
  stats: {
    matches: number
    wins: number
    losses: number
    points: number
  }
}

interface Match {
  id: string
  homeTeam: Team
  awayTeam: Team
  score: {
    home: number
    away: number
  }
  date: string
}

export default function DashboardPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teams
        const teamsResponse = await axios.get('http://localhost:3000/teams')
        setTeams(teamsResponse.data)

        // Fetch matches
        const matchesResponse = await axios.get('http://localhost:3000/matches')
        setMatches(matchesResponse.data)

      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data?.message || 'Failed to fetch data')
        } else {
          setError('An error occurred while fetching data')
        }
        console.error('Fetch error:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#FFF1F2]">
      <div className="w-64 bg-background">
        <Sidebar />
      </div>
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          {error && (
            <div className="mt-2 text-red-600">
              {error}
            </div>
          )}
        </div>
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="space-y-8 lg:col-span-1 xl:col-span-2">
            <div className="grid gap-8 md:grid-cols-2">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <MatchList matches={matches} />
          </div>
        </div>
      </main>
    </div>
  )
}
