import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootLayout from "@/components/RootLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Amit Hotels - Hotel Bookings",
  description: "Book your perfect hotel stay with Amit Hotels",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
