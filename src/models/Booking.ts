import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema({
  hotelId: { type: String, required: true },
  hotelName: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, required: true },
  phone: { type: String, required: true },
  roomType: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  nights: { type: Number, required: true },
  createdAt: { type: String, required: true },
});

export default models.Booking || model("Booking", BookingSchema);
