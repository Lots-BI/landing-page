import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { FlowCtaButton } from './FlowCtaButton.jsx';

const POINTS = [
  'Acesso grátis no contrato.',
  'Todas as informações em um lugar.',
  'Meta, Google e Instagram na sua conta.',
  'Se não fechar após a reunião, 3 meses de Lots BI grátis.',
];

export function ClientAreaSection() {
  return (
    <section
      id="lots-bi"
      className="relative z-10 overflow-hidden border-t border-white/10 bg-white/[0.025] py-16 md:py-24"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Plataforma
            </p>
            <h2 className="mb-5 font-display text-3xl font-black text-foreground text-balance md:text-5xl">
              Dashboards por plataforma.
            </h2>
            <ul className="space-y-3">
              {POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <FlowCtaButton id="cta-btn-lots-bi" className="mt-8">
              Quero meu painel Lots
            </FlowCtaButton>
          </AnimatedSection>
        </div>
        <AnimatedSection className="mx-auto mt-10 max-w-6xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg">
            <picture>
              <source srcSet="/lots-bi/hero-dashboards.webp" type="image/webp" />
              <img
                src="/lots-bi/hero-dashboards.png"
                alt="Dashboards por plataforma na Lots BI"
                width={1024}
                height={563}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </picture>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
