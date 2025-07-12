import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootLayout from "@/components/RootLayout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hotels in Cherrapunji - Hotel Bookings",
  description: "Book your perfect hotel stay in Cherrapunji",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={inter.className}>
        <RootLayout>
          <SpeedInsights />
          <Analytics />
          {children}
        </RootLayout>
      </body>
    </html>
  );
}
