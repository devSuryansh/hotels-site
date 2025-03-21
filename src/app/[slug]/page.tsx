"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Users, Wifi, Car, Coffee, Tv } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import NotFoundPage from "../not-found";

interface Hotel {
  _id: string;
  name: string;
  slug: string;
  location: string;
  images: { url: string }[];
  rating: number;
  price: number;
  description: string;
  amenities: string[];
}

// Zod schema for form validation
const bookingSchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  guests: z
    .number()
    .min(1, "Number of guests must be at least 1")
    .max(4, "Maximum 4 guests allowed"),
  email: z.string().email("Invalid email address"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const HotelPage = () => {
  const { slug } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { guests: 2 },
  });

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Fetch hotel data when visible
  useEffect(() => {
    if (!isVisible || !slug) return;

    const fetchHotel = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/hotels?slug=${slug}`, {
          cache: "force-cache",
        });
        if (!res.ok) throw new Error("Hotel not found");
        const data: Hotel[] = await res.json();
        if (!data.length) throw new Error("Hotel not found");
        setHotel(data[0]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [slug, isVisible]);

  // Booking submission handler
  const onSubmit = async (data: BookingFormData) => {
    if (!hotel) return;
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

  // Skeleton UI
  const SkeletonHotelPage = () => (
    <div ref={sectionRef} className="container mx-auto px-4 py-16 mt-16">
      <div className="mb-8">
        <div className="h-10 w-1/2 bg-gray-200 animate-pulse mb-2 rounded" />
        <div className="flex items-center gap-4">
          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="aspect-video bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-8 w-1/4 bg-gray-200 animate-pulse mb-4 rounded" />
          <div className="h-40 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-8 w-1/4 bg-gray-200 animate-pulse mt-8 mb-4 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-24 bg-gray-200 animate-pulse rounded"
                />
              ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="h-8 w-16 bg-gray-200 animate-pulse mb-2 rounded" />
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
              <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Memoized images section
  const imagesSection = useMemo(() => {
    if (!hotel) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {hotel.images.map((image, index) => (
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
    );
  }, [hotel]);

  // Memoized amenities section
  const amenitiesSection = useMemo(() => {
    if (!hotel) return null;
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {hotel.amenities.map((amenity, index) => (
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
    );
  }, [hotel]);

  if (loading || !isVisible) return <SkeletonHotelPage />;
  if (error || !hotel)
    return (
      <div className="container mx-auto px-4 py-16 mt-16 text-center">
        {error ? (
          <>
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </>
        ) : (
          <NotFoundPage />
        )}
      </div>
    );

  return (
    <div ref={sectionRef} className="container mx-auto px-4 py-16 mt-16">
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

      {imagesSection}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">About this hotel</h2>
            <p className="text-muted-foreground">{hotel.description}</p>
          </div>
          {amenitiesSection}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-6">
                  <p className="text-3xl font-bold mb-2">₹{hotel.price}</p>
                  <p className="text-muted-foreground">per night</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Check-in Date
                  </label>
                  <Input type="date" {...register("checkIn")} />
                  {errors.checkIn && (
                    <p className="text-red-500 text-sm">
                      {errors.checkIn.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Guests
                  </label>
                  <Input
                    type="number"
                    {...register("guests", { valueAsNumber: true })}
                    onChange={(e) =>
                      setValue("guests", parseInt(e.target.value))
                    }
                    min={1}
                    max={4}
                  />
                  {errors.guests && (
                    <p className="text-red-500 text-sm">
                      {errors.guests.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <Input type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
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
};

export default HotelPage;
