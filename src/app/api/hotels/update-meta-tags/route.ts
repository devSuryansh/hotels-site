import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { hotelId, metaTags } = body;

    // Validate required fields
    if (!hotelId || !metaTags) {
      return NextResponse.json(
        { error: "Missing required fields: hotelId, metaTags" },
        { status: 400 }
      );
    }

    // Validate meta tags structure
    if (!metaTags.title || !metaTags.description || !metaTags.keywords) {
      return NextResponse.json(
        { error: "Meta tags must include title, description, and keywords" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const hotelsCollection = db.collection("new-hotels");

    // Update the hotel with new meta tags
    const result = await hotelsCollection.updateOne(
      { _id: new ObjectId(hotelId) },
      {
        $set: {
          metaTags,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Meta tags updated successfully",
    });
  } catch (error) {
    console.error("Error updating meta tags:", error);
    return NextResponse.json(
      {
        error: "Failed to update meta tags",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
