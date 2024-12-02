import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';
import axios from 'axios';
import Cookie from 'js-cookie';

interface Coach {
  id: number;
  name: string;
  club: string;
  imageUrl: string;
}

interface AddCoachProps {
  onClose?: () => void;
}

interface Club {
   id: number,
   club_nama: string
}

export default function AddCoach({ onClose }: AddCoachProps) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [formData, setFormData] = useState({
    nama: '',
    clubId: '',
    imageFile: null as File | null,
    imageUrl: ''
  });
  const [error, setError] = useState('');

  const fetchClubs = async () => {
    try {
      const token = Cookie.get('token');
      const response = await axios.get('https://be-most.smktelkom-mlg.sch.id/api/v1/admin/club/name', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClubs(response.data.message);
    } catch (err) {
      console.error('Error fetching clubs:', err);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: imageUrl
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = Cookie.get('token');
      const formDataToSend = new FormData();
      alert(formData.clubId)
      formDataToSend.append('nama', formData.nama); // Changed from 'name' to 'nama'
      formDataToSend.append('clubId', formData.clubId);
      if (formData.imageFile) {
        formDataToSend.append('photo', formData.imageFile); // Changed from 'image' to 'foto'
      }

      await axios.post('https://be-most.smktelkom-mlg.sch.id/admin/coach', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Reset form
      setFormData({
        nama: '',
        clubId: '',
        imageFile: null,
        imageUrl: ''
      });

      // Close the form if onClose is provided
      if (onClose) {
        onClose();
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Failed to add coach');
      } else {
        setError('An error occurred while adding coach');
      }
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="container mx-auto p-6 text-black">
      <Card>
        <CardHeader>
          <CardTitle>Add New Coach</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="nama">Name</label>
      <input
        id="nama"
        name="nama"
        type="text"
        value={formData.nama}
        onChange={handleInputChange}
        placeholder="Enter coach name"
        required
      />
            </div>
            
            <div>
              <Label htmlFor="clubId">Club</Label>
              <Select name="clubId" value={formData.clubId} onValueChange={(value) => handleInputChange({ target: { name: 'clubId', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select club" className='text-black' />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id.toString()} className='text-black'>
                     {club.id} {club.club_nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image">Coach Photo</Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <Image
                    src={formData.imageUrl}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-black hover:bg-gray-800">
                Add Coach
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}