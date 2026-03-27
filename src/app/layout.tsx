import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter provides a clean, modern, and highly legible typography that fits an editorial/premium feel
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lynknov | Platform Kehadiran Digital Profesional",
  description: "Bangun identitas digital yang terasa setara dengan kualitas kerja Anda. Lynknov membantu kreator dan bisnis jasa menyusun kehadiran digital yang lebih rapi dan meyakinkan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen selection:bg-white/10 selection:text-white`}>
        {/* 
          Layout is kept purely structural.
          No forced centered containers or narrow constraints.
          Pages have full control over their composition, spacing, and width.
        */}
        {children}
      </body>
    </html>
  );
}