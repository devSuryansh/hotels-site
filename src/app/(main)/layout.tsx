import { Header } from "@/components/header";
import Link from "next/link";
import { CloudRainWind, Phone, Mail } from "lucide-react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="border-t bg-background">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-2 font-headline text-xl font-bold"
              >
                <CloudRainWind className="h-7 w-7 text-[#3266cd]" />
                Resorts in Cherrapunji
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Discover the best resorts and hotels in the heart of Meghalaya.
              </p>
            </div>
            <div>
              <h3 className="font-semibold tracking-wider text-foreground">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/hotels"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold tracking-wider text-foreground">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold tracking-wider text-foreground">
                Contact Us
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="tel:+919992052201"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    +91 999 205 2201
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:bookingreservations@resortsincherrapunji.com"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    bookingreservations@resortsincherrapunji.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Cherrapunji Escapes. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
