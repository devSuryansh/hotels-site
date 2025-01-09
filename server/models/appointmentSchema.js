import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name must be at least 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
    maxLength: [10, "Phone number cannot exceed 10 digits"],
    minLength: [10, "Phone number must be at least 10 digits"],
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
