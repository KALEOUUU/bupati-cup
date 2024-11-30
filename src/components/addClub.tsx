import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { Loader2 } from "lucide-react"

interface Group {
  id: string
  nama: string
}

interface Club {
  id: string
  club_nama: string
  photo: string
  menang: number
  seri: number
  kalah: number
  kebobolan: number
  goal: number
  selisih: number
  main: number
  poin: number
}

export function AddClub({ onClose }: { onClose: () => void }) {
  const [clubs, setClubs] = useState<Club[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [clubData, setClubData] = useState({
    nama: '',
    groupId: '',
    photo: null as File | null,
  })
  const [editMode, setEditMode] = useState<{id: string, nama: string, groupId: string} | null>(null)

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

      await axios.post('http://localhost:3000/api/v1/admin/club', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      alert('Klub berhasil ditambahkan')
      setClubData({ nama: '', groupId: '', photo: null })
      fetchClubs()
      onClose()
    } catch (error) {
      alert('Gagal menambahkan klub')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (clubId: string) => {
    setLoading(true)
    try {
      const token = Cookies.get('token')
      await axios.delete(`http://localhost:3000/api/v1/admin/club/${clubId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      fetchClubs()
    } catch (error) {
      alert('Gagal menghapus klub')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (clubId: string, updatedData: Partial<Club>) => {
    setLoading(true)
    try {
      const token = Cookies.get('token')
      const formData = new FormData()
      if (updatedData.club_nama) formData.append('nama', updatedData.club_nama)
      if (updatedData.photo) formData.append('photo', updatedData.photo)

      await axios.put(`http://localhost:3000/api/v1/admin/club/${clubId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      fetchClubs()
      setEditMode(null)
    } catch (error) {
      alert('Gagal mengupdate klub')
      console.error(error) 
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStats = async (clubId: string, type: string, increment: boolean) => {
    setLoading(true)
    try {
      const token = Cookies.get('token')
      const endpoint = `http://localhost:3000/api/v1/admin/club/${increment ? 'plus' : 'minus'}-${type}/${clubId}`
      
      await axios.put(endpoint, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      fetchClubs()
    } catch (error) {
      alert(`Gagal ${increment ? 'menambah' : 'mengurangi'} ${type}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchClubs = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('token')
      const response = await axios.get("http://localhost:3000/api/v1/admin/club/getAll", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setClubs(response.data.message)
    } catch (error) {
      console.error(error)
      alert('Gagal mengambil data klub')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true)
      try {
        const token = Cookies.get('token')
        const response = await axios.get("http://localhost:3000/api/v1/admin/group", {
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
    fetchClubs()
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              {club.photo && (
                <div className="relative w-16 h-16">
                  <Image
                    src={club.photo}
                    alt={club.club_nama}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
              )}
              <div>
                {editMode?.id === club.id ? (
                  <div className="space-y-2">
                    <Input 
                      value={editMode.nama}
                      onChange={(e) => setEditMode({...editMode, nama: e.target.value})}
                      className="text-black"
                    />
                    <Select 
                      value={editMode.groupId} 
                      onValueChange={(value) => setEditMode({...editMode, groupId: value})}
                    >
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
                    <Input 
                      type="file" 
                      onChange={handleFileChange}
                      className="text-black"
                      accept="image/*"
                    />
                    <div className="space-x-2">
                      <Button size="sm" onClick={() => handleEdit(club.id, {
                        club_nama: editMode.nama,
                        photo: clubData.photo as any
                      })}>
                        Simpan
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditMode(null)}>
                        Batal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{club.club_nama}</h3>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => setEditMode({
                        id: club.id,
                        nama: club.club_nama,
                        groupId: club.id
                      })}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span>Menang: {club.menang}</span>
                <div className="space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateStats(club.id, 'menang', false)}
                  >
                    -
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateStats(club.id, 'menang', true)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Seri: {club.seri}</span>
                <div className="space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateStats(club.id, 'seri', false)}
                  >
                    -
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateStats(club.id, 'seri', true)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Kalah: {club.kalah}</span>
                <div className="space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateStats(club.id, 'kalah', false)}
                  >
                    -
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateStats(club.id, 'kalah', true)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Kebobolan: {club.kebobolan}</span>
                <div className="space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateStats(club.id, 'kebobolan', false)}
                  >
                    -
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateStats(club.id, 'kebobolan', true)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Main: {club.main}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Poin: {club.poin}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Gol: {club.goal}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Selisih Gol: {club.selisih}</span>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(club.id)}
                >
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
