/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HotelsList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("/api/hotels");
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data = await res.json();
        // Sort by creation date (assuming timestamps are available) and limit to 5
        const sortedHotels = data
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);
        setHotels(sortedHotels);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  if (loading) return <div>Loading hotels...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hotels.map((hotel: any) => (
        <Card key={hotel._id} className="overflow-hidden">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={hotel.images[0]?.url || "/placeholder.jpg"}
              alt={hotel.name}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {hotel.location}
                </p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{hotel.rating}</span>
              </div>
            </div>
            <p className="text-lg font-bold">
              ${hotel.price}
              <span className="text-sm text-muted-foreground">/night</span>
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/admin/hotels/${hotel._id}`}>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
