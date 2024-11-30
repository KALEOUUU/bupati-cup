'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClubForm() {
  const [formData, setFormData] = useState({
    clubName: '',
    description: '',
    category: '',
    founderName: '',
    email: '',
    phoneNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      category: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Di sini Anda bisa menambahkan logika untuk mengirim data ke server
    console.log('Form submitted:', formData)
    // Reset form setelah submit
    setFormData({
      clubName: '',
      description: '',
      category: '',
      founderName: '',
      email: '',
      phoneNumber: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Formulir Pendaftaran Klub</h2>
      
      <div className="space-y-2">
        <Label htmlFor="clubName">Nama Klub</Label>
        <Input
          id="clubName"
          name="clubName"
          value={formData.clubName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="founderName">Nama Pendiri</Label>
        <Input
          id="founderName"
          name="founderName"
          value={formData.founderName}
          onChange={handleChange}
          required
        />
      </div>
      
      

      <Button type="submit" className="w-full">Daftar Klub</Button>
    </form>
  )
}

