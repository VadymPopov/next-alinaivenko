'use client';

import React from 'react';

import clsx from 'clsx';

interface SlidingMenuProps {
  isOpen: boolean;
  position?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export function SlidingMenu({
  isOpen,
  position = 'right',
  className,
  children,
}: SlidingMenuProps) {
  const translateDirection = position === 'left' ? '-100%' : '100%';

  return (
    <div
      role="mobile-menu"
      className={clsx(
        'lg:hidden right-0 z-40 flex h-screen items-center justify-center overflow-y-auto px-5 py-20 bg-cardColor',
        className,
      )}
      style={{
        transform: isOpen
          ? 'translate3d(0%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'
          : `translate3d(${translateDirection}, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
        transformStyle: 'preserve-3d',
        transition:
          'opacity 1s ease-in-out, transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)',
      }}
    >
      {children}
    </div>
  );
}
