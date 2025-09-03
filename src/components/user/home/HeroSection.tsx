"use client";

import { googleplay, hero, mobile1 } from "@/constants/imagePath";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

export default function HeroSection() {
  return (
    <motion.section
      className="relative w-full bg-white mt-8 hidden lg:block overflow-hidden"
      whileHover="hover"
    >
      {/* Background wrapper */}
      <div className="absolute inset-0 overflow-hidden">
       
        <motion.div
          variants={{
            hover: { scale: 1.05, x: 20 }
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <Image
            src={hero}
            alt="Shopping Background"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Optional overlay */}
        <div className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col lg:flex-row gap-12">
        {/* Left - Mobile Preview */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-[280px] sm:w-[320px] rounded-3xl overflow-hidden">
            <div className="p-4 flex flex-col items-center">
              <Image
                src={mobile1}
                alt="Mobile Preview"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right - Text Section */}
        <div className="w-full lg:w-1/2 lg:text-left">
          <h4 className="text-sm font-semibold text-white">
            Save Time & Money
          </h4>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-snug mt-2">
            Shop With Us <br /> on the Go
          </h1>
          <p className="text-gray-200 mt-4 text-lg">
            Your weekly shopping routine, at your door in just a click
          </p>

          {/* Play Store Button */}
          <div className="flex gap-4 justify-center lg:justify-start mt-6">
            <Image src={googleplay} alt="Google Play" width={150} height={50} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
