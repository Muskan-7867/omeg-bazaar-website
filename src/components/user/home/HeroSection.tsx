"use client";
import { googleplay, hero, mobile1 } from "@/constants/imagePath";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="relative w-full bg-white mt-22 hidden lg:block overflow-hidden group"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden ">
        <motion.div
          whileHover={{ x: -20, y: -10, scale: 1.1 }} 
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative h-full w-full"
        > 
          <Image
            src={hero}
            alt="Shopping Background"
            height={500}
            priority
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col lg:flex-row gap-12">
        {/* Left - Mobile Preview */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="p-4 flex flex-col items-center">
            <Image
              src={mobile1}
              alt="Corn on the cob"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Right - Text Section */}
        <div className="w-full lg:w-1/2 lg:text-left">
          <h4 className="text-sm lg:text-base font-semibold text-white">
            Save Time & Money
          </h4>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug mt-2">
            Shop With Us <br /> on the Go
          </h1>
          <p className="text-gray-200 mt-4 text-base sm:text-lg lg:text-xl">
            Your weekly shopping routine, at your door in just a click
          </p>

          {/* Play Store Buttons */}
          <div className="flex gap-4 justify-center lg:justify-start mt-6">
            <Image src={googleplay} alt="Google Play" width={150} height={50} />
          </div>
        </div>
      </div>
    </section>
  );
}
