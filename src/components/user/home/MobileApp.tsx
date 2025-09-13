"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import rippleAnimation from "../../../../public/animations/rippleAnimation.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

const MobileApp: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div className="relative h-full w-full flex justify-center items-center overflow-hidden">
      {/* Ripple Animation Layers */}
      <motion.div
        ref={ref}
        className="absolute -z-20 w-[26rem] aspect-square"
        animate={{ scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.8 }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={rippleAnimation}
          loop
          autoplay
          style={{ height: "100%", width: "100%" }}
        />
      </motion.div>

      <motion.div
        className="absolute -z-20 w-[22rem] aspect-square"
        animate={{ scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Lottie
          animationData={rippleAnimation}
          loop
          autoplay
          style={{ height: "100%", width: "100%" }}
        />
      </motion.div>

      <motion.div
        className="absolute -z-20 w-[18rem] aspect-square"
        animate={{ scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Lottie
          animationData={rippleAnimation}
          loop
          autoplay
          style={{ height: "100%", width: "100%" }}
        />
      </motion.div>

      {/* Phone Image */}
      <Image
        src="/assets/Mobile.png"
        alt="Phone"
        height={544}
        width={272}
        className="h-[34rem] w-auto"
        priority
      />
    </div>
  );
};

export default MobileApp;
