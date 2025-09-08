"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { Product } from "@/lib/types/Product";

interface Props {
  product: Product;
}

export default function SingleProductPage({ product }: Props) {
  const [selectedImg, setSelectedImg] = useState(
    product.images?.[0]?.url || ""
  );
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));
    setCursorPosition({ x: boundedX, y: boundedY });
    if (zoomRef.current) {
      zoomRef.current.style.backgroundPosition = `${boundedX}% ${boundedY}%`;
    }
  };

  return (
    <div className="w-full bg-white p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Image Section */}
          <div className="lg:col-span-7 flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-20">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(img.url)}
                  className={`overflow-hidden border-2 h-26 ${
                    selectedImg === img.url ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${i}`}
                    width={80}
                    height={40}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom */}
            <div
              className="flex-1 flex items-center justify-center relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="w-full h-[40rem] relative overflow-hidden">
                <Image
                  ref={imgRef}
                  src={selectedImg}
                  alt={product.name}
                  width={700}
                  height={400}
                  className="object-contain cursor-zoom-in"
                />
                {isHovering && (
                  <div
                    className="absolute inset-0 bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url(${selectedImg})`,
                      backgroundSize: `${
                        imgRef.current
                          ? imgRef.current.offsetWidth * 1.5
                          : 700 * 1.5
                      }px ${
                        imgRef.current
                          ? imgRef.current.offsetHeight * 1.5
                          : 400 * 1.5
                      }px`,
                      backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`
                    }}
                    ref={zoomRef}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 space-y-6 p-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h1>
            {product.description && (
              <p className="text-gray-600 text-base">{product.description}</p>
            )}
            {product.features && (
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {product.features.split("/n").map((feature, idx) => (
                  <li key={idx}>{feature.trim()}</li>
                ))}
              </ul>
            )}

            <div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            <div className="border p-3 rounded-lg bg-gray-50 text-sm text-gray-700">
              Est. Delivery by{" "}
              <span className="font-semibold">Saturday, 06 Sep 2025</span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-800 py-3 rounded-lg text-gray-800 hover:bg-gray-100">
                <FaShoppingCart /> Add to Cart ₹{product.price}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
                <FaBolt /> Buy It Now
              </button>
            </div>

            <div className="text-sm text-gray-500 space-y-2 pt-4 border-t mt-8">
              <p>✅ 100% Purchase Protection</p>
              <p>🔄 5 Days Easy Returns*</p>
              <p>🚚 Free Shipping*</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
