// src/app/api/bookings/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Define the params type explicitly
interface Params {
  id: string;
}

export async function PUT(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const { id } = context.params; // Access id from context.params
  const booking = await Booking.findByIdAndUpdate(id, data, { new: true });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}
