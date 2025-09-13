"use client";

import { useState } from "react";
import { Product } from "@/lib/types/Product";
import PaymentSummaryForBuy from "../../cart/components/PaymentSummaryForBuy";
import { SingleProductUi } from "./SingleProductUi";

interface CheckOutClientProps {
  product: Product;
}

export default function CheckOutClient({ product }: CheckOutClientProps) {
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({
    [product._id]: 1,
  });

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto mt-18 lg:mt-2">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-800 mb-6">
          Checkout
        </h2>

        <div className="flex flex-col gap-6">
          {/* Product Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <SingleProductUi
              product={product}
              quantities={quantities}
              setQuantities={setQuantities}
            />
          </div>

          {/* Payment Summary Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <PaymentSummaryForBuy products={[product]} quantities={quantities} />
          </div>
        </div>
      </div>
    </div>
  );
}
