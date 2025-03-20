import { ReactNode } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

interface TitleProps {
  children: ReactNode;
  home?: boolean;
  secondary?: boolean;
  animate?: boolean;
}

export function Title({
  children,
  home,
  secondary,
  animate = false,
}: TitleProps) {
  const MotionWrapper = animate ? motion.h2 : 'h2';

  const styles = clsx(
    'font-raleway  tracking-normal lg:tracking-wider',
    home
      ? 'text-4xl uppercase text-accentColor font-black'
      : 'mb-2.5 text-2xl font-semibold md:text-4xl lg:mb-5 lg:text-[42px] lg:font-bold text-mainDarkColor',
    secondary && 'text-end',
  );

  return (
    <MotionWrapper
      className={styles}
      {...(animate
        ? {
            initial: { y: 40, opacity: 0 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.75, ease: 'easeInOut' },
          }
        : {})}
    >
      {children}
    </MotionWrapper>
  );
}
