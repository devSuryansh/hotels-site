import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  locationUrl: { type: String, required: true },
  description: { type: String, required: true },
  policies: { type: String, required: true },
  ratings: { type: Number, default: 0 },
  features: {
    mainFeatures: [String],
    dining: [String],
    leisure: [String],
    services: [String],
    roomComforts: [String],
  },
  roomTypes: [
    {
      category: { type: String, required: true },
      pricePerNight: { type: Number, required: true },
    },
  ],
  nearbyAttractions: [String],
  landmarks: [String],
  images: [{ url: String }],
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
