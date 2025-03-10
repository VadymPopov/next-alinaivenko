'use client';

import React from 'react';

import { DotLottieReact, Mode } from '@lottiefiles/dotlottie-react';
import { useRouter } from 'next/navigation';

import { Button } from '../ui';

export function ErrorDisplay({
  prefixMsg,
  mainMsg,
  src,
  speed = 1,
  mode = 'forward',
  loop = true,
  className,
}: {
  prefixMsg: string;
  mainMsg: string;
  src: string;
  speed?: number;
  mode?: Mode;
  loop?: boolean;
  className?: string;
}) {
  const router = useRouter();
  return (
    <div className={className} aria-live="polite">
      <p className="text-sm sm:text-lg mb-4">
        <span className="text-accentColor">{prefixMsg} </span> {mainMsg}
      </p>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay
        speed={speed}
        mode={mode}
      />
      <div className="flex justify-center text-sm sm:text-lg">
        <Button onClick={() => router.refresh()}>Try again</Button>
      </div>
    </div>
  );
}
