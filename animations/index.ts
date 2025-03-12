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
  hidden: (custom: { x?: number; y?: number }) => ({
    opacity: 0,
    x: custom?.x ?? 0,
    y: custom?.y ?? 0,
  }),
  visible: (custom: { delay?: number }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      delay: custom?.delay ?? 0,
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
