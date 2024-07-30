import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Section from '@/app/components/Section';
import Title from '@/app/components/Title';

import { permanentArray } from '@/public/images/permanent';
import { freshArray } from '@/public/images/fresh';
import { healedArray } from '@/public/images/healed';

const Swiper = dynamic(() => import('@/app/components/Swiper'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    "Explore Alina's stunning tattoo portfolio featuring a diverse collection of inked masterpieces.",
  openGraph: {
    title: 'Tattoo portfolio',
    description:
      "Explore Alina's stunning tattoo portfolio featuring a diverse collection of inked masterpieces.",
    url: 'https://alinaivenko.com/portfolio',
    siteName: 'alinaivenko.com',
    images: [
      {
        url: 'https://alinaivenko.com/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Portfolio() {
  return (
    <>
      <Section>
        <Title mobile={true}>Fresh Tattoos</Title>
        <Swiper initialSlide={4}>
          {freshArray.map((item, index) => (
            <swiper-slide lazy={true} key={index}>
              <Image
                className="w-full overflow-hidden rounded-xl"
                src={item}
                loading="lazy"
                alt={`fresh-${index}`}
              />
            </swiper-slide>
          ))}
        </Swiper>
      </Section>
      <Section primary={true}>
        <Title mobile={true}>Healed Tattoos</Title>
        <Swiper initialSlide={11}>
          {healedArray.map((item, index) => (
            <swiper-slide lazy={true} key={index}>
              <Image
                className="w-full overflow-hidden rounded-xl"
                src={item}
                loading="lazy"
                alt={`healed-${index}`}
              />
            </swiper-slide>
          ))}
        </Swiper>
      </Section>
      <Section>
        <Title mobile={true}>Healed Permanent</Title>
        <Swiper>
          {permanentArray.map((item, index) => (
            <swiper-slide lazy={true} key={index}>
              <Image
                className="w-full overflow-hidden rounded-xl"
                src={item}
                loading="lazy"
                alt={`permanent-${index}`}
              />
            </swiper-slide>
          ))}
        </Swiper>
      </Section>
    </>
  );
}
