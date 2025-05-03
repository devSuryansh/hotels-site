import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const landmarkOrAttraction = searchParams.get("landmarkOrAttraction");

    const query = landmarkOrAttraction
      ? {
          $or: [
            {
              landmarks: { $regex: `^${landmarkOrAttraction}$`, $options: "i" },
            },
            {
              nearbyAttractions: {
                $regex: `^${landmarkOrAttraction}$`,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const hotels = await Hotel.find(query);
    return NextResponse.json(hotels);
  } catch (error) {
    console.error("GET /api/hotels error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
