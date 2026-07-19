import React from 'react';
import { GlassBar } from './GlassBar';
import { cn } from '@/lib/utils';

export function HealthSocialProof({ 
  text,
  icons,
  className
}) {
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container mx-auto px-4">
        <GlassBar className="p-6 backdrop-blur-xl max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-lg font-medium text-center md:text-left">
              {text}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {icons.map((icon, index) => (
                <div key={index} className="w-12 h-12 flex items-center justify-center">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </GlassBar>
      </div>
    </section>
  );
}