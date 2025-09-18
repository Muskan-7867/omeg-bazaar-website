"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {  offergif } from "@/constants/imagePath";

const HeroImageWithOffers = () => {
 

  return (
    <div className="relative w-full flex items-center justify-center bg-[fcfcff] min-h-[400px] overflow-hidden">
      <motion.div
       
        className="absolute bottom-0 w-52 sm:w-72 md:w-96 lg:w-[24rem]"
      >
        <Image
          src={offergif}
          alt="Shopping Girl GIF"
          className="object-contain  w-full h-auto"
        />
      </motion.div>
    </div>
  );
};

export default HeroImageWithOffers;
