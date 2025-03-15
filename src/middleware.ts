// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({
      req,
      token,
    }: {
      req: NextRequest;
      token: null | { role?: string };
    }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return !!token && (token.role === "admin" || token.role === "manager");
      }
      return true; // Allow public routes
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
