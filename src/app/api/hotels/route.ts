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
      // Use findOne instead of find for single hotel by slug
      const hotel = await Hotel.findOne({ slug });
      if (!hotel) {
        return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
      }
      return NextResponse.json(hotel);
    }
    // Get all hotels
    const hotels = await Hotel.find({});
    return NextResponse.json(hotels);
  } catch (error) {
    console.error("GET Error:", error); // Log error for debugging
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
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }
    const hotel = await Hotel.create(data);
    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error); // Log error for debugging
    return NextResponse.json(
      { error: "Failed to create hotel" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
      { slug },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("PUT Error:", error); // Log error for debugging
    return NextResponse.json(
      { error: "Failed to update hotel" },
      { status: 400 }
    );
  }
}
