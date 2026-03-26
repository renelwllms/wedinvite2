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
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
