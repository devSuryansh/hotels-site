import Link from "next/link";
import { Home, Hotel, Calendar } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/admin"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link
          href="/admin/hotels"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Hotel className="inline-block mr-2" size={20} />
          Hotels
        </Link>
        <Link
          href="/admin/bookings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Calendar className="inline-block mr-2" size={20} />
          Bookings
        </Link>
      </nav>
    </div>
  );
};
