import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AnimatedSection({ 
  children, 
  className, 
  delay = 0, 
  direction = 'up',
  once = true,
  /** Skip fade/slide so LCP text is visible on first paint */
  immediate = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 }
  };

  if (immediate || prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
