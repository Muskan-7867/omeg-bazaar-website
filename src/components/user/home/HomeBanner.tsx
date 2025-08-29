import React from "react";
import Banner from "./Banner";
import { banner1, banner2 } from "@/constants/imagePath";



export default function HomeBanner() {
  const bannerImage = [
    {
      src: banner1,
      alt: "banner"
    },

    {
      src: banner2,
      alt: "banner"
    }
  ];

  return (
    <div>
      <Banner image={bannerImage} />
    </div>
  );
}
