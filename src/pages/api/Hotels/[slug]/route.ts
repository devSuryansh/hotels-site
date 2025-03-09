import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect(); // Ensure DB connection
    const { slug } = params;

    const hotel = await Hotel.findOne({ slug });

    if (!hotel) {
      return NextResponse.json({ message: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
