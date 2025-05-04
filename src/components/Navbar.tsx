/* cSpell:ignore Mawblang, Sohra, Saitsohpen, Mawlynnong, Mawphlang, Pynshad, Khurai, Latikynsew, Mawsmai, Mawpunkirtiang, Khliehshnong, Mawkdok */
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Menu, ChevronDown, X } from "lucide-react";

const uniqueNearbyAttractionsAndLandmarks = [
  "Mawblang",
  "Sohra",
  "East Khasi Hills",
  "Saitsohpen",
  "Mawlynnong",
  "Mawphlang",
  "Pynshad Khurai",
  "Latikynsew",
  "Mawsmai",
  "Mawpunkirtiang",
  "Khliehshnong",
  "Mawkdok Village",
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
          Hotels in Cherrapunji
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search hotels..."
              className="w-48 xl:w-64 pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <Link
            href="/hotels"
            className="text-sm font-medium hover:text-primary"
          >
            Hotels
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium">
                Attractions <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {uniqueNearbyAttractionsAndLandmarks.map((item) => (
                <DropdownMenuItem key={item} asChild>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="w-full"
                  >
                    {item}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/deals"
            className="text-sm font-medium hover:text-primary"
          >
            Deals
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white border-b`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search hotels..."
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <Link
            href="/hotels"
            className="text-sm font-medium hover:text-primary"
            onClick={toggleMobileMenu}
          >
            Hotels
          </Link>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Attractions</span>
            {uniqueNearbyAttractionsAndLandmarks.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm pl-4 hover:text-primary"
                onClick={toggleMobileMenu}
              >
                {item}
              </Link>
            ))}
          </div>
          <Link
            href="/deals"
            className="text-sm font-medium hover:text-primary"
            onClick={toggleMobileMenu}
          >
            Deals
          </Link>
        </div>
      </div>
    </nav>
  );
}
