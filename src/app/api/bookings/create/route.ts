import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      hotelId,
      hotelName,
      customerName,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      roomType,
      notes,
    } = body;

    // Validate required fields
    if (
      !hotelId ||
      !hotelName ||
      !customerName ||
      !email ||
      !phone ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !roomType
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create booking data
    const bookingData = {
      hotelId,
      hotelName,
      customerName,
      email,
      phone,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      roomType,
      status: "Pending" as const,
      notes: notes || "",
    };

    const bookingId = await createBooking(bookingData);

    return NextResponse.json({
      success: true,
      bookingId,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
