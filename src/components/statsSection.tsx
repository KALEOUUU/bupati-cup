'use client'

import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface PlayerStatsProps {
  initialGoals: number
  initialAssists: number
  onUpdate?: (stats: { goals: number; assists: number }) => void
}

export function PlayerStats({ initialGoals, initialAssists, onUpdate }: PlayerStatsProps) {
  const [goals, setGoals] = useState(initialGoals)
  const [assists, setAssists] = useState(initialAssists)

  const updateStats = (type: 'goals' | 'assists', increment: boolean) => {
    const setValue = type === 'goals' ? setGoals : setAssists
    const currentValue = type === 'goals' ? goals : assists
    
    const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1)
    setValue(newValue)
    
    onUpdate?.({
      goals: type === 'goals' ? newValue : goals,
      assists: type === 'assists' ? newValue : assists
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="min-w-20">Gol : {goals}</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateStats('goals', false)}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease goals</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateStats('goals', true)}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase goals</span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="min-w-20">Assists : {assists}</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateStats('assists', false)}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease assists</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateStats('assists', true)}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase assists</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

