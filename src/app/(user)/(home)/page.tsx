import HeroSection from "@/components/user/home/HeroSection";
import HomeBanner from "@/components/user/home/HomeBanner";
import InfoBar from "@/components/user/home/InfoBar";
import InstaSection from "@/components/user/home/InstaSection";
import MusicBanner from "@/components/user/home/MusicBanner";
import OurApp from "@/components/user/home/OurApp";
import BeautySection from "@/components/user/home/products/BeautyProducts";
import Electronics from "@/components/user/home/products/ElectronicsProducts";
import KitchenProducts from "@/components/user/home/products/KitchenProducts";
import React from "react";

export const metadata = {
  title: "Home",
  description:
    "Discover amazing products across electronics, beauty, kitchen essentials, and more at Omeg-Bazaar. Shop now and enjoy exclusive offers!",
  keywords: [
    "Omeg-Bazaar",
    "electronics",
    "beauty products",
    "kitchen products",
    "online shopping"
  ],
  authors: [{ name: "Omeg-Bazaar Team", url: "https://omegbazaar.com" }],
  openGraph: {
    title: "Omeg-Bazaar | Home",
    description:
      "Discover amazing products across electronics, beauty, kitchen essentials, and more at Omeg-Bazaar.",
    url: "https://omegbazaar.com",
    siteName: "Omeg-Bazaar",
    images: [
      {
        url: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149481/home_qqcnea.png",
        width: 1200,
        height: 630
      }
    ],
    locale: "en_IN",
    type: "website"
  }
};


export default function HomePage() {
  return (
    <div className="bg-white">
      <HomeBanner />
      <InfoBar />
      <Electronics />
      <MusicBanner />
      <BeautySection />
      <HeroSection />
      <KitchenProducts />
      <OurApp />
      <InstaSection />
    </div>
  );
}
