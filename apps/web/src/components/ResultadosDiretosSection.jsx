import React from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { cn } from '@/lib/utils';
import { useCarouselControls } from '@/hooks/useCarouselControls.js';

export default function ResultadosDiretosSection() {
  const { containerRef, scrollLeft, scrollRight, handlers } = useCarouselControls({ autoScrollInterval: 5000, scrollAmount: 360 });

  const testimonials = [
    {
      name: 'Rafa Teo Ferreira',
      subtitle: 'Corretor de Imóveis',
      text: 'A estruturação do funil de vendas e a nova estratégia de conteúdo mudaram o meu patamar no mercado imobiliário. Hoje tenho um fluxo constante de leads qualificados chegando todos os dias e um alcance orgânico que transformou minha autoridade na região.',
      image: 'https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/2df69df40b13ddd43110598a01ec3b8b.png',
      imageAlt: 'Rafa Teo Ferreira - Professional headshot',
      highlight: false
    },
    {
      name: 'José Geraldo',
      subtitle: 'E-commerce',
      text: 'O diferencial aqui foi a estruturação digital completa. Não recebi apenas anúncios, recebi um ecossistema de vendas pronto. O impacto no faturamento foi imediato e a previsibilidade que tenho hoje sobre as minhas vendas é o que eu sempre busquei para o meu negócio.',
      image: 'https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/cc02c89003d7bb58521a574362989227.png',
      imageAlt: 'José Geraldo - Professional headshot',
      highlight: true
    },
    {
      name: 'FutCity',
      subtitle: 'Escola de Futebol',
      text: 'O trabalho de criação de conteúdo aliado ao funil estratégico trouxe uma visibilidade incrível para a escola. O volume de interessados diários e o crescimento orgânico da nossa presença digital superaram todas as expectativas. Resultados reais e consistentes.',
      image: 'https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/d58e38c2b0807b8fb3fdb818404e6804.png',
      imageAlt: 'FutCity logo',
      highlight: false
    }
  ];

  return (
    <section id="resultados-diretos" className="py-12 md:py-16 bg-transparent relative z-10 border-y border-border overflow-visible">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance tracking-tight">
            Resultados Diretos
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
            className="flex flex-row overflow-x-auto gap-6 pt-12 pb-16 -mx-4 px-4 sm:px-8 snap-x snap-mandatory scroll-smooth hide-scrollbar bg-transparent relative z-10 items-stretch"
            {...handlers}
          >
            {testimonials.map((item, index) => (
              <AnimatedSection 
                key={index} 
                delay={index * 0.15} 
                className="h-full flex-shrink-0 w-full max-w-[360px] snap-center rounded-2xl transition-all duration-300"
              >
                <div 
                  className={cn(
                    "bg-card rounded-2xl p-8 md:p-10 h-full flex flex-col relative transition-all duration-300",
                    item.highlight 
                      ? "border border-primary shadow-[0_0_20px_hsla(var(--primary)/0.3)] lg:-translate-y-4" 
                      : "border border-border shadow-lg hover:border-primary/30 hover:bg-card/80"
                  )}
                >
                  <Quote className={cn(
                    "w-10 h-10 mb-6 opacity-20",
                    item.highlight ? "text-secondary" : "text-foreground"
                  )} />
                  
                  <blockquote className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8 flex-grow">
                    "{item.text}"
                  </blockquote>
                  
                  <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex items-center gap-3 md:gap-4">
                      <img 
                        src={item.image} 
                        alt={item.imageAlt}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-border shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-secondary text-lg truncate">
                          {item.name}
                        </div>
                        <div className="text-muted-foreground text-sm font-medium mt-1 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}