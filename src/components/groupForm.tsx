'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface GroupData {
  id?: string
  name: string
  teamcount: number
}

interface GroupFormProps {
  group?: GroupData
  onSubmit: (groupData: GroupData) => void
  onClose: () => void
}

export function GroupForm({ group, onSubmit, onClose }: GroupFormProps) {
  const [groupData, setGroupData] = useState<GroupData>({
    name: '',
    teamcount: 0,
  })

  useEffect(() => {
    if (group) {
      setGroupData(group)
    }
  }, [group])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setGroupData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(groupData)
    setGroupData({ name: '', teamcount: 0 })
    onClose()
  }

  const isEditing = !!group

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow text-black">
      <h2 className="text-xl font-bold mb-4 text-black">
        {isEditing ? 'Edit Group' : 'Add New Group'}
      </h2>
      
      <div>
        <Label htmlFor="name" className='text-black'>Group Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={groupData.name} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      
      
      <div>
        <Label htmlFor="teamcount" className='text-black'>Team Count</Label>
        <Input 
          id="teamcount" 
          name="teamcount" 
          type="number" 
          value={groupData.teamcount} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" className="text-black" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update Group' : 'Add Group'}
        </Button>
      </div>
    </form>
  )
}

