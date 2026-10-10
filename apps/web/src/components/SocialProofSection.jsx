import React, { useState } from 'react';
import { FlowCtaButton } from '@/components/FlowCtaButton.jsx';
import { ZoomablePrint, printSources } from '@/components/ZoomablePrint.jsx';

const RAFA = {
  name: 'Rafa Teo Ferreira',
  subtitle: 'Corretor',
  text: 'O grande diferencial no meu caso é a estratégia que estamos aplicando, sempre que necessário reavaliamos e reimplementamos uma nova abordagem.',
  image: '/testimonials/rafa-teo.webp',
};

const PRINTS = {
  meta: {
    name: 'Meta Ads',
    label: 'Meta Ads do Rafa Teo na Lots BI, últimos 90 dias',
    caption: 'Meta Ads · últimos 90 dias · na Lots BI',
    ...printSources('/results/rafa-meta-ads'),
    width: 4000,
    height: 2600,
  },
  instagram: {
    name: 'Instagram',
    label: 'Instagram do Rafa Teo na Lots BI, últimos 90 dias',
    caption: 'Instagram · últimos 90 dias · na Lots BI',
    ...printSources('/results/rafa-instagram'),
    width: 4000,
    height: 2600,
  },
};

export function SocialProofSection() {
  const [channel, setChannel] = useState('meta');
  const print = PRINTS[channel];

  return (
    <section id="resultados" className="cv-auto relative z-10 scroll-mt-24 border-t border-white/10 py-16 md:scroll-mt-28 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <figure className="max-w-3xl">
          <blockquote className="font-display text-2xl font-medium leading-snug text-foreground text-balance md:text-4xl">
            “{RAFA.text}”
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <img
              src={RAFA.image}
              alt={RAFA.name}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="h-14 w-14 rounded-full object-cover ring-1 ring-white/15"
            />
            <div>
              <p className="font-display text-lg font-semibold text-foreground">{RAFA.name}</p>
              <p className="text-sm text-muted-foreground">{RAFA.subtitle}</p>
            </div>
          </figcaption>
        </figure>

        <div className="mt-10 flex gap-2">
          {Object.entries(PRINTS).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setChannel(key)}
              className={
                channel === key
                  ? 'min-h-[44px] rounded-lg bg-brand-gradient px-4 text-sm font-semibold text-white'
                  : 'min-h-[44px] rounded-lg border border-white/15 px-4 text-sm text-muted-foreground'
              }
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg">
          <ZoomablePrint src={print.zoomSrc} alt={print.label}>
            <img
              src={print.src}
              srcSet={print.srcSet}
              sizes="(min-width: 1400px) 1352px, (min-width: 1280px) 1232px, 100vw"
              alt=""
              width={print.width}
              height={print.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </ZoomablePrint>
          <p className="px-4 py-3 text-xs text-muted-foreground">
            {print.caption}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <FlowCtaButton id="cta-btn-resultados">
            Quero resultados assim
          </FlowCtaButton>
        </div>
      </div>

    </section>
  );
}
