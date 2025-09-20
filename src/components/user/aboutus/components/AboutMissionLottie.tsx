
"use client";

import Lottie from "lottie-react";
import animationData from "../../../../../public/animations/Business team.json";

export const AboutMissionLottie = () => {
  return (
    <div className="aspect-video flex items-center justify-center w-full h-full">
      <Lottie animationData={animationData} loop autoplay className="w-full h-full" />
    </div>
  );
};
