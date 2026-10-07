import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog.jsx';
import { FlowCtaButton } from '@/components/FlowCtaButton.jsx';

const RAFA = {
  name: 'Rafa Teo Ferreira',
  subtitle: 'Corretor',
  text: 'O grande diferencial no meu caso é a estratégia que estamos aplicando, sempre que necessário reavaliamos e reimplementamos uma nova abordagem.',
  image: '/testimonials/rafa-teo.png',
};

const PRINTS = {
  meta: {
    name: 'Meta Ads',
    label: 'Meta Ads do Rafa Teo na Lots BI, últimos 90 dias',
    caption: 'Meta Ads · últimos 90 dias · na Lots BI',
    src: '/results/rafa-meta-ads.webp',
    fallback: '/results/rafa-meta-ads.png',
    width: 4000,
    height: 2600,
  },
  instagram: {
    name: 'Instagram',
    label: 'Instagram do Rafa Teo na Lots BI, últimos 90 dias',
    caption: 'Instagram · últimos 90 dias · na Lots BI',
    src: '/results/rafa-instagram.webp',
    fallback: '/results/rafa-instagram.png',
    width: 4000,
    height: 2600,
  },
};

export function SocialProofSection() {
  const [channel, setChannel] = useState('meta');
  const [open, setOpen] = useState(false);
  const print = PRINTS[channel];

  return (
    <section id="resultados" className="relative z-10 scroll-mt-24 border-t border-white/10 py-16 md:scroll-mt-28 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Resultados</p>

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

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 block w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 text-left shadow-lg"
        >
          <picture>
            <source srcSet={print.src} type="image/webp" />
            <img
              src={print.fallback}
              alt={print.label}
              width={print.width}
              height={print.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </picture>
          <span className="block px-4 py-3 text-xs text-muted-foreground">
            {print.caption}
          </span>
        </button>

        <FlowCtaButton id="cta-btn-resultados" className="mt-8">
          Quero resultados assim
        </FlowCtaButton>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl bg-background p-3">
          <img src={print.fallback} alt={print.label} className="h-auto w-full rounded-lg" />
        </DialogContent>
      </Dialog>
    </section>
  );
}
