"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Star,
  Users,
  Phone,
  Wifi,
  Car,
  Coffee,
  Tv,
  Mail,
} from "lucide-react";

export default function HotelPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await fetch(`/api/Hotels/${slug}`);
        if (!res.ok) {
          console.error("Hotel not found");
          return;
        }
        const data = await res.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
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

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {hotel.images.map((image: string, index: number) => (
          <div
            key={index}
            className="aspect-video relative overflow-hidden rounded-lg"
          >
            <Image
              src={image}
              alt={`Hotel Image ${index}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">About this hotel</h2>
          <p className="text-muted-foreground">{hotel.description}</p>
        </div>
      </div>
    </div>
  );
}
