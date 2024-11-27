import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddPlayerForm({ onClose }: { onClose: () => void }) {
  const [playerData, setPlayerData] = useState({
    name: '',
    club: '',
    position: '',
    number: '',
    photo: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setPlayerData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPlayerData(prev => ({ ...prev, photo: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Submitting player data:', playerData)
    // Reset form and close
    setPlayerData({ name: '', club: '', position: '', number: '', photo: null })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow text-black">
      <h2 className="text-xl font-bold mb-4 text-black">Add New Player</h2>
      
      <div>
        <Label htmlFor="name" className='text-black'>Player Name</Label>
        <Input id="name" name="name" value={playerData.name} onChange={handleInputChange} required />
      </div>
      
      <div>
        <Label htmlFor="club" className='text-black'>Club Name</Label>
        <Input id="club" name="club" value={playerData.club} onChange={handleInputChange} required />
      </div>
      
      <div>
        <Label htmlFor="position" className='text-black'>Player Position</Label>
        <Select name="position" value={playerData.position} onValueChange={(value) => handleInputChange({ target: { name: 'position', value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GK">Goalkeeper</SelectItem>
            <SelectItem value="DF">Defender</SelectItem>
            <SelectItem value="MF">Midfielder</SelectItem>
            <SelectItem value="FW">Striker</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="number" className='text-black'>Jersey Number</Label>
        <Input id="number" name="number" type="number" value={playerData.number} onChange={handleInputChange} required />
      </div>
      
      <div>
        <Label htmlFor="photo" className='text-black'>Player Photo</Label>
        <Input id="photo" name="photo" type="file" className='text-black' onChange={handleFileChange} accept="image/*" />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" className="text-black" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Player</Button>
      </div>
    </form>
  )
}

