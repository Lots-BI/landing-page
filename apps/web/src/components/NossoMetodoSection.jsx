import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { FlowCtaButton } from './FlowCtaButton.jsx';

const STEPS = [
  {
    title: 'Diagnóstico da conta',
    text: 'Olhamos estrutura, público, criativos e conversão antes de gastar mais orçamento.',
  },
  {
    title: 'Campanhas no ar',
    text: 'Montamos e otimizamos Meta Ads e Google Ads com foco em lead e venda.',
  },
  {
    title: 'Rotina diária',
    text: 'Ajuste contínuo de lance, criativo e público para baixar custo e subir qualidade.',
  },
];

export default function NossoMetodoSection() {
  return (
    <section
      id="metodo"
      className="relative z-10 overflow-hidden border-t border-border py-16 md:py-24"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <h2 className="mb-4 font-display text-3xl font-black text-foreground text-balance md:text-5xl">
            Como a Lots opera seu tráfego.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            Sem relatório genérico no fim do mês. Gestão ativa, todo dia.
          </p>
        </AnimatedSection>

        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <AnimatedSection key={step.title} delay={index * 0.08} className="text-center md:text-left">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-3 font-display text-xl font-bold text-foreground md:text-2xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.text}
              </p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <FlowCtaButton id="cta-btn-metodo">
            Quero essa operação
          </FlowCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
