import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { FlowCtaButton } from './FlowCtaButton.jsx';
import { ZoomablePrint, printSources } from './ZoomablePrint.jsx';

const PRINT = printSources('/lots-bi/hero-dashboards');

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
            <div className="mt-8 flex justify-center">
              <FlowCtaButton id="cta-btn-lots-bi">
                Quero meu painel Lots
              </FlowCtaButton>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection className="mx-auto mt-10 max-w-6xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg">
            <ZoomablePrint src={PRINT.zoomSrc} alt="Dashboards por plataforma na Lots BI">
              <img
                src={PRINT.src}
                srcSet={PRINT.srcSet}
                sizes="(min-width: 1200px) 1152px, 100vw"
                alt=""
                width={4002}
                height={2201}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </ZoomablePrint>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
