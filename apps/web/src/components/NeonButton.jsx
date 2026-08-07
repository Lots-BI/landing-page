import React from 'react';
import { cn } from '@/lib/utils';

export function NeonButton({ children, className, onClick, href, asChild, ...props }) {
  const Component = asChild ? 'span' : 'button';
  
  const content = (
    <Component
      className={cn(
        "gtm-apply-btn pixel-track-lead relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-bold tracking-wide uppercase overflow-hidden rounded-xl group transition-all duration-300 touch-target min-h-[44px] min-w-[44px]",
        "bg-primary text-primary-foreground border-2 border-primary shadow-[0_0_8px_hsla(var(--primary)/0.18)]",
        "hover:bg-secondary hover:border-secondary hover:text-secondary-foreground hover:shadow-[0_0_12px_hsla(var(--secondary)/0.22)]",
        "active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Magnetic/Sweep effect overlay */}
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-20 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );

  if (href) {
    return (
      <a href={href} className="inline-block w-full sm:w-auto touch-target">
        {content}
      </a>
    );
  }

  return content;
}