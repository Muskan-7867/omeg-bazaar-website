"use client";

import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isOnSale =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  return (
    <article
      className="relative group flex flex-col"
      itemScope
      itemType="https://schema.org/Product"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sale Badge */}
      {isOnSale && (
        <span className="absolute top-2 left-2 bg-white text-xs font-medium text-red-600 px-3 py-1 rounded-full shadow z-10">
          Sale!
        </span>
      )}

      {/* Image / Video */}
      <Link
        href={`/product/${product._id}`}
        className="relative w-full aspect-[3/4] overflow-hidden bg-white "
      >
        {!isHovered ? (
          <Image
            src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <video
            src={product.videoUrl || ""}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </Link>

      {/* Product Info */}
      <div className="mt-4">
        <h3
          className="text-lg font-serif tracking-wide group-hover:text-primary transition-colors line-clamp-2"
          itemProp="name"
        >
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 fill-current ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center">
          {isOnSale ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-sm">
                ₹{product.originalPrice?.toLocaleString()}
              </span>
              <span className="text-black font-semibold text-lg">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-red-600 text-sm font-medium ml-1">
                {Math.round(
                  ((product?.originalPrice - product.price) /
                    product?.originalPrice) *
                    100
                )}
                % off
              </span>
            </div>
          ) : (
            <span className="text-black font-semibold text-lg">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Delivery Info */}
        <div className="mt-2 text-sm text-gray-600">
          {product.deliveryCharges === 0 ? (
            <span className="text-green-600">Free Delivery</span>
          ) : (
            <span>Delivery: ₹{product.deliveryCharges}</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-1 text-sm">
          {product.inStock ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </div>
      </div>
    </article>
  );
}
