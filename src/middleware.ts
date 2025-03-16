// src/middleware.ts
import { withAuth } from "next-auth/middleware";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!token || (token.role !== "admin" && token.role !== "manager")) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
