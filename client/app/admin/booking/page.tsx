"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Booking {
  id: string;
  hotelName: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      hotelName: "Grand Hotel",
      guestName: "John Doe",
      checkIn: "2023-07-01",
      checkOut: "2023-07-05",
      status: "Confirmed",
    },
    {
      id: "2",
      hotelName: "Seaside Resort",
      guestName: "Jane Smith",
      checkIn: "2023-07-10",
      checkOut: "2023-07-15",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Bookings Management</h2>
      <div className="flex mb-4">
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-2"
        />
        <Button>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hotel Name</TableHead>
              <TableHead>Guest Name</TableHead>
              <TableHead>Check-In</TableHead>
              <TableHead>Check-Out</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.hotelName}</TableCell>
                <TableCell>{booking.guestName}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
