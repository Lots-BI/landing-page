import React, { useState } from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { LotsBIIcon } from './LotsBIWordmark.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { cn } from '@/lib/utils';

export function RoadmapSection() {
  const { content } = useEditableContent();
  const r = content.roadmap;
  const [active, setActive] = useState(0);

  const stages = [
    { title: r.s1Title, desc: r.s1Desc },
    { title: r.s2Title, desc: r.s2Desc },
    { title: r.s3Title, desc: r.s3Desc },
    { title: r.s4Title, desc: r.s4Desc },
    { title: r.s5Title, desc: r.s5Desc },
  ];

  return (
    <section className="py-16 md:py-24 relative bg-transparent border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
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

        {/* Desktop / tablet: horizontal flow */}
        <div className="hidden sm:block max-w-5xl mx-auto">
          <ol className="relative flex items-start justify-between gap-2">
            <span
              className="absolute left-[6%] right-[6%] top-7 h-px bg-gradient-to-r from-primary/50 via-white/20 to-primary/50"
              aria-hidden="true"
            />
            {stages.map((stage, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const isActive = active === idx;
              return (
                <li key={stage.title || idx} className="relative z-10 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    onMouseEnter={() => setActive(idx)}
                    onFocus={() => setActive(idx)}
                    className="group w-full flex flex-col items-center text-center outline-none"
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-full border text-sm font-semibold tracking-wider font-display transition-all duration-300',
                        isActive
                          ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                          : 'border-white/15 bg-background text-primary group-hover:border-primary/50',
                      )}
                    >
                      {num}
                    </span>
                    <h3
                      className={cn(
                        'mt-4 text-sm md:text-base font-bold font-display transition-colors',
                        isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground',
                      )}
                    >
                      {stage.title}
                    </h3>
                  </button>
                </li>
              );
            })}
          </ol>

          <AnimatedSection className="mt-10 max-w-xl mx-auto text-center min-h-[4.5rem]">
            <p
              key={active}
              className="text-sm md:text-base text-muted-foreground leading-relaxed animate-in fade-in duration-300"
            >
              {stages[active]?.desc}
            </p>
          </AnimatedSection>
        </div>

        {/* Mobile: compact vertical stepper */}
        <ol className="sm:hidden max-w-sm mx-auto space-y-3">
          {stages.map((stage, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const isActive = active === idx;
            return (
              <li key={stage.title || idx}>
                <button
                  type="button"
                  onClick={() => setActive(idx)}
                  className={cn(
                    'w-full rounded-2xl border px-4 py-3.5 text-left transition-all',
                    isActive
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-white/10 bg-background/40',
                  )}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold font-display',
                        isActive
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-white/15 text-primary',
                      )}
                    >
                      {num}
                    </span>
                    <h3 className="text-base font-bold text-foreground font-display">
                      {stage.title}
                    </h3>
                  </div>
                  {isActive ? (
                    <p className="mt-2.5 pl-12 text-sm text-muted-foreground leading-relaxed">
                      {stage.desc}
                    </p>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
