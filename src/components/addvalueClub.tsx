import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Club {
  id: string
  menang: number
  seri: number
  kalah: number
  kebobolan: number
  main: number
  poin: number
  goal: number
  selisih: number
}

interface AddValueClubProps {
  club: Club
  onUpdateStats: (clubId: string, field: string, value: number) => void
  onDelete: (clubId: string) => void
}

export function AddValueClub({ club, onUpdateStats, onDelete }: AddValueClubProps) {
  const handleUpdateStats = (clubId: string, field: string, value: number) => {
    if (value >= 0) { // Prevent negative values
      onUpdateStats(clubId, field, value)
    }
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <span>Menang: {club.menang}</span>
        <div className="space-x-2">
          <Button 
            size="sm"
            onClick={() => handleUpdateStats(club.id, 'menang', club.menang - 1)}
          >
            -
          </Button>
          <Button 
            size="sm"
            onClick={() => handleUpdateStats(club.id, 'menang', club.menang + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span>Seri: {club.seri}</span>
        <div className="space-x-2">
          <Button 
            size="sm"
            onClick={() => handleUpdateStats(club.id, 'seri', club.seri - 1)}
          >
            -
          </Button>
          <Button 
            size="sm"
            onClick={() => handleUpdateStats(club.id, 'seri', club.seri + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span>Kalah: {club.kalah}</span>
        <div className="space-x-2">
          <Button 
            size="sm"
            onClick={() => handleUpdateStats(club.id, 'kalah', club.kalah - 1)}
          >
            -
          </Button>
          <Button 
            size="sm"
            onClick={() => handleUpdateStats(club.id, 'kalah', club.kalah + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span>Kebobolan: {club.kebobolan}</span>
        <div className="space-x-2">
          <Button 
            size="sm"
            onClick={() => handleUpdateStats(club.id, 'kebobolan', club.kebobolan - 1)}
          >
            -
          </Button>
          <Button 
            size="sm"
            onClick={() => handleUpdateStats(club.id, 'kebobolan', club.kebobolan + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span>Main: {club.main}</span>
      </div>

      <div className="flex items-center justify-between">
        <span>Poin: {club.poin}</span>
      </div>

      <div className="flex items-center justify-between">
        <span>Gol: {club.goal}</span>
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