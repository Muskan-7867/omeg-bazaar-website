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
  contentText?: string;
}

export default function Banner({
  desktopImages,
  mobileImages,
  autoPlay = true,
  interval = 5000,
  priority = false,
  title = "Shop the Latest Trends",
  subtitle = "Discover premium products at unbeatable prices",
  buttonText = "Shop Now",
  onButtonClick = () => {},
  badgeText = "New Arrival",
  contentText = "From fashion to electronics, explore our exclusive collection crafted to fit your lifestyle. Don’t miss out on special offers and limited-time deals!"
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const images =
      isMobile && mobileImages?.length ? mobileImages : desktopImages;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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

  const images =
    isMobile && mobileImages?.length ? mobileImages : desktopImages;
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
            {/* Animated black gradient overlay */}
            <div className="absolute inset-0 bg-black/30 animate-gradientMove" />
          </div>
        ))}
      </div>

      {/* Text Content with animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full px-6 sm:px-10 lg:px-16 flex justify-center">
          <div className="max-w-2xl text-white text-center space-y-4 animate-fadeUp">
            {/* Badge */}
            {badgeText && (
              <span className="inline-block bg-amber-500 text-black text-xs sm:text-sm font-semibold px-3 py-1 rounded-full animate-fadeIn">
                {badgeText}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium leading-snug drop-shadow-lg animate-slideUp">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-medium text-gray-200 animate-fadeIn delay-200">
              {subtitle}
            </p>

            {/* Additional content text */}
            <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto leading-relaxed animate-fadeIn delay-300">
              {contentText}
            </p>

            {/* Button */}
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="bg-amber-500 text-black font-medium cursor-pointer py-2 px-8 sm:py-3 sm:px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn delay-500"
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
