import React from 'react';
import { cn } from '@/lib/utils';

export function GlassCard({ children, className, neon = false, hover = true, ...props }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl glass p-6 md:p-8 transition-all duration-500 will-change-transform",
        hover && "hover:-translate-y-3 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]",
        neon && "border-primary/40 shadow-[0_0_12px_hsla(var(--primary)/0.1)] hover:shadow-[0_0_16px_hsla(var(--secondary)/0.14)] hover:border-secondary/40",
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