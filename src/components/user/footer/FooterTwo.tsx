"use client";
import React from "react";
import Lenis from 'lenis';

import StickyFooter from "./StickyFooter";

export default function DemoOne() {
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-full">
      <StickyFooter />
    </div>
  );
}
