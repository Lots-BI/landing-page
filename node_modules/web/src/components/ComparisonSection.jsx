import React from 'react';
import { Check, X } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { PlanosCtaButton } from './PlanosCtaButton.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { cn } from '@/lib/utils';

function Chip({ tone, icon: Icon, children }) {
  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-xl border px-3 py-2.5 sm:px-3.5 sm:py-3 min-h-[3.25rem]',
        tone === 'ours'
          ? 'border-primary/35 bg-primary/10'
          : 'border-white/10 bg-white/[0.03]',
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
          tone === 'ours'
            ? 'bg-primary/25 text-primary'
            : 'bg-white/5 text-muted-foreground/50',
        )}
      >
        <Icon className="h-3 w-3" aria-hidden="true" strokeWidth={tone === 'ours' ? 2.5 : 2} />
      </span>
      <p
        className={cn(
          'text-xs sm:text-sm leading-snug',
          tone === 'ours'
            ? 'text-foreground font-medium'
            : 'text-muted-foreground/65 line-through decoration-white/20',
        )}
      >
        {children}
      </p>
    </div>
  );
}

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
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Comparativo direto
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 font-display text-balance">
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

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-[1fr_1fr] gap-2 sm:gap-3 mb-3 px-0.5">
            <p className="text-center text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground/60 font-medium">
              Mercado
            </p>
            <p className="text-center text-[10px] sm:text-xs uppercase tracking-[0.18em] text-primary font-medium truncate">
              {brand}
            </p>
          </div>

          <ul className="space-y-4">
            {features.map((feat, idx) => (
              <AnimatedSection key={feat.name || idx} delay={idx * 0.05}>
                <li>
                  <p className="mb-2 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-muted-foreground text-center">
                    {feat.name}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Chip tone="market" icon={X}>
                      {feat.common}
                    </Chip>
                    <Chip tone="ours" icon={Check}>
                      {feat.ours}
                    </Chip>
                  </div>
                </li>
              </AnimatedSection>
            ))}
          </ul>

          <AnimatedSection className="mt-10 text-center">
            <p className="text-sm md:text-base text-muted-foreground italic text-balance max-w-xl mx-auto mb-8">
              Se o mercado à esquerda parece familiar, o problema não é esforço — é sistema.
            </p>
            <PlanosCtaButton
              id="cta-btn-comparacao"
              className="text-base md:text-lg px-8 md:px-10 py-4 shadow-md hover:shadow-lg"
            >
              Quero a operação Lots
            </PlanosCtaButton>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
