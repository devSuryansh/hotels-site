"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Booking {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  hotel: string;
  checkIn: string;
  checkOut: string;
  status: "pending" | "approved" | "rejected";
}

const initialBookings: Booking[] = [
  {
    id: "1",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg",
    },
    hotel: "Grand Hotel",
    checkIn: "2023-05-15",
    checkOut: "2023-05-20",
    status: "pending",
  },
  {
    id: "2",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg",
    },
    hotel: "Seaside Resort",
    checkIn: "2023-06-01",
    checkOut: "2023-06-07",
    status: "approved",
  },
  {
    id: "3",
    customer: {
      name: "Robert Johnson",
      email: "robert@example.com",
      avatar: "/placeholder.svg",
    },
    hotel: "Mountain View Lodge",
    checkIn: "2023-05-25",
    checkOut: "2023-05-28",
    status: "pending",
  },
  {
    id: "4",
    customer: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder.svg",
    },
    hotel: "City Center Hotel",
    checkIn: "2023-06-10",
    checkOut: "2023-06-15",
    status: "rejected",
  },
  {
    id: "5",
    customer: {
      name: "Michael Wilson",
      email: "michael@example.com",
      avatar: "/placeholder.svg",
    },
    hotel: "Luxury Suites",
    checkIn: "2023-06-05",
    checkOut: "2023-06-12",
    status: "pending",
  },
];

export function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleApprove = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "approved" } : booking
      )
    );
  };

  const handleReject = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "rejected" } : booking
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={booking.customer.avatar}
                    alt={booking.customer.name}
                  />
                  <AvatarFallback>
                    {booking.customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{booking.customer.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {booking.customer.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{booking.hotel}</TableCell>
            <TableCell>{formatDate(booking.checkIn)}</TableCell>
            <TableCell>{formatDate(booking.checkOut)}</TableCell>
            <TableCell>
              <Badge
                variant={
                  booking.status === "approved"
                    ? "secondary"
                    : booking.status === "rejected"
                    ? "destructive"
                    : "outline"
                }
              >
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {booking.status === "pending" && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleApprove(booking.id)}
                    className="h-8 w-8 text-green-500"
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleReject(booking.id)}
                    className="h-8 w-8 text-red-500"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Reject</span>
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
