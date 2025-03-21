"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";

interface Hotel {
  _id: string;
  name: string;
  slug: string;
  location: string;
  images: { url: string }[];
  rating: number;
  price: number;
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
          observer.disconnect(); // Stop observing once visible
        }
      },
      { root: null, threshold: 0.1 } // Trigger when 10% visible
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
        const res = await fetch("/api/hotels", { cache: "force-cache" }); // Leverage Next.js caching
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
  }, [isVisible]);

  // Skeleton Card component
  const SkeletonCard = () => (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="h-6 w-3/4 bg-gray-300 animate-pulse mb-2 rounded" />
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-300 animate-pulse mr-1 rounded" />
              <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-300 animate-pulse mr-1 rounded" />
            <div className="h-4 w-8 bg-gray-300 animate-pulse rounded" />
          </div>
        </div>
        <div className="h-6 w-16 bg-gray-300 animate-pulse rounded" />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="h-10 w-full bg-gray-300 animate-pulse rounded" />
      </CardFooter>
    </Card>
  );

  // Memoize skeleton cards to avoid re-rendering
  const skeletonCards = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map((_, index) => <SkeletonCard key={index} />),
    []
  );

  // Memoize hotel cards to prevent unnecessary re-renders
  const hotelCards = useMemo(
    () =>
      hotels.map((hotel) => (
        <Card key={hotel._id} className="overflow-hidden">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={hotel.images[0]?.url || "/placeholder.jpg"}
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
              ₹{hotel.price}
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
      )),
    [hotels, router]
  );

  if (loading || !isVisible)
    return (
      <section ref={sectionRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
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
        <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotelCards}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
