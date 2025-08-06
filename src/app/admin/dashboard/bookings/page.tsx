"use client";

import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { authenticatedFetch } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Booking } from "@/types";

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched bookings data:", data); // Debug log
      setBookings(data.bookings || []); // Ensure we have an array
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (
    bookingId: string,
    status: "Pending" | "Confirmed" | "Cancelled"
  ) => {
    setUpdatingStatus(bookingId);
    try {
      const response = await authenticatedFetch("/api/bookings/update-status", {
        method: "PUT",
        body: JSON.stringify({ bookingId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      // Show success message
      toast({
        title: "Booking Updated",
        description: `Booking status changed to ${status}.`,
      });

      // Refresh bookings after update
      await fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Inquiries</CardTitle>
          <CardDescription>Loading booking data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Inquiries</CardTitle>
          <CardDescription>
            View and manage all booking inquiries from customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No bookings found</p>
              <Button onClick={fetchBookings} variant="outline">
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Booking Inquiries</CardTitle>
          <CardDescription>
            View and manage all booking inquiries from customers.
          </CardDescription>
        </div>
        <Button onClick={fetchBookings} variant="outline" size="sm">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Hotel</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Check-in</TableHead>
              <TableHead className="hidden md:table-cell">Check-out</TableHead>
              <TableHead className="hidden lg:table-cell">Guests</TableHead>
              <TableHead className="hidden xl:table-cell">Phone</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="font-medium">{booking.customerName}</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.email}
                  </div>
                  <div className="text-xs text-muted-foreground xl:hidden">
                    {booking.phone}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="font-medium">{booking.hotelName}</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.roomType}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant={
                      booking.status === "Confirmed"
                        ? "default"
                        : booking.status === "Cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                    className={
                      booking.status === "Confirmed" ? "bg-green-600" : ""
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {booking.guests}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {booking.phone}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        disabled={updatingStatus === booking.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          updateBookingStatus(booking.id, "Confirmed")
                        }
                        disabled={booking.status === "Confirmed"}
                      >
                        Mark as Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          updateBookingStatus(booking.id, "Pending")
                        }
                        disabled={booking.status === "Pending"}
                      >
                        Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          updateBookingStatus(booking.id, "Cancelled")
                        }
                        disabled={booking.status === "Cancelled"}
                      >
                        Mark as Cancelled
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
