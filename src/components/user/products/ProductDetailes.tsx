"use client";
import React, { useState } from "react";
import { FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";
import { Product } from "@/lib/types/Product";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";

interface ProductDetailsProps {
  product: Product;
  averageRating: string;
  reviewCount: number;
}

export default function ProductDetails({
  product,
  averageRating,
  reviewCount
}: ProductDetailsProps) {
  const { addProductToCart, RemoveProductFromCart } = useCart();
  const [isPresentInCart, setIsPresentInCart] = useState<boolean>(false);
  const router = useRouter();

  const handleBuy = () => {
    router.push(`/checkout/${product._id}`);
  };

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPresentInCart) {
      RemoveProductFromCart(product._id);
      setIsPresentInCart(false);
    } else {
      addProductToCart(product._id);
      setIsPresentInCart(true);
    }
  };

  // Check if there's a discount (original price vs current price)
const hasDiscount =
  product.originalPrice !== undefined && product.originalPrice > product.price;

const discountPercentage = hasDiscount && product.originalPrice
  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  : 0;


  return (
    <div className="lg:col-span-5 space-y-4  p-2">
      <h1 className="lg:text-3xl text-lg font-medium text-gray-900">
        {product.name}
      </h1>

      {/* Rating Summary */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
          <span className="text-blue-700 font-bold mr-1">{averageRating}</span>
          <FaStar className="text-yellow-400 text-sm" />
        </div>
        <span className="text-gray-600 text-sm">
          {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
        </span>
      </div>

      {product.description && (
        <p className="text-gray-700 text-sm leading-relaxed">
          {product.description}
        </p>
      )}

      {product.features && (
        <div className=" ">
          <h3 className="font-semibold text-gray-800 mb-2">Key Features</h3>
          <ul className="text-gray-700 text-sm space-y-2">
            {product.features.split("/n").map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                {feature.trim()}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-b border-gray-200 py-4">
        <div className="flex items-center gap-3 mb-2">
          <p className="lg:text-3xl text-lg font-medium text-gray-900">
            ₹{product.price?.toLocaleString()} /-
          </p>
          {hasDiscount && (
            <>
              <p className="text-lg text-gray-500 line-through">
                ₹{product.originalPrice?.toLocaleString()}
              </p>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
                {discountPercentage}% OFF
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700 flex items-center">
        <span className="font-semibold">Free delivery</span>
        <span className="mx-2">•</span>
        <span>Est. delivery by Saturday, 06 Sep 2025</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={handleCart}
          className={`flex-1 flex items-center justify-center border gap-2 py-3 px-4 rounded-lg text-sm sm:text-base transition-colors ${
            isPresentInCart
              ? "bg-green-600 text-white border-green-600"
              : "border-gray-400 hover:border-gray-400 bg-white text-gray-800"
          }`}
        >
          <FaShoppingCart className="text-sm sm:text-base" />
          {isPresentInCart ? "Added to Cart" : `Add to Cart ₹${product.price}`}
        </button>

        <button
          onClick={handleBuy}
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
        >
          <FaBolt className="text-sm sm:text-base" />
          Buy Now
        </button>
      </div>
    </div>
  );
}
