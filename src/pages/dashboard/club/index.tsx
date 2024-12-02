'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from "@/components/sideBar"
import axios from 'axios'
import Cookie from 'js-cookie'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface Team {
  id: number,
  club_nama: string,
  photo: string,
  menang: number,
  seri: number,
  kalah: number,
  kebobolan: number,
  goal: number,
  selisih: number,
  poin: number,
  main: number
}

export default function DashboardPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      const token = Cookie.get('token')
      const teamsResponse = await axios.get('https://be-most.smktelkom-mlg.sch.id/api/v1/admin/club/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     
      // Calculate points for each team based on wins, draws and losses
      const teamsWithPoints = teamsResponse.data.message.map((team: Team) => ({
        ...team,
        poin: (team.menang * 3) + team.seri, // Win = 3 points, Draw = 1 point
        main: team.menang + team.seri + team.kalah, // Total matches played
        selisih: team.goal - team.kebobolan // Goal difference
      }))

      setTeams(teamsWithPoints)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Failed to fetch data')
      } else {
        setError('An error occurred while fetching data')
      }
      console.error('Fetch error:', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateTeamStats = async (id: number, stat: string, operation: string) => {
    try {
      const token = Cookie.get('token')
      await axios.put(`https://be-most.smktelkom-mlg.sch.id/api/v1/admin/club/${operation}-${stat}/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchData() // Refresh data after update
    } catch (err) {
      console.error('Update error:', err)
      setError('Failed to update team statistics')
    }
  }

  const handleUpdateStats = (clubId: number, field: string, value: number) => {
    const team = teams.find(t => t.id === clubId)
    if (team) {
      const operation = value > (team[field as keyof Team] as number) ? 'plus' : 'minus'
      updateTeamStats(clubId, field, operation)
    }
  }

  const handleDeleteTeam = async (clubId: number) => {
    try {
      const token = Cookie.get('token')
      await axios.delete(`https://be-most.smktelkom-mlg.sch.id/api/v1/admin/club/${clubId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchData() // Refresh data after deletion
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete team')
    }
  }

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
          {teams.length > 0 ? (
            teams.map(team => (
              <Card key={team.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col items-center">
                      <Image
                        src={team.photo}
                        alt={team.club_nama}
                        className="h-24 w-24"
                        width={96}
                        height={96}
                      />
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold">{team.club_nama}</h3>
                      </div>
                    </div>
                  </div>
                  <AddValueClub
                    club={team}
                    onUpdateStats={handleUpdateStats}
                    onDelete={handleDeleteTeam}
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              No teams available to display.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

interface AddValueClubProps {
  club: Team
  onUpdateStats: (clubId: number, field: string, value: number) => void
  onDelete: (clubId: number) => void
}

function AddValueClub({ club, onUpdateStats, onDelete }: AddValueClubProps) {
  const renderStatField = (field: keyof Team, label: string) => (
    <div className="flex items-center justify-between">
      <span>{label}: {club[field]}</span>
      <div className="space-x-2">
        <Button 
          size="sm"
          onClick={() => onUpdateStats(club.id, field, (club[field] as number) - 1)}
        >
          -
        </Button>
        <Button 
          size="sm"
          onClick={() => onUpdateStats(club.id, field, (club[field] as number) + 1)}
        >
          +
        </Button>
      </div>
    </div>
  )

  return (
    <div className="mt-4 space-y-2">
      {renderStatField('menang', 'Menang')}
      {renderStatField('seri', 'Seri')}
      {renderStatField('kalah', 'Kalah')}
      {renderStatField('kebobolan', 'Kebobolan')}

      <div className="flex items-center justify-between">
        <span>Main: {club.main}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Poin: {club.poin}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Selisih Gol: {club.selisih}</span>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(club.id)}
        >
          Hapus
        </Button>
      </div>
    </div>
  )
}
