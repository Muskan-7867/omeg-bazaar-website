import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/providers/QueryProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omegbazaar.com"),
  title: "Omeg-Bazaar | Online Shopping for Electronics, Fashion & More",
  icons: {
    icon: "blacklogo.jpg"
  },
  description:
    "Shop at Omeg-Bazaar for electronics, fashion, home essentials, and more. Discover great deals, secure payments, and fast delivery.",
  keywords: [
    "Omeg-Bazaar",
    "online shopping",
    "electronics",
    "fashion",
    "home essentials",
    "best deals",
    "kitchen"
  ],
  verification: {
    google: "wBHJRwBttvVnQDTZoPZzVD9LjXi5rc3sQMoRyIDKu4Y"
  },
  authors: [{ name: "Omeg-Bazaar", url: "https://omegbazaar.com" }],
  creator: "Omeg-Bazaar",
  publisher: "Omeg-Bazaar",

  alternates: {
    canonical: "https://omegbazaar.com"
  },
  openGraph: {
    title: "Omeg-Bazaar | Online Shopping for Electronics, Fashion & More",
    description:
      "Discover amazing deals on electronics, fashion, and home products at Omeg-Bazaar. Secure shopping & fast delivery.",
    url: "https://omegbazaar.com",
    siteName: "Omeg-Bazaar",
    images: [
      {
        url: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149481/home_qqcnea.png",
        width: 1200,
        height: 630,
        alt: "Omeg-Bazaar Logo"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Omeg-Bazaar | Online Shopping Platform",
    description:
      "Shop for electronics, fashion, and more at Omeg-Bazaar. Get the best deals today!",
    images: [""],
    creator: "@omegbazaar"
  },
  category: "ecommerce"
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        ></Script>
      </body>
    </html>
  );
}
