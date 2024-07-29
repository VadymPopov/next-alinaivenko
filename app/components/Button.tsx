'use client';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import ButtonLoader from './ButtonLoader';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  disabled?: boolean;
  isProcessing?: boolean;
}

export default function Button({
  primary,
  disabled,
  children,
  isProcessing,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 w-40 cursor-pointer items-center justify-center rounded-3xl border-[1px] border-accentColor bg-transparent px-3 py-5 text-sm font-semibold uppercase transition-colors hover:bg-accentColor hover:shadow-md hover:shadow-cardColor',
        disabled &&
          'cursor-not-allowed bg-textColorDarkBg opacity-70 shadow-none',
        disabled && primary ? 'text-mainLightColor' : 'text-cardColor',
        primary
          ? 'text-mainLightColor hover:text-cardColor hover:shadow-mainLightColor'
          : 'text-cardColor hover:text-mainLightColor',
      )}
    >
      {isProcessing ? <ButtonLoader /> : children}
    </button>
  );
}
