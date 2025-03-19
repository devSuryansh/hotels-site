/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RecentBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        const res = await fetch("/api/booking");
        if (!res.ok) throw new Error("Failed to fetch recent bookings");
        const data = await res.json();
        // Sort by creation date (assuming timestamps are available) and limit to 5
        const sortedBookings = data
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);
        setBookings(sortedBookings);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentBookings();
  }, []);

  if (loading) return <div>Loading recent bookings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking: any) => (
          <TableRow key={booking._id}>
            <TableCell>{booking.userEmail}</TableCell>
            <TableCell>{booking.hotel.name}</TableCell>
            <TableCell>
              {new Date(booking.checkIn).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  booking.status === "confirmed" ? "default" : "secondary"
                }
              >
                {booking.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
