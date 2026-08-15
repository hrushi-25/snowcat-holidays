import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { pageTransition } from '../../utils/motionVariants';

export default function PageTransition({ children, className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
