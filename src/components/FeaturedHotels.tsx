"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HOTELS = [
  {
    id: 1,
    slug: "the-ritz-carlton",
    name: "Grand Hyatt",
    location: "Singapore",
    rating: 4.8,
    price: 450,
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    slug: "burj-al-arab",
    name: "The Peninsula",
    location: "Hong Kong",
    rating: 4.9,
    price: 600,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    slug: "mandarin-oriental",
    name: "Mandarin Oriental",
    location: "Bangkok",
    rating: 4.7,
    price: 380,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    slug: "waldorf-astoria",
    name: "Waldorf Astoria",
    location: "New York",
    rating: 4.8,
    price: 750,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    slug: "park-hyatt",
    name: "Park Hyatt",
    location: "Sydney",
    rating: 4.7,
    price: 480,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
  },
];

export default function FeaturedHotels() {
  const router = useRouter();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOTELS.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-2xl font-bold">
                  ${hotel.price}
                  <span className="text-sm text-muted-foreground">/night</span>
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full"
                  onClick={() => router.push(`/${hotel.slug}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
