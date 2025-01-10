import ErrorHandler from "../middlewares/errorMiddleware.js"; // Importing custom error handler
import { User } from "../models/userSchema.js"; // Importing the User model
import { catchAsyncError } from "../middlewares/catchAsyncError.js"; // Importing middleware to handle async errors
import { generateToken } from "../utils/jwttoken.js"; // Importing token generation utility

// Controller function to register a new user
export const registerUser = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body; // Destructuring email, password, and role from request body
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill all the fields", 400)); // Return error if any field is missing
  }

  const user = await User.findOne({ email }); // Check if user already exists
  if (user) {
    return next(new ErrorHandler("User already exists", 400)); // Return error if user exists
  }

  await User.create({ email, password, role }); // Create a new user
  generateToken(user, "User registered successfully", 200, res); // Generate token and send response
});

// Controller function to log in a user
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body; // Destructuring email, password, and role from request body
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email and password", 400)); // Return error if any field is missing
  }

  const user = await User.findOne({ email }).select("+password"); // Find user and include password
  if (!user) {
    return next(new ErrorHandler("User not found", 400)); // Return error if user not found
  }

  const isPasswordCorrect = await user.comparePassword(password); // Compare passwords
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid password", 400)); // Return error if password is incorrect
  }

  generateToken(user, "User logged in successfully", 200, res); // Generate token and send response
});

// Controller function to add a new admin
export const addAdmin = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body; // Destructuring email, password, and role from request body
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill all the fields", 400)); // Return error if any field is missing
  }

  const isRegistered = await User.findOne({ email }); // Check if user is already registered
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} already exists`, 400)); // Return error if user exists
  }

  const admin = await User.create({ email, password, role: "Admin" }); // Create a new admin
  res.status(200).json({
    success: true,
    message: "Admin added successfully",
    admin, // Include admin information in the response
  });
});
