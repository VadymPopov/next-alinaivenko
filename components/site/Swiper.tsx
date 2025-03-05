'use client';

import '@/styles/swiper.css';

import { CSSProperties, ReactNode } from 'react';

import { register } from 'swiper/element/bundle';

register();

export default function Swiper({
  children,
  initialSlide = 0,
  effect,
  loop,
  styles,
}: {
  children: ReactNode;
  initialSlide?: number;
  effect?: boolean;
  loop?: boolean;
  styles?: CSSProperties;
}) {
  return (
    <swiper-container
      slides-per-view="auto"
      centered-slides="true"
      loop={loop}
      navigation={true}
      pagination={true}
      pagination-dynamic-bullets={true}
      grab-cursor={true}
      effect={effect ? 'coverflow' : ''}
      coverflow-effect-rotate="50"
      coverflow-effect-stretch="0"
      coverflow-effect-depth="100"
      coverflow-effect-modifier="1"
      coverflow-effect-slide-shadows="true"
      initial-slide={initialSlide}
      style={styles}
    >
      {children}
    </swiper-container>
  );
}
