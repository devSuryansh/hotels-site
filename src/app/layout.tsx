import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://resortsincherrapunji.com"),
  title: {
    default: "Best Resorts & Hotels in Cherrapunji | Luxury Stays in Meghalaya",
    template: "%s | Cherrapunji Hotels & Resorts",
  },
  description:
    "Book luxury resorts and hotels in Cherrapunji, Meghalaya. Experience breathtaking views, living root bridges, and waterfalls. Best rates guaranteed, 24/7 phone support.",
  keywords:
    "cherrapunji hotels, cherrapunji resorts, meghalaya hotels, living root bridges, cherrapunji accommodation, luxury resorts cherrapunji, hotel booking cherrapunji",
  authors: [{ name: "Resorts in Cherrapunji" }],
  creator: "Resorts in Cherrapunji",
  publisher: "Resorts in Cherrapunji",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Resorts & Hotels in Cherrapunji | Luxury Stays in Meghalaya",
    description:
      "Book luxury resorts and hotels in Cherrapunji, Meghalaya. Experience breathtaking views, living root bridges, and waterfalls. Best rates guaranteed, 24/7 phone support.",
    url: "https://resortsincherrapunji.com",
    siteName: "Cherrapunji Hotels & Resorts",
    images: [
      {
        url: "/og-image.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Luxury Resorts in Cherrapunji",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Resorts & Hotels in Cherrapunji | Luxury Stays in Meghalaya",
    description:
      "Book luxury resorts and hotels in Cherrapunji, Meghalaya. Experience breathtaking views, living root bridges, and waterfalls.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
  category: "travel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
