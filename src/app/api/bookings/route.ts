import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();
    // Validate required fields
    const requiredFields = [
      "hotelId",
      "hotelName",
      "checkIn",
      "checkOut",
      "guests",
      "phone",
      "roomType",
      "totalPrice",
      "nights",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const booking = await Booking.create(data);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: (error as Error).message },
      { status: 400 }
    );
  }
}
