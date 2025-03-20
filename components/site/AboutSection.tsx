'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Button, Section, Suptitle, Text, Title } from '../ui';

export function AboutSection() {
  return (
    <Section bgColor="bg-cardColor">
      <div className="flex flex-col justify-center mx-auto max-w-7xl py-48 gap-20">
        <Title home animate>
          Your favorite tattoo artist
        </Title>

        <motion.ul
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1 }}
          className="flex flex-col items-center sm:flex-row sm:justify-evenly lg:justify-end gap-20 sm:gap-8"
        >
          <motion.li
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.75 }}
            className="relative group overflow-hidden"
          >
            <Image
              src="/images/about-me-one.jpg"
              alt="about-me-one"
              width={270}
              height={270}
              className="group-hover:scale-110 transition-transform duration-300 w-80"
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
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 1 }}
            className="relative group overflow-hidden"
          >
            <Image
              src="/images/about-me-two.jpg"
              alt="about-me-two"
              width={270}
              height={270}
              className="group-hover:scale-110 transition-transform duration-300 w-80"
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
        <div>
          <Suptitle primary={true} home animate>
            About me
          </Suptitle>
          <Text home main animate>
            You have chosen a tattoo artist who goes beyond the ordinary. By
            coming here, you are stepping into a world of transformation and
            artistic magic. I am about energy, change and a new way. On this
            site you can explore my portfolio and schedule the most convenient
            time for our meeting. Welcome! With each step, you are drawing
            closer to embracing a new reality tailored specifically for you.
          </Text>
          <motion.div
            initial={{ y: 42, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 1, delay: 0.2 }}
          >
            <Button primary>
              <Link href={'/booking'}>Online-Booking</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
