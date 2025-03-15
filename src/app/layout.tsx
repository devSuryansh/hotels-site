import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amit Hotels - Hotel Bookings",
  description: "Book your perfect hotel stay with Amit Hotels",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider>
          <ToastProvider>
            <Navbar />
            {children}
            <Footer />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
