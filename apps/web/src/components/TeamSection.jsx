import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { FlowCtaButton } from './FlowCtaButton.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

// TODO: substituir as bios (lorem ipsum) pelo texto real do Leandro e da Rafaela.
const MEMBERS = [
  {
    name: 'Leandro',
    roleKey: 'founder1Role',
    image: '/team/leandro-majr.webp',
    imageAlt: 'Leandro',
    objectPosition: 'object-[center_40%]',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    name: 'Rafaela',
    roleKey: 'founder2Role',
    image: '/team/rafaela.webp',
    imageAlt: 'Rafaela',
    objectPosition: 'object-[center_42%]',
    bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
  },
];

export default function TeamSection() {
  const { content } = useEditableContent();
  const team = content.team;

  return (
    <section
      className="relative z-10 border-t border-border bg-transparent py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-14 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-display tracking-tight text-balance">
            {team.title}
          </h2>
          {team.subtitle ? (
            <p className="mt-5 text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
              {team.subtitle}
            </p>
          ) : null}
        </AnimatedSection>

        <div className="space-y-14 md:space-y-20 max-w-5xl mx-auto">
          {MEMBERS.map((member, index) => (
            <AnimatedSection
              key={member.name}
              delay={index * 0.08}
              className={`flex flex-col items-center gap-8 text-center md:gap-14 md:text-left ${
                index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div className="w-full shrink-0 overflow-hidden rounded-2xl md:w-2/5">
                <div className="aspect-[3/4]">
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
              </div>
              <div className="flex-1">
                <p className="text-xl md:text-2xl font-semibold text-foreground font-display">
                  {member.name}
                </p>
                <p className="mt-1 text-sm md:text-base text-muted-foreground">
                  {team[member.roleKey]}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {member.bio}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="flex justify-center mt-12 md:mt-14">
          <FlowCtaButton id="cta-btn-equipe">
            Quero minha operação Lots
          </FlowCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
