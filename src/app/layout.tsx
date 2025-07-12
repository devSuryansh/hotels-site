import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootLayout from "@/components/RootLayout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://resortsincherrapunji.com"), // Replace with your actual domain
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
        url: "/og-image.jpg", // Add your OG image
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
    images: ["/twitter-image.jpg"], // Add your Twitter card image
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
    yandex: "your-yandex-verification-code", // Add your Yandex verification code if needed
  },
  category: "travel",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      itemScope
      itemType="http://schema.org/WebSite"
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#065f46" />
      </head>
      <body className={inter.className}>
        <RootLayout>
          <SpeedInsights />
          <Analytics />
          {children}
        </RootLayout>

        {/* Structured Data for Organization */}
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cherrapunji Hotels & Resorts",
              url: "https://cherrapunji-hotels.com",
              logo: "https://cherrapunji-hotels.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-123-456-7890", // Replace with actual phone
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["en", "hi"],
              },
              sameAs: [
                "https://facebook.com/your-page", // Add your social links
                "https://instagram.com/your-page",
                "https://twitter.com/your-page",
              ],
            }),
          }}
        />

        {/* Structured Data for Local Business */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Cherrapunji Hotels & Resorts",
              image: "https://cherrapunji-hotels.com/hero-image.jpg",
              "@id": "https://cherrapunji-hotels.com",
              url: "https://cherrapunji-hotels.com",
              telephone: "+91-123-456-7890", // Replace with actual phone
              address: {
                "@type": "PostalAddress",
                streetAddress: "Your Street Address",
                addressLocality: "Cherrapunji",
                addressRegion: "Meghalaya",
                postalCode: "793108",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 25.2867,
                longitude: 91.7086,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              priceRange: "₹₹₹",
            }),
          }}
        />
      </body>
    </html>
  );
}
