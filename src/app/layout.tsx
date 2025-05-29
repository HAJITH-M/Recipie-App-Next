import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import RouteGuard from "../components/routeGuard";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App",
  icons: {
    icon: {
      url: "https://ik.imagekit.io/k5gvskw6y/image.png?tr=w-32,h-32,r-max",
      type: "image/png",
    },
    apple: {
      url: "https://ik.imagekit.io/k5gvskw6y/image.png?tr=w-180,h-180,r-max",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RouteGuard>{children}</RouteGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}