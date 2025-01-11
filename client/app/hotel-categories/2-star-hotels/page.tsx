import { twoStarHotels } from "@/data/hotels";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HotelCard from "@/components/hotel-card";

export default function TwoStarHotelsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">2 Star Hotels</h1>
        <nav className="bg-gray-100 p-4 rounded-lg">
          <ul className="flex flex-wrap gap-4">
            {twoStarHotels.map((hotel) => (
              <li key={hotel.id}>
                <Link
                  href={`/hotel/${hotel.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {hotel.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {twoStarHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
