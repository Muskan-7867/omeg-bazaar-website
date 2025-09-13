"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ProductImagesProps {
  images: { url: string; type?: "image" | "video" }[];
  productName: string;
}

export default function ProductImages({
  images,
  productName,
}: ProductImagesProps) {
  const placeholderImg = "/images/placeholder.png";
  const [selectedImg, setSelectedImg] = useState<string>(
    images?.[0]?.url || placeholderImg
  );
  const [selectedType, setSelectedType] = useState<"image" | "video">(
    images?.[0]?.type || "image"
  );
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current || !isHovering) return;
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

  // Mobile tap-to-zoom toggle
  const toggleZoom = () => {
    if (isMobileView && selectedType === "image") {
      setIsZoomed(!isZoomed);
    }
  };

  return (
    <div className="lg:col-span-7 flex flex-col lg:flex-row gap-4 mt-0 bg-white">
      {/* Desktop Thumbnails */}
      <div className="hidden lg:flex lg:flex-col gap-3 lg:w-20">
        {images?.length ? (
          images.map((media, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedImg(media.url);
                setSelectedType(media.type || "image");
                setIsZoomed(false);
              }}
              className={`overflow-hidden rounded-md border-2 w-20 h-20 transition-all ${
                selectedImg === media.url
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {media.type === "video" ? (
                <video
                  src={media.url}
                  className="object-cover w-full h-full"
                  muted
                />
              ) : (
                <Image
                  src={media.url || placeholderImg}
                  alt={`Thumbnail ${i}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              )}
            </button>
          ))
        ) : (
          <div className="text-gray-400 text-sm">No Media</div>
        )}
      </div>

      {/* Main Media */}
      <div
        className="flex-1 flex flex-col items-center"
        onMouseEnter={() => !isMobileView && selectedType === "image" && setIsHovering(true)}
        onMouseLeave={() => !isMobileView && setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={toggleZoom}
      >
        <div
          className={`w-full h-64 sm:h-80 md:h-96 lg:h-[40rem] relative overflow-hidden rounded-lg border border-gray-200 ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        >
          {selectedType === "video" ? (
            <video
              src={selectedImg}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <Image
              ref={imgRef}
              src={selectedImg}
              alt={productName || "Product Image"}
              fill
              style={{ objectFit: "contain" }}
              className={isZoomed ? "scale-150 transition-transform duration-300" : ""}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40rem"
            />
          )}

          {/* Desktop Zoom overlay */}
          {isHovering && selectedType === "image" && !isMobileView && (
            <div
              className="absolute inset-0 bg-no-repeat bg-cover hidden lg:block"
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
                backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
              }}
              ref={zoomRef}
            />
          )}
        </div>

        {/* Mobile thumbnails below main image */}
        <div className="flex lg:hidden gap-3 overflow-x-auto py-3 mt-3 w-full justify-center">
          {images?.length ? (
            images.map((media, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedImg(media.url);
                  setSelectedType(media.type || "image");
                  setIsZoomed(false);
                }}
                className={`flex-shrink-0 overflow-hidden rounded-md border-2 w-20 h-20 transition-all ${
                  selectedImg === media.url
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {media.type === "video" ? (
                  <video
                    src={media.url}
                    className="object-cover w-full h-full"
                    muted
                  />
                ) : (
                  <Image
                    src={media.url || placeholderImg}
                    alt={`Thumbnail ${i}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                )}
              </button>
            ))
          ) : (
            <div className="text-gray-400 text-sm">No Media</div>
          )}
        </div>
      </div>
    </div>
  );
}
