"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  buttonText?: string;
  className?: string;
  discountPercentage?: number;
  discountCode?: string;
};

const HeroTextSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText = "Shop Now",
  className = ""
}) => {
  const [showDiscount, setShowDiscount] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDiscount(true), 1500);
    const hideTimer = setTimeout(() => setShowDiscount(false), 6500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`relative w-full bg-gradient-to-r from-[#131921] to-[#232F3E] py-8 sm:py-12 px-3 sm:px-6 lg:px-12 mb-8 overflow-hidden ${className}`}
    >
      {/* Discount Popup */}
      <AnimatePresence>
        {showDiscount && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-500 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-full shadow-lg z-10 text-xs sm:text-sm"
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Floating Discount Tags */}
      <motion.div
        className="absolute top-1/4 left-3 sm:left-10 bg-yellow-400 text-gray-900 font-bold text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded rotate-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        SALE!
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-3 sm:right-8 bg-red-500 text-white font-bold text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded -rotate-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        LIMITED TIME!
      </motion.div>

      {/* Center Content */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-2">
        {/* Main Title with Infinite Slide */}
        <div className="w-full overflow-hidden relative mb-3 sm:mb-4">
          <motion.h1
            className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-light text-white whitespace-nowrap"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 15,
              ease: "linear"
            }}
          >
            {title} 🎉 {title} 🎉 {title} 🎉
          </motion.h1>
        </div>

        {/* Subtitle */}
        <p className="w-full max-w-xl text-sm sm:text-base md:text-lg text-white mb-4 sm:mb-6 px-2">
          {subtitle}
        </p>

        {/* Animated Button */}
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-yellow-400 to-orange-500"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <motion.div
        className="absolute top-0 right-0 w-10 sm:w-16 h-10 sm:h-16 bg-yellow-400 rounded-full -mt-6 sm:-mt-8 -mr-6 sm:-mr-8 opacity-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[18rem] sm:top-[22rem] left-3 sm:left-6 w-10 sm:w-16 h-10 sm:h-16 bg-yellow-400 rounded-full opacity-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </div>
  );
};

export default HeroTextSection;
