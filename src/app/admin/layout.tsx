"use client";

import { AuthProvider } from "@/contexts/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {children}
      </div>
    </AuthProvider>
  );
}
