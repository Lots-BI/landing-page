import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ProgressBar({ label, value, color = 'primary', className }) {
  const bgColor = color === 'primary' ? 'bg-primary' : color === 'secondary' ? 'bg-secondary' : 'bg-accent';
  const shadowColor = color === 'primary' ? 'shadow-primary/50' : color === 'secondary' ? 'shadow-secondary/50' : 'shadow-accent/50';

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm md:text-base font-medium text-foreground">{label}</span>
        <span className="text-xs md:text-sm font-bold text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 md:h-3 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={cn("h-full rounded-full shadow-[0_0_15px_currentColor]", bgColor, shadowColor)}
        />
      </div>
    </div>
  );
}