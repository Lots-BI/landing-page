import React from 'react';
import { cn } from '@/lib/utils';

export function GlassBar({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "relative rounded-xl glass p-4 md:p-6 backdrop-blur-md border border-white/10 transition-all duration-500",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 pointer-events-none rounded-xl" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}