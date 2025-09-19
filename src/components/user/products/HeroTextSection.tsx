"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { offergif } from "@/constants/imagePath";

const HeroImageWithOffers = () => {
  return (
    <div className="relative w-full flex items-center justify-center bg-[#fcfcff] h-[8rem] sm:h-[10rem] md:h-[11rem] lg:h-[10rem] overflow-hidden">
      
      <motion.div
        className="w-[30%] sm:w-[20%] md:w-[16%] lg:w-[8%]"
        style={{ zIndex: 10 }}
      >
        <Image
          src={offergif}
          alt="Shopping Girl GIF"
          className="object-contain w-full h-auto"
          priority
        />
      </motion.div>

    </div>
  );
};

export default HeroImageWithOffers;
