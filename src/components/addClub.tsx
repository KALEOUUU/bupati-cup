import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import Cookies from 'js-cookie'
import { Loader2 } from "lucide-react"

interface Group {
  id: string
  nama: string
}

export function AddClub({ onClose }: { onClose: () => void }) {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [clubData, setClubData] = useState({
    nama: '',
    groupId: '',
    photo: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setClubData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setClubData(prev => ({ ...prev, photo: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const token = Cookies.get('token')
      const formData = new FormData()
      formData.append('nama', clubData.nama)
      formData.append('groupId', clubData.groupId)
      if (clubData.photo) {
        formData.append('photo', clubData.photo)
      }

      await axios.post('https://be-most.smktelkom-mlg.sch.id/api/v1/admin/club', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      alert('Klub berhasil ditambahkan')
      setClubData({ nama: '', groupId: '', photo: null })
      onClose()
    } catch (error) {
      alert(error)
      alert('Gagal menambahkan klub')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true)
      try {
        const token = Cookies.get('token')
        const response = await axios.get("https://be-most.smktelkom-mlg.sch.id/api/v1/admin/group", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setGroups(response.data.message)
      } catch (error) {
        console.error(error)
        alert('Gagal mengambil data grup')
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow text-black">
        <h2 className="text-xl font-bold mb-4 text-black">Tambah Klub Baru</h2>
        
        <div>
          <Label htmlFor="nama" className="text-black">Nama Klub</Label>
          <Input id="nama" name="nama" className='text-black' value={clubData.nama} onChange={handleInputChange} required />
        </div>
        
        <div>
          <Label htmlFor="group" className="text-black">Grup</Label>
          <Select name="groupId" value={clubData.groupId} onValueChange={(value) => handleInputChange({ target: { name: 'groupId', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih grup" className='text-black' />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id} className='text-black'>
                  Grup {group.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="photo" className="text-black">Logo Klub</Label>
          <Input id="photo" name="photo" type="file" className='text-black' onChange={handleFileChange} accept="image/*" />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" className="text-black" onClick={onClose}>Batal</Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menambahkan...
              </>
            ) : (
              'Tambah Klub'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
