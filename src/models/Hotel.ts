import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ url: String }],
  amenities: [String],
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
