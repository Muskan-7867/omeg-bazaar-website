import Contact from "@/components/user/contact/Contact";
import React from "react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the Omeg-Bazaar team for support, inquiries, or feedback. We're here to help you with your shopping experience and answer all your questions promptly.",
  keywords: ["Omeg-Bazaar", "contact", "customer support", "inquiries", "online shopping"],
  authors: [{ name: "Omeg-Bazaar Team", url: "https://omegbazaar.com" }],
  openGraph: {
    title: "Omeg-Bazaar | Contact Us",
    description: "Reach out to the Omeg-Bazaar team for support, questions, or feedback about your shopping experience.",
    url: "https://omegbazaar.com/contact",
    siteName: "Omeg-Bazaar",
    images: [
      {
        url: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149664/conatct_bpvepq.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};


export default function ContactPage() {
  return (
    <div className="mt-8 lg:mt-0">
      <Contact />
    </div>
  );
}
