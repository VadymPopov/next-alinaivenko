'use client';

import { scaleFrom, slideFrom } from '@/animations';

import React from 'react';

import { motion } from 'framer-motion';

import { Suptitle } from '../ui';

export function HeroSection() {
  return (
    <motion.section
      variants={scaleFrom}
      initial="hidden"
      animate="visible"
      custom={1.3}
      className="hero-section relative overflow-hidden bg-cardColor px-5 py-[190px] h-[calc(100vh-80px)] md:xl:h-[calc(100vh-90px)] xl:h-[calc(100vh-100px)]"
    >
      <div className="relative z-50">
        <motion.div
          variants={slideFrom}
          initial="hidden"
          animate="visible"
          custom={{ y: -150, delay: 0.9 }}
        >
          <Suptitle>Your favorite tattoo artist</Suptitle>
        </motion.div>
        <motion.h1
          variants={slideFrom}
          initial="hidden"
          animate="visible"
          custom={{ x: -150, delay: 0.5 }}
          className="mb-5 font-raleway text-7xl font-extrabold leading-tight tracking-wider text-mainLightColor"
        >
          Ivenko Alina
        </motion.h1>
        <motion.p
          variants={slideFrom}
          initial="hidden"
          animate="visible"
          custom={{ y: 150, delay: 0.9 }}
          className="w-[300px] text-xl font-normal text-textColorDarkBg"
        >
          Embrace the art of transformation. Don&apos;t hesitate, schedule your
          tattoo appointment right now.
        </motion.p>
      </div>
    </motion.section>
  );
}
