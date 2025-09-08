"use client";

import SingleProductPage from "@/components/user/products/SingleProductPage";
import { useSingleProductStore } from "@/lib/store/product/Table.store";


export default function SingleProductModal() {
  const { selectedProduct, setShowSingleProduct, showSingleProduct } =
    useSingleProductStore();

  if (!showSingleProduct || !selectedProduct) return null;

  return (
    <div
      onClick={() => setShowSingleProduct(false)}
      className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl max-w-7xl w-full h-[90vh] overflow-y-auto"
      >
        <SingleProductPage product={selectedProduct} />
      </div>
    </div>
  );
}
