"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { StarIcon } from "lucide-react";
import { ImageGalleryModal } from "@/components/image-gallery-modal";
import { hotels } from "@/data/hotels";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HotelDetails() {
  const params = useParams();
  const hotelId = Number(params.id);
  const hotel = hotels.find((h) => h.id === hotelId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    specialRequests: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("Booking request submitted successfully!");
  };

  if (!hotel) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">Hotel not found</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{hotel.name}</CardTitle>
            <CardDescription>{hotel.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative mb-4">
              <Image
                src={hotel.image}
                alt={hotel.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex items-center mb-4">
              <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold">{hotel.rating}</span>
            </div>
            <p className="text-lg font-bold mb-4">
              ₹{hotel.price}{" "}
              <span className="text-sm font-normal text-gray-600">
                per night
              </span>
            </p>
            <p className="text-gray-700 mb-6">{hotel.description}</p>

            <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
            <ImageGalleryModal images={hotel.gallery} hotelName={hotel.name} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Book Your Stay</CardTitle>
            <CardDescription>
              Fill out the form below to request a booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in Date</Label>
                  <Input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out Date</Label>
                  <Input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Booking Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
