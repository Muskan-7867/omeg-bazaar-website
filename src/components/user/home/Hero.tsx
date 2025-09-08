"use client"
import { useRef } from "react";
import { useMotionValue } from "framer-motion";
import AnimatedUi from "./AnimatedUi";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    x1.set(e.clientX);
    y1.set(e.clientY);
  };

  return (
    <section
      aria-label="Featured Products"
      onMouseMove={handleMove}
      ref={containerRef}
      className="w-full 2xl:h-[48rem] sm:h-[40rem] md:h-[40rem] lg:h-screen relative overflow-hidden bg-white to-primary/40"
    >
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
        {/* SEO-friendly content */}
        <div className="z-10 relative mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
            Shop the latest trends with exclusive deals and fast delivery.
            Thousands of products at your fingertips.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <button className="bg-primary  text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Shop Now
            </button>
            <button className="border border-gray-300 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
              View Deals
            </button>
          </div>
        </div>
      </div>

      {/* Animated product showcase positioned absolutely */}
      <AnimatedUi x1={x1} y1={y1} containerRef={containerRef} />
    </section>
  );
};

export default Hero;