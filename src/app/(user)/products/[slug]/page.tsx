import SingleProductPage from "@/components/user/products/SingleProductPage";
import { Product } from "@/lib/types/Product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/product/slug/${slug}`, {
      cache: "no-store"
    });

    if (!res.ok) return null;

    const data = await res.json();
    console.log("from sluf" ,data)
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default async function ProductDetailsPage({
  params
}: {
  params: Promise<{ slug: string }> ;
}) {
  const { slug} = await params
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
  