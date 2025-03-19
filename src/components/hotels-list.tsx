"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Edit, Trash2 } from "lucide-react"

interface Hotel {
  id: string
  name: string
  location: string
  image: string
  price: number
  rating: number
}

const initialHotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Hotel",
    location: "New York, USA",
    image: "/placeholder.svg",
    price: 299,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Seaside Resort",
    location: "Miami, USA",
    image: "/placeholder.svg",
    price: 199,
    rating: 4.5,
  },
  {
    id: "3",
    name: "Mountain View Lodge",
    location: "Denver, USA",
    image: "/placeholder.svg",
    price: 149,
    rating: 4.2,
  },
  {
    id: "4",
    name: "City Center Hotel",
    location: "Chicago, USA",
    image: "/placeholder.svg",
    price: 179,
    rating: 4.0,
  },
]

export function HotelsList() {
  const [hotels] = useState<Hotel[]>(initialHotels)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {hotels.map((hotel) => (
        <Card key={hotel.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">{hotel.name}</h3>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                {hotel.rating}
              </Badge>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">{hotel.location}</p>
            <div className="flex items-center justify-between">
              <p className="font-medium">
                ${hotel.price} <span className="text-xs text-muted-foreground">/ night</span>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/hotels/${hotel.id}/edit`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

