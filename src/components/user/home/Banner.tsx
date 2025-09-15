"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";

interface BannerProps {
  desktopImages: { src: string | StaticImageData; alt: string }[];
  mobileImages?: { src: string | StaticImageData; alt: string }[];
  autoPlay?: boolean;
  interval?: number;
  priority?: boolean;
}

export default function Banner({
  desktopImages,
  mobileImages,
  autoPlay = true,
  interval = 3000,
  priority = false
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const goToNext = () => {
    const images =
      isMobile && mobileImages?.length ? mobileImages : desktopImages;
    const isLast = currentIndex === images.length - 1;
    setCurrentIndex(isLast ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  });

  const images =
    isMobile && mobileImages?.length ? mobileImages : desktopImages;

  if (images.length === 0) return null;

  return (
    <div className="w-full relative overflow-hidden px-2 h-[44rem] sm:aspect-[16/8] md:aspect-[16/6]">
      <Image
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        fill
        priority={priority}
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1400px"
      />

      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
