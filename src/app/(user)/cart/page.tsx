import CartLayout from '@/components/user/cart/components/CartLayout'
import React from 'react'


export const metadata = {
  title: "Cart",
  description: "Review your selected items in the Omeg-Bazaar cart, update quantities, and proceed to checkout for a seamless shopping experience.",
  keywords: ["Omeg-Bazaar", "cart", "shopping cart", "checkout", "online shopping", "products"],
  authors: [{ name: "Omeg-Bazaar Team", url: "https://omegbazaar.com" }],
  openGraph: {
    title: "Omeg-Bazaar | Cart",
    description: "Check your items in the cart and proceed to checkout quickly and securely with Omeg-Bazaar.",
    url: "https://omegbazaar.com/cart",
    siteName: "Omeg-Bazaar",
    images: [
      {
        url: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149577/cart_rvzvnc.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};


export default function page() {
  return (
    <>
      <CartLayout />
    </>
  )
}
