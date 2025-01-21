import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rooms: number;
  description?: string;
  services?: string[];
  facilities?: string[];
  images?: string[];
}

interface HotelFormProps {
  hotel?: Hotel;
  onSubmit: (hotel: Omit<Hotel, "id">) => void;
}

export const HotelForm = ({ hotel, onSubmit }: HotelFormProps) => {
  const [formData, setFormData] = useState<Omit<Hotel, "id">>({
    name: hotel?.name || "",
    location: hotel?.location || "",
    rooms: hotel?.rooms || 0,
    description: hotel?.description || "",
    services: hotel?.services || [],
    facilities: hotel?.facilities || [],
    images: hotel?.images || [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesUploaded = (newImages: File[]) => {
    // In a real application, you would upload these images to a server and get back URLs
    // For this example, we'll just use object URLs
    const imageUrls = newImages.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...imageUrls],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Hotel Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="rooms">Number of Rooms</Label>
        <Input
          id="rooms"
          name="rooms"
          type="number"
          value={formData.rooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="services">Services (comma-separated)</Label>
        <Input
          id="services"
          name="services"
          value={formData.services.join(", ")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              services: e.target.value.split(",").map((s) => s.trim()),
            }))
          }
        />
      </div>
      <div>
        <Label htmlFor="facilities">Facilities (comma-separated)</Label>
        <Input
          id="facilities"
          name="facilities"
          value={formData.facilities.join(", ")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              facilities: e.target.value.split(",").map((s) => s.trim()),
            }))
          }
        />
      </div>
      <div>
        <Label>Hotel Images</Label>
        <ImageUpload
          onImagesUploaded={handleImagesUploaded}
          existingImages={formData.images}
        />
      </div>
      <Button type="submit">{hotel ? "Update Hotel" : "Add Hotel"}</Button>
    </form>
  );
};
