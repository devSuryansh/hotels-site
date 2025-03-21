// src/components/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Hotel {
  _id: string;
  name: string;
  slug: string;
  location: string;
  images: { url: string }[];
}

const HeroSection = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("/api/hotels");
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data: Hotel[] = await res.json();
        setHotels(data.slice(0, 5)); // Limit to 5 featured hotels
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hotels.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? hotels.length - 1 : prev - 1));
  };

  // Skeleton UI for loading state
  const SkeletonHero = () => (
    <div className="relative h-[80vh] mt-16">
      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="h-16 w-3/4 bg-gray-300 animate-pulse mb-4 rounded"></div>
        <div className="h-8 w-1/2 bg-gray-300 animate-pulse mb-8 rounded"></div>
        <div className="h-12 w-32 bg-gray-300 animate-pulse rounded"></div>
      </div>
      <div className="absolute bottom-8 right-8 flex space-x-2">
        <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full"></div>
        <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full"></div>
      </div>
    </div>
  );

  if (loading) return <SkeletonHero />;
  if (error) return <div className="h-[80vh] mt-16 text-center">{error}</div>;
  if (!hotels.length)
    return (
      <div className="h-[80vh] mt-16 text-center">No hotels available</div>
    );

  const currentHotel = hotels[currentIndex];

  return (
    <div className="relative h-[80vh] mt-16">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${
            currentHotel.images[0]?.url || "/placeholder.jpg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {currentHotel.name}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          {currentHotel.location}
        </p>
        <Button
          className="w-fit"
          size="lg"
          onClick={() => router.push(`/${currentHotel.slug}`)}
        >
          View Details
        </Button>
      </div>

      <div className="absolute bottom-8 right-8 flex space-x-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={prevSlide}
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={nextSlide}
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
