"use client";
import { Product } from "../../types/Product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  console.log(imgIndex);

  const isOnSale =
    product.originalPrice && product.originalPrice > product.price;

  const discountPercentage =
    isOnSale && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  // ✅ Fix: check if product has videos properly
  const hasVideo = Array.isArray(product.videos) && product.videos.length > 0;

  // Image hover swap (if no video)
  const images = product.images || [];
  const displayImage =
    !hasVideo && images.length > 1 && isHovering
      ? images[1]?.url
      : images[0]?.url;

  return (
    <article
      className="w-80 bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Product Media */}
      <Link
        href={`/products/${product._id}`}
        className="relative w-full aspect-square flex items-center justify-center bg-white overflow-hidden"
        onMouseEnter={() => {
          setIsHovering(true);
          if (!hasVideo && images.length > 1) {
            setImgIndex(1);
          }
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setImgIndex(0);
        }}
      >
        {hasVideo && isHovering ? (
          <video
            src={product.videos?.[0]?.url}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={displayImage || "https://via.placeholder.com/300"}
            alt={product.name}
            fill
            className={`object-contain p-4 transition-transform duration-300 ${
              isHovering ? "scale-110" : "scale-100"
            }`}
            sizes="240px"
          />
        )}
      </Link>

      {/* Info */}
      <div className="mt-2 flex flex-col flex-1">
        {/* Name */}
        <h3
          className="text-sm font-medium line-clamp-1  hover:text-primary"
          itemProp="name"
        >
          {product.name}
        </h3>

        {/* Rating (optional) */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          ⭐⭐⭐⭐☆ <span>({product.ratingCount || 100})</span>
        </div>

        {/* Price */}
        <div className="mt-1">
          {isOnSale ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-black">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice?.toLocaleString()}
              </span>
              <span className="text-xs text-red-600 font-medium">
                {discountPercentage}% off
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-black">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Delivery */}
        <p className="text-xs text-gray-600 mt-1">
          {product.deliveryCharges === 0 ? (
            <span className="text-green-600">Free Delivery</span>
          ) : (
            <>Delivery ₹{product.deliveryCharges}</>
          )}
        </p>

        {/* Stock */}
        <p className="text-xs mt-1">
          {product.inStock ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        {/* Add to Cart */}
        <button className="mt-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded px-3 py-2">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
