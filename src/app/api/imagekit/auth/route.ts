import { NextRequest, NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";

export async function GET() {
  try {
    // Check if ImageKit is properly configured
    if (
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      !process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
    ) {
      console.error("ImageKit credentials not configured");
      return NextResponse.json(
        { error: "ImageKit credentials not configured" },
        { status: 500 }
      );
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();

    // Add CORS headers for client-side requests
    const response = NextResponse.json(authenticationParameters);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Error generating ImageKit auth:", error);
    return NextResponse.json(
      {
        error: "Failed to generate authentication parameters",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
