import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import Cookie from 'js-cookie'

interface Club {
  id: number;
  nama: string;
}

interface PlayerFormData {
  name: string;
  clubId: number;
  position: string;
  number: string;
  photo: File | null;
}

export function AddPlayerForm({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [playerData, setPlayerData] = useState<PlayerFormData>({
    name: '',
    clubId: 0,
    position: '',
    number: '',
    photo: null,
  });

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const token = Cookie.get('token');
        const response = await axios.get('https://be-most.smktelkom-mlg.sch.id/api/v1/admin/club/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.message)
        if (response.data.message && Array.isArray(response.data.message)) {
          setClubs(response.data.message);
         
        } else {
          setError('Invalid club data received');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to load clubs');
        } else {
          setError('Failed to load clubs. Please try again later.');
        }
        console.error('Error fetching clubs:', err);
      }
    };

    fetchClubs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    if (name === 'clubId' && !value) {
      return;
    }
    setPlayerData(prev => ({
      ...prev,
      [name]: name === 'clubId' ? Number(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setError('Photo size must be less than 2MB');
        return;
      }
      setPlayerData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validate required fields before making request
      if (!playerData.name || !playerData.clubId || !playerData.position || !playerData.number) {
        throw new Error('All fields are required');
      }

      // Validate photo is selected
      if (!playerData.photo) {
        throw new Error('Player photo is required');
      }

      // Validate number range
      const jerseyNumber = parseInt(playerData.number);
      if (isNaN(jerseyNumber) || jerseyNumber < 1 || jerseyNumber > 99) {
        throw new Error('Jersey number must be between 1 and 99');
      }

      const token = Cookie.get('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const formData = new FormData();
      formData.append('nama', playerData.name); // Changed 'name' to 'nama'
      formData.append('clubId', playerData.clubId.toString());
      formData.append('posisi', playerData.position);
      formData.append('no', playerData.number); // Changed 'number' to 'no'
      formData.append('photo', playerData.photo);

      console.log('Submitting player data:', {
        nama: playerData.name,
        clubId: playerData.clubId,
        position: playerData.position,
        no: playerData.number, // Updated log to show 'no' instead of 'number'
        photoName: playerData.photo.name
      });

      // Make API request
      const response = await axios.post('https://be-most.smktelkom-mlg.sch.id/api/v1/admin/pemain', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('API Response:', response.data);

      // Reset form and close on success
      setPlayerData({ name: '', clubId: 0, position: '', number: '', photo: null });
      
  
      
      // Close the form
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Log detailed error information
        console.error('API Error Details:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          headers: err.response?.headers
        });

        const errorMessage = err.response?.data?.message || err.message;
        setError(`Error creating player: ${errorMessage}`);
      } else {
        const error = err as Error;
        setError(error.message || 'An unexpected error occurred');
        console.error('Non-Axios error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow text-black">
      <h2 className="text-xl font-bold mb-4 text-black">Add New Player</h2>
      
      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="name" className='text-black'>Player Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={playerData.name} 
          onChange={handleInputChange} 
          required 
          disabled={isLoading}
        />
      </div>
      
      <div>
        <Label htmlFor="clubId">Club</Label>
        <Select 
          name="clubId"
          value={playerData.clubId.toString()}
          onValueChange={(value) => handleInputChange({ target: { name: 'clubId', value }})}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select club" />
          </SelectTrigger>
          <SelectContent>
            {clubs.length > 0 ? (
              clubs.map((club) => (
                <SelectItem key={club.id} value={club.id.toString()}>
                  {club.nama}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-clubs">No clubs available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      
      <div>
  <Label htmlFor="position" className="text-black">Player Position</Label>
  <Select
    name="position"
    value={playerData.position}
    onValueChange={(value) => handleInputChange({ target: { name: 'position', value } })}
    disabled={isLoading}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select position" />
    </SelectTrigger>
    <SelectContent 
      position="popper" 
      align="center" 
      side="bottom" 
      className="text-black z-50" 
      sideOffset={5} 
    >
     <SelectItem value="GK">Goalkeeper (Penjaga Gawang)</SelectItem>
     <SelectItem value="CB">Center Back (Bek Tengah)</SelectItem>
    <SelectItem value="RB">Right Back (Bek Kanan)</SelectItem>
    <SelectItem value="LB">Left Back (Bek Kiri)</SelectItem>
    <SelectItem value="DMF">Defensive Midfielder (Gelandang Bertahan)</SelectItem>
    <SelectItem value="CMF">Central Midfielder (Gelandang Tengah)</SelectItem>
    <SelectItem value="RMF">Right Midfielder (Gelandang Kanan)</SelectItem>
    <SelectItem value="LMF">Left Midfielder (Gelandang Kiri)</SelectItem>
    <SelectItem value="CF">Center Forward (Penyerang Tengah)</SelectItem>
    <SelectItem value="WF">Wing Forward (Penyerang Sayap)</SelectItem>
    </SelectContent>
  </Select>
</div>

      
      <div>
        <Label htmlFor="number" className='text-black'>Jersey Number</Label>
        <Input 
          id="number" 
          name="number" 
          type="number" 
          value={playerData.number} 
          onChange={handleInputChange} 
          required 
          min="1"
          max="99"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <Label htmlFor="photo" className='text-black'>Player Photo (Max 2MB)</Label>
        <Input 
          id="photo" 
          name="photo" 
          type="file" 
          className='text-black' 
          onChange={handleFileChange} 
          accept="image/*"
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          className="text-black" 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding Player...' : 'Add Player'}
        </Button>
      </div>
    </form>
  );
}
