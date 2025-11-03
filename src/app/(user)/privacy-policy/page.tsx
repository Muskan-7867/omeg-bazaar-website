import PrivacyPolicyPage from "@/components/user/privacypolicy/Privacy-Policy";
import React from "react";

export const metadata = {
  title: "Privacy Policy",
  description: "Read the Omeg-Bazaar Privacy Policy to understand how we collect, use, and protect your personal information while shopping online.",
  keywords: ["Omeg-Bazaar", "Privacy Policy", "personal data", "online shopping privacy"],
  authors: [{ name: "Omeg-Bazaar Team", url: "https://omegbazaar.com" }],
  openGraph: {
    title: "Privacy Policy | Omeg-Bazaar",
    description: "Read the Omeg-Bazaar Privacy Policy to understand how we collect, use, and protect your personal information.",
    url: "https://omegbazaar.com/privacy-policy",
    siteName: "Omeg-Bazaar",
    images: [
      {
        url: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149697/privacy_uer4bs.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index : false,
    follow : true

  }
  
};

export default function Privacy() {
  return (
    <div className="bg-white">
      <PrivacyPolicyPage />
    </div>
  );
}
