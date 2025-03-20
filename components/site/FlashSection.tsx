'use client';

import React from 'react';

import { motion } from 'framer-motion';

import { Section, Suptitle, Text, Title } from '../ui';
import { FlashDesigns } from './FlashDesigns';

export function FlashSection() {
  return (
    <Section bgColor="bg-cardColor">
      <div className="flex flex-col justify-center mx-auto max-w-7xl gap-20">
        <Title home animate>
          Latest Flash Tattoo Designs
        </Title>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1, delay: 0.2 }}
        >
          <FlashDesigns />
        </motion.div>
        <div>
          <Suptitle home animate>
            Pick Your Design & Book with Ease
          </Suptitle>
          <Text home animate>
            Pick a flash design and let me know when you book your appointment
            in the description section — just tell me the name of the design.
          </Text>
        </div>
      </div>
    </Section>
  );
}
