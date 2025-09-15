"use client";
import React from "react";
import Banner from "./Banner";
import { banner1, banner2, mobileban, mobileban2 } from "@/constants/imagePath";


export default function HomeBanner() {
  const desktopImages = [
    { src: banner1, alt: "Desktop Banner 1" },
    { src: banner2, alt: "Desktop Banner 2" },
  ];

  const mobileImages = [
    { src: mobileban2, alt: "Mobile Banner 1" },
    { src: mobileban, alt: "Mobile Banner 2" },
  ];

  return (
    <div>
      <Banner desktopImages={desktopImages} mobileImages={mobileImages} />
    </div>
  );
}
