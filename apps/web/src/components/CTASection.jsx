import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { WhatsAppButton } from './WhatsAppButton.jsx';

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative z-10 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center bg-card/80 backdrop-blur-2xl p-10 md:p-20 rounded-[3rem] border border-primary/30 shadow-[0_0_80px_hsla(var(--primary)/0.15)]">
          <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 leading-tight">
            Pronto para transformar seu projeto?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para ajudar você a alcançar seus objetivos digitais com soluções personalizadas.
          </p>
          <WhatsAppButton 
            phoneNumber="5511973290438"
            baseMessage="Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?"
            className="text-lg px-8 py-4 shadow-[0_0_30px_hsla(142,71%,45%,0.3)] hover:shadow-[0_0_40px_hsla(142,71%,45%,0.5)]"
          >
            💬 Conversar no WhatsApp
          </WhatsAppButton>
        </AnimatedSection>
      </div>
    </section>
  );
}