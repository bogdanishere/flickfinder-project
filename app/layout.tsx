import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme, ThemeProvider } from "@/contexts/ThemeProvider";
import ThemeChange from "@/components/ThemeChange";
import QueryProvider from "@/contexts/QueryProvider";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlickFinder",
  description: "FlickFinder next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get("theme")?.value || "light") as Theme;

  return (
    <html lang="en" className={theme}>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider initialTheme={theme}>
            <main className="w-full h-screen relative  text-text bg-background">
              <ThemeChange />
              {children}
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
