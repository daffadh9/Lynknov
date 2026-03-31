'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a78bfa] via-[#c4b5fd] to-white origin-left z-[100] shadow-[0_0_10px_rgba(167,139,250,0.5)]"
      style={{ scaleX }}
    />
  );
}
