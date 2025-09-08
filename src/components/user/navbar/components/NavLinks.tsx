"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // ✅ use framer-motion in Next.js

const NavLinks = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname(); // ✅ gives current route in Next.js

  return (
    <div className="w-[30rem] gap-4 mx-auto rounded-full lg:flex bg-white shadow-lg hover:shadow-2xl px-6 justify-center items-center h-12 hidden absolute top-2 left-0 right-0 bottom-0">
      {navLinks.map((link, index) => {
        const isActive = pathname === link.path;
        return (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="relative"
          >
            <Link
              href={link.path}
              className={`relative z-10 px-3 py-2 text-md transition-colors duration-200 ${
                isActive
                  ? "text-primary border-b-2 border-primary hover:text-white"
                  : "text-primary hover:text-white"
              }`}
            >
              {link.name}
            </Link>
            {hovered === index && (
              <motion.div
                layoutId="hover"
                className="absolute inset-0 bg-primary rounded-full z-0 w-full h-full px-4 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
