import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  await dbConnect();

  try {
    const { slug } = await context.params; // Await params to resolve the Promise
    console.log("Requested slug:", slug);

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Case-insensitive slug matching
    const hotel = await Hotel.findOne({
      slug: { $regex: `^${slug}$`, $options: "i" },
    });
    if (!hotel) {
      console.log(`Hotel not found for slug: ${slug}`);
      return NextResponse.json(
        { error: `Hotel with slug ${slug} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("GET /api/hotels/[slug] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
