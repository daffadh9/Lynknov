"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  title: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function AnimatedTitle({ title, className = "", as: Tag = "h2" }: AnimatedTitleProps) {
  // Split the word to enable sophisticated staggered animations
  const words = title.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
      scale: 0.95,
    },
  };

  const MotionTag = motion[Tag as keyof typeof motion] as any;

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      className={`font-serif tracking-tight text-white mb-6 leading-[1.05] ${className}`}
    >
      {title.split(/(\n)/).map((segment, index) => {
        if (segment === "\n") return <br key={index} />;
        return segment.split(" ").map((word, wIndex) => (
          <motion.span
            variants={child}
            key={`${index}-${wIndex}`}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ));
      })}
    </MotionTag>
  );
}
