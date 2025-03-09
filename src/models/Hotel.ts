import mongoose, { Schema, Document, model, models } from "mongoose";

/**
 * TypeScript interface for Hotel document
 */
export interface IHotel extends Document {
  slug: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  description: string;
  images: string[];
  amenities: string[];
  phone: string;
  email: string;
}

/**
 * Mongoose Schema for Hotel model
 */
const HotelSchema = new Schema<IHotel>({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  amenities: [{ type: String, required: true }],
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Hotel = models.Hotel || model<IHotel>("Hotel", HotelSchema);
export default Hotel;
