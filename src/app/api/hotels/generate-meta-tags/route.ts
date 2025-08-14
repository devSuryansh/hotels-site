import { NextRequest, NextResponse } from "next/server";
import { generateDynamicMetaTags } from "@/ai/flows/generate-dynamic-meta-tags";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      hotelName,
      hotelDescription,
      hotelLocation,
      hotelFeatures,
      nearbyAttractions,
    } = body;

    // Validate required fields
    if (!hotelName || !hotelDescription || !hotelLocation) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: hotelName, hotelDescription, hotelLocation",
        },
        { status: 400 }
      );
    }

    // Generate meta tags using AI
    const metaTags = await generateDynamicMetaTags({
      hotelName,
      hotelDescription,
      hotelLocation,
      hotelFeatures: hotelFeatures || [],
      nearbyAttractions: nearbyAttractions || [],
    });

    return NextResponse.json(metaTags);
  } catch (error) {
    console.error("Error generating meta tags:", error);
    return NextResponse.json(
      {
        error: "Failed to generate meta tags",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
