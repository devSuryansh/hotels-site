import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

const hotels = [
  {
    id: 1,
    name: "Hotel 1",
    location: "Location 1",
    rating: 4.9,
    price: 2990,
    image: "/file.svg?height=100&width=300",
  },
  {
    id: 2,
    name: "Hotel 2",
    location: "Location 2",
    rating: 4.5,
    price: 1990,
    image: "/file.svg?height=100&width=300",
  },
  {
    id: 3,
    name: "Hotel 3",
    location: "Location 3",
    rating: 4.7,
    price: 2490,
    image: "/file.svg?height=100&width=300",
  },
  {
    id: 4,
    name: "Hotel 4",
    location: "Location 4",
    rating: 4.8,
    price: 3990,
    image: "/file.svg?height=100&width=300",
  },
];

export default function FeaturedHotels() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <Image
                src={hotel.image}
                alt={hotel.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-2">{hotel.location}</p>
                <div className="flex items-center mb-2">
                  <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{hotel.rating}</span>
                </div>
                <p className="text-lg font-bold">
                  ₹{hotel.price}{" "}
                  <span className="text-sm font-normal text-gray-600">
                    per night
                  </span>
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
