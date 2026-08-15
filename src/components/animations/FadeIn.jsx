import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS, DURATION } from '../../utils/motionVariants';

export default function FadeIn({
  children,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  delay = 0,
  duration = DURATION.NORMAL,
  distance = 24,
  className = '',
  style = {},
  once = true,
  amount = 0.2,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: DURATION.FAST, delay },
        },
      };
    }

    let initialX = 0;
    let initialY = 0;

    if (direction === 'up') initialY = distance;
    if (direction === 'down') initialY = -distance;
    if (direction === 'left') initialX = distance;
    if (direction === 'right') initialX = -distance;

    return {
      hidden: { opacity: 0, x: initialX, y: initialY },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: EASINGS.EASE_OUT,
        },
      },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
