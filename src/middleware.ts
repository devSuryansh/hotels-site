import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // This function runs only if the user is authenticated
    const token = req.nextauth.token;

    // Allow access only if the user has a valid token and an appropriate role
    if (!token || (token.role !== "admin" && token.role !== "manager")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Ensure this callback enforces authentication
      authorized: ({ token }) => {
        return !!token; // User must have a token to proceed
      },
    },
    pages: {
      signIn: "/admin/login", // Redirect here if unauthorized
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], // Protect all /admin routes
};
