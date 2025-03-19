"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, MoreHorizontal, Star, Trash2, Users } from "lucide-react"

interface Hotel {
  id: string
  name: string
  slug: string
  location: string
  description: string
  image: string
  price: number
  rating: number
  amenities: string[]
  manager?: {
    name: string
    email: string
  }
}

const initialHotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Hotel",
    slug: "grand-hotel",
    location: "New York, USA",
    description: "Luxury hotel in the heart of Manhattan",
    image: "/placeholder.svg",
    price: 299,
    rating: 4.8,
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant"],
    manager: {
      name: "John Manager",
      email: "john@example.com",
    },
  },
  {
    id: "2",
    name: "Seaside Resort",
    slug: "seaside-resort",
    location: "Miami, USA",
    description: "Beautiful beachfront resort",
    image: "/placeholder.svg",
    price: 199,
    rating: 4.5,
    amenities: ["WiFi", "Beach Access", "Pool", "Restaurant"],
    manager: {
      name: "Sarah Manager",
      email: "sarah@example.com",
    },
  },
  {
    id: "3",
    name: "Mountain View Lodge",
    slug: "mountain-view-lodge",
    location: "Denver, USA",
    description: "Cozy lodge with mountain views",
    image: "/placeholder.svg",
    price: 149,
    rating: 4.2,
    amenities: ["WiFi", "Fireplace", "Hiking Trails", "Restaurant"],
  },
  {
    id: "4",
    name: "City Center Hotel",
    slug: "city-center-hotel",
    location: "Chicago, USA",
    description: "Modern hotel in downtown Chicago",
    image: "/placeholder.svg",
    price: 179,
    rating: 4.0,
    amenities: ["WiFi", "Business Center", "Gym", "Restaurant"],
  },
  {
    id: "5",
    name: "Luxury Suites",
    slug: "luxury-suites",
    location: "Los Angeles, USA",
    description: "Upscale suites with city views",
    image: "/placeholder.svg",
    price: 349,
    rating: 4.9,
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar"],
  },
]

export function HotelsTable() {
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels)

  const handleDelete = (id: string) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hotel</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow key={hotel.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    <Image
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{hotel.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">{hotel.description}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{hotel.location}</TableCell>
              <TableCell>${hotel.price}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                {hotel.manager ? (
                  <div>
                    <div className="font-medium">{hotel.manager.name}</div>
                    <div className="text-xs text-muted-foreground">{hotel.manager.email}</div>
                  </div>
                ) : (
                  <Badge variant="outline">
                    <Users className="mr-1 h-3 w-3" />
                    Unassigned
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/hotels/${hotel.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/hotels/${hotel.id}`}>
                        <Users className="mr-2 h-4 w-4" />
                        Assign Manager
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(hotel.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

