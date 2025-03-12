'use client';

import { indexAnimation, mainAnimation } from '@/animations';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const animation = pathname === '/' ? indexAnimation : mainAnimation;

  return (
    <AnimatePresence mode={'wait'}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animation}
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
