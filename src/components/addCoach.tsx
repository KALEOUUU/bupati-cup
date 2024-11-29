
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';

interface Coach {
  id: number;
  name: string;
  club: string;
  imageUrl: string;
}

interface AddCoachProps {
  onClose?: () => void;
}

export default function AddCoach({ onClose }: AddCoachProps) {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    club: '',
    imageFile: null as File | null,
    imageUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCoach: Coach = {
      id: coaches.length + 1,
      name: formData.name,
      club: formData.club,
      imageUrl: formData.imageUrl
    };

    setCoaches(prev => [...prev, newCoach]);
    
    // Reset form
    setFormData({
      name: '',
      club: '',
      imageFile: null,
      imageUrl: ''
    });

    // Close the form if onClose is provided
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="container mx-auto p-6 text-black">
      <Card>
        <CardHeader>
          <CardTitle>Add New Coach</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter coach name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="club">Club</Label>
              <Input
                id="club"
                name="club"
                value={formData.club}
                onChange={handleInputChange}
                placeholder="Enter club name"
                required
              />
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

      {/* Display added coaches */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Added Coaches</h2>
        <div className="grid gap-4">
          {coaches.map(coach => (
            <Card key={coach.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <Image
                  src={coach.imageUrl}
                  alt={coach.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold">{coach.name}</h3>
                  <p className="text-muted-foreground">Club: {coach.club}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}