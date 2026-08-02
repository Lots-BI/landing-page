import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';

const FEATURED = {
  name: 'Davi',
  subtitle: 'Imobiliária',
  text: 'Não recebi só anúncios — recebi uma operação de vendas pronta. O impacto no faturamento veio rápido, e a previsibilidade que tenho hoje é o que eu buscava.',
  image: '/testimonials/davi.png',
  imageAlt: 'Davi',
};

const SUPPORTING = [
  {
    name: 'Rafa Teo Ferreira',
    subtitle: 'Corretor de Imóveis',
    text: 'Funil e conteúdo mudaram o jogo. Fluxo constante de leads qualificados e autoridade real na região.',
    image:
      'https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/2df69df40b13ddd43110598a01ec3b8b.png',
    imageAlt: 'Rafa Teo Ferreira',
  },
  {
    name: 'Antena Imobiliária',
    subtitle: 'Imobiliária',
    text: 'Conteúdo + funil geraram volume diário de interessados e crescimento orgânico além do esperado.',
    image: '/testimonials/antena-imobiliaria.png',
    imageAlt: 'Antena Imobiliária',
  },
];

export default function ResultadosDiretosSection() {
  return (
    <section
      id="resultados-diretos"
      className="py-20 md:py-28 bg-transparent relative z-10 border-y border-border"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Resultados
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-display text-balance tracking-tight">
            Quem já <span className="text-primary">opera</span> com a Lots
          </h2>
        </AnimatedSection>

        {/* Featured — autoridade máxima, sem card */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-foreground leading-snug md:leading-snug text-balance">
            “{FEATURED.text}”
          </blockquote>
          <div className="mt-10 flex flex-col items-center gap-3">
            <img
              src={FEATURED.image}
              alt={FEATURED.imageAlt}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="w-14 h-14 rounded-full object-cover ring-1 ring-white/15"
            />
            <div>
              <p className="font-semibold text-foreground font-display">{FEATURED.name}</p>
              <p className="text-sm text-muted-foreground">{FEATURED.subtitle}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Supporting — lista leve alinhada */}
        <ul className="max-w-3xl mx-auto border-t border-white/10">
          {SUPPORTING.map((item) => (
            <li
              key={item.name}
              className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 py-8 border-b border-white/10 items-start"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10 shrink-0 mt-0.5"
              />
              <blockquote className="text-sm md:text-base text-muted-foreground leading-relaxed text-left">
                “{item.text}”
              </blockquote>
              <div className="col-start-2 sm:col-start-3 sm:text-right self-center">
                <p className="text-sm font-medium text-foreground font-display">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
