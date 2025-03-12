'use client';

import { aboutImgVariants, slideFrom } from '@/animations';

import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Button, Section, Suptitle, Text, Title } from '../ui';

export function AboutSection() {
  return (
    <Section primary={true}>
      <div className="block items-start md:flex">
        <motion.ul
          variants={aboutImgVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="flex sm:justify-evenly sm:last:mr-0"
        >
          <motion.li
            variants={slideFrom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={{ y: 60, delay: 0.2 }}
            className="mr-8 relative group overflow-hidden"
          >
            <Image
              src="/images/about-me-one.jpg"
              alt="about-me-one"
              width={270}
              height={270}
              className="group-hover:scale-110 transition-transform duration-300 md:w-80 lg:w-[270px] xl:w-80"
            />

            <div className="absolute top-0 left-0 bg-backdrop w-full h-full transition-transform duration-300 delay-75 translate-y-full group-hover:translate-y-0 text-mainLightColor flex items-end ">
              <div>
                <p className="p-5 text-xs sm:text-sm md:text-base">
                  Let art shape your story — one inked moment at a time.
                </p>
              </div>
            </div>
          </motion.li>
          <motion.li
            variants={slideFrom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={{ y: -60, delay: 0.3 }}
            className="relative md:hidden lg:mr-8 lg:inline-block group overflow-hidden"
          >
            <Image
              src="/images/about-me-two.jpg"
              alt="about-me-two"
              width={270}
              height={270}
              className="group-hover:scale-110 transition-transform duration-300 md:w-80 lg:w-[270px] xl:w-80"
            />

            <div className="absolute top-0 left-0 bg-backdrop w-full h-full transition-transform duration-300 delay-75 -translate-y-full group-hover:translate-y-0 text-mainLightColor flex items-end">
              <div>
                <p className="p-5 text-xs sm:text-sm md:text-base">
                  Your transformation begins here — dare to express yourself.
                </p>
              </div>
            </div>
          </motion.li>
        </motion.ul>
        <motion.div
          variants={slideFrom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={{ x: 150, delay: 0.2 }}
          className="flex flex-1 flex-col text-left"
        >
          <Suptitle primary={true}>About me</Suptitle>
          <Title>Your favorite tattoo artist</Title>
          <Text primary={true} main={true}>
            You have chosen a tattoo artist who goes beyond the ordinary. By
            coming here, you are stepping into a world of transformation and
            artistic magic. I am about energy, change and a new way. On this
            site you can explore my portfolio and schedule the most convenient
            time for our meeting. Welcome! With each step, you are drawing
            closer to embracing a new reality tailored specifically for you.
          </Text>
          <Button>
            <Link href={'/booking'}>Online-Booking</Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
