import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Group {
  id: string
  name: string
  teams: string[]
}

interface GroupEditFormProps {
  group: Group
  onSave: (group: Group) => void
  onCancel: () => void
}

export function GroupEditForm({ group, onSave, onCancel }: GroupEditFormProps) {
  const [editedGroup, setEditedGroup] = useState<Group>(group)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedGroup({ ...editedGroup, name: e.target.value })
  }

  const handleTeamChange = (index: number, value: string) => {
    const newTeams = [...editedGroup.teams]
    newTeams[index] = value
    setEditedGroup({ ...editedGroup, teams: newTeams })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedGroup)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <Label htmlFor="groupName" className='text-black'>Nama Group</Label>
        <Input
          id="groupName"
          value={editedGroup.name}
          onChange={handleNameChange}
          className="mt-1 text-black"
        />
      </div>
      {editedGroup.teams.map((team, index) => (
        <div key={index}>
          <Label htmlFor={`team${index + 1}`} className='text-black'>Nama Tim</Label>
          <Input
            id={`team${index + 1}`}
            value={team}
            onChange={(e) => handleTeamChange(index, e.target.value)}
            className="mt-1 text-black"
          />
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} className='text-black'>
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
          Done
        </Button>
      </div>
    </form>
  )
}

