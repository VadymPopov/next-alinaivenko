'use client';

import { slideFrom } from '@/animations';

import React from 'react';

import { motion } from 'framer-motion';

import { Section, Suptitle, Text, Title } from '../ui';
import { FlashDesigns } from './FlashDesigns';

export function FlashSection() {
  return (
    <Section>
      <motion.div
        variants={slideFrom}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={{ x: -150, delay: 0.2 }}
      >
        <Suptitle>Pick Your Design & Book with Ease</Suptitle>
        <Title>Latest Flash Tattoo Designs</Title>
        <Text>
          Pick a flash design and let me know when you book your appointment in
          the description section — just tell me the name of the design.
        </Text>
      </motion.div>
      <motion.div
        variants={slideFrom}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={{ x: 150, delay: 0.3 }}
      >
        <FlashDesigns />
      </motion.div>
    </Section>
  );
}
