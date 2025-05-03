"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Menu, ChevronDown } from "lucide-react";

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
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Amit Hotels
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search hotels..."
              className="w-64 pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <Link href="/hotels" className="text-sm font-medium">
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
                    href={`/hotels/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="w-full"
                  >
                    {item}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/deals" className="text-sm font-medium">
            Deals
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
}
