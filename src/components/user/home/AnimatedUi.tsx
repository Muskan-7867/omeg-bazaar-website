import { useSpring, useTransform, MotionValue , motion} from "framer-motion";
import { useEffect, useState } from "react";

import { Bag, Bottle, cover,  perfume, phone,  shoe, toy } from "@/constants/imagePath";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";

interface AnimatedUiProps {
  x1: MotionValue<number>;
  y1: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const AnimatedUi = ({ x1, y1 }: AnimatedUiProps) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(windowWidth < 768);
  }, [windowWidth]);

  // Spring transforms for horizontal movement
  const springedBag = useSpring(useTransform(x1, [0, windowWidth], [16, -16]));
  const springedPerfume = useSpring(useTransform(x1, [0, windowWidth], [20, -20]));
  const springedCover = useSpring(useTransform(x1, [0, windowWidth], [40, -40]));
  const springedWatch = useSpring(useTransform(x1, [0, windowWidth], [25, -25]));
  const springedShoes = useSpring(useTransform(x1, [0, windowWidth], [30, -30]));

  // Spring transforms for vertical movement
  const springedy1 = useSpring(useTransform(y1, [0, windowHeight], [20, -20]));
  const springedy2 = useSpring(useTransform(y1, [0, windowHeight], [10, -10]));
  const springedy3 = useSpring(useTransform(y1, [0, windowHeight], [15, -15]));
  const springedy4 = useSpring(useTransform(y1, [0, windowHeight], [25, -25]));
  
  const rotate = useSpring(useTransform(x1, [0, windowWidth], [0, 20]));
  const rotateReverse = useSpring(useTransform(x1, [0, windowWidth], [20, 0]));

  // Responsive size classes
  const mediumImageClass = "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28";
  const largeImageClass = "w-20 h-20 sm:w-28 sm:h-28 md:w-34 md:h-34";

  return (
    <div className="absolute inset-0 w-full h-full z-10">
      {!isMobile && (
        <>
          {/* TOP HALF - 5 PRODUCTS */}
          {/* Top Left - 2 products */}
          <motion.div
            className={`${mediumImageClass} absolute top-10 left-5 blur-[2px]`}
            style={{ x: springedBag, y: springedy1, rotate: rotate }}
          >
            <Image
              src={Bag}
              alt="Fashion bag product"
              className="object-cover w-full h-full"
              width={112}
              height={112}
            />
          </motion.div>

          <motion.div
            className={`${largeImageClass} absolute top-16 left-[18%] blur-[1px]`}
            style={{ x: springedPerfume, y: springedy2 }}
          >
            <Image
              src={perfume}
              alt="Luxury perfume"
              className="object-cover w-full h-full"
              width={136}
              height={136}
            />
          </motion.div>

          {/* Top Right - 2 products */}
          <motion.div
            className={`${mediumImageClass} absolute top-8 right-[20%] blur-[1px] opacity-70`}
            style={{ x: springedWatch, y: springedy3, rotate: rotateReverse }}
          >
            <Image
              src={shoe}
              alt="Shoe product"
              className="object-cover w-full h-full"
              width={112}
              height={112}
            />
          </motion.div>

          <motion.div
            className={`${largeImageClass} absolute top-24 right-[5%] blur-[1px] opacity-50`}
            style={{ x: springedCover, y: springedy3 }}
          >
            <Image
              src={phone}
              alt="Smartphone"
              className="object-cover w-full h-full"
              width={136}
              height={136}
            />
          </motion.div>

          {/* Top Center - 1 product */}
          <motion.div
            className={`${mediumImageClass} absolute top-10 left-1/2 transform -translate-x-1/2 blur-[1px] opacity-80`}
            style={{ x: springedWatch, y: springedy4, rotate: rotateReverse }}
          >
            <Image
              src={toy}
              alt="Juicer jar"
              className="object-cover w-full h-full"
              width={112}
              height={112}
            />
          </motion.div>

  
          {/* Bottom Left - 2 products */}
          <motion.div
            className={`${largeImageClass} absolute bottom-32    blur-[2px]`}
            style={{ x: springedPerfume, y: springedy2 }}
          >
            <Image
              src={Bottle}
              alt="Premium bottle"
              className="object-cover w-full h-full"
              width={136}
              height={136}
            />
          </motion.div>

          <motion.div
            className={`${mediumImageClass} absolute bottom-16 left-[20%] blur-[2px]`}
            style={{ x: springedCover, y: springedy2 }}
          >
            <Image
              src={cover}
              alt="Product cover"
              className="object-cover w-full h-full"
              width={112}
              height={112}
            />
          </motion.div>

          {/* Bottom Right - 2 products */}
          <motion.div
            className={`${mediumImageClass} absolute bottom-24 right-[10%] blur-[2px]`}
            style={{ x: springedBag, rotate: rotate, y: springedy2 }}
          >
            <Image
              src={Bag}
              alt="Fashion bag product"
              className="object-cover w-full h-full"
              width={112}
              height={112}
            />
          </motion.div>

          <motion.div
            className={`${mediumImageClass} absolute bottom-20 right-[30%] blur-[1px] opacity-90`}
            style={{ x: springedShoes, y: springedy4 }}
          >
            <Image
              src={phone}
              alt="Mobile phone"
              className="object-cover w-full h-full"
              width={112}
              height={112}
            />
          </motion.div>

          {/* Bottom Center - 1 product */}
          <motion.div
            className={`${largeImageClass} absolute bottom-40 left-1/2 transform -translate-x-1/2 blur-[1px] `}
            style={{ x: springedPerfume, y: springedy1 }}
          >
            <Image
              src={perfume}
              alt="Luxury perfume"
              className="object-cover w-full h-full"
              width={136}
              height={136}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AnimatedUi;