export const hotels = [
  {
    id: 1,
    name: "Hotel 1",
    slug: "hotel-1",
    location: "Location A",
    rating: 4.9,
    price: 2990,
    landmark: "Landmark 1",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Experience ultimate luxury in the heart of Location A. Our hotel offers pristine views, modern amenities, and world-class service.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=View+1",
      "/placeholder.svg?height=600&width=800&text=Spa",
      "/placeholder.svg?height=600&width=800&text=Restaurant",
      "/placeholder.svg?height=600&width=800&text=Suite",
      "/placeholder.svg?height=600&width=800&text=Pool",
      "/placeholder.svg?height=600&width=800&text=Aerial+View",
    ],
  },
  {
    id: 2,
    name: "Hotel 2",
    slug: "hotel-2",
    location: "Location B",
    rating: 4.5,
    price: 1990,
    landmark: "Landmark 2",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Stay in the heart of Location B. Our hotel provides easy access to major attractions, shopping, and dining experiences.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=City+View",
      "/placeholder.svg?height=600&width=800&text=Lobby",
      "/placeholder.svg?height=600&width=800&text=Room",
      "/placeholder.svg?height=600&width=800&text=Restaurant",
    ],
  },
  {
    id: 3,
    name: "Hotel 3",
    slug: "hotel-3",
    location: "Location C",
    rating: 4.7,
    price: 2490,
    landmark: "Landmark 3",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Located in Location C, our hotel offers breathtaking views, cozy accommodations, and easy access to local attractions.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=View+1",
      "/placeholder.svg?height=600&width=800&text=Room",
      "/placeholder.svg?height=600&width=800&text=Garden",
      "/placeholder.svg?height=600&width=800&text=Lounge",
      "/placeholder.svg?height=600&width=800&text=Dining+Area",
    ],
  },
  {
    id: 4,
    name: "Hotel 4",
    location: "Location D",
    rating: 4.6,
    price: 2190,
    landmark: "Landmark 4",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "A premium hotel in Location D offering modern amenities and exceptional service for business and leisure travelers.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Exterior",
      "/placeholder.svg?height=600&width=800&text=Suite",
      "/placeholder.svg?height=600&width=800&text=Pool",
      "/placeholder.svg?height=600&width=800&text=Restaurant",
    ],
  },
  {
    id: 5,
    name: "Hotel 5",
    location: "Location E",
    rating: 4.8,
    price: 2790,
    landmark: "Landmark 5",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Discover luxury and comfort in Location E with our premium accommodations and world-class facilities.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Lobby",
      "/placeholder.svg?height=600&width=800&text=Room",
      "/placeholder.svg?height=600&width=800&text=Spa",
      "/placeholder.svg?height=600&width=800&text=Bar",
      "/placeholder.svg?height=600&width=800&text=Garden",
    ],
  },
  {
    id: 6,
    name: "Hotel 6",
    location: "Location F",
    rating: 4.4,
    price: 1890,
    landmark: "Landmark 6",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Your perfect stay in Location F awaits with comfortable rooms and convenient access to local attractions.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Front",
      "/placeholder.svg?height=600&width=800&text=Room",
      "/placeholder.svg?height=600&width=800&text=Dining",
      "/placeholder.svg?height=600&width=800&text=Lounge",
    ],
  },
  {
    id: 7,
    name: "Budget Inn",
    location: "Location G",
    rating: 2.8,
    price: 890,
    landmark: "Landmark 7",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Simple, affordable accommodation with basic amenities and friendly service.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Exterior",
      "/placeholder.svg?height=600&width=800&text=Room",
      "/placeholder.svg?height=600&width=800&text=Reception",
    ],
  },
  {
    id: 8,
    name: "City Lodge",
    location: "Location H",
    rating: 2.5,
    price: 790,
    landmark: "Landmark 8",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Budget-friendly hotel offering clean rooms and essential amenities for cost-conscious travelers.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Building",
      "/placeholder.svg?height=600&width=800&text=Room",
      "/placeholder.svg?height=600&width=800&text=Dining",
    ],
  },
  {
    id: 9,
    name: "Comfort Stay",
    location: "Location I",
    rating: 3.8,
    price: 1290,
    landmark: "Landmark 9",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Mid-range hotel with comfortable rooms, good amenities and helpful staff.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Hotel",
      "/placeholder.svg?height=600&width=800&text=Room",
      "/placeholder.svg?height=600&width=800&text=Restaurant",
      "/placeholder.svg?height=600&width=800&text=Lounge",
    ],
  },
  {
    id: 10,
    name: "Plaza Inn",
    location: "Location J",
    rating: 3.5,
    price: 1190,
    landmark: "Landmark 10",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Reliable 3-star accommodation offering good value with modern amenities and central location.",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Building",
      "/placeholder.svg?height=600&width=800&text=Room",
      "/placeholder.svg?height=600&width=800&text=Cafe",
      "/placeholder.svg?height=600&width=800&text=Garden",
    ],
  },
];

export const fiveStarHotels = hotels.filter((hotel) => hotel.rating >= 4.5);

export const fourStarHotels = hotels.filter(
  (hotel) => hotel.rating >= 4 && hotel.rating < 4.5
);

export const threeStarHotels = hotels.filter(
  (hotel) => hotel.rating >= 3 && hotel.rating < 4
);

export const twoStarHotels = hotels.filter(
  (hotel) => hotel.rating >= 2 && hotel.rating < 3
);
