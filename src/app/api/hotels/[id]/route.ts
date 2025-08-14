import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";
import type { Hotel } from "@/types";
import { ObjectId } from "mongodb";

const roomSchema = z.object({
  name: z.string(),
  amenities: z.array(z.string()),
  price: z.number(),
});

const addonSchema = z.object({
  name: z.string(),
  price: z.number(),
});

const metaTagsSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
});

const updateHotelSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  longDescription: z.string(),
  location: z.string(),
  policies: z.string(),
  priceRange: z.array(z.number()).length(2),
  features: z.array(z.string()),
  nearbyAttractions: z.array(z.string()),
  landmarks: z.array(z.string()),
  rooms: z.array(roomSchema),
  addons: z.array(addonSchema),
  images: z.array(z.string()),
  metaTags: metaTagsSchema.nullable().optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { db } = await connectToDatabase();
    const hotelsCollection = db.collection("new-hotels");

    const hotel = await hotelsCollection.findOne({ _id: new ObjectId(id) });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Convert to our Hotel type
    const hotelData: Hotel = {
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

    return NextResponse.json({ hotel: hotelData });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // Validate the request body
    const validatedData = updateHotelSchema.parse(body);

    const { db } = await connectToDatabase();
    const hotelsCollection = db.collection("new-hotels");

    // Check if hotel exists
    const existingHotel = await hotelsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!existingHotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Check if slug is unique (exclude current hotel)
    const duplicateSlug = await hotelsCollection.findOne({
      slug: validatedData.slug,
      _id: { $ne: new ObjectId(id) },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        { error: "A hotel with this slug already exists" },
        { status: 400 }
      );
    }

    // Update the hotel
    const updateResult = await hotelsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...validatedData,
          updatedAt: new Date(),
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Get the updated hotel
    const updatedHotel = await hotelsCollection.findOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      message: "Hotel updated successfully",
      hotel: {
        id: updatedHotel?._id.toString(),
        ...updatedHotel,
        _id: undefined,
      },
    });
  } catch (error) {
    console.error("Error updating hotel:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { db } = await connectToDatabase();
    const hotelsCollection = db.collection("new-hotels");

    const deleteResult = await hotelsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
