import React from 'react';
import { cn } from '@/lib/utils';

export function GlassCard({ children, className, neon = false, hover = true, ...props }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl glass p-6 md:p-8 transition-all duration-500 will-change-transform",
        hover && "hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-lg",
        neon && "border-primary/30 shadow-md hover:shadow-lg hover:border-primary/50",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none rounded-2xl" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}