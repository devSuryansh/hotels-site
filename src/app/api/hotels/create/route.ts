import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { generateDynamicMetaTags } from "@/ai/flows/generate-dynamic-meta-tags";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      longDescription,
      images,
      priceRange,
      features,
      nearbyAttractions,
      landmarks,
      location,
      policies,
      rooms,
      addons,
      metaTags,
    } = body;

    // Validate required fields
    if (!name || !slug || !description || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const hotelsCollection = db.collection("new-hotels");

    // Check if slug already exists
    const existingHotel = await hotelsCollection.findOne({ slug });
    if (existingHotel) {
      return NextResponse.json(
        { error: "Hotel with this slug already exists" },
        { status: 400 }
      );
    }

    // Generate meta tags using AI if not provided
    let finalMetaTags = metaTags;
    if (!finalMetaTags) {
      try {
        finalMetaTags = await generateDynamicMetaTags({
          hotelName: name,
          hotelDescription: description,
          hotelLocation: location,
          hotelFeatures: features || [],
          nearbyAttractions: nearbyAttractions || [],
        });
      } catch (error) {
        console.error("Failed to generate meta tags:", error);
        // Continue without meta tags if generation fails
        finalMetaTags = null;
      }
    }

    // Create hotel document
    const hotelData = {
      name,
      slug,
      description,
      longDescription: longDescription || description,
      images: images || [],
      priceRange: priceRange || [0, 0],
      features: features || [],
      nearbyAttractions: nearbyAttractions || [],
      landmarks: landmarks || [],
      location,
      policies: policies || "",
      rooms: rooms || [],
      addons: addons || [],
      metaTags: finalMetaTags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await hotelsCollection.insertOne(hotelData);

    return NextResponse.json({
      success: true,
      hotelId: result.insertedId.toString(),
      metaTags: finalMetaTags,
      message: "Hotel created successfully",
    });
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json(
      { error: "Failed to create hotel" },
      { status: 500 }
    );
  }
}
