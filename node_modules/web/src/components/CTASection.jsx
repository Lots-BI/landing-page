import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { PlanosCtaButton } from './PlanosCtaButton.jsx';

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative z-10 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center bg-card/80 backdrop-blur-2xl p-10 md:p-20 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 leading-tight">
            Pronto para transformar seu projeto?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para ajudar você a alcançar seus objetivos digitais com soluções personalizadas.
          </p>
          <PlanosCtaButton 
            className="text-lg px-8 py-4 shadow-md hover:shadow-lg"
          >
            Quero um Orçamento
          </PlanosCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}