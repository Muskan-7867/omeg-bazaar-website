"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/lib/types/Product";
import { getRelatedProductsBySlug } from "@/lib/services/api/fetchers";
import Lottie from "lottie-react";
import  empty  from "../../../../public/animations/empty.json"

interface RelatedProductsProps {
  categorySlug: string;
  currentProductId: string;
}

export default function RelatedProducts({
  categorySlug,
  currentProductId,
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await getRelatedProductsBySlug(
        categorySlug,
        currentProductId
      );
      setRelatedProducts(products);
      setLoading(false);
    };

    fetchProducts();
  }, [categorySlug, currentProductId]);

  if (loading) return <p className="py-4 text-center">Loading related products...</p>;

  if (!relatedProducts.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50rem]">
        <Lottie
          animationData={empty}
          loop
          className="w-70 h-70"
        />
        <p className="mt-4 text-lg font-medium text-gray-600">
          No related products found.
        </p>
      </div>
    );

  return (
    <div className="mt-12 min-h-[70rem]">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>

      {/* Mobile */}
      <div className="sm:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-2">
          {relatedProducts.map((p) => (
            <div key={p._id} className="flex-shrink-0 w-[340px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-2 sm:gap-4">
        {relatedProducts.map((p) => (
          <div key={p._id} className="flex-shrink-0 w-78">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
