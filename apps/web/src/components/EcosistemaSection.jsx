import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Target, MousePointerClick, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { useCarouselControls } from '@/hooks/useCarouselControls.js';

export function EcosistemaSection() {
  const { content } = useEditableContent();
  const { containerRef, scrollLeft, scrollRight, handlers } = useCarouselControls({ autoScrollInterval: 4500, scrollAmount: 360 });
  const e = content.ecosystem;

  const cards = [
    {
      icon: LayoutDashboard,
      title: e.c1Title,
      desc: e.c1Desc,
      color: "from-primary/20 to-transparent",
      delay: 0.1
    },
    {
      icon: Target,
      title: e.c2Title,
      desc: e.c2Desc,
      color: "from-secondary/20 to-transparent",
      delay: 0.2
    },
    {
      icon: MousePointerClick,
      title: e.c3Title,
      desc: e.c3Desc,
      color: "from-accent/20 to-transparent",
      delay: 0.3
    },
    {
      icon: Activity,
      title: e.c4Title,
      desc: e.c4Desc,
      color: "from-primary/20 to-secondary/20",
      delay: 0.4
    }
  ];

  return (
    <section id="solucao-section" className="py-12 md:py-16 relative bg-transparent overflow-visible">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-3xl mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            {e.title.split(/(Completa|nicho)/).map((part, i) => 
              ['Completa', 'nicho'].includes(part) ? <span key={i} className="rgb-gradient-text">{part}</span> : part
            )}
          </h2>
          <p className="text-xl text-muted-foreground">
            {e.subtitle}
          </p>
        </AnimatedSection>

        <div className="relative group" {...handlers}>
          <button onClick={scrollLeft} className="carousel-nav-btn carousel-nav-btn-left" aria-label="Anterior">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={scrollRight} className="carousel-nav-btn carousel-nav-btn-right" aria-label="Próximo">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={containerRef}
            className="flex flex-row overflow-x-auto gap-6 pt-12 pb-20 -mx-4 px-4 sm:px-8 snap-x snap-mandatory scroll-smooth hide-scrollbar bg-transparent relative z-10"
          >
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: card.delay }}
                className="glass-panel bg-card/60 border border-border p-8 md:p-10 hover-lift hover-glow group/card relative flex-shrink-0 min-w-[280px] w-[85vw] max-w-[360px] snap-center rounded-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                <div className="relative z-10">
                  <card.icon className="w-12 h-12 text-primary mb-6 group-hover/card:scale-110 transition-transform duration-500 will-change-transform" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">{card.title}</h3>
                  <p className="text-muted-foreground group-hover/card:text-foreground/90 transition-colors duration-300">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}