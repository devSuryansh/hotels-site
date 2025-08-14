import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HotelCard } from "@/components/hotel-card";
import { hotels } from "@/lib/data";
import {
  Phone,
  Search,
  MapPin,
  Star,
  Droplets,
  Mountain,
  TreePine,
  Camera,
} from "lucide-react";
import HotelsPage from "@/components/hotels-page";

export default function HomePage() {
  const featuredHotels = hotels.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}

      <HeroSection />

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold">
              Experience the Magic of Cherrapunji
            </h2>
            <p className="mt-6 max-w-4xl mx-auto text-muted-foreground md:text-lg lg:text-xl leading-relaxed">
              Discover the wettest place on Earth, where nature paints its
              masterpiece with every monsoon. From ancient living root bridges
              to thundering waterfalls, Cherrapunji offers an extraordinary
              blend of adventure, serenity, and untouched natural beauty that
              will leave you breathless.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Wettest Place on Earth
              </h3>
              <p className="text-sm text-muted-foreground">
                Experience record-breaking rainfall and the world's most
                dramatic monsoons
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <TreePine className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Living Root Bridges
              </h3>
              <p className="text-sm text-muted-foreground">
                Marvel at 500-year-old bridges grown from rubber tree roots
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Mountain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Spectacular Waterfalls
              </h3>
              <p className="text-sm text-muted-foreground">
                Witness the majestic Nohkalikai and Seven Sisters Falls
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Camera className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Breathtaking Views</h3>
              <p className="text-sm text-muted-foreground">
                Capture panoramic vistas of misty valleys and cloud forests
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to embark on your Cherrapunji adventure?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/hotels">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Explore Accommodations
                </Button>
              </Link>
              <Link href="tel:+919992052201">
                <Button size="lg" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call for Assistance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HotelsPage />
    </div>
  );
}
