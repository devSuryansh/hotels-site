import mongoose from "mongoose"; // Importing mongoose for MongoDB interaction
import validator from "validator"; // Importing validator for data validation
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for token generation

// Defining the schema for a user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"], // Email is required
    unique: true, // Email must be unique
    validate: [validator.isEmail, "Please enter a valid email"], // Email format validation
  },
  password: {
    type: String,
    required: [true, "Please enter your password"], // Password is required
    minLength: [8, "Password must be at least 8 characters"], // Minimum length validation
    select: false, // Exclude password from query results by default
  },
});

// Middleware to hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next(); // Skip if password is not modified
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
});

// Method to compare input password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate a JSON Web Token for the user
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES, // Token expiration time
  });
};

// Exporting the User model based on the schema
export const User = mongoose.model("User", userSchema);
