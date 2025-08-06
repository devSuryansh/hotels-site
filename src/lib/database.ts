import { connectToDatabase } from "./mongodb";
import type { Hotel, Booking } from "@/types";
import { ObjectId } from "mongodb";

// Hotel service functions
export async function getHotels(): Promise<Hotel[]> {
  try {
    const { db } = await connectToDatabase();
    const hotelsCollection = db.collection("new-hotels");

    const hotels = await hotelsCollection.find({}).toArray();

    // Convert MongoDB documents to Hotel type
    return hotels.map((hotel) => ({
      id: hotel._id.toString(),
      slug: hotel.slug,
      name: hotel.name,
      description: hotel.description,
      longDescription: hotel.longDescription,
      images: hotel.images || [],
      priceRange: hotel.priceRange || [0, 0],
      features: hotel.features || [],
      nearbyAttractions: hotel.nearbyAttractions || [],
      landmarks: hotel.landmarks || [],
      location: hotel.location,
      policies: hotel.policies,
      rooms: hotel.rooms || [],
      addons: hotel.addons || [],
      metaTags: hotel.metaTags || undefined,
    }));
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Failed to fetch hotels");
  }
}

export async function getHotelBySlug(slug: string): Promise<Hotel | null> {
  try {
    const { db } = await connectToDatabase();
    const hotelsCollection = db.collection("new-hotels");

    const hotel = await hotelsCollection.findOne({ slug });

    if (!hotel) return null;

    return {
      id: hotel._id.toString(),
      slug: hotel.slug,
      name: hotel.name,
      description: hotel.description,
      longDescription: hotel.longDescription,
      images: hotel.images || [],
      priceRange: hotel.priceRange || [0, 0],
      features: hotel.features || [],
      nearbyAttractions: hotel.nearbyAttractions || [],
      landmarks: hotel.landmarks || [],
      location: hotel.location,
      policies: hotel.policies,
      rooms: hotel.rooms || [],
      addons: hotel.addons || [],
      metaTags: hotel.metaTags || undefined,
    };
  } catch (error) {
    console.error("Error fetching hotel by slug:", error);
    throw new Error("Failed to fetch hotel");
  }
}

export async function getHotelById(id: string): Promise<Hotel | null> {
  try {
    const { db } = await connectToDatabase();
    const hotelsCollection = db.collection("new-hotels");

    const hotel = await hotelsCollection.findOne({ _id: new ObjectId(id) });

    if (!hotel) return null;

    return {
      id: hotel._id.toString(),
      slug: hotel.slug,
      name: hotel.name,
      description: hotel.description,
      longDescription: hotel.longDescription,
      images: hotel.images || [],
      priceRange: hotel.priceRange || [0, 0],
      features: hotel.features || [],
      nearbyAttractions: hotel.nearbyAttractions || [],
      landmarks: hotel.landmarks || [],
      location: hotel.location,
      policies: hotel.policies,
      rooms: hotel.rooms || [],
      addons: hotel.addons || [],
      metaTags: hotel.metaTags || undefined,
    };
  } catch (error) {
    console.error("Error fetching hotel by ID:", error);
    throw new Error("Failed to fetch hotel");
  }
}

// Booking service functions
export async function getBookings(): Promise<Booking[]> {
  try {
    const { db } = await connectToDatabase();
    const bookingsCollection = db.collection("new-booking");

    const bookings = await bookingsCollection.find({}).toArray();

    // Convert MongoDB documents to Booking type
    return bookings.map((booking) => ({
      id: booking._id.toString(),
      hotelId: booking.hotelId,
      hotelName: booking.hotelName,
      customerName: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      checkIn: new Date(booking.checkIn),
      checkOut: new Date(booking.checkOut),
      guests: booking.guests,
      roomType: booking.roomType,
      status: booking.status,
      notes: booking.notes,
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Failed to fetch bookings");
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    const { db } = await connectToDatabase();
    const bookingsCollection = db.collection("new-booking");

    const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

    if (!booking) return null;

    return {
      id: booking._id.toString(),
      hotelId: booking.hotelId,
      hotelName: booking.hotelName,
      customerName: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      checkIn: new Date(booking.checkIn),
      checkOut: new Date(booking.checkOut),
      guests: booking.guests,
      roomType: booking.roomType,
      status: booking.status,
      notes: booking.notes,
    };
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw new Error("Failed to fetch booking");
  }
}

export async function getBookingsByHotelId(
  hotelId: string
): Promise<Booking[]> {
  try {
    const { db } = await connectToDatabase();
    const bookingsCollection = db.collection("new-booking");

    const bookings = await bookingsCollection.find({ hotelId }).toArray();

    return bookings.map((booking) => ({
      id: booking._id.toString(),
      hotelId: booking.hotelId,
      hotelName: booking.hotelName,
      customerName: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      checkIn: new Date(booking.checkIn),
      checkOut: new Date(booking.checkOut),
      guests: booking.guests,
      roomType: booking.roomType,
      status: booking.status,
      notes: booking.notes,
    }));
  } catch (error) {
    console.error("Error fetching bookings by hotel ID:", error);
    throw new Error("Failed to fetch bookings");
  }
}

// Create new booking
export async function createBooking(
  bookingData: Omit<Booking, "id">
): Promise<string> {
  try {
    const { db } = await connectToDatabase();
    const bookingsCollection = db.collection("new-booking");

    const result = await bookingsCollection.insertOne({
      ...bookingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to create booking");
  }
}

// Update booking status
export async function updateBookingStatus(
  id: string,
  status: "Pending" | "Confirmed" | "Cancelled"
): Promise<boolean> {
  try {
    const { db } = await connectToDatabase();
    const bookingsCollection = db.collection("new-booking");

    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw new Error("Failed to update booking status");
  }
}
