import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { FlowCtaButton } from './FlowCtaButton.jsx';
import { ZoomablePrint, printSources } from './ZoomablePrint.jsx';

const PRINT = printSources('/results/agencia-visao-geral');

export default function NossoMetodoSection() {
  return (
    <section
      id="nosso-metodo"
      className="relative z-10 overflow-hidden border-t border-white/10 py-16 md:py-24"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <AnimatedSection className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <h2 className="mb-4 font-display text-3xl font-black text-foreground text-balance md:text-5xl">
            Tráfego, redes e página no mesmo time.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            Você contrata a gestão. A Lots BI entra junto, sem custo extra no contrato.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg">
            <ZoomablePrint src={PRINT.zoomSrc} alt="Visão geral do tráfego gerido pela Lots nos últimos 90 dias">
              <img
                src={PRINT.src}
                srcSet={PRINT.srcSet}
                sizes="(min-width: 1200px) 1152px, 100vw"
                alt=""
                width={4000}
                height={2600}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </ZoomablePrint>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-8 text-center">
          <FlowCtaButton id="cta-btn-metodo">
            Quero meu painel Lots
          </FlowCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
