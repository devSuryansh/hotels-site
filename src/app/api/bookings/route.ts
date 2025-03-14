import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  const booking = await Booking.create(data);
  return NextResponse.json(booking, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await Booking.find({}).populate("hotel");
  return NextResponse.json(bookings);
}
