"use client";

import { motion, useReducedMotion } from "framer-motion";

type AnimatedRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function AnimatedReveal({ children, delay = 0, className }: AnimatedRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? undefined
          : { opacity: 0, y: 38, scale: 0.96, filter: "blur(10px)" }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
