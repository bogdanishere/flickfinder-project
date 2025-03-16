import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import ThemeChange from "@/components/ThemeChange";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlickFinder",
  description: "FlickFinder next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <main className="w-full h-screen relative  text-text bg-background">
            <ThemeChange />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
