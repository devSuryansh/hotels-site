"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          LuxStay
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
          <Link href="/destinations" className="text-sm font-medium">
            Destinations
          </Link>
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
