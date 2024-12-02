"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

interface list_club {
  id: number,
  nama: string
}

interface Group {
  id: string
  nama: string
  list_club: list_club[]
}

export function GroupList() {
  const [groups, setGroups] = useState<Group[]>([])
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [editedName, setEditedName] = useState('')

  const handleDelete = async (groupId: string) => {
    try {
      const token = Cookies.get('token')
      await axios.delete(`https://be-most.smktelkom-mlg.sch.id/api/v1/admin/group/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      fetcher() // Refresh data setelah menghapus
    } catch (error) {
      alert(error)
      alert("Gagal menghapus group")
    }
  }

  const handleEdit = async (groupId: string, updatedData: Partial<Group>) => {
    try {
      const token = Cookies.get('token')
      await axios.put(`https://be-most.smktelkom-mlg.sch.id/api/v1/admin/group/${groupId}`, {
        nama: updatedData.nama // Mengirim nama terbaru dalam request body
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setEditingGroup(null)
      fetcher() // Refresh data setelah mengedit
    } catch (error) {
      alert("Gagal mengupdate group")
    }
  }

  const handleSave = () => {
    if (editingGroup) {
      if (editedName.trim().length === 0) {
        alert("Nama group tidak boleh kosong")
        return
      }
      handleEdit(editingGroup.id, { nama: editedName.trim() })
    }
  }

  const handleCancel = () => {
    setEditingGroup(null)
    setEditedName('')
  }

  const fetcher = async () => {
    try {
      const token = Cookies.get('token')
      const response = await axios.get("https://be-most.smktelkom-mlg.sch.id/api/v1/admin/group", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setGroups(response.data.message)
    } catch (error) {
      alert("Failed to retrieve club data")
    }
  }

  useEffect(() => {
    fetcher()
  }, [])

  return (
    <div className="space-y-3">
      {groups.map(group => (
        <div key={group.id} className="flex-row items-center justify-between">
          <div className="flex bg-white justify-between rounded-t-md items-center w-full h-[60px] space-x-4">
            {editingGroup?.id === group.id ? (
              <div className="flex items-center gap-2 p-3 w-full">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-primaryRed"
                  placeholder="Nama Group"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-primaryRed p-3">Group {group.nama}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-primaryRed p-3 font-bold">{group.list_club.length} Tim</span>
                  <button 
                    onClick={() => handleDelete(group.id)}
                    className="text-primaryRed hover:text-red-700"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => {
                      setEditingGroup(group)
                      setEditedName(group.nama)
                    }}
                    className="text-primaryRed hover:text-red-700 mr-3"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
          {
            group.list_club.map(item => (
              <div key={item.id} className='bg-gray-200 border-t-2 border-white w-full flex justify-between'>
                <h1 className='text-primaryRed p-3'>Club {item.nama}</h1>
              </div>
            ))
          }
        </div>
      ))}
    </div>
  )
}
