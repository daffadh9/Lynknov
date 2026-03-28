import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter provides a clean, modern, and highly legible typography that fits an editorial/premium feel
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = 'https://lynknov.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Lynknov | Interactive Business OS',
    template: '%s | Lynknov',
  },
  description:
    'Lynknov adalah Interactive Business OS untuk kreator, freelancer, dan bisnis digital membangun halaman publik, penawaran, CTA, dan alur konversi dalam satu workspace premium.',
  applicationName: 'Lynknov',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Lynknov',
    title: 'Lynknov | Interactive Business OS',
    description:
      'Bangun kehadiran digital yang bukan sekadar link-in-bio, tapi workspace bisnis yang siap tumbuh.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Lynknov Interactive Business OS',
      },
    ],
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lynknov | Interactive Business OS',
    description:
      'Bangun kehadiran digital yang bukan sekadar link-in-bio, tapi workspace bisnis yang siap tumbuh.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen selection:bg-white/10 selection:text-white`} suppressHydrationWarning>
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