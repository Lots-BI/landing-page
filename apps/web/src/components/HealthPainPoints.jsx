import React from 'react';
import { GlassBar } from './GlassBar';
import { cn } from '@/lib/utils';

export function HealthPainPoints({ 
  headline,
  items,
  className
}) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {headline}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <GlassBar 
              key={index} 
              className="p-8 backdrop-blur-xl h-full flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full backdrop-blur-sm border border-white/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">
                {item.title}
              </h3>
              <p className="leading-relaxed">
                {item.description}
              </p>
            </GlassBar>
          ))}
        </div>
      </div>
    </section>
  );
}