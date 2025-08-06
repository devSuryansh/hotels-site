"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, CloudRainWind } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/hotels", label: "Hotels" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-12 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-headline text-lg font-bold"
          >
            <CloudRainWind className="h-6 w-6 text-[#3266cd]" />
            Resorts in Cherrapunji
          </Link>
        </div>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" className="hidden lg:flex">
            <Phone className="mr-2 h-4 w-4" />
            +91 999 205 2201
          </Button>
        </div>
      </div>
    </header>
  );
}
