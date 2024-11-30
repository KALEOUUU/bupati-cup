'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'

export function GroupForm() {
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = Cookies.get('token')
      const res = await axios.post("http://localhost:3000/api/v1/admin/group", {
        nama: name
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status == 200) {
        alert("Group berhasil dibuat")
        router.refresh() // Refresh halaman setelah berhasil membuat grup
        router.push("http://localhost:4000/dashboard")
      }
    } catch (error) {
      alert(error)
      alert("Terjadi kesalahan, silakan coba lagi")
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow text-black">
      <h2 className="text-xl font-bold mb-4 text-black">
        Buat Grup Baru
      </h2>
      
      <div>
        <Label htmlFor="name" className='text-black'>Nama Grup</Label>
        <Input 
          id="name" 
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" className="text-black">
          Batal
        </Button>
        <Button type="submit">
          Tambah Grup
        </Button>
      </div>
    </form>
  )
}
