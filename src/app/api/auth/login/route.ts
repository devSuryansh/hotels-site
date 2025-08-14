import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// In a real application, this would come from a database
// For now, we'll use environment variables or hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123", // This should be hashed in production
  email: process.env.ADMIN_EMAIL || "admin@hotel.com",
  id: "admin-1",
  role: "admin" as const,
};

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-this-in-production";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const { username, password } = validatedData;

    // Check credentials
    if (username !== ADMIN_CREDENTIALS.username) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // In production, you should hash the password and compare with bcrypt
    // For now, we'll do a simple comparison
    let isPasswordValid = false;

    if (
      process.env.NODE_ENV === "production" &&
      process.env.ADMIN_PASSWORD_HASH
    ) {
      // Use bcrypt for production
      isPasswordValid = await bcrypt.compare(
        password,
        process.env.ADMIN_PASSWORD_HASH
      );
    } else {
      // Simple comparison for development
      isPasswordValid = password === ADMIN_CREDENTIALS.password;
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: ADMIN_CREDENTIALS.id,
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email,
        role: ADMIN_CREDENTIALS.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user data and token
    const user = {
      id: ADMIN_CREDENTIALS.id,
      username: ADMIN_CREDENTIALS.username,
      email: ADMIN_CREDENTIALS.email,
      role: ADMIN_CREDENTIALS.role,
    };

    return NextResponse.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
