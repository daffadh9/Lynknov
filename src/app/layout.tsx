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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-icon',
        url: '/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
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