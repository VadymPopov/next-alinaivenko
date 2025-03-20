import { ReactNode } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

type SuptitleProps = {
  children: ReactNode;
  home?: boolean;
  primary?: boolean;
  animate?: boolean;
};

export function Suptitle({
  children,
  home,
  primary,
  animate = false,
}: SuptitleProps) {
  const MotionWrapper = animate ? motion.h3 : 'h3';

  const variants = {
    home: 'text-mainLightColor before:bg-mainLightColor mb-10',
    primary: 'text-mainDarkColor before:bg-mainDarkColor',
    default: 'text-textColorDarkBg before:bg-textColorDarkBg',
  };

  const styles = clsx(
    "my-5 flex items-center text-xs font-semibold uppercase before:mr-5 before:block before:h-[1px] before:w-16 before:content-['']",
    variants[home ? 'home' : primary ? 'primary' : 'default'],
  );

  return (
    <MotionWrapper
      className={styles}
      {...(animate
        ? {
            initial: { y: 60, opacity: 0 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.75, ease: 'easeInOut' },
          }
        : {})}
    >
      {children}
    </MotionWrapper>
  );
}
