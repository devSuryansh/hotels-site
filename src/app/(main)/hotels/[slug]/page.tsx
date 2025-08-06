import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getHotelBySlug as fetchHotelBySlug } from "@/lib/database";
import { generateDynamicMetaTags } from "@/ai/flows/generate-dynamic-meta-tags";
import type { Hotel } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  MapPin,
  Tag,
  Landmark,
  Shield,
  FileText,
  BedDouble,
  PlusCircle,
} from "lucide-react";
import { BookingForm } from "./booking-form";

type HotelPageProps = {
  params: {
    slug: string;
  };
};

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: HotelPageProps): Promise<Metadata> {
  const hotel = await fetchHotelBySlug(params.slug);

  if (!hotel) {
    return {
      title: "Hotel Not Found",
    };
  }

  try {
    const meta = await generateDynamicMetaTags({
      hotelName: hotel.name,
      hotelDescription: hotel.description,
      hotelLocation: hotel.location,
      hotelFeatures: hotel.features,
      nearbyAttractions: hotel.nearbyAttractions,
    });

    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
    };
  } catch (error) {
    console.error("Failed to generate meta tags:", error);
    return {
      title: hotel.name,
      description: hotel.description,
    };
  }
}

export default async function HotelPage({ params }: HotelPageProps) {
  const hotel = await fetchHotelBySlug(params.slug);

  if (!hotel) {
    notFound();
  }

  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            {hotel.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>{hotel.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Image Carousel */}
            <Carousel className="w-full mb-8 rounded-lg overflow-hidden shadow-lg">
              <CarouselContent>
                {hotel.images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative">
                      <Image
                        src={src}
                        alt={`${hotel.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint="hotel interior"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-16" />
              <CarouselNext className="mr-16" />
            </Carousel>

            {/* Long Description */}
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  About {hotel.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {hotel.longDescription}
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <CheckCircle className="text-accent" /> Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    {hotel.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent/80" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Rooms */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <BedDouble className="text-accent" /> Rooms & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {hotel.rooms.map((room) => (
                      <li
                        key={room.name}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold">{room.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {room.amenities.join(", ")}
                          </p>
                        </div>
                        <p className="font-semibold text-primary">
                          Rs. {room.price.toLocaleString()}
                          <span className="text-xs font-normal text-muted-foreground">
                            /night
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Attractions & Landmarks */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Landmark className="text-accent" /> Attractions & Landmarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Nearby Attractions</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.nearbyAttractions.map((attraction) => (
                      <Badge key={attraction} variant="secondary">
                        {attraction}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="font-semibold mb-2">Landmarks</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.landmarks.map((landmark) => (
                      <Badge key={landmark} variant="secondary">
                        {landmark}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <PlusCircle className="text-accent" /> Add-ons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    {hotel.addons.map((addon) => (
                      <li key={addon.name} className="flex justify-between">
                        <span>{addon.name}</span>{" "}
                        <span className="font-semibold text-primary/90">
                          Rs. {addon.price.toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Policies */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <FileText className="text-accent" /> Hotel Policies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {hotel.policies}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Form Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm hotel={hotel} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
