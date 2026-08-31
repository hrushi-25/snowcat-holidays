import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS, DURATION } from '../../utils/motionVariants';

export function StaggerContainer({
  children,
  staggerChildren = 0.08,
  delayChildren = 0,
  once = true,
  className = '',
  style = {},
  amount = 0.1,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.02 : staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 20,
  className = '',
  style = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.NORMAL,
        ease: EASINGS.EASE_OUT,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} style={style} {...props}>
      {children}
    </motion.div>
  );
}
