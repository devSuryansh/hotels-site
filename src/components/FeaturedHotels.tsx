"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";

interface Hotel {
  _id: string;
  slug: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
}

export default function FeaturedHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("/api/Hotels");
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data = await res.json();
        setHotels(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  if (loading) return <p className="text-center py-10">Loading hotels...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel._id} className="overflow-hidden">
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
