export type Room = {
  name: string;
  amenities: string[];
  price: number;
};

export type MetaTags = {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

export type Hotel = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  images: string[];
  priceRange: [number, number];
  features: string[];
  nearbyAttractions: string[];
  landmarks: string[];
  location: string;
  policies: string;
  rooms: Room[];
  addons: { name: string; price: number }[];
  metaTags?: MetaTags;
};

export type Booking = {
  id: string;
  hotelId: string;
  hotelName: string;
  customerName: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomType: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  notes?: string;
};
