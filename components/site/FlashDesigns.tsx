import { designsArray } from '@/public/images/designs';

import React from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Loader } from '../ui';

const Swiper = dynamic(() => import('@/components/site/Swiper'), {
  ssr: false,
  loading: () => <Loader />,
});

export function FlashDesigns() {
  return (
    <div>
      <Swiper initialSlide={4} loop={true} styles={{ padding: '0' }}>
        {designsArray.map((item, index) => (
          <swiper-slide
            lazy={true}
            key={index}
            style={{ borderRadius: '0', width: '270px', height: '360px' }}
          >
            <figure className="group">
              <Image
                src={item.src}
                loading="lazy"
                alt={`flash-design-${index}`}
                width={270}
                height={360}
                className="relative hover:scale-110 transition-transform duration-300"
              />
              <figcaption className="absolute bottom-0 bg-cardColor text-mainLightColor w-full text-center p-1 group-hover:bg-accentColor  transition-colors duration-300">
                {item.title}
              </figcaption>
            </figure>
          </swiper-slide>
        ))}
      </Swiper>
    </div>
  );
}
