import React from 'react';
import { Palette, CalendarDays, LineChart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export function ContentCreationSection() {
  const { content } = useEditableContent();
  const c = content.contentCreation;

  // 3 pilares fáceis de ler de relance (consolida os 6 tópicos)
  const pillars = [
    {
      icon: Palette,
      label: '01',
      title: 'Criar',
      desc: 'Visual e posts com identidade clara — feitos para reter atenção.',
      topics: [c.c2Title, c.c3Title].filter(Boolean),
    },
    {
      icon: CalendarDays,
      label: '02',
      title: 'Publicar',
      desc: 'Calendário e agendamento no ritmo certo — sem operação bagunçada.',
      topics: [c.c1Title, c.c5Title].filter(Boolean),
    },
    {
      icon: LineChart,
      label: '03',
      title: 'Otimizar',
      desc: 'O que performa escala. O que não performa sai do jogo.',
      topics: [c.c4Title, c.c6Title].filter(Boolean),
    },
  ];

  return (
    <section className="py-16 md:py-24 relative bg-transparent z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 font-display text-balance">
            {c.title.split(/(Conteúdo|Design)/).map((part, i) =>
              ['Conteúdo', 'Design'].includes(part) ? (
                <span key={i} className="rgb-gradient-text">
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

        {/* 3 pilares — leitura imediata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <AnimatedSection key={pillar.title} delay={idx * 0.08} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <Icon className="w-5 h-5 text-primary shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {pillar.label}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-display">
                  {pillar.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                  {pillar.desc}
                </p>
                <p className="text-xs text-foreground/55 tracking-wide">
                  {pillar.topics.join(' · ')}
                </p>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Capacidade em uma linha limpa — sem cards */}
        <AnimatedSection className="max-w-4xl mx-auto mt-14 md:mt-16 pt-10 border-t border-white/10">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {[c.c1Title, c.c2Title, c.c3Title, c.c4Title, c.c5Title, c.c6Title]
              .filter(Boolean)
              .map((label) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/70" aria-hidden="true" />
                  {label}
                </li>
              ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
