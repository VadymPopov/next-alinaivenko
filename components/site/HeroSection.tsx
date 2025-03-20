'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

import { ParallaxContent } from './ParallaxContent';

const SECTION_HEIGHT = 2200;

export function HeroSection() {
  const { scrollY, scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0],
  );

  const scale = useTransform(scrollYProgress, [0, 1], [1, 10]);

  return (
    <div
      className="relative w-full overflow-clip"
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
    >
      <motion.div
        className="sticky top-[80px] md:top-[90px] xl:top-[100px] h-screen w-full bg-cardColor"
        style={{
          opacity,
          scale,
        }}
      >
        <motion.img
          src="/images/hero-eye.png"
          alt="Hero Eye"
          className=" absolute top-[50%] left-1/2 -translate-x-1/2 -translate-[50%] img-rotate min-w-[600px] h-auto min-h-[400px] lg:max-h-[800px]"
        />
      </motion.div>
      <ParallaxContent />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-[rgba(0,0,0,0)] to-cardColor" />
    </div>
  );
}
