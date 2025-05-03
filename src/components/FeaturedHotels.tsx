"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Bed } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";

interface Hotel {
  _id: string;
  name: string;
  slug: string;
  address: string;
  locationUrl: string;
  description: string;
  policies: string;
  ratings: number;
  features: { mainFeatures: string[] };
  roomTypes: { category: string; pricePerNight: number }[];
  nearbyAttractions: string[];
  landmarks: string[];
  images: { url: string }[];
}

const FeaturedHotels = () => {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Fetch hotels only when visible
  useEffect(() => {
    if (!isVisible) return;

    const fetchHotels = async () => {
      try {
        const res = await fetch("/api/hotels", { cache: "force-cache" });
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data: Hotel[] = await res.json();
        setHotels(data); // Display all hotels
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [isVisible]);

  // Skeleton Card component
  const SkeletonCard = () => (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <CardHeader>
        <div className="h-6 w-3/4 bg-gray-300 animate-pulse mb-2 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full bg-gray-300 animate-pulse mb-2 rounded" />
        <div className="flex items-center mt-2">
          <div className="h-4 w-4 bg-gray-300 animate-pulse mr-1 rounded" />
          <div className="h-4 w-8 bg-gray-300 animate-pulse rounded" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="h-10 w-full bg-gray-300 animate-pulse rounded" />
      </CardFooter>
    </Card>
  );

  // Memoize skeleton cards
  const skeletonCards = useMemo(
    () =>
      Array(3)
        .fill(0)
        .map((_, index) => <SkeletonCard key={index} />),
    []
  );

  // Memoize hotel cards
  const hotelCards = useMemo(
    () =>
      hotels.map((hotel) => (
        <Card
          key={hotel._id}
          className="overflow-hidden transition-shadow hover:shadow-lg"
        >
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={hotel.images[0]?.url || "/placeholder.jpg"}
              alt={hotel.name}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{hotel.name}</h3>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <a
                    href={hotel.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {hotel.address}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{hotel.ratings}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{hotel.description}</p>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Bed className="h-4 w-4 mr-1" />
              <span>
                {hotel.roomTypes[0]?.category} - ₹
                {hotel.roomTypes[0]?.pricePerNight}/night
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Nearby: </span>
              {hotel.nearbyAttractions.join(", ")}
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
      )),
    [hotels, router]
  );

  if (loading || !isVisible)
    return (
      <section ref={sectionRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Hotels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skeletonCards}
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </section>
    );

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotelCards}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
