"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Hotel = {
  id: number;
  name: string;
  location: string;
  roomType: string;
  guests: number;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const location = searchParams.get("location");
    const guests = searchParams.get("guests");
    const roomType = searchParams.get("roomType");

    // In a real application, you would fetch data from an API here
    // For this example, we'll use mock data
    const mockHotels: Hotel[] = [
      {
        id: 1,
        name: "Luxury Hotel",
        location: "New York",
        roomType: "suite",
        guests: 4,
      },
      {
        id: 2,
        name: "Cozy Inn",
        location: "London",
        roomType: "double",
        guests: 2,
      },
      {
        id: 3,
        name: "Beach Resort",
        location: "Bali",
        roomType: "single",
        guests: 1,
      },
    ];

    const filteredHotels = mockHotels.filter(
      (hotel) =>
        (!location ||
          hotel.location.toLowerCase().includes(location.toLowerCase())) &&
        (!guests || hotel.guests >= parseInt(guests)) &&
        (!roomType || hotel.roomType === roomType)
    );

    setHotels(filteredHotels);
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Results</h1>
      {hotels.length === 0 ? (
        <p className="text-gray-600">No hotels found matching your criteria.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <li key={hotel.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {hotel.name}
              </h2>
              <p className="text-gray-600 mb-2">Location: {hotel.location}</p>
              <p className="text-gray-600 mb-2">Room Type: {hotel.roomType}</p>
              <p className="text-gray-600">Max Guests: {hotel.guests}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
