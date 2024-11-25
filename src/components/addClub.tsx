import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddClub({ onClose }: { onClose: () => void }) {
  const [clubData, setClubData] = useState({
    name: '',
    city: '',
    group: '',
    foundedYear: '',
    logo: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setClubData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setClubData(prev => ({ ...prev, logo: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Submitting club data:', clubData)
    // Reset form and close
    setClubData({ name: '', city: '', group: '', foundedYear: '', logo: null })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-black">Add New Club</h2>
      
      <div>
        <Label htmlFor="name" className="text-black">Club Name</Label>
        <Input id="name" name="name" className='text-black' value={clubData.name} onChange={handleInputChange} required />
      </div>
      
      <div>
        <Label htmlFor="city" className="text-black">City</Label>
        <Input id="city" name="city" className='text-black' value={clubData.city} onChange={handleInputChange} required />
      </div>
      
      <div>
        <Label htmlFor="league" className="text-black">League</Label>
        <Select name="league" value={clubData.group} onValueChange={(value) => handleInputChange({ target: { name: 'league', value } })}>
          <SelectTrigger>
            <SelectValue className='text-black' placeholder="Select league" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PL">Group A</SelectItem>
            <SelectItem value="LL">Group B</SelectItem>
            <SelectItem value="BL">Group C</SelectItem>
            <SelectItem value="SA">Group D</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="foundedYear" className="text-black">Founded Year</Label>
        <Input id="foundedYear" name="foundedYear" className='text-black' type="number" value={clubData.foundedYear} onChange={handleInputChange} required />
      </div>
      
      <div>
        <Label htmlFor="logo" className="text-black">Club Logo</Label>
        <Input id="logo" name="logo" type="file" className='text-black' onChange={handleFileChange} accept="image/*" />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" className="text-black" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Club</Button>
      </div>
    </form>
  )
}

