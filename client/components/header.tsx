"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  fiveStarHotels,
  fourStarHotels,
  threeStarHotels,
  twoStarHotels,
} from "@/data/hotels";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Hotels in Ayodhya
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/destinations"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Destinations
            </Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                Hotel Categories
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    href="/hotel-categories"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    All Categories
                  </Link>
                  {fiveStarHotels.length > 0 && (
                    <Link
                      href="hotel-categories/5-star-hotels"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      5 Star Hotels
                    </Link>
                  )}
                  {fourStarHotels.length > 0 && (
                    <Link
                      href="hotel-categories/4-star-hotels"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      4 Star Hotels
                    </Link>
                  )}
                  {threeStarHotels.length > 0 && (
                    <Link
                      href="hotel-categories/3-star-hotels"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      3 Star Hotels
                    </Link>
                  )}
                  {twoStarHotels.length > 0 && (
                    <Link
                      href="hotel-categories/2-star-hotels"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      2 Star Hotels
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  href="/destinations"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Deals
                </Link>
              </li>
              <li>
                <details className="text-gray-600">
                  <summary className="hover:text-blue-600 transition-colors cursor-pointer">
                    Hotel Categories
                  </summary>
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/hotel-categories"
                        className="block text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        All Categories
                      </Link>
                    </li>
                    {fiveStarHotels.length > 0 && (
                      <li>
                        <Link
                          href="/5-star-hotels"
                          className="block text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          5 Star Hotels
                        </Link>
                      </li>
                    )}
                    {fourStarHotels.length > 0 && (
                      <li>
                        <Link
                          href="/4-star-hotels"
                          className="block text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          4 Star Hotels
                        </Link>
                      </li>
                    )}
                    {threeStarHotels.length > 0 && (
                      <li>
                        <Link
                          href="/3-star-hotels"
                          className="block text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          3 Star Hotels
                        </Link>
                      </li>
                    )}
                    {twoStarHotels.length > 0 && (
                      <li>
                        <Link
                          href="/2-star-hotels"
                          className="block text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          2 Star Hotels
                        </Link>
                      </li>
                    )}
                  </ul>
                </details>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
