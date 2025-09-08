"use client";
import ProductCard from "@/components/common/ProductCard";
import { getProductsByCategory } from "@/lib/services/api/fetchers";
import { Product } from "@/lib/types/Product";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Electronics() {
      const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProductsByCategory("electronics"); // 👈 change category if needed
        setProducts(data);
      } catch (err) {
        console.error("Error fetching featured products", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // adjust how much it scrolls
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };
  return (
    <section className="p-6 bg-white">
      {/* Header with title and View All button */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-xl sm:text-2xl font-bold text-gray-800 
                     hover:text-primary text-left"
        >
          Electronics Products
        </h2>

        <div className="flex justify-end flex-1">
          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
            <span className="text-sm font-medium">View All</span>
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaArrowLeft />
      </button>

      {/* Horizontal scrolling container */}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
      >
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className=""
          >
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
    </section>
  )
}
