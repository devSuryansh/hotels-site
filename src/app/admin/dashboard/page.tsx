/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { imagekit } from "@/lib/imagekit";
import { useToast } from "@/hooks/use-toast";

// Extend the default session type
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user?: User;
  }
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newHotel, setNewHotel] = useState({
    name: "",
    slug: "",
    location: "",
    description: "",
    price: 0,
    amenities: "",
    images: [] as string[],
  });
  const { toast } = useToast();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      !session?.user ||
      session.user.role !== "admin"
    ) {
      router.push("/admin/login");
    } else if (session.user.role === "admin") {
      fetchBookings();
      fetchUsers();
      fetchHotels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hotels");
      if (!res.ok) throw new Error("Failed to fetch hotels");
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const verifyManager = async (userId: string, hotels: string[]) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${userId}/verify`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "manager", hotels }),
      });
      if (!res.ok) throw new Error("Failed to verify manager");
      fetchUsers();
      toast({ title: "Success", description: "Manager verified" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (bookingId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/booking/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "confirmed" }),
      });
      if (!res.ok) throw new Error("Failed to confirm booking");
      fetchBookings();
      toast({ title: "Success", description: "Booking confirmed" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) =>
        imagekit.upload({
          file: Buffer.from(await file.arrayBuffer()),
          fileName: `${Date.now()}-${file.name}`,
          folder: "/hotels",
        })
      );
      const results = await Promise.all(uploadPromises);
      const imageUrls = results.map((result) => result.url);
      setNewHotel((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
      toast({ title: "Success", description: "Images uploaded" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload images",
      });
    } finally {
      setLoading(false);
    }
  };

  const addHotel = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newHotel,
          amenities: newHotel.amenities.split(",").map((item) => item.trim()),
        }),
      });
      if (!res.ok) throw new Error("Failed to add hotel");
      setNewHotel({
        name: "",
        slug: "",
        location: "",
        description: "",
        price: 0,
        amenities: "",
        images: [],
      });
      fetchHotels();
      toast({ title: "Success", description: "Hotel added" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteHotel = async (hotelId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hotels/${hotelId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete hotel");
      fetchHotels();
      toast({ title: "Success", description: "Hotel deleted" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHotel = async (hotelId: string, updates: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hotels/${hotelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update hotel");
      fetchHotels();
      toast({ title: "Success", description: "Hotel updated" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-16">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Add New Hotel</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <Input
              placeholder="Name"
              value={newHotel.name}
              onChange={(e) =>
                setNewHotel({ ...newHotel, name: e.target.value })
              }
              disabled={loading}
            />
            <Input
              placeholder="Slug"
              value={newHotel.slug}
              onChange={(e) =>
                setNewHotel({ ...newHotel, slug: e.target.value })
              }
              disabled={loading}
            />
            <Input
              placeholder="Location"
              value={newHotel.location}
              onChange={(e) =>
                setNewHotel({ ...newHotel, location: e.target.value })
              }
              disabled={loading}
            />
            <Input
              placeholder="Description"
              value={newHotel.description}
              onChange={(e) =>
                setNewHotel({ ...newHotel, description: e.target.value })
              }
              disabled={loading}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newHotel.price}
              onChange={(e) =>
                setNewHotel({
                  ...newHotel,
                  price: parseInt(e.target.value) || 0,
                })
              }
              disabled={loading}
            />
            <Input
              placeholder="Amenities (comma-separated)"
              value={newHotel.amenities}
              onChange={(e) =>
                setNewHotel({ ...newHotel, amenities: e.target.value })
              }
              disabled={loading}
            />
            <Input
              type="file"
              multiple
              onChange={handleImageUpload}
              disabled={loading}
            />
            <Button onClick={addHotel} disabled={loading}>
              {loading ? "Adding..." : "Add Hotel"}
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pending Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking: any) => (
              <Card key={booking._id}>
                <CardContent className="p-6">
                  <p>Hotel: {booking.hotel.name}</p>
                  <p>Email: {booking.userEmail}</p>
                  <p>
                    Check-in: {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                  <Button
                    onClick={() => confirmBooking(booking._id)}
                    disabled={loading}
                  >
                    Confirm
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pending Managers</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4">
            {users
              .filter((u: any) => u.role === "pending")
              .map((user: any) => (
                <Card key={user._id}>
                  <CardContent className="p-6">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <Button
                      onClick={() => verifyManager(user._id, [])}
                      disabled={loading}
                    >
                      Verify as Manager
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Hotels</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4">
            {hotels.map((hotel: any) => (
              <Card key={hotel._id}>
                <CardContent className="p-6">
                  <p>Name: {hotel.name}</p>
                  <p>Location: {hotel.location}</p>
                  <p>Price: ${hotel.price}</p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateHotel(hotel._id, { price: hotel.price + 10 })
                      }
                      disabled={loading}
                    >
                      Update Price
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteHotel(hotel._id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
