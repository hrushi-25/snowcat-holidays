// Centralized Motion System Variants & Tokens for Snowcat Holidays
export const DURATION = {
  FAST: 0.2,       // Micro-interactions, buttons, small toggles (150-250ms)
  NORMAL: 0.35,    // Cards, modals, nav elements, dropdowns (300-400ms)
  SLOW: 0.6,      // Hero section, section entry, major reveals (500-700ms)
};

export const EASINGS = {
  EASE_OUT: [0.16, 1, 0.3, 1],       // Smooth deceleration
  EASE_IN_OUT: [0.65, 0, 0.35, 1],   // Balanced transition
  SMOOTH_SPRING: { type: "spring", stiffness: 300, damping: 30 },
  GENTLE_SPRING: { type: "spring", stiffness: 200, damping: 24 },
  BOUNCE_SUBTLE: { type: "spring", stiffness: 400, damping: 25 },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.NORMAL,
      ease: EASINGS.EASE_OUT,
    },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.NORMAL,
      ease: EASINGS.EASE_OUT,
    },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.NORMAL,
      ease: EASINGS.EASE_OUT,
    },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.NORMAL,
      ease: EASINGS.EASE_OUT,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.NORMAL,
      ease: EASINGS.EASE_OUT,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.NORMAL,
      ease: EASINGS.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: DURATION.FAST,
      ease: EASINGS.EASE_IN_OUT,
    },
  },
};

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: DURATION.SLOW,
      ease: EASINGS.EASE_OUT,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.NORMAL,
      ease: EASINGS.EASE_OUT,
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.NORMAL,
      ease: EASINGS.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: DURATION.FAST,
      ease: EASINGS.EASE_IN_OUT,
    },
  },
};

export const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.FAST } },
  exit: { opacity: 0, transition: { duration: DURATION.FAST } },
};
