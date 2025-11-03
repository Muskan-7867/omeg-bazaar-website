"use client";
import React from "react";
import Banner from "./Banner";
import {  mobileban, mobileban2 } from "@/constants/imagePath";
import { useRouter } from "next/navigation";


export default function HomeBanner() {
  const router = useRouter();
  const desktopImages = [
    { src: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149834/banner1_g3w3x3.jpg", alt: "Desktop Banner 1" },
    { src: "https://res.cloudinary.com/dnjziya9k/image/upload/v1762149834/banner2_emhyee.jpg", alt: "Desktop Banner 2" },
  ];

  const mobileImages = [
    { src: mobileban2, alt: "Mobile Banner 1" },
    { src: mobileban, alt: "Mobile Banner 2" },
  ];

  return (
    <div>
      <Banner desktopImages={desktopImages} mobileImages={mobileImages} onButtonClick={() => router.push("/products")} />
    </div>
  );
}
