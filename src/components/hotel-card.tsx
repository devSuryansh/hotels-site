import Link from "next/link";
import Image from "next/image";
import type { Hotel } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Wifi, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type HotelCardProps = {
  hotel: Hotel;
};

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/hotels/${hotel.slug}`}>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={hotel.images[0]}
              alt={`Image of ${hotel.name}`}
              fill
              className="object-cover"
              data-ai-hint="hotel exterior"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/hotels/${hotel.slug}`}>
          <CardTitle className="mb-2 font-headline text-xl hover:text-primary transition-colors">
            {hotel.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {hotel.description}
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{hotel.location}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {hotel.features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-semibold">
          Rs. {hotel.priceRange[0].toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground">
            /night
          </span>
        </div>
        <Link href={`/hotels/${hotel.slug}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
