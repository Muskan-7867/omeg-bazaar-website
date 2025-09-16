"use client";
import React from "react";
import Banner from "./Banner";
import {  mobileban, mobileban2 } from "@/constants/imagePath";
import { useRouter } from "next/navigation";


export default function HomeBanner() {
  const router = useRouter();
  const desktopImages = [
    { src: "https://res.cloudinary.com/debzdd4wk/image/upload/v1758022712/banner1_zdvaqx.jpg", alt: "Desktop Banner 1" },
    { src: "https://res.cloudinary.com/debzdd4wk/image/upload/v1758022715/banner2_tdkv8o.jpg", alt: "Desktop Banner 2" },
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
