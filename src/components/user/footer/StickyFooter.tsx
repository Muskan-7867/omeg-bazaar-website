import React from "react";
import { cn } from "@/lib/utills/cn";
import Image from "next/image";
import { footerimg, footerimg2 } from "@/constants/imagePath";
import FooterContent from "./FooterContent";
import Link from "next/link";
import AnimatedContainer from "./AnimatedContainer";

type StickyFooterProps = React.ComponentProps<"footer">;

const StickyFooter = ({ className, ...props }: StickyFooterProps) => {
  return (
    <footer
      className={cn("relative w-full min-h-[48rem] md:h-[40rem]", className)}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      {...props}
    >
      <div className="md:fixed bottom-0 h-auto md:h-[680px] w-full">
        <div className="sticky top-auto md:top-[calc(100vh-720px)] h-full">
          <div className="relative flex size-full flex-col justify-between gap-5 border-t px-4 py-8 md:px-12">
            <div
              aria-hidden
              className="absolute inset-0 isolate z-0 contain-strict"
            >
              <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
              <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
              <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
            </div>

            {/* Main content area */}
            <FooterContent />

            {/* Footer Text + Images Section */}
            <AnimatedContainer
              delay={0.4}
              className="w-full relative flex items-center justify-center mt-8 md:mt-0"
            >
              {/* Left Image - Hidden on mobile */}
              <div className="hidden md:block absolute left-0 h-[450px]">
                <Image
                  src={footerimg}
                  alt="Shopping cart"
                  width={300}
                  height={500}
                  className="object-contain w-full"
                />
              </div>

              {/* Center text */}
              <div className="flex flex-col items-center justify-center gap-2 z-10 px-4 md:px-0">
                <h2 className="text-2xl md:text-7xl font-bold tracking-wide text-center opacity-20 leading-tight">
                  Shop Smart Live Better
                </h2>
                <p className="mt-2 text-center text-xs md:text-sm text-muted-foreground opacity-60 max-w-2xl">
                  Curated products • Trusted delivery • Delightful shopping
                </p>
              </div>

              {/* Right Image - Hidden on mobile */}
              <div className="hidden md:block absolute right-0 h-[450px]">
                <Image
                  src={footerimg2}
                  alt="Delivery package"
                  width={300}
                  height={500}
                  className="object-contain w-full"
                />
              </div>
            </AnimatedContainer>

            {/* Copyright */}
            <div className="relative pt-8 md:pt-2 text-muted-foreground flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
              <p>© 2025 Omeg Bazaar, Inc. All rights reserved.</p>
              <Link
                href="/privacy-policy"
                className="hover:text-black md:ml-2 mt-1 md:mt-0"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StickyFooter;


