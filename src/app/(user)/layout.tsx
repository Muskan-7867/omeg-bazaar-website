import DemoOne from "@/components/user/footer/FooterTwo";
import CategoryNavbar from "@/components/user/navbar/components/CategoryNavbar";
import Navbar from "@/components/user/navbar/Navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Omeg-Bazaar",
    template: "%s | Omeg-Bazaar", 
  },
  description:
    "Omeg-Bazaar is your one-stop online shopping destination for electronics, fashion, kitchen essentials and more. Discover amazing deals, fast delivery, and secure checkout.",
  keywords: [
    "Omeg-Bazaar",
    "online shopping",
    "electronics",
    "fashion",
    "kitchen essentials",
   
  ],
  authors: [{ name: "Omeg-Bazaar Team", url: "https://omegbazaar.com" }],
  creator: "Omeg-Bazaar",
  publisher: "Omeg-Bazaar",
  metadataBase: new URL("https://omegbazaar.com"),
  alternates: {
    canonical: "https://omegbazaar.com",
  },
  openGraph: {
    title: "Omeg-Bazaar | Online Shopping in India",
    description:
      "Shop electronics, fashion, and kitchen essentials at Omeg-Bazaar. Secure shopping & fast delivery.",
    url: "https://omegbazaar.com",
    siteName: "Omeg-Bazaar",
    images: [
      {
        url: "https://res.cloudinary.com/dwgxfctju/image/upload/v1758619862/home_cbxubj.png", 
        width: 1200,
        height: 630,
        alt: "Omeg-Bazaar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omeg-Bazaar | Online Shopping in India",
    description:
      "Discover the latest deals on electronics, fashion, and kitchen essentials at Omeg-Bazaar.",
    images: "",
    creator: "@omegbazaar",
  },
  category: "ecommerce",

};

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <Navbar />
      <CategoryNavbar />
      {children}
      <DemoOne />
    </div>
  );
}