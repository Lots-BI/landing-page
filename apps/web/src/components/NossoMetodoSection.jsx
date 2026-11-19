import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { FlowCtaButton } from './FlowCtaButton.jsx';

const STEPS = [
  {
    title: 'Diagnóstico',
    text: 'Marcamos uma reunião para entender o momento do seu negócio: onde estão os gargalos e o que precisa melhorar antes de subir qualquer campanha.',
    caption: 'Reunião de diagnóstico e plano por escrito.',
    offset: 'md:mt-28',
  },
  {
    title: 'Setup',
    text: 'Fechamos contrato, alinhamos as diretrizes da marca, pegamos os acessos necessários e vinculamos sua operação à Lots BI.',
    caption: 'Contrato, diretrizes e acessos prontos.',
    offset: 'md:mt-16',
  },
  {
    title: 'Produção & Ativação',
    text: 'Produzimos a landing page ou site, configuramos pixels e tags de rastreio e colocamos a primeira campanha no ar com reunião de alinhamento sobre público, criativo e anúncio.',
    caption: 'Campanha no ar e tudo rastreado.',
    offset: 'md:mt-6',
  },
  {
    title: 'Gestão',
    text: 'Os leads caem direto no CRM da Lots BI ou na área administrativa da sua landing page, enquanto ajustamos verba, público e criativo toda semana.',
    caption: 'Leads organizados e ajuste contínuo, toda semana.',
    offset: 'md:mt-0',
  },
];

export default function NossoMetodoSection() {
  return (
    <section
      id="metodo"
      className="relative z-10 overflow-hidden bg-transparent py-20 md:py-28"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <AnimatedSection className="mx-auto mb-14 max-w-2xl md:mb-20">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-2 w-2 shrink-0 bg-brand-gradient" aria-hidden="true" />
            Método Lots
          </p>
          <h2 className="mb-4 flex items-baseline gap-3 font-display font-black text-foreground text-balance">
            <span className="bg-brand-gradient bg-clip-text text-6xl text-transparent md:text-8xl">4</span>
            <span className="text-3xl md:text-5xl">passos, nesta ordem.</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            Cada etapa depende da anterior. Por isso nenhuma campanha entra no ar antes de a estrutura
            estar pronta.
          </p>
        </AnimatedSection>

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4 md:gap-6">
          {STEPS.map((step, index) => (
            <AnimatedSection
              key={step.title}
              delay={index * 0.08}
              className={`border-l-2 border-white/15 pl-5 ${step.offset}`}
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] rgb-gradient-text">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-3 font-display text-xl font-bold text-foreground md:text-2xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.text}
              </p>
              <div className="mt-4 border-t border-dashed border-white/20 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                  {step.caption}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center md:mt-20">
          <FlowCtaButton id="cta-btn-metodo">
            Quero essa operação
          </FlowCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
