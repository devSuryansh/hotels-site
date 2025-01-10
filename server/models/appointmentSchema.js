import mongoose from "mongoose"; // Importing mongoose for MongoDB interaction
import validator from "validator"; // Importing validator for data validation

// Defining the schema for an appointment
const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"], // Name is required
    maxLength: [30, "Name cannot exceed 30 characters"], // Maximum length validation
    minLength: [4, "Name must be at least 4 characters"], // Minimum length validation
  },
  email: {
    type: String,
    required: [true, "Please enter your email"], // Email is required
    unique: true, // Email must be unique
    validate: [validator.isEmail, "Please enter a valid email"], // Email format validation
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"], // Phone number is required
    maxLength: [10, "Phone number cannot exceed 10 digits"], // Maximum length validation
    minLength: [10, "Phone number must be at least 10 digits"], // Minimum length validation
  },
});

// Exporting the Appointment model based on the schema
export const Appointment = mongoose.model("Appointment", appointmentSchema);
