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
  styles?: string;
}

export default function Button({
  primary,
  disabled,
  children,
  isProcessing,
  styles,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center justify-center rounded-3xl border-[1px] border-accentColor text-sm font-semibold uppercase transition-colors ',
        disabled
          ? 'cursor-not-allowed bg-textColorDarkBg opacity-70 shadow-none'
          : 'hover:bg-accentColor hover:shadow-md hover:shadow-cardColor cursor-pointer bg-transparent',
        disabled && primary
          ? 'text-mainLightColor'
          : disabled
            ? 'text-cardColor'
            : primary
              ? 'text-mainLightColor hover:text-cardColor hover:shadow-mainLightColor'
              : 'text-cardColor hover:text-mainLightColor',
        styles ? styles : 'h-10 w-40 px-3 py-5',
      )}
      disabled={disabled}
    >
      {children}
      {isProcessing && <ButtonLoader />}
    </button>
  );
}
