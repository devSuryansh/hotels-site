"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HotelForm } from "@/components/admin/HotelForm";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rooms: number;
}

export default function HotelsManagement() {
  const [hotels, setHotels] = useState<Hotel[]>([
    { id: "1", name: "Grand Hotel", location: "New York", rooms: 100 },
    { id: "2", name: "Seaside Resort", location: "Miami", rooms: 75 },
  ]);

  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  const handleAddHotel = (newHotel: Omit<Hotel, "id">) => {
    setHotels([...hotels, { ...newHotel, id: Date.now().toString() }]);
    setIsAddHotelOpen(false);
  };

  const handleEditHotel = (updatedHotel: Hotel) => {
    setHotels(
      hotels.map((hotel) =>
        hotel.id === updatedHotel.id ? updatedHotel : hotel
      )
    );
    setEditingHotel(null);
  };

  const handleDeleteHotel = (id: string) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Hotels Management</h2>
        <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Hotel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Hotel</DialogTitle>
            </DialogHeader>
            <HotelForm onSubmit={handleAddHotel} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rooms</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.location}</TableCell>
                <TableCell>{hotel.rooms}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingHotel(hotel)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteHotel(hotel.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {editingHotel && (
        <Dialog
          open={!!editingHotel}
          onOpenChange={() => setEditingHotel(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Hotel</DialogTitle>
            </DialogHeader>
            <HotelForm hotel={editingHotel} onSubmit={handleEditHotel} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
