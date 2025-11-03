import MainProductPage from '@/components/user/products/MainProduct'
import Script from 'next/script'
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
        url: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149746/product_vjiazp.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

// JSON-LD structured data for Products Collection Page
const productsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Products | Omeg-Bazaar",
  "description": "Explore a wide range of high-quality products at Omeg-Bazaar including electronics, beauty essentials, kitchen tools, and more.",
  "url": "https://omegbazaar.com/products",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 29, // Update this with actual product count
    "itemListOrder": "Descending", // or Ascending based on your sort
    "name": "Product Collection"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Omeg-Bazaar",
    "url": "https://omegbazaar.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://res.cloudinary.com/dnjziya9k/image/upload/v1762150218/blacklogo_jcgsh9.png" // Add your logo URL
    },
    "description": "Your trusted online shopping destination for quality products"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://omegbazaar.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://omegbazaar.com/products"
      }
    ]
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://omegbazaar.com/products?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Alternative simpler version using WebSite schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Omeg-Bazaar",
  "url": "https://omegbazaar.com",
  "description": "Your trusted online shopping destination for quality products including electronics, beauty essentials, and kitchen tools.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://omegbazaar.com/products?search={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Omeg-Bazaar",
    "logo": {
      "@type": "ImageObject",
      "url": "https://res.cloudinary.com/dnjziya9k/image/upload/v1762150218/blacklogo_jcgsh9.png"
    }
  }
};

export default function ProductsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="products-page-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsPageSchema) }}
      />
      
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className='mt-10 lg:mt-0'>
        <MainProductPage />
      </div>
    </>
  )
}