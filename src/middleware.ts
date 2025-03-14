// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({ req, token }) => {
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
