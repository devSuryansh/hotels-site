import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          HotelBooker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Deals
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex space-x-2">
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default header;
