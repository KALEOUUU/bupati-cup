"use client"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { GroupEditForm } from "@/components/group-edit"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Group {
  id: string
  name: string
  teams: string[]
}

export function GroupList() {
  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'Group A', teams: ['Tim 1', 'Tim 2', 'Tim 3', 'Tim 4'] },
    { id: '2', name: 'Group B', teams: ['Tim 1', 'Tim 2', 'Tim 3', 'Tim 4'] },
    { id: '3', name: 'Group C', teams: ['Tim 1', 'Tim 2', 'Tim 3', 'Tim 4'] },
    { id: '4', name: 'Group D', teams: ['Tim 1', 'Tim 2', 'Tim 3', 'Tim 4'] },
  ])

  const [editingGroup, setEditingGroup] = useState<string | null>(null)

  const handleEdit = (groupId: string) => {
    setEditingGroup(groupId)
  }

  const handleSave = (updatedGroup: Group) => {
    setGroups(groups.map(group => group.id === updatedGroup.id ? updatedGroup : group))
    setEditingGroup(null)
  }

  const handleCancel = () => {
    setEditingGroup(null)
  }

  return (
    <div className="space-y-4">
      {groups.map(group => (
        <div key={group.id} className="bg-white rounded-lg shadow text-black">
          {editingGroup === group.id ? (
            <GroupEditForm group={group} onSave={handleSave} onCancel={handleCancel} />
          ) : (
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <span className="text-gray-500">{group.teams.length} Tim</span>
              </div>
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Teams in {group.name}</h4>
                      <ul className="list-disc pl-4">
                        {group.teams.map((team, index) => (
                          <li key={index}>{team}</li>
                        ))}
                      </ul>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={() => handleEdit(group.id)}
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  Edit
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

