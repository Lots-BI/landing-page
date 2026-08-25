import React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselControls } from '@/hooks/useCarouselControls.js';

export function ServiceSelectionCards({ services = [], selectedIds = [], onToggle }) {
  const { containerRef, scrollLeft, scrollRight, handlers } = useCarouselControls({ autoScrollInterval: 4000, scrollAmount: 340 });

  return (
    <div className="relative group w-full" {...handlers}>
      <button onClick={scrollLeft} className="carousel-nav-btn carousel-nav-btn-left" aria-label="Anterior">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={scrollRight} className="carousel-nav-btn carousel-nav-btn-right" aria-label="Próximo">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div 
        ref={containerRef}
        className="flex flex-row overflow-x-auto gap-4 pt-6 pb-10 px-4 sm:px-8 snap-x snap-mandatory scroll-smooth hide-scrollbar relative z-10 -mx-4 items-stretch"
      >
        {services.map((service) => {
          const isSelected = selectedIds.includes(service.id);
          const Icon = service.icon;
          
          return (
            <div
              key={service.id}
              onClick={() => onToggle && onToggle(service)}
              className={cn(
                "flex-shrink-0 min-w-[280px] w-[80vw] max-w-[320px] snap-center rounded-2xl p-6 cursor-pointer transition-all duration-300 relative border flex flex-col h-full",
                isSelected 
                  ? "bg-primary/10 border-primary shadow-md -translate-y-1" 
                  : "bg-card/50 border-border hover:bg-card hover:border-primary/40 hover:-translate-y-1"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "p-3 rounded-xl transition-colors",
                  isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                
                <div className={cn(
                  "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                  isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
                )}>
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground flex-grow">{service.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}