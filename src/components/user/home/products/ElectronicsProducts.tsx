import { getProductsByCategory } from "@/lib/services/api/fetchers";
import ScrollableProducts from "./ScrollableProducts"; // client component
import { Product } from "@/lib/types/Product";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default async function BeautySection() {
  let products: Product[] = [];

  try {
    products = await getProductsByCategory("electronics");
  } catch (err) {
    console.error("Error fetching featured products", err);
  }

  const categoryId = products.length > 0 ? products[0].category : null;

  return (
    <section className="p-6 bg-white my-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-primary text-left">
          Electronic Products
        </h2>
        {categoryId && (
          <Link
            href={`/products?category=${encodeURIComponent(categoryId)}`}
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-sm font-medium">View All</span>
            <FaArrowRight className="text-xs" />
          </Link>
        )}
      </div>

      {/* Client-side scrollable products */}
      <ScrollableProducts products={products} />
    </section>
  );
}
