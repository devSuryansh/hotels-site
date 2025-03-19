/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Booking {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  hotel: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "approved" | "rejected" | "cancelled" | "completed";
  paymentStatus: "paid" | "unpaid" | "partial";
}

const initialBookings: Booking[] = [
  {
    id: "1",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg",
    },
    hotel: "Grand Hotel",
    roomType: "Deluxe Suite",
    checkIn: "2023-05-15",
    checkOut: "2023-05-20",
    guests: 2,
    totalPrice: 1495,
    status: "pending",
    paymentStatus: "partial",
  },
  {
    id: "2",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      avatar: "/placeholder.svg",
    },
    hotel: "Seaside Resort",
    roomType: "Ocean View Room",
    checkIn: "2023-06-01",
    checkOut: "2023-06-07",
    guests: 3,
    totalPrice: 1393,
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "3",
    customer: {
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg",
    },
    hotel: "Mountain View Lodge",
    roomType: "Standard Room",
    checkIn: "2023-05-25",
    checkOut: "2023-05-28",
    guests: 1,
    totalPrice: 447,
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "4",
    customer: {
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 789-0123",
      avatar: "/placeholder.svg",
    },
    hotel: "City Center Hotel",
    roomType: "Executive Suite",
    checkIn: "2023-06-10",
    checkOut: "2023-06-15",
    guests: 2,
    totalPrice: 895,
    status: "rejected",
    paymentStatus: "unpaid",
  },
  {
    id: "5",
    customer: {
      name: "Michael Wilson",
      email: "michael@example.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg",
    },
    hotel: "Luxury Suites",
    roomType: "Penthouse",
    checkIn: "2023-06-05",
    checkOut: "2023-06-12",
    guests: 4,
    totalPrice: 2443,
    status: "pending",
    paymentStatus: "partial",
  },
  {
    id: "6",
    customer: {
      name: "Sarah Brown",
      email: "sarah@example.com",
      phone: "+1 (555) 876-5432",
      avatar: "/placeholder.svg",
    },
    hotel: "Grand Hotel",
    roomType: "Family Suite",
    checkIn: "2023-07-01",
    checkOut: "2023-07-08",
    guests: 5,
    totalPrice: 2100,
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "7",
    customer: {
      name: "David Lee",
      email: "david@example.com",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg",
    },
    hotel: "Seaside Resort",
    roomType: "Beach Bungalow",
    checkIn: "2023-06-20",
    checkOut: "2023-06-25",
    guests: 2,
    totalPrice: 1250,
    status: "completed",
    paymentStatus: "paid",
  },
];

export function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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

  const getStatusBadgeVariant = (status: Booking["status"]) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      case "cancelled":
        return "destructive";
      case "completed":
        return "default";
      default:
        return "outline";
    }
  };

  const getPaymentStatusBadgeVariant = (status: Booking["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "success";
      case "partial":
        return "warning";
      default:
        return "destructive";
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
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
                <TableCell>
                  <div>
                    <div className="font-medium">{booking.hotel}</div>
                    <div className="text-xs text-muted-foreground">
                      {booking.roomType}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(booking.checkIn)}</TableCell>
                <TableCell>{formatDate(booking.checkOut)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(booking.status) as any}>
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      getPaymentStatusBadgeVariant(booking.paymentStatus) as any
                    }
                  >
                    {booking.paymentStatus.charAt(0).toUpperCase() +
                      booking.paymentStatus.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Booking Details</DialogTitle>
                          <DialogDescription>
                            Booking ID: {selectedBooking?.id}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedBooking && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-medium">Customer</h3>
                                <p>{selectedBooking.customer.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedBooking.customer.email}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedBooking.customer.phone}
                                </p>
                              </div>
                              <div>
                                <h3 className="font-medium">Hotel</h3>
                                <p>{selectedBooking.hotel}</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedBooking.roomType}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-medium">Check In</h3>
                                <p>{formatDate(selectedBooking.checkIn)}</p>
                              </div>
                              <div>
                                <h3 className="font-medium">Check Out</h3>
                                <p>{formatDate(selectedBooking.checkOut)}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-medium">Guests</h3>
                                <p>{selectedBooking.guests}</p>
                              </div>
                              <div>
                                <h3 className="font-medium">Total Price</h3>
                                <p>${selectedBooking.totalPrice}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-medium">Status</h3>
                                <Badge
                                  variant={
                                    getStatusBadgeVariant(
                                      selectedBooking.status
                                    ) as any
                                  }
                                >
                                  {selectedBooking.status
                                    .charAt(0)
                                    .toUpperCase() +
                                    selectedBooking.status.slice(1)}
                                </Badge>
                              </div>
                              <div>
                                <h3 className="font-medium">Payment Status</h3>
                                <Badge
                                  variant={
                                    getPaymentStatusBadgeVariant(
                                      selectedBooking.paymentStatus
                                    ) as any
                                  }
                                >
                                  {selectedBooking.paymentStatus
                                    .charAt(0)
                                    .toUpperCase() +
                                    selectedBooking.paymentStatus.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {booking.status === "pending" && (
                      <>
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
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
