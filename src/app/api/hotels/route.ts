// src/app/api/hotels/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const hotel = await Hotel.find({ slug });
      if (!hotel.length) {
        return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
      }
      return NextResponse.json(hotel);
    }
    const hotels = await Hotel.find({});
    return NextResponse.json(hotels);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const hotel = await Hotel.create(data);
    return NextResponse.json(hotel, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create hotel" },
      { status: 400 }
    );
  }
}
