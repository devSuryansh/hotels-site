import { Appointment } from "../models/appointmentSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const createAppointment = catchAsyncError(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  await Appointment.create({ name, email, phone });
  res.status(200).json({
    success: true,
    message: "Appointment created successfully",
  });
});
