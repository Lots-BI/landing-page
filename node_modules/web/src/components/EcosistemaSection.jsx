import React from 'react';
import { LayoutDashboard, Target, MousePointerClick, Activity } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export function EcosistemaSection() {
  const { content } = useEditableContent();
  const e = content.ecosystem;

  const steps = [
    { icon: LayoutDashboard, title: e.c1Title, desc: e.c1Desc },
    { icon: Target, title: e.c2Title, desc: e.c2Desc },
    { icon: MousePointerClick, title: e.c3Title, desc: e.c3Desc },
    { icon: Activity, title: e.c4Title, desc: e.c4Desc },
  ];

  return (
    <section className="py-12 md:py-16 relative bg-transparent overflow-visible">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-3xl mx-auto mb-14 md:mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 font-display text-balance">
            {e.title.split(/(Digital|Inteligente)/i).map((part, i) =>
              /^(Digital|Inteligente)$/i.test(part) ? (
                <span key={i} className="rgb-gradient-text">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            {e.subtitle}
          </p>
        </AnimatedSection>

        {/* Connected flow — no cards */}
        <div className="max-w-3xl mx-auto">
          <ol className="relative space-y-0">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;
              return (
                <li key={step.title || idx} className="relative flex gap-5 md:gap-8">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" strokeWidth={1.75} />
                    </div>
                    {!isLast ? (
                      <div
                        className="w-px flex-1 min-h-[2.5rem] bg-gradient-to-b from-primary/50 via-secondary/40 to-primary/20"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>

                  <AnimatedSection
                    delay={idx * 0.08}
                    className={`pb-10 md:pb-12 ${isLast ? 'pb-0' : ''}`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 font-display">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                      {step.desc}
                    </p>
                  </AnimatedSection>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
