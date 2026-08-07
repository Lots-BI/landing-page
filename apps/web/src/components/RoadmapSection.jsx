import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { LotsBIIcon } from './LotsBIWordmark.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export function RoadmapSection() {
  const { content } = useEditableContent();
  const r = content.roadmap;

  const stages = [
    { title: r.s1Title, desc: r.s1Desc },
    { title: r.s2Title, desc: r.s2Desc },
    { title: r.s3Title, desc: r.s3Desc },
    { title: r.s4Title, desc: r.s4Desc },
    { title: r.s5Title, desc: r.s5Desc },
  ];

  return (
    <section
      className="py-16 md:py-24 relative bg-transparent border-y border-border overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-14 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Metodologia
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 font-display text-balance inline-flex items-center justify-center gap-3 flex-wrap">
            <LotsBIIcon
              size="xl"
              className="!h-12 !w-12 md:!h-14 md:!w-14"
              aria-hidden="true"
            />
            <span>
              Método <span className="text-primary">Lots</span>
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
            {r.subtitle}
          </p>
        </AnimatedSection>

        <ol className="max-w-2xl mx-auto">
          {stages.map((stage, idx) => {
            const isLast = idx === stages.length - 1;
            const num = String(idx + 1).padStart(2, '0');
            return (
              <li key={stage.title || idx} className="relative flex gap-5 md:gap-8">
                <div className="flex flex-col items-center shrink-0">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background text-xs font-semibold tracking-wider text-primary font-display">
                    {num}
                  </span>
                  {!isLast ? (
                    <span
                      className="w-px flex-1 min-h-[3rem] bg-gradient-to-b from-primary/40 via-white/10 to-transparent"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>

                <AnimatedSection
                  delay={idx * 0.07}
                  className={isLast ? 'pb-0' : 'pb-10 md:pb-12'}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 font-display pt-1.5">
                    {stage.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                    {stage.desc}
                  </p>
                </AnimatedSection>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
