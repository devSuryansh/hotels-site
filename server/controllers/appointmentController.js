import { Appointment } from "../models/appointmentSchema.js"; // Importing the Appointment model
import { catchAsyncError } from "../middlewares/catchAsyncError.js"; // Importing middleware to handle async errors
import ErrorHandler from "../middlewares/errorMiddleware.js"; // Importing custom error handler

// Controller function to create a new appointment
export const createAppointment = catchAsyncError(async (req, res) => {
  const { name, email, phone } = req.body; // Destructuring name, email, and phone from request body

  // Check if all required fields are provided
  if (!name || !email || !phone) {
    return next(new ErrorHandler("Please fill all the fields", 400)); // Return error if any field is missing
  }

  // Create a new appointment in the database
  await Appointment.create({ name, email, phone });

  // Send success response
  res.status(200).json({
    success: true,
    message: "Appointment created successfully",
  });
});
