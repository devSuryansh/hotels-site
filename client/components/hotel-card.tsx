import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    location: string;
    rating: number;
    price: number;
    image: string;
  };
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={hotel.image}
        alt={hotel.name}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
        <p className="text-gray-600 mb-2">{hotel.location}</p>
        <div className="flex items-center mb-2">
          <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
          <span className="font-semibold">{hotel.rating}</span>
        </div>
        <p className="text-lg font-bold mb-4">
          ₹{hotel.price}{" "}
          <span className="text-sm font-normal text-gray-600">per night</span>
        </p>
        <Link
          href={`/hotel/${hotel.id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
