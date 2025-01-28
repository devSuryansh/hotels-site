import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Rating should be between 1 and 5
    validate: {
      validator: Number.isInteger, // Rating should be an integer
      message: "Rating must be an integer value between 1 and 5.",
    },
  },
  price: {
    type: Number,
    required: true,
  },
  services: {
    type: [String], // Array of strings for comma-separated services
    required: true,
  },
  facilities: {
    type: [String], // Array of strings for comma-separated facilities
    required: true,
  },
  hotelImages: {
    type: [String], // Array of strings for multiple image URLs
    required: true,
  },
  url: {
    type: String, // A custom slug based on hotel name
    required: true,
  },
});

export const Hotel = mongoose.model("Hotel", hotelSchema);
