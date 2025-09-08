"use client";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex justify-center items-center mr-2 text-gray-700 hover:text-primary"
      >
        <IoMenu className="w-6 h-6" />
      </button>
      <MobileMenu isCardVisible={open} setIsCardVisible={setOpen} />
    </>
  );
}
