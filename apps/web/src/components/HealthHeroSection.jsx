import React from 'react';
import { GlassBar } from './GlassBar';
import { cn } from '@/lib/utils';
import mockup from '../assets/3d_mockup.png'; 

export function HealthHeroSection({ 
  headline,
  subheadline,
  ctaText,
  className
}) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={cn("py-16 md:py-24", className)} id='solucao'>
      <div className="container mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-1 lg:order-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {headline}
            </h1>
            
            <p className="text-xl mb-8 leading-relaxed">
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                key={"forms"}
                onClick={() => scrollTo("forms")}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
              >
                {ctaText}
              </button>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="order-2 lg:order-2 flex justify-center">
            <GlassBar className="p-8 backdrop-blur-xl w-full max-w-md">
              <img src={mockup} className='rounded-lg' />
            </GlassBar>
          </div>
        </div>
      </div>
    </section>
  );
}