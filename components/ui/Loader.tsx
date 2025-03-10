'use client';

import React from 'react';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function Loader() {
  return (
    <div className="flex justify-center items-center h-screen m-auto z-[99]">
      <div className="h-1/6">
        <DotLottieReact
          src="https://lottie.host/dddee338-ad6c-4569-b747-c969932fb458/rFsekpI1EL.lottie"
          loop
          autoplay
          mode="reverse"
          speed={3}
        />
      </div>
    </div>
  );
}
