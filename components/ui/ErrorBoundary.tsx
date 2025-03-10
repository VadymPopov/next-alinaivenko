'use client';

import { Button } from '@/components/ui';

import React from 'react';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center px-6 py-4 min-h-screen relative">
      <h2 className="font-semibold sm:text-lg text-center">
        <span className="text-accentColor">Uh-oh! </span>🐾 A little
        cat-tastrophe happened! Let&apos;s paw-se and try again!
      </h2>
      <p className="sm:text-lg">{error.message}</p>

      <Button onClick={() => reset()}>Try again</Button>

      <div className="absolute bottom-0 left-0 w-full h-screen -z-10">
        <DotLottieReact
          src="https://lottie.host/57b58b37-87bb-447e-82b2-9e154bb28914/FW3nJ650Vz.lottie"
          speed={0.5}
          mode="bounce"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
