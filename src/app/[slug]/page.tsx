/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Users, Wifi, Car, Coffee, Tv } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  guests: z.number().min(1).max(4),
  email: z.string().email("Invalid email address"),
});

export default function HotelPage() {
  const { slug } = useParams();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [guests, setGuests] = useState(2);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { guests: 2 },
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/hotels?slug=${slug}`);
        if (!res.ok) throw new Error("Hotel not found");
        const data = await res.json();
        setHotel(data[0]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [slug]);

  const onSubmit = async (data: any) => {
    try {
      const bookingData = {
        hotel: hotel._id,
        userEmail: data.email,
        checkIn: new Date(data.checkIn),
        guests: data.guests,
      };
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!res.ok) throw new Error("Booking failed");
      toast({
        title: "Success",
        description: "Booking created successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (err as Error).message,
      });
    }
  };

  if (loading)
    return <div className="container mx-auto px-4 py-16">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-16">{error}</div>;
  if (!hotel)
    return <div className="container mx-auto px-4 py-16">Hotel not found</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hotel.location}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{hotel.rating}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {hotel.images.map((image: { url: string }, index: number) => (
          <div
            key={index}
            className="aspect-video relative overflow-hidden rounded-lg"
          >
            <Image
              src={image.url}
              alt={`${hotel.name} - Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">About this hotel</h2>
            <p className="text-muted-foreground">{hotel.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  {index % 5 === 0 && <Wifi className="h-4 w-4" />}
                  {index % 5 === 1 && <Car className="h-4 w-4" />}
                  {index % 5 === 2 && <Coffee className="h-4 w-4" />}
                  {index % 5 === 3 && <Users className="h-4 w-4" />}
                  {index % 5 === 4 && <Tv className="h-4 w-4" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-6">
                  <p className="text-3xl font-bold mb-2">${hotel.price}</p>
                  <p className="text-muted-foreground">per night</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Check-in Date
                  </label>
                  <Input type="date" {...register("checkIn")} />
                  {errors.checkIn && (
                    <p className="text-red-500">{errors.checkIn.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Guests
                  </label>
                  <Input
                    type="number"
                    {...register("guests", { valueAsNumber: true })}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    min={1}
                    max={4}
                  />
                  {errors.guests && (
                    <p className="text-red-500">{errors.guests.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <Input type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Book Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
