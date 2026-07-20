import React from 'react';
import { GlassBar } from './GlassBar';
import { cn } from '@/lib/utils';

export function HealthSocialProof({ 
  text,
  icons,
  titles,
  className
}) {
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container mx-auto px-4">
        <GlassBar className="p-4 md:p-6 backdrop-blur-xl max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:gap-6">
            <p className="text-sm font-medium text-center md:text-left">
              {text}
            </p>

            {/* Mobile: quebra linha e empilha | Desktop (md+): volta pra linha única, sem quebra */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 sm:gap-6 w-full">
              {icons.map((Icon, index) => {
                const title = titles?.[index];
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row md:flex-row items-center gap-1 px-1 sm:px-2 shrink-0"
                  >
                    <Icon />
                    {title && (
                      <span className="text-[11px] sm:text-xs md:text-xs text-center sm:text-left md:text-left">
                        {title}
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Mobile: linha horizontal | Desktop (md+): volta a ser divisor vertical como antes */}
              <div className="w-full h-px bg-white/20 my-1 md:hidden" />
              <div
                className="hidden md:block"
                style={{
                  width: '1px',
                  backgroundColor: '#ccc',
                  alignSelf: 'stretch',
                  margin: '0 16px'
                }}
              />

              <div className="flex items-center px-1 sm:px-2 md:px-2 md:max-w-none">
                <span className="text-[11px] sm:text-xs md:text-[70%] text-center sm:text-left md:text-center leading-snug">
                  Lots BI - Plataforma Própria de Business Intelligence para Marketing
                </span>
              </div>
            </div>
          </div>
        </GlassBar>
      </div>
    </section>
  );
}