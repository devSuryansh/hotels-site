import { Schema, model, models } from "mongoose";

const HotelSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  locationUrl: { type: String, required: true },
  description: { type: String, required: true },
  policies: { type: String, required: true },
  ratings: { type: Number, default: 0 },
  features: {
    mainFeatures: [{ type: String }],
    dining: [{ type: String }],
    leisure: [{ type: String }],
    services: [{ type: String }],
    roomComforts: [{ type: String }],
  },
  roomTypes: [
    {
      category: { type: String, required: true },
      pricePerNight: { type: Number, required: true },
    },
  ],
  nearbyAttractions: [{ type: String }],
  landmarks: [{ type: String }],
  images: [{ url: { type: String, required: true } }],
});

export default models.Hotel || model("Hotel", HotelSchema);
