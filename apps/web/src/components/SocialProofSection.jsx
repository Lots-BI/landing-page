import React from 'react';
import { FlowCtaButton } from '@/components/FlowCtaButton.jsx';
import { AnimatedSection } from '@/components/AnimatedSection.jsx';

const RAFA = {
  name: 'Rafa Teo Ferreira',
  subtitle: 'Corretor',
  text: 'O que mais me motiva a continuar com a Lots, é a qualidade dos leads que chegam ao meu CRM!',
  image: '/testimonials/rafa-teo.webp',
};

export function SocialProofSection() {
  return (
    <section
      id="resultados"
      className="cv-auto relative z-10 scroll-mt-24 border-t border-border py-16 md:scroll-mt-28 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-2xl font-medium leading-snug text-foreground text-balance md:text-4xl">
              “{RAFA.text}”
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              <img
                src={RAFA.image}
                alt={RAFA.name}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 rounded-full object-cover ring-1 ring-white/15"
              />
              <div className="text-left">
                <p className="font-display text-lg font-semibold text-foreground">{RAFA.name}</p>
                <p className="text-sm text-muted-foreground">{RAFA.subtitle}</p>
              </div>
            </figcaption>
          </figure>
        </AnimatedSection>

        <AnimatedSection className="mt-10 flex justify-center">
          <FlowCtaButton id="cta-btn-resultados">
            Quero leads assim
          </FlowCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
