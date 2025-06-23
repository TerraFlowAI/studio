// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext"; 
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = { title: "TerraFlow", description: "AI for Real Estate" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}<Toaster /></AuthProvider>
      </body>
    </html>
  );
}
