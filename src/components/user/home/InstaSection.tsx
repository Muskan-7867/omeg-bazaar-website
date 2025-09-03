"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FaInstagram } from "react-icons/fa";
import { All, cosmetic } from "@/constants/imagePath";

type VideoPost = {
  type: "video";
  videoSrc: string;
  thumbnail: string | StaticImageData;
};

type ImagePost = {
  type: "image";
  src: string | StaticImageData;
};

const InstaSection = () => {
  const videosLeft: VideoPost[] = [
    {
      type: "video",
      videoSrc:
        "https://cdn.shopify.com/videos/c/o/v/4915dab224064cd492e7ed98ef925c35.webm",
      thumbnail: cosmetic,
    },
    {
      type: "video",
      videoSrc:
        "https://cdn.shopify.com/videos/c/o/v/4915dab224064cd492e7ed98ef925c35.webm",
      thumbnail: All,
    },
  ];

  const videosRight: VideoPost[] = [
    {
      type: "video",
      videoSrc:
        "https://cdn.shopify.com/videos/c/o/v/4915dab224064cd492e7ed98ef925c35.webm",
      thumbnail: cosmetic,
    },
    {
      type: "video",
      videoSrc:
        "https://cdn.shopify.com/videos/c/o/v/4915dab224064cd492e7ed98ef925c35.webm",
      thumbnail: All,
    },
     {
      type: "video",
      videoSrc:
        "https://cdn.shopify.com/videos/c/o/v/4915dab224064cd492e7ed98ef925c35.webm",
      thumbnail: cosmetic,
    },
  ];

  const centerImage: ImagePost = {
    type: "image",
    src: cosmetic,
  };

  const [hoverIndex, setHoverIndex] = useState<string | null>(null);

  const renderVideo = (post: VideoPost, id: string) => (
    <div
      key={id}
      className="relative w-[300px] aspect-square flex-shrink-0 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHoverIndex(id)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {hoverIndex === id ? (
        <video
          src={post.videoSrc}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={post.thumbnail}
          alt="Video thumbnail"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
    </div>
  );

  return (
    <div className="py-4 md:px-8 px-8 min-h-screen md:min-h-0 md:h-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl text-black md:text-3xl font-bold uppercase mb-4">
          VISIT OUR INSTAGRAM DIARIES
        </h2>
        <p className="text-md md:text-xl text-black">
          Follow To Know More{" "}
          <span className="text-primary">@omegbazaar</span>
        </p>
      </div>

      {/* Posts in one horizontal line */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full mx-auto">
        {/* Left videos */}
        {videosLeft.map((v, i) => renderVideo(v, `left-${i}`))}

        {/* Center image */}
        <div className="relative w-[300px] aspect-square flex-shrink-0 overflow-hidden group">
          <Image
            src={centerImage.src}
            alt="Instagram post"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <FaInstagram className="text-white text-4xl drop-shadow-lg" />
          </div>
        </div>

        {/* Right videos */}
        {videosRight.map((v, i) => renderVideo(v, `right-${i}`))}
      </div>

      {/* Mobile call to action */}
      <div className="mt-8 text-center md:hidden">
        <a
          href="https://www.instagram.com/banarsi_lehnga_house.in?igsh=M2RqODB6eG43bGl0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors"
        >
          <FaInstagram className="text-xl" />
          Follow Us on Instagram
        </a>
      </div>
    </div>
  );
};

export default InstaSection;
