/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Star,
  Wifi,
  Briefcase,
  Utensils,
  Dumbbell,
  Car,
  Tv,
  Mountain,
  Landmark,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample hotel data
const hotelData = {
  name: "Urban Retreat Hotel",
  slug: "urban-retreat-hotel",
  address: "101 City Center, Metropolis",
  locationUrl: "https://maps.google.com/?q=urban-retreat-hotel",
  description:
    "A modern hotel in the heart of the city with easy access to attractions.",
  policies: "Check-in: 2 PM, Check-out: 11 AM, No pets.",
  ratings: 4,
  features: {
    mainFeatures: ["wifi", "business center"],
    dining: ["rooftop bar"],
    leisure: ["gym"],
    services: ["valet parking"],
    roomComforts: ["desk", "tv"],
  },
  roomTypes: [
    {
      category: "Standard",
      pricePerNight: 130,
    },
    {
      category: "Executive",
      pricePerNight: 220,
    },
  ],
  nearbyAttractions: ["Shopping Mall", "Theater"],
  landmarks: ["City Tower"],
  images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"],
};

// Zod schema for form validation
const bookingSchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z
    .number()
    .min(1, "Number of guests must be at least 1")
    .max(4, "Maximum 4 guests allowed"),
  email: z.string().email("Invalid email address"),
  roomType: z.string().min(1, "Please select a room type"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Feature icon mapping
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const featureIcons: Record<string, any> = {
  wifi: Wifi,
  "business center": Briefcase,
  "rooftop bar": Utensils,
  gym: Dumbbell,
  "valet parking": Car,
  desk: Briefcase,
  tv: Tv,
};

const HotelPage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [nights, setNights] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 2,
      roomType: "Standard",
    },
  });

  // Watch check-in and check-out dates to calculate nights
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  // Calculate number of nights when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    }
  }, [checkIn, checkOut]);

  // Set minimum check-out date to be after check-in
  useEffect(() => {
    if (checkIn) {
      const minCheckOutDate = new Date(checkIn);
      minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);
      const minCheckOutString = minCheckOutDate.toISOString().split("T")[0];

      const checkOutInput = document.getElementById(
        "checkOut"
      ) as HTMLInputElement;
      if (checkOutInput) {
        checkOutInput.min = minCheckOutString;
      }
    }
  }, [checkIn]);

  // Set minimum check-in date to today
  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const checkInInput = document.getElementById("checkIn") as HTMLInputElement;
    if (checkInInput) {
      checkInInput.min = todayString;
    }
  }, []);

  // Booking submission handler
  const onSubmit = async (data: BookingFormData) => {
    try {
      // In a real app, you would send this data to your API
      console.log("Booking data:", data);

      toast({
        title: "Booking Confirmed!",
        description: `Your ${
          data.roomType
        } room has been booked for ${nights} night${nights > 1 ? "s" : ""}.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: (err as Error).message || "Something went wrong",
      });
    }
  };

  // Get the selected room price
  const getSelectedRoomPrice = () => {
    const roomType = watch("roomType");
    const room = hotelData.roomTypes.find((r) => r.category === roomType);
    return room ? room.pricePerNight : hotelData.roomTypes[0].pricePerNight;
  };

  // Format feature name for display
  const formatFeatureName = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get icon for feature
  const getFeatureIcon = (feature: string) => {
    const Icon = featureIcons[feature.toLowerCase()] || Wifi;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl mt-16">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] rounded-xl overflow-hidden mb-8">
        <Image
          src={hotelData.images[0] || "/placeholder.svg"}
          alt={hotelData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
          <Badge className="mb-2 self-start bg-primary/90 hover:bg-primary">
            {hotelData.ratings} <Star className="h-3 w-3 ml-1 fill-current" />
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {hotelData.name}
          </h1>
          <div className="flex items-center text-white/90">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hotelData.address}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            {Object.entries(hotelData.features).flatMap(([category, items]) =>
              items.map((feature, index) => (
                <div
                  key={`${category}-${index}`}
                  className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full"
                >
                  {getFeatureIcon(feature)}
                  <span>{formatFeatureName(feature)}</span>
                </div>
              ))
            )}
          </div>

          {/* Tabs for Hotel Information */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {hotelData.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {hotelData.description}
                  </p>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Hotel Policies</h3>
                    <p className="text-muted-foreground">
                      {hotelData.policies}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Features & Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                      {Object.entries(hotelData.features).map(
                        ([category, items]) =>
                          items.length > 0 && (
                            <div key={category} className="space-y-2">
                              <h4 className="text-sm font-medium capitalize">
                                {category.replace(/([A-Z])/g, " $1")}
                              </h4>
                              <ul className="space-y-1">
                                {items.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center gap-2 text-muted-foreground"
                                  >
                                    {getFeatureIcon(item)}
                                    <span>{formatFeatureName(item)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rooms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Room Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {hotelData.roomTypes.map((room, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">
                            {room.category} Room
                          </h3>
                          <div className="flex items-center text-muted-foreground">
                            <Tv className="h-4 w-4 mr-2" />
                            <span>TV</span>
                            <span className="mx-2">•</span>
                            <Wifi className="h-4 w-4 mr-2" />
                            <span>Free WiFi</span>
                            {room.category === "Executive" && (
                              <>
                                <span className="mx-2">•</span>
                                <Briefcase className="h-4 w-4 mr-2" />
                                <span>Work Desk</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end justify-center">
                          <div className="text-2xl font-bold">
                            ${room.pricePerNight}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per night
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nearby" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nearby Attractions & Landmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Mountain className="h-5 w-5 text-primary" />{" "}
                        Attractions
                      </h3>
                      <ul className="space-y-3">
                        {hotelData.nearbyAttractions.map(
                          (attraction, index) => (
                            <li key={index} className="flex items-start">
                              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-xs font-medium text-primary">
                                  {index + 1}
                                </span>
                              </span>
                              <span>{attraction}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Landmark className="h-5 w-5 text-primary" /> Landmarks
                      </h3>
                      <ul className="space-y-3">
                        {hotelData.landmarks.map((landmark, index) => (
                          <li key={index} className="flex items-start">
                            <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-medium text-primary">
                                {index + 1}
                              </span>
                            </span>
                            <span>{landmark}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href={hotelData.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Google Maps
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle>Book Your Stay</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-4">
                  <p className="text-3xl font-bold">
                    ${getSelectedRoomPrice()}
                  </p>
                  <p className="text-muted-foreground">per night</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="roomType">
                    Room Type
                  </label>
                  <select
                    id="roomType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("roomType")}
                  >
                    {hotelData.roomTypes.map((room, index) => (
                      <option key={index} value={room.category}>
                        {room.category} - ${room.pricePerNight}/night
                      </option>
                    ))}
                  </select>
                  {errors.roomType && (
                    <p className="text-red-500 text-sm">
                      {errors.roomType.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="checkIn">
                      Check-in
                    </label>
                    <Input id="checkIn" type="date" {...register("checkIn")} />
                    {errors.checkIn && (
                      <p className="text-red-500 text-sm">
                        {errors.checkIn.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="checkOut">
                      Check-out
                    </label>
                    <Input
                      id="checkOut"
                      type="date"
                      {...register("checkOut")}
                    />
                    {errors.checkOut && (
                      <p className="text-red-500 text-sm">
                        {errors.checkOut.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="guests">
                    Guests
                  </label>
                  <Input
                    id="guests"
                    type="number"
                    {...register("guests", { valueAsNumber: true })}
                    min={1}
                    max={4}
                  />
                  {errors.guests && (
                    <p className="text-red-500 text-sm">
                      {errors.guests.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {checkIn && checkOut && nights > 0 && (
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>
                        Room ({nights} night{nights > 1 ? "s" : ""})
                      </span>
                      <span>${getSelectedRoomPrice() * nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>
                        ${Math.round(getSelectedRoomPrice() * nights * 0.15)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        ${Math.round(getSelectedRoomPrice() * nights * 1.15)}
                      </span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Reserve Now
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You won&apos;t be charged yet
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
