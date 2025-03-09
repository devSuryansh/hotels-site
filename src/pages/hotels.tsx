import { useEffect, useState } from "react";

interface Hotel {
  _id: string;
  name: string;
  location: string;
  price: number;
}

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    fetch("/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <div>
      <h1>Hotels</h1>
      {hotels.map((hotel) => (
        <div key={hotel._id}>
          <h2>{hotel.name}</h2>
          <p>
            {hotel.location} - ${hotel.price}
          </p>
        </div>
      ))}
    </div>
  );
}
