"use client";

import { useParams } from "next/navigation";
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
import { useState } from "react";
import Image from "next/image";

// This would typically come from a database
const HOTELS_DATA = {
  "the-ritz-carlton": {
    name: "The Ritz-Carlton",
    location: "Paris, France",
    rating: 4.9,
    price: 1200,
    description:
      "Experience unparalleled luxury in the heart of Paris. The Ritz-Carlton offers spectacular views of the city, world-class dining, and impeccable service.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80",
    ],
    amenities: [
      "Free WiFi",
      "Valet Parking",
      "24/7 Room Service",
      "Spa",
      "Fitness Center",
      "Swimming Pool",
    ],
    phone: "+33 1 43 16 30 30",
    email: "reservations@ritz-paris.com",
  },
  "burj-al-arab": {
    name: "Burj Al Arab",
    location: "Dubai, UAE",
    rating: 5.0,
    price: 2400,
    description:
      "The world's most luxurious hotel, Burj Al Arab is a symbol of modern Dubai. Experience the ultimate in Arabian hospitality and luxury.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80",
    ],
    amenities: [
      "Private Beach",
      "Helipad",
      "Butler Service",
      "Underwater Restaurant",
      "Gold-Plated iPads",
      "Chauffeur Service",
    ],
    phone: "+971 4 301 7777",
    email: "reservations@burjalarab.com",
  },
};

export default function HotelPage() {
  const { slug } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [guests, setGuests] = useState(2);

  const hotel = HOTELS_DATA[slug as keyof typeof HOTELS_DATA];

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Hotel not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hotel Header */}
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
        {hotel.images.map((image, index) => (
          <div
            key={index}
            className="aspect-video relative overflow-hidden rounded-lg"
          >
            <Image
              src={image}
              alt={`${hotel.name} - Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hotel Information */}
        <div className="lg:col-span-2">
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">About this hotel</h2>
            <p className="text-muted-foreground">{hotel.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index % 6 === 0 && <Wifi className="h-4 w-4" />}
                  {index % 6 === 1 && <Car className="h-4 w-4" />}
                  {index % 6 === 2 && <Coffee className="h-4 w-4" />}
                  {index % 6 === 3 && <Users className="h-4 w-4" />}
                  {index % 6 === 4 && <Tv className="h-4 w-4" />}
                  {index % 6 === 5 && <Phone className="h-4 w-4" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {hotel.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {hotel.email}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold mb-2">${hotel.price}</p>
                <p className="text-muted-foreground">per night</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Check-in Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Guests
                  </label>
                  <Input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    min={1}
                    max={4}
                  />
                </div>

                <Button className="w-full">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
