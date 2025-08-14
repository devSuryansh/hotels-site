import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus } from "@/lib/database";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status } = body;

    // Validate required fields
    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId, status" },
        { status: 400 }
      );
    }

    // Validate status value
    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be Pending, Confirmed, or Cancelled" },
        { status: 400 }
      );
    }

    const success = await updateBookingStatus(bookingId, status);

    if (!success) {
      return NextResponse.json(
        { error: "Booking not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      {
        error: "Failed to update booking status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
