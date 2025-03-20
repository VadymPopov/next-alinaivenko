'use client';

import { ButtonLoader } from '@/components/ui';

import React, { ReactNode } from 'react';

import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
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
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      {...rest}
      className={clsx(baseStyles, currentStyles, styles)}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
      {isProcessing && <ButtonLoader />}
    </motion.button>
  );
}
