'use client';

import '@/styles/swiper.css';

import { ReactNode } from 'react';

import { register } from 'swiper/element/bundle';

register();

export default function Swiper({
  children,
  initialSlide = 0,
}: {
  children: ReactNode;
  initialSlide?: number;
}) {
  return (
    <swiper-container
      slides-per-view="auto"
      centered-slides="true"
      navigation={true}
      pagination={true}
      pagination-dynamic-bullets={true}
      grab-cursor={true}
      effect="coverflow"
      coverflow-effect-rotate="50"
      coverflow-effect-stretch="0"
      coverflow-effect-depth="100"
      coverflow-effect-modifier="1"
      coverflow-effect-slide-shadows="true"
      initial-slide={initialSlide}
    >
      {children}
    </swiper-container>
  );
}
