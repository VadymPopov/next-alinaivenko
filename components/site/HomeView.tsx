'use client';

import React from 'react';

import { ReactLenis } from 'lenis/react';

import { AboutSection } from './AboutSection';
import { FlashSection } from './FlashSection';
import { HeroSection } from './HeroSection';

export const HomeView = () => {
  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <HeroSection />
        <AboutSection />
        <FlashSection />
      </ReactLenis>
    </>
  );
};
