'use client';

import React from 'react';

import { ParallaxText } from './ParallaxText';

export function ParallaxContent() {
  return (
    <div className="mx-5 md:mx-10 my-20 lg:mx-12 lg:my-20 xl:mx-16 xl:my-24">
      <ParallaxText start={-170} end={200}>
        <h3 className="uppercase font-semibold text-textColorDarkBg text-lg">
          Your favorite tattoo artist
        </h3>
      </ParallaxText>
      <ParallaxText start={-160} end={300} className="w-full">
        <h1 className="mb-5 font-raleway text-7xl font-extrabold leading-tight tracking-wider text-mainLightColor">
          Ivenko Alina
        </h1>
      </ParallaxText>

      <ParallaxText
        start={1200}
        end={1600}
        className="flex justify-center items-center"
      >
        <p className="text-5xl font-raleway font-extrabold text-mainLightColor uppercase w-[350px] ">
          Get Inked, Book Now!
        </p>
      </ParallaxText>

      <ParallaxText
        start={200}
        end={500}
        className="flex justify-end items-center"
      >
        <p className="text-2xl lg:text-4xl font-raleway font-extrabold text-accentColor uppercase w-[350px] lg:w-[400px]">
          Embrace the art of transformation.
        </p>
      </ParallaxText>

      <ParallaxText
        start={400}
        end={800}
        className="flex justify-start items-center"
      >
        <p className="text-2xl lg:text-4xl font-raleway font-extrabold text-textColorDarkBg uppercase w-[350px]">
          Elegance in Every Line.
        </p>
      </ParallaxText>
    </div>
  );
}
