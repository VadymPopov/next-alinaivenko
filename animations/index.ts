export const indexAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ease: 'easeIn', duration: 0.6 },
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeOut', duration: 0.6 },
    scale: 0.9,
  },
};

export const mainAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: 'easeIn', duration: 0.75 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { ease: 'easeOut', duration: 0.75 },
  },
};

export const aboutImgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
    },
  },
};

export const slideFrom = {
  hidden: (custom?: { x?: number; y?: number }) => ({
    opacity: 0,
    x: custom?.x ?? 0,
    y: custom?.y ?? 0,
  }),
  visible: (custom?: { delay?: number; duration?: number; ease?: string }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: custom?.duration ?? 1,
      delay: custom?.delay ?? 0,
      ease: custom?.ease ?? 'easeInOut',
    },
  }),
};

export const scaleFrom = {
  hidden: (i = 1) => ({
    opacity: 0,
    scale: i,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.9,
      delay: i,
    },
  }),
};

export const elementVarients = {
  hidden: { x: 100, scale: 1.6, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
};

export const containerVarients = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      mass: 1,
      damping: 12,
      delayChildren: 0.3,
      staggerChildren: 0.5,
    },
  },
};

export const card = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  pressed: { scale: 0.9 },
};

export const projectAnimation = {
  hidden: {
    opacity: 0,
    scale: 1.6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      mass: 0.8,
      damping: 12,
      when: 'beforeChildren',
      staggerChildren: 0.8,
    },
  },
  exit: {
    scale: 0.9,
    transition: {
      ease: 'easeInOut',
    },
  },
};
