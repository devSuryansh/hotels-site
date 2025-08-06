"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BedDouble,
  CalendarCheck,
  ArrowUpRight,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Hotel, Booking } from "@/types";
import { toast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hotels and bookings in parallel
        const [hotelsResponse, bookingsResponse] = await Promise.all([
          fetch("/api/hotels"),
          fetch("/api/bookings"),
        ]);

        if (hotelsResponse.ok) {
          const hotelsData = await hotelsResponse.json();
          setHotels(hotelsData.hotels || []);
        } else {
          console.error("Failed to fetch hotels");
          toast({
            title: "Error",
            description: "Failed to fetch hotels data.",
            variant: "destructive",
          });
        }

        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json();
          // Convert date strings back to Date objects
          const bookingsWithDates = bookingsData.bookings.map(
            (booking: any) => ({
              ...booking,
              checkIn: new Date(booking.checkIn),
              checkOut: new Date(booking.checkOut),
            })
          );
          setBookings(bookingsWithDates);
        } else {
          console.error("Failed to fetch bookings");
          toast({
            title: "Error",
            description: "Failed to fetch bookings data.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalHotels = hotels.length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const recentBookings = bookings
    .sort(
      (a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
    )
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hotels</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHotels}</div>
            <p className="text-xs text-muted-foreground">managed properties</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">inquiries received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Inquiries
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBookings}</div>
            <p className="text-xs text-muted-foreground">
              require confirmation
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Booking Inquiries</CardTitle>
              <CardDescription>
                A list of the most recent inquiries.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/dashboard/bookings">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="font-medium">{booking.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.email}
                      </div>
                    </TableCell>
                    <TableCell>{booking.hotelName}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === "Confirmed"
                            ? "default"
                            : booking.status === "Cancelled"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.checkIn.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {booking.checkOut.toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
