import { AboutUs } from '@/components/user/about/AboutUs'
import React from 'react'

export const metadata = {
  title: "About Us",
  description: "Learn more about Omeg-Bazaar, your trusted online shopping destination. Explore our mission, values, and commitment to providing the best products in electronics, beauty, kitchen essentials, and more.",
  keywords: ["Omeg-Bazaar", "about us", "company mission", "online shopping", "customer trust"],
  authors: [{ name: "Omeg-Bazaar Team", url: "https://omegbazaar.com" }],
  openGraph: {
    title: "Omeg-Bazaar | About Us",
    description: "Discover Omeg-Bazaar's mission, values, and commitment to offering high-quality products across electronics, beauty, kitchen essentials, and more.",
    url: "https://omegbazaar.com/about",
    siteName: "Omeg-Bazaar",
    images: [
      {
        url: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149617/about_lpcook.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};


export default function AboutPage() {
  return (
    <div>
      <AboutUs />
    </div>
  )
}
