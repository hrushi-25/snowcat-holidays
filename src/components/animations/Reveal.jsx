import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS, DURATION } from '../../utils/motionVariants';

export default function Reveal({
  children,
  width = '100%',
  delay = 0,
  duration = DURATION.NORMAL,
  y = 28,
  blur = false,
  once = true,
  className = '',
  style = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : y,
      filter: blur && !shouldReduceMotion ? 'blur(8px)' : 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: shouldReduceMotion ? DURATION.FAST : duration,
        delay,
        ease: EASINGS.EASE_OUT,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={variants}
      className={className}
      style={{ width, ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
