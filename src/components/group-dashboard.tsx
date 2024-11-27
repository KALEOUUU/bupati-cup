"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface Group {
  id: string
  name: string
  teams: string[]
}

interface GroupItemProps {
  group: Group
  onSave: (group: Group) => void
}

export function GroupItem({ group, onSave }: GroupItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedGroup, setEditedGroup] = useState<Group>(group)

  const handleSave = () => {
    onSave(editedGroup)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Nama Group</Label>
              <Input
                id="groupName"
                value={editedGroup.name}
                onChange={(e) =>
                  setEditedGroup({ ...editedGroup, name: e.target.value })
                }
              />
            </div>
            {editedGroup.teams.map((team, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`team${index + 1}`}>Nama Tim</Label>
                <Input
                  id={`team${index + 1}`}
                  value={team}
                  onChange={(e) => {
                    const newTeams = [...editedGroup.teams]
                    newTeams[index] = e.target.value
                    setEditedGroup({ ...editedGroup, teams: newTeams })
                  }}
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                type="button"
                className="bg-red-600 hover:bg-red-700"
              >
                Done
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg mb-4">
      <div className="flex items-center gap-2 text-black">
        <span className="font-medium">{group.name}</span>
        <span className=" tsext-black">{group.teams.length} Tim</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-black">
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setIsEditing(true)}
          variant="ghost"
          className="text-red-600 hover:text-red-700"
        >
          Edit
        </Button>
      </div>
    </div>
  )
}

export default function GroupDashboard() {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Group A",
      teams: ["Tim 1", "Tim 2", "Tim 3", "Tim 4"],
    },
    {
      id: "2",
      name: "Group B",
      teams: ["Tim 1", "Tim 2", "Tim 3", "Tim 4"],
    },
    // Add more groups as needed
  ])

  const handleSaveGroup = (updatedGroup: Group) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2 className="text-xl">Group Dashboard</h2>
      </div>
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} onSave={handleSaveGroup} />
      ))}
    </div>
  )
}

