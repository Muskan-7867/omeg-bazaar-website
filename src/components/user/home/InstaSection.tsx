
import React from "react";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

type VideoPost = {
  videoSrc: string;
};

const InstaSection = () => {
  const videosLeft: VideoPost[] = [
    { videoSrc: "https://res.cloudinary.com/dnjziya9k/video/upload/v1762149947/omeg_oy6hnl.mp4" },
    { videoSrc: "https://res.cloudinary.com/dnjziya9k/video/upload/v1762150024/lipstick_aan3if.mp4" },
  ];

  const videosRight: VideoPost[] = [
    { videoSrc: "https://res.cloudinary.com/dnjziya9k/video/upload/v1762150117/rgrgr_q8idwb.mp4" },
    { videoSrc: "https://res.cloudinary.com/dnjziya9k/video/upload/v1762150025/omeg1_q67jfu.mp4" },
  ];

  const allVideos = [...videosLeft, ...videosRight];

 const renderVideo = (post: VideoPost, id: string) => (
  <Link
    key={id}
    href="https://www.instagram.com/omegbazaar?igsh=MWdhNjc4djJ3aDdxYg=="
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-full aspect-[3/4] overflow-hidden  block"
  >
    <video
      src={post.videoSrc}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover cursor-pointer"
    />
  </Link>
);


  return (
    <div className="py-14 px-4 md:px-8  md:min-h-0 md:h-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-3xl font-light uppercase mb-4">
          VISIT OUR INSTAGRAM DIARIES
        </h2>
        <p className="text-md md:text-xl">
          Follow To Know More{" "}
          <Link
            href="https://www.instagram.com/omegbazaar?igsh=MWdhNjc4djJ3aDdxYg=="
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @omegbazaar
          </Link>
        </p>
      </div>

      {/* Responsive grid: 2 columns on mobile, horizontal scroll on md+ */}
      <div className="grid grid-cols-2 gap-4 md:flex md:flex-nowrap md:overflow-x-auto md:gap-2 max-w-full mx-auto lg:px-18">
        {allVideos.map((v, i) => renderVideo(v, `video-${i}`))}
      </div>

      {/* Mobile call to action */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href="https://www.instagram.com/omegbazaar?igsh=MWdhNjc4djJ3aDdxYg=="
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors"
        >
          <FaInstagram className="text-xl" />
          Follow Us on Instagram
        </Link>
      </div>
    </div>
  );
};

export default InstaSection;
