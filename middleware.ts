import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-this-in-production";

// Paths that require authentication
const protectedPaths = [
  "/api/hotels/create",
  "/api/hotels/generate-meta-tags",
  "/api/bookings/update-status",
];

// Paths that require admin authentication
const adminPaths = ["/admin/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path requires authentication
  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path));
  const requiresAdmin = adminPaths.some((path) => pathname.startsWith(path));

  if (requiresAuth || requiresAdmin) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // Check if user has admin role for admin paths
      if (requiresAdmin && decoded.role !== "admin") {
        return NextResponse.json(
          { error: "Admin access required" },
          { status: 403 }
        );
      }

      // Add user info to headers for the API route
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", decoded.userId);
      requestHeaders.set("x-user-role", decoded.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match API routes that need protection
    "/api/hotels/create",
    "/api/hotels/generate-meta-tags",
    "/api/bookings/update-status",
    // Match admin dashboard routes
    "/admin/dashboard/:path*",
  ],
};
