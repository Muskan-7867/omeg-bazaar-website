"use client";
import React from "react";
import Banner from "./Banner";
import {  mobileban, mobileban2 } from "@/constants/imagePath";
import { useRouter } from "next/navigation";


export default function HomeBanner() {
  const router = useRouter();
  const desktopImages = [
    { src: "https://res.cloudinary.com/dwgxfctju/image/upload/v1758620124/banner1_t6qs3e.jpg", alt: "Desktop Banner 1" },
    { src: "https://res.cloudinary.com/dwgxfctju/image/upload/v1758620124/banner2_jgadis.jpg", alt: "Desktop Banner 2" },
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
