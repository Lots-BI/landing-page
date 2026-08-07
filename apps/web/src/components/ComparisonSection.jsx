import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { PlanosCtaButton } from './PlanosCtaButton.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export function ComparisonSection() {
  const { content } = useEditableContent();
  const c = content.comparison;
  const brand = content.hero.brand || 'Agência Lots';

  const features = [
    { name: c.f1Name, common: c.f1Common, ours: c.f1Majr },
    { name: c.f2Name, common: c.f2Common, ours: c.f2Majr },
    { name: c.f3Name, common: c.f3Common, ours: c.f3Majr },
    { name: c.f4Name, common: c.f4Common, ours: c.f4Majr },
    { name: c.f5Name, common: c.f5Common, ours: c.f5Majr },
  ];

  return (
    <section className="py-16 md:py-24 relative bg-transparent">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Comparativo direto
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 font-display text-balance">
            {c.title.split(/(Agência Lots)/).map((part, i) =>
              part === 'Agência Lots' ? (
                <span key={i} className="text-primary">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
            {c.subtitle}
          </p>
        </AnimatedSection>

        {/* Mesma grade 3 colunas no mobile e no desktop */}
        <div className="max-w-4xl mx-auto">
          <div
            className="grid grid-cols-3 gap-2 sm:gap-4 px-1 mb-3 text-[9px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em]"
            role="row"
          >
            <span className="text-muted-foreground/50">Frente</span>
            <span className="text-muted-foreground/50">Mercado</span>
            <span className="text-primary/80 truncate">{brand}</span>
          </div>

          <ul className="border-y border-white/10">
            {features.map((feat, idx) => (
              <AnimatedSection
                key={feat.name || idx}
                delay={idx * 0.06}
                className="border-b border-white/10 last:border-b-0"
              >
                <li className="grid grid-cols-3 gap-2 sm:gap-4 py-4 sm:py-6 md:py-7 items-start">
                  <p className="text-[11px] sm:text-sm font-medium text-foreground/90 font-display leading-snug">
                    {feat.name}
                  </p>

                  <p className="text-[11px] sm:text-sm text-muted-foreground/65 line-through decoration-white/25 leading-snug pr-1">
                    {feat.common}
                  </p>

                  <p className="text-[11px] sm:text-sm md:text-base text-foreground font-medium leading-snug">
                    {feat.ours}
                  </p>
                </li>
              </AnimatedSection>
            ))}
          </ul>

          <AnimatedSection className="mt-10 text-center">
            <p className="text-sm md:text-base text-muted-foreground italic text-balance max-w-xl mx-auto mb-8">
              Se o que você lê à esquerda parece familiar, o problema não é “falta de esforço” —
              é falta de sistema.
            </p>
            <PlanosCtaButton
              id="cta-btn-comparacao"
              className="text-base md:text-lg px-8 md:px-10 py-4 shadow-[0_0_30px_hsla(142,71%,25%,0.35)] hover:shadow-[0_0_40px_hsla(142,71%,25%,0.5)]"
            >
              Quero a operação Lots
            </PlanosCtaButton>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
