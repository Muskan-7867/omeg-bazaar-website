"use client";

import { AboutMissionLottie } from "./AboutMissionLottie";

export const AboutMission = () => {
  return (
    <div className="max-w-[98rem] mx-auto mb-12 md:mb-24 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#131921] mb-4 border-l-4 border-[#FF9900] pl-4">
            Our Mission
          </h2>
          <p className="text-[#555] text-base leading-relaxed mb-4">
            Welcome to{" "}
            <strong className="text-[#131921]">omegbazaar.com</strong> – your
            ultimate destination for discovering unique and trending products!
            At omegbazaar.com we&apos;re passionate about curating a collection
            of one-of-a-kind items you won&apos;t find anywhere else.
          </p>

          <p className="text-[#555] text-base leading-relaxed mb-4">
            Every item in our marketplace is carefully vetted to ensure it meets
            our high standards of uniqueness and functionality. We believe
            shopping should feel like an adventure, not a chore.
          </p>

          <p className="text-[#555] text-base leading-relaxed">
            Join us on this journey and discover a world where shopping is
            enjoyable, reliable, and full of delightful surprises. With{" "}
            <strong className="text-[#131921]">omegbazaar.com</strong>,
            you&apos;re not just buying products – you&apos;re exploring
            possibilities.
          </p>
          <p className="text-[#555] text-base leading-relaxed mb-4">
            At <strong className="text-[#131921]">omegbazaar.com</strong>, we
            embrace innovation and constantly explore new ways to enhance your
            experience – from seamless browsing to quick checkout and timely
            updates on trending products.
          </p>
          <p className="text-[#555] text-base leading-relaxed mb-4">
            Our vision goes beyond just selling products – we strive to build a
            community of curious, passionate shoppers who value quality,
            creativity, and inspiration.
          </p>
          <p className="text-[#555] text-base leading-relaxed mb-4">
            Our goal is to offer a shopping experience that blends convenience,
            affordability, and the excitement of finding something truly
            special.
          </p>
          <ul className="text-[#555] text-base leading-relaxed space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#FF9900] mr-2">•</span>
              <span>Unique, curated product collections</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#FF9900] mr-2">•</span>
              <span>Competitive pricing – no hidden costs</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#FF9900] mr-2">•</span>
              <span>Fast, reliable delivery across regions</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#FF9900] mr-2">•</span>
              <span>Friendly, responsive customer support</span>
            </li>
          </ul>
          <p className="text-[#555] text-base leading-relaxed mb-4">
            Whether you&apos;re hunting for the perfect gift or simply treating
            yourself, <strong className="text-[#131921]">omegbazaar.com</strong>{" "}
            makes it effortless and fun.
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-8 rounded-lg">
          <AboutMissionLottie />
        </div>
      </div>
    </div>
  );
};
