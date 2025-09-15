"use client";
import { Product } from "@/lib/types/Product";
import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ScrollableProductsProps {
  products: Product[];
}

export default function ScrollableProducts({ products }: ScrollableProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
    }
    return () => {
      if (container) container.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  return (
    <div className="relative">
      {/* Left Button */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
        >
          <FaArrowLeft />
        </button>
      )}

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product.slug}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      {/* Right Button */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}
