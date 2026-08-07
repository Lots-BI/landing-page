import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { PlanosCtaButton } from './PlanosCtaButton.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

const MEMBERS = [
  {
    name: 'Leandro',
    roleKey: 'founder1Role',
    image: '/team/leandro-majr.png',
    imageAlt: 'Leandro',
    objectPosition: 'object-[center_40%]',
  },
  {
    name: 'Rafaela',
    roleKey: 'founder2Role',
    image:
      'https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/cff80b7598ead1aa5119b5da37e5ad16.jpg',
    imageAlt: 'Rafaela',
    objectPosition: 'object-[center_42%]',
  },
];

export default function TeamSection() {
  const { content } = useEditableContent();
  const team = content.team;

  return (
    <section
      className="py-20 md:py-28 relative z-10 border-y border-border bg-transparent"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-14 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Equipe
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-display tracking-tight text-balance">
            {team.title}
          </h2>
          {team.subtitle ? (
            <p className="mt-5 text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
              {team.subtitle}
            </p>
          ) : null}
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14 max-w-4xl mx-auto">
          {MEMBERS.map((member, index) => (
            <AnimatedSection
              key={member.name}
              delay={index * 0.08}
              className="flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[3/4] max-h-[480px] overflow-hidden bg-black/20">
                <img
                  src={member.image}
                  alt={member.imageAlt}
                  width={480}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover ${member.objectPosition || 'object-center'}`}
                />
              </div>
              <p className="mt-6 text-xl md:text-2xl font-semibold text-foreground font-display">
                {member.name}
              </p>
              <p className="mt-1 text-sm md:text-base text-muted-foreground">
                {team[member.roleKey]}
              </p>
            </AnimatedSection>
          ))}
        </div>

        {team.together ? (
          <AnimatedSection className="max-w-2xl mx-auto text-center mt-12 md:mt-16">
            <div
              className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
              aria-hidden="true"
            />
            <blockquote className="text-base md:text-lg text-muted-foreground text-balance leading-relaxed italic">
              {team.together}
            </blockquote>
          </AnimatedSection>
        ) : null}

        <AnimatedSection className="flex justify-center mt-12 md:mt-14">
          <PlanosCtaButton className="text-base md:text-lg px-8 md:px-10 py-4 shadow-[0_0_30px_hsla(142,71%,25%,0.35)] hover:shadow-[0_0_40px_hsla(142,71%,25%,0.5)]">
            Quero estruturar meu marketing
          </PlanosCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
