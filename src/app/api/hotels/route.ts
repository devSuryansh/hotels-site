import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const hotel = await Hotel.find({ slug });
    return NextResponse.json(hotel);
  }

  const hotels = await Hotel.find({});
  return NextResponse.json(hotels);
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  const hotel = await Hotel.create(data);
  return NextResponse.json(hotel, { status: 201 });
}
