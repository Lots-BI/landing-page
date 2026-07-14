import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { useCarouselControls } from '@/hooks/useCarouselControls.js';

export default function NossoMetodoSection() {
  const { containerRef, scrollLeft, scrollRight, handlers } = useCarouselControls({ autoScrollInterval: 4000, scrollAmount: 360 });

  const steps = [
    {
      title: '1. Diagnóstico e Setup',
      description: 'Configuração de rastreamento avançado (Pixel, API e GA4) para blindar seus dados.'
    },
    {
      title: '2. Tráfego de Alta Performance',
      description: 'Campanhas multicanal focadas em atrair o público com maior poder de compra.'
    },
    {
      title: '3. Otimização e Escala',
      description: 'Leitura de dados diária para reduzir o custo de aquisição e escalar o lucro.'
    },
    {
      title: '4. Posicionamento de Marca',
      description: 'Conteúdo estratégico que gera autoridade, retém a atenção e facilitam o fechamento.'
    }
  ];

  return (
    <section id="nosso-metodo" className="py-12 md:py-16 relative bg-transparent border-t border-border z-10 overflow-visible">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">
            Engenharia de Vendas em 4 Etapas
          </h2>
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
            className="flex flex-row overflow-x-auto gap-4 pt-8 pb-10 -mx-4 px-4 sm:px-8 snap-x snap-mandatory scroll-smooth hide-scrollbar bg-transparent relative z-10 items-stretch"
          >
            {steps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="h-full flex-shrink-0 min-w-[280px] w-[85vw] max-w-[360px] snap-center rounded-2xl transition-all duration-300">
                <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_hsla(var(--primary)/0.2)] hover:border-primary/50 group/card">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover/card:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base flex-grow">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}