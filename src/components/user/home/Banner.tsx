"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface BannerProps {
  image: {
    src: string | StaticImageData;
    alt: string;
  }[];
  aspectRatio?: string; // default aspect ratio for desktop
  autoPlay?: boolean;
  interval?: number;
  showNavigation?: boolean;
  priority?: boolean;
}

export default function Banner({
  image,
  // aspectRatio = "16/6", 
  autoPlay = true,
  interval = 3000,
  // showNavigation = true,
  priority = false,
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const goToPrevious = () => {
  //   const isFirstImage = currentIndex === 0;
  //   const newIndex = isFirstImage ? image.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  const goToNext = () => {
    const isLastImage = currentIndex === image.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex]);

  if (image.length === 0) return null;

  return (
    <div
      className={`
        w-full relative overflow-hidden px-2
        aspect-[4/3] sm:aspect-[16/7] md:aspect-[16/6]
      `}
    >
      <Image
        src={image[currentIndex].src}
        alt={image[currentIndex].alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1400px"
      />

      {/* Navigation arrows */}
      {/* {showNavigation && image.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 
              w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
              bg-black/30 hover:bg-black/50 text-white rounded-full transition-all"
            aria-label="Previous image"
          >
            <SlArrowLeft />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 
              w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center
              bg-black/30 hover:bg-black/50 text-white rounded-full transition-all"
            aria-label="Next image"
          >
            <SlArrowRight />
          </button>
        </>
      )} */}

      {/* Indicator dots */}
      {image.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {image.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
