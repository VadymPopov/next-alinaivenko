'use client';

import { ButtonLoader } from '@/components/ui';

import React, { ReactNode } from 'react';

import clsx from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  disabled?: boolean;
  isProcessing?: boolean;
  styles?: string;
}

export function Button({
  primary = false,
  disabled = false,
  children,
  isProcessing = false,
  styles = '',
  ...rest
}: ButtonProps) {
  const baseStyles =
    'flex items-center justify-center rounded-3xl text-sm font-semibold uppercase transition-colors h-10 w-40 px-3 py-5';

  const enabledStyles = primary
    ? 'bg-transparent border-accentColor border-[1px] text-mainLightColor hover:bg-accentColor hover:text-cardColor'
    : 'bg-transparent text-cardColor border-[1px] border-accentColor hover:bg-accentColor  hover:text-mainLightColor hover:shadow-md hover:shadow-cardColor';

  const disabledStyles = 'cursor-not-allowed opacity-70 bg-textColorDarkBg';
  const currentStyles = disabled ? disabledStyles : enabledStyles;

  return (
    <button
      {...rest}
      className={clsx(baseStyles, currentStyles, styles)}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
      {isProcessing && <ButtonLoader />}
    </button>
  );
}
