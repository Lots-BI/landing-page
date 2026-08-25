import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { LotsBIIcon } from './LotsBIWordmark.jsx';
import { PlanosCtaButton } from './PlanosCtaButton.jsx';
import { LotsBIDashboardMock } from './LotsBIDashboardMock.jsx';

export default function NossoMetodoSection() {
  return (
    <section
      id="nosso-metodo"
      className="py-16 md:py-24 relative bg-transparent border-t border-border z-10 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <div className="flex justify-center mb-4">
            <LotsBIIcon size="lg" className="!h-10 !w-10" aria-hidden="true" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Lots BI · Conta do cliente
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 font-display text-balance">
            Dashboard automático —{' '}
            <span className="text-primary">claro e sem custo extra</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
            Enquanto operamos mídia, conteúdo e dados, você entra no Lots BI e vê a operação
            consolidada: métricas, estratégia e aprovações — em tempo real.
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-6xl mx-auto">
          <LotsBIDashboardMock />
        </AnimatedSection>

        <AnimatedSection className="max-w-2xl mx-auto mt-10 text-center">
          <p className="text-sm text-muted-foreground/90 text-balance mb-8">
            Sem custo adicional de plataforma para o cliente. Sem curva de ferramenta complexa:
            basta autenticar e acompanhar a operação com a mesma clareza da equipe Lots.
          </p>
          <PlanosCtaButton
            id="cta-btn-metodo"
            className="text-base md:text-lg px-8 md:px-10 py-4 shadow-md hover:shadow-lg"
          >
            Quero meu painel Lots BI
          </PlanosCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
