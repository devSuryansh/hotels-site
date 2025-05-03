import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  await dbConnect();

  try {
    // Get all hotels
    const hotels = await Hotel.find({});
    return NextResponse.json(hotels);
  } catch (error) {
    console.error("GET /api/hotels error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();
    // Validate required fields
    const requiredFields = [
      "name",
      "slug",
      "address",
      "locationUrl",
      "description",
      "policies",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Ensure slug is unique
    const existingHotel = await Hotel.findOne({ slug: data.slug });
    if (existingHotel) {
      console.log(`Slug already exists: ${data.slug}`);
      return NextResponse.json(
        { error: `Hotel with slug ${data.slug} already exists` },
        { status: 400 }
      );
    }

    const hotel = await Hotel.create(data);
    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    console.error("POST /api/hotels error:", error);
    return NextResponse.json(
      { error: "Failed to create hotel", details: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();
    const { slug, ...updateData } = data;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required to update hotel" },
        { status: 400 }
      );
    }

    const hotel = await Hotel.findOneAndUpdate(
      { slug: { $regex: `^${slug}$`, $options: "i" } },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!hotel) {
      console.log(`Hotel not found for slug: ${slug}`);
      return NextResponse.json(
        { error: `Hotel with slug ${slug} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("PUT /api/hotels error:", error);
    return NextResponse.json(
      { error: "Failed to update hotel", details: (error as Error).message },
      { status: 400 }
    );
  }
}
