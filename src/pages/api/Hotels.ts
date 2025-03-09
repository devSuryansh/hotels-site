import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/mongodb";
import Hotel, { IHotel } from "../../models/Hotel";

/**
 * API Handler for managing hotel data
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const hotels: IHotel[] = await Hotel.find();
      return res.status(200).json(hotels);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch hotels" });
    }
  }

  if (req.method === "POST") {
    try {
      console.log("Received Data:", req.body);

      if (Array.isArray(req.body)) {
        // Bulk Insert for Multiple Hotels
        const hotels = await Hotel.insertMany(req.body);
        return res
          .status(201)
          .json({ message: "Hotels added successfully!", hotels });
      } else {
        // Single Insert
        const hotel = new Hotel(req.body);
        await hotel.save();
        return res
          .status(201)
          .json({ message: "Hotel added successfully!", hotel });
      }
    } catch (error: any) {
      console.error("Error saving hotel:", error);
      return res
        .status(500)
        .json({ error: "Failed to add hotel", details: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
