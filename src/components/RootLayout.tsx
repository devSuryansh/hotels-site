"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <Providers>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </Providers>
  );
};

export default RootLayout;
