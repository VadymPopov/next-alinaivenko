import { ReactNode } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

interface TextProps {
  children: ReactNode;
  home?: boolean;
  primary?: boolean;
  main?: boolean;
  animate?: boolean;
}

export function Text({
  children,
  home,
  primary,
  main,
  animate = false,
}: TextProps) {
  const MotionWrapper = animate ? motion.p : 'p';

  const variants = {
    home: 'text-mainLightColor mb-10 text-base',
    primary: 'text-textColor',
    default: 'text-mainDarkColor text-sm',
  };

  const styles = clsx(
    'text-justify indent-3  leading-[1.67] tracking-wide sm:indent-5 md:text-lg lg:indent-8',
    variants[home ? 'home' : primary ? 'primary' : 'default'],
    main ? 'mb-5' : 'mb-0',
  );

  return (
    <MotionWrapper
      className={styles}
      {...(animate
        ? {
            initial: { y: 80, opacity: 0 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.75, ease: 'easeInOut' },
          }
        : {})}
    >
      {children}
    </MotionWrapper>
  );
}
