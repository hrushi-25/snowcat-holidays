import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS } from '../../utils/motionVariants';

export default function HoverCard({
  children,
  className = '',
  style = {},
  lift = -4,
  scale = 1.015,
  onClick,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: lift,
              scale,
              transition: { duration: 0.25, ease: EASINGS.EASE_OUT },
            }
      }
      whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
