"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FEATURED_HOTELS = [
  {
    id: 1,
    name: "The Ritz-Carlton",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Burj Al Arab",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Four Seasons",
    location: "Bora Bora",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Aman Tokyo",
    location: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Bellagio",
    location: "Las Vegas, USA",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_HOTELS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? FEATURED_HOTELS.length - 1 : prev - 1
    );
  };

  const currentHotel = FEATURED_HOTELS[currentIndex];

  return (
    <div className="relative h-[80vh] mt-16">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${currentHotel.image})` }}
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
        <Button className="w-fit" size="lg">
          Book Now
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
}
