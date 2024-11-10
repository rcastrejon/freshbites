import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-inter",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  variable: "--font-dm-serif-display",
});

export const metadata: Metadata = {
  title: "FreshBites",
  description:
    "FreshBites es la plataforma definitiva diseñada específicamente para estudiantes universitarios que buscan cocinar de manera inteligente, saludable y económica.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#ffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(inter.variable, dmSerifDisplay.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
