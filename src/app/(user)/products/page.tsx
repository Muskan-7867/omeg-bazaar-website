import MainProductPage from '@/components/user/products/MainProduct'
import React from 'react'

export const metadata = {
  title: "Products",
  description: "Explore a wide range of high-quality products at Omeg-Bazaar, including electronics, beauty essentials, kitchen tools, and more. Shop with confidence and enjoy exclusive deals and offers on your favorite items.",
  keywords: ["Omeg-Bazaar", "products", "electronics", "beauty products", "kitchen products", "online shopping"],
  authors: [{ name: "Omeg-Bazaar Team", url: "https://omegbazaar.com" }],
  openGraph: {
    title: "Omeg-Bazaar | Products",
    description: "Browse Omeg-Bazaar's extensive collection of electronics, beauty products, kitchen essentials, and more. Find the best deals and enjoy a seamless online shopping experience.",
    url: "https://omegbazaar.com/products",
    siteName: "Omeg-Bazaar",
    images: [
      {
        url: "https://res.cloudinary.com/debzdd4wk/image/upload/v1758353481/products_tvmpwj.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ProductsPage
() {
  return (
    <div className='mt-10 lg:mt-0'>
       <MainProductPage />
    </div>
  )
}
