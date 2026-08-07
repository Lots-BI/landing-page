import React from 'react';
import { cn } from '@/lib/utils';

export function NeonButton({ children, className, onClick, href, asChild, ...props }) {
  const Component = asChild ? 'span' : 'button';
  
  const content = (
    <Component
      className={cn(
        "gtm-apply-btn pixel-track-lead relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold tracking-wide uppercase overflow-hidden rounded-lg group transition-all duration-300 touch-target min-h-[44px] min-w-[44px]",
        "bg-primary text-primary-foreground border border-primary/80 shadow-md",
        "hover:bg-primary/90 hover:border-primary hover:shadow-lg",
        "active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      {...props}
    >
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