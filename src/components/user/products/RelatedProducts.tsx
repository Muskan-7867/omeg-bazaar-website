"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/lib/types/Product";
import { getRelatedProducts } from "@/lib/services/api/fetchers";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await getRelatedProducts(categoryId, currentProductId);
      setRelatedProducts(products);
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId, currentProductId]);

  if (loading) return <p className="py-4 text-center">Loading related products...</p>;
  if (!relatedProducts.length) return <p className="py-4 text-center">No related products found.</p>;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>

      {/* Mobile: horizontal scroll */}
      <div className="sm:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-2">
          {relatedProducts.map((p) => (
            <div key={p._id} className="flex-shrink-0 w-[340px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-2 sm:gap-4">
        {relatedProducts.map((p) => (
          <div key={p._id} className="flex-shrink-0 w-78">

          <ProductCard key={p._id} product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
