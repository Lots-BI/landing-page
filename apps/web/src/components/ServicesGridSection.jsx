import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { LotsBIWordmark } from './LotsBIWordmark.jsx';

const SERVICES = [
  {
    title: 'Tráfego Pago',
    caption: 'Google Ads e Meta Ads gerando demanda todo dia.',
    photo: '/services/trafego-pago.webp',
  },
  {
    title: 'Social Media',
    caption: 'Conteúdo e criativos pensados pra parar o scroll.',
    photo: '/services/social-media.webp',
  },
  {
    title: 'Desenvolvimento',
    caption: 'Landing pages e sites feitos pra converter.',
    photo: '/services/desenvolvimento.webp',
  },
  {
    title: 'Gestão de Redes',
    caption: 'Perfis cuidados e respondidos todos os dias.',
    photo: '/services/gestao-redes.webp',
  },
];

export function ServicesGridSection() {
  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="mx-auto mb-12 max-w-2xl md:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] rgb-gradient-text">
            Serviços
          </p>
          <h2 className="mb-4 font-display text-3xl font-black text-foreground text-balance md:text-5xl">
            Tudo que a Lots coloca no ar para o seu negócio.
          </h2>
          <div className="mb-5 h-1 w-12 bg-brand-gradient" aria-hidden="true" />
          <p className="text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            Unimos mídia paga, página de conversão e criativo numa única operação — tudo isso
            dentro de 1 única mensalidade!
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
          {SERVICES.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.06} className="h-full">
              <div className="group relative flex h-full aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-border [contain:layout_paint]">
                <img
                  src={service.photo}
                  srcSet={`${service.photo.replace('.webp', '-320.webp')} 320w, ${service.photo} 480w`}
                  sizes="(min-width: 1024px) 204px, (min-width: 640px) 33vw, 50vw"
                  alt=""
                  aria-hidden="true"
                  width={480}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 bg-white/30 backdrop-blur-lg transition-all duration-300 group-hover:bg-white/15 group-hover:backdrop-blur-sm"
                  aria-hidden="true"
                />

                <p
                  className="relative z-10 px-3 text-center font-display text-base font-bold text-white md:text-lg"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.65)' }}
                >
                  {service.title}
                </p>

                <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-white p-3 text-center shadow-[0_-8px_24px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out group-hover:translate-y-0 md:p-4">
                  <p className="text-xs leading-snug text-neutral-700 md:text-sm">
                    {service.caption}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}

          <AnimatedSection delay={SERVICES.length * 0.06} className="col-span-2 h-full">
            <div className="group relative flex h-full min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#A855F7]/15 via-background to-[#60A5FA]/15 [contain:layout_paint]">
              <LotsBIWordmark size="lg" />

              <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-white p-3 text-center shadow-[0_-8px_24px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out group-hover:translate-y-0 md:p-4">
                <p className="text-xs leading-snug text-neutral-700 md:text-sm">
                  A plataforma por trás dos seus dashboards e CRM — tudo incluso na mensalidade.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
