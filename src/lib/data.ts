import type { SVGProps } from "react";
import type { Booking, Hotel } from "@/types";

export type Feature = {
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const hotels: Hotel[] = [
  {
    id: "1",
    slug: "the-serene-retreat",
    name: "The Serene Retreat",
    description: "A peaceful haven nestled in the heart of the rolling hills.",
    longDescription:
      "Escape to The Serene Retreat, where luxury meets nature. Our resort offers breathtaking views of the Cherrapunji valleys, state-of-the-art amenities, and unparalleled service. Whether you are looking for a romantic getaway or a family adventure, our tranquil atmosphere provides the perfect backdrop for a memorable stay.",
    images: [
      "https://placehold.co/1200x800.png",
      "https://placehold.co/1200x800.png",
      "https://placehold.co/1200x800.png",
    ],
    priceRange: [5000, 15000],
    features: ["Wi-Fi", "Swimming Pool", "Parking", "Restaurant", "Spa"],
    nearbyAttractions: ["Nohkalikai Falls", "Mawsmai Cave"],
    landmarks: ["Seven Sisters Falls"],
    location: "Near Seven Sisters Falls, Cherrapunji",
    policies:
      "Check-in: 2 PM, Check-out: 12 PM. Cancellation policy: 48 hours prior to arrival for a full refund. Pets are not allowed.",
    rooms: [
      {
        name: "Deluxe Room",
        amenities: ["King Bed", "Valley View", "Wi-Fi"],
        price: 7500,
      },
      {
        name: "Executive Suite",
        amenities: ["King Bed", "Private Balcony", "Jacuzzi"],
        price: 12000,
      },
    ],
    addons: [
      { name: "Breakfast Buffet", price: 800 },
      { name: "Airport Transfer", price: 2500 },
    ],
  },
  {
    id: "2",
    slug: "cherra-highlands-resort",
    name: "Cherra Highlands Resort",
    description: "Experience authentic Khasi hospitality with modern comforts.",
    longDescription:
      "Located atop a scenic plateau, Cherra Highlands Resort combines traditional architecture with contemporary luxury. Enjoy panoramic views, explore local culture, and indulge in our farm-to-table dining experience. Our resort is pet-friendly and offers a variety of activities for all ages.",
    images: [
      "https://placehold.co/1200x800.png",
      "https://placehold.co/1200x800.png",
      "https://placehold.co/1200x800.png",
    ],
    priceRange: [4000, 10000],
    features: [
      "Wi-Fi",
      "Parking",
      "Pet-friendly",
      "Restaurant",
      "Conference Room",
    ],
    nearbyAttractions: ["Living Root Bridge", "Eco Park"],
    landmarks: ["Thangkharang Park"],
    location: "Thangkharang Park Road, Cherrapunji",
    policies:
      "Check-in: 1 PM, Check-out: 11 AM. Cancellation policy: 72 hours prior to arrival. Pets welcome with a small fee.",
    rooms: [
      {
        name: "Standard Double",
        amenities: ["Queen Bed", "Garden View"],
        price: 4500,
      },
      {
        name: "Family Cottage",
        amenities: ["Two Bedrooms", "Kitchenette"],
        price: 8000,
      },
    ],
    addons: [
      { name: "Local Sightseeing Tour", price: 3000 },
      { name: "Bonfire Arrangement", price: 1500 },
    ],
  },
  {
    id: "3",
    slug: "misty-valley-inn",
    name: "Misty Valley Inn",
    description: "A cozy inn offering spectacular views of the misty valleys.",
    longDescription:
      "Misty Valley Inn is your home away from home in Cherrapunji. We pride ourselves on our warm service and comfortable accommodations. Wake up to the sight of clouds blanketing the valley below and enjoy a hot cup of local tea from your balcony.",
    images: [
      "https://placehold.co/1200x800.png",
      "https://placehold.co/1200x800.png",
      "https://placehold.co/1200x800.png",
    ],
    priceRange: [3000, 7000],
    features: ["Wi-Fi", "Parking", "Heater"],
    nearbyAttractions: ["Dainthlen Falls", "Wei Sawdong"],
    landmarks: ["Cherrapunji Market"],
    location: "Main Market Area, Cherrapunji",
    policies:
      "Check-in: 12 PM, Check-out: 10 AM. Cancellation is non-refundable within 24 hours of check-in.",
    rooms: [
      {
        name: "Compact Double",
        amenities: ["Double Bed", "Hot Water"],
        price: 3500,
      },
      {
        name: "Valley View Room",
        amenities: ["Double Bed", "Balcony"],
        price: 5000,
      },
    ],
    addons: [{ name: "Packed Lunch for Treks", price: 500 }],
  },
];

export const bookings: Booking[] = [
  {
    id: "booking1",
    hotelId: "1",
    hotelName: "The Serene Retreat",
    customerName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "9876543210",
    checkIn: new Date("2024-09-10"),
    checkOut: new Date("2024-09-12"),
    guests: 2,
    roomType: "Executive Suite",
    status: "Confirmed",
    notes: "Honeymoon couple. Arranged for complimentary cake.",
  },
  {
    id: "booking2",
    hotelId: "2",
    hotelName: "Cherra Highlands Resort",
    customerName: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "9876543211",
    checkIn: new Date("2024-10-05"),
    checkOut: new Date("2024-10-08"),
    guests: 4,
    roomType: "Family Cottage",
    status: "Pending",
    notes: "Wants an early check-in if possible.",
  },
  {
    id: "booking3",
    hotelId: "1",
    hotelName: "The Serene Retreat",
    customerName: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: "9876543212",
    checkIn: new Date("2024-11-20"),
    checkOut: new Date("2024-11-22"),
    guests: 2,
    roomType: "Deluxe Room",
    status: "Cancelled",
  },
];

export const allFeatures = [
  "Wi-Fi",
  "Swimming Pool",
  "Parking",
  "Pet-friendly",
  "Restaurant",
  "Spa",
  "Conference Room",
  "Heater",
];

export const allAttractions = [
  "Nohkalikai Falls",
  "Mawsmai Cave",
  "Living Root Bridge",
  "Eco Park",
  "Dainthlen Falls",
  "Wei Sawdong",
];

export const allLandmarks = [
  "Seven Sisters Falls",
  "Thangkharang Park",
  "Cherrapunji Market",
];
