
"use client";
import { motion, useReducedMotion, MotionProps } from "framer-motion";
import React from "react";

type AnimatedContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  delay?: number;
} & MotionProps;

export default function AnimatedContainer({ delay = 0.1, children, ...props }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
