import SingleProductPage from "@/components/user/products/SingleProductPage";
import { Product } from "@/lib/types/Product";
import Script from "next/script";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function generateProductMetadata(product: Product | null) {
  if (!product) {
    return {
      title: "Product Not Found ",
      description: "This product could not be found.",
      keywords: ["Omeg-Bazaar", "product not found"],
      openGraph: {
        title: "Product Not Found | Omeg-Bazaar",
        description: "This product could not be found.",
        url: "https://www.omegbazaar.com",
        siteName: "Omeg-Bazaar",
        images: [
          {
            url: "https://omegbazaar.com/default-product.jpg",
            width: 1200,
            height: 630
          }
        ],
        type: "website",
        locale: "en_IN"
      }
      
    };
  }

  return {
    title: product.name,
    description:
      product.description?.substring(0, 160) ||
      "Shop this product at Omeg-Bazaar.",
    keywords: [
      "Omeg-Bazaar",
      product.name,
      product.category,
      "online shopping"
    ],
    authors: [{ name: "Omeg-Bazaar Team", url: "https://omegbazaar.com" }],
    openGraph: {
      title: product.name,
      description: product.description?.substring(0, 160),
      url: `https://omegbazaar.com/products/${product.slug}`,
      siteName: "Omeg-Bazaar",
      images: [
        {
          url: product.image || "https://omegbazaar.com/default-product.jpg",
          width: 1200,
          height: 630
        }
      ],
      type: "website",
      locale: "en_IN"
    },
    alternates: {
      canonical: `https://omegbazaar.com/products/${product.slug}`
    }
  };
}

// Fetch Product
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/product/slug/${slug}`, {
      cache: "no-store"
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Metadata
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return generateProductMetadata(product);
}

export default async function ProductDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="p-10 text-red-500 text-center">
        Product not found or failed to load.
      </div>
    );
  }

  // ✅ Fixed Product Schema
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img) => img.url) || [], // Must be array
    description: product.description?.substring(0, 160) || product.name,
    sku: product.sku || product._id,
    mpn: product.mpn || product.sku || product._id, // Ensure MPN exists
    url: `https://omegbazaar.com/products/${product.slug}`, // REQUIRED
    brand: {
      "@type": "Brand",
      name: product.brand || "Omeg-Bazaar" // Fallback brand
    },
    aggregateRating: product.averageRating ? {
    
      "@type": "AggregateRating",
      ratingValue: product.averageRating?.toString(),
      reviewCount: product.numReviews?.toString(),
      bestRating: "5",
      worstRating: "0"
    } : undefined,

 review: product.reviews && product.reviews.length > 0 ? product.reviews.map(review => ({
    "@type": "Review",
    author: { 
      "@type": "Person", 
      name: review?.user?.name  // Use review.name from your schema
    },
    datePublished: new Date().toISOString().split("T")[0], // You might want to add createdAt to your review schema
    reviewBody: review.comment || `Review of ${product.name}`, // Use review.comment from your schema
    name: `Review by ${review?.user?.name}`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating.toString(),
      bestRating: "5",
      worstRating: "0"
    }
  })) : undefined,

    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(product.price), 
 
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: product.brand || "Omeg-Bazaar"
      },
      url: `https://omegbazaar.com/products/${product.slug}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 1 year from now
        hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "IN",
        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
      },

      // ✅ Added basic shipping details
      shippingDetails: {
        "@type": "OfferShippingDetails",
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 5,
            "unitCode": "d"
          }
        },
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0.00",
          "currency": "INR"
        }
      }
    }
  };
  

  return (
    <>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <SingleProductPage product={product} />
    </>
  );
}
