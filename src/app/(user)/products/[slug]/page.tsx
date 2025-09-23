import SingleProductPage from "@/components/user/products/SingleProductPage";
import { Product } from "@/lib/types/Product";

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
    title: `${product.name}`,
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
          url:
            product.image || "https://omegbazaar.com/default-product.jpg",
          width: 1200,
          height: 630
        }
      ],
      type: "website",
      locale: "en_IN"
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

//  Metadata
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return generateProductMetadata(product);
}

// Page Component
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

  return <SingleProductPage product={product} />;
}
