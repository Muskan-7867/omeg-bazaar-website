"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";

interface BannerProps {
  desktopImages: { src: string | StaticImageData; alt: string }[];
  mobileImages?: { src: string | StaticImageData; alt: string }[];
  autoPlay?: boolean;
  interval?: number;
  priority?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  badgeText?: string;
}

export default function Banner({
  desktopImages,
  mobileImages,
  autoPlay = true,
  interval = 5000,
  priority = false,
  title = "Discover the New Collection",
  subtitle = "Fresh styles, fresh arrivals – shop the latest trends now.",
  buttonText = "Shop Now",
  onButtonClick = () => {},
  badgeText = "New Arrival",
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const images = isMobile && mobileImages?.length ? mobileImages : desktopImages;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const images = isMobile && mobileImages?.length ? mobileImages : desktopImages;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoPlay || isTransitioning) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex, isTransitioning]);

  const images = isMobile && mobileImages?.length ? mobileImages : desktopImages;
  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-[85vh] min-h-[400px] max-h-[900px] overflow-hidden group">
      {/* Background slider */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority && index === 0}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:from-black/60 md:via-black/30" />
          </div>
        ))}
      </div>

      {/* Optional badge */}
      {badgeText && (
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-amber-500 text-white px-3 py-1 md:px-5 md:py-2 font-semibold text-xs md:text-sm rounded-full shadow-lg z-10">
          {badgeText}
        </div>
      )}

      {/* Text + CTA */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-xl lg:max-w-3xl text-white text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-light mb-2 md:mb-4 leading-snug drop-shadow-lg">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8">
              {subtitle}
            </p>
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="bg-gray-800 text-white font-medium cursor-pointer py-2 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-amber-500 scale-110 sm:scale-125"
                  : "bg-white/70 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
