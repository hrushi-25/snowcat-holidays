import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 4, // Max tilt angle in degrees
  onClick,
  ...props
}) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || shouldReduceMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const normX = (x / width - 0.5) * 2; // -1 to 1
    const normY = (y / height - 0.5) * 2; // -1 to 1

    setRotateX(-normY * maxTilt);
    setRotateY(normX * maxTilt);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  if (isTouchDevice || shouldReduceMotion) {
    return (
      <div className={className} style={style} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ perspective: 1000, display: 'block', width: '100%' }}>
      <motion.div
        ref={ref}
        className={className}
        style={{
          transformStyle: 'preserve-3d',
          ...style,
        }}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}
