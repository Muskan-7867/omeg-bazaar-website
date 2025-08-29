"use client";
import { googleplay, hero, mobile1 } from "@/constants/imagePath";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full  bg-white mt-8 hidden lg:block">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={hero}
          alt="Shopping Background"
          height={500}
          
          className="object-cover"
        />
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col lg:flex-row  gap-12">
        {/* Left - Mobile Preview */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-[280px] sm:w-[320px] rounded-3xl  overflow-hidden ">
            <div className="p-4 flex flex-col items-center">
              <Image
                src={mobile1}
                alt="Corn on the cob"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right - Text Section */}
        <div className="w-full lg:w-1/2  lg:text-left">
          <h4 className="text-sm font-semibold text-white">
            Save Time & Money
          </h4>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-snug mt-2">
            Shop With Us <br /> on the Go
          </h1>
          <p className="text-gray-200 mt-4 text-lg">
            Your weekly shopping routine, at your door in just a click
          </p>

          {/* play Store Buttons */}
          <div className="flex gap-4 justify-center  lg:justify-start mt-6 ">
            <Image
              src={googleplay} // replace with app store button image
              alt="Google Play"
              width={150}
              height={50}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
