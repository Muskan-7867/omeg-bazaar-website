"use client";
import { Product } from "@/lib/types/Product";
import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ScrollableProductsProps {
  products: Product[];
}

export default function ScrollableProducts({ products }: ScrollableProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaArrowLeft />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
      >
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product.slug}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
