import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog.jsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.jsx';
import { LotsBIWordmark } from '@/components/LotsBIWordmark.jsx';
import { trackDownsellAccept, trackDownsellView } from '@/lib/salesEvents.js';
import { markDownsellAccepted } from '@/lib/downsellSession.js';

const WHATSAPP_PHONE = '5511973290438';

const OFFERS = {
  bi_diretrizes: {
    price: 'R$ 37,90',
    title: '3 meses de Lots BI + as diretrizes da sua marca',
    body: 'Acesso à Lots BI por 3 meses, mais a confecção das diretrizes da marca. Sem precisar da reunião de fechamento.',
    message: 'Olá, gostaria de 3 meses de acesso à Lots BI e também a confecção das diretrizes da minha marca por R$37,90',
  },
  diretrizes: {
    price: 'R$ 19,90',
    title: 'Diretrizes da sua marca',
    body: 'Só as diretrizes da marca. Entrega em 1 semana.',
    message: 'Olá, gostaria da produção das diretrizes da minha marca no valor de R$19,90!\nPoderia me enviar o modelo da Lots para eu ter uma ideia de como ficaria, por favor!',
  },
};

const EXAMPLES = [
  { id: 'exemplo-1', label: 'Exemplo 1', pages: 8 },
  { id: 'exemplo-2', label: 'Exemplo 2', pages: 8 },
  { id: 'exemplo-3', label: 'Exemplo 3', pages: 8 },
  { id: 'exemplo-4', label: 'Exemplo 4', pages: 8 },
];

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.location.assign(url);
}

function ExampleCarousel({ example }) {
  const pages = Array.from({ length: example.pages }, (_, index) => {
    const file = String(index + 1).padStart(2, '0');
    return `/diretrizes/${example.id}/${file}.webp`;
  });

  return (
    <Carousel key={example.id} className="w-full" opts={{ loop: false }}>
      <CarouselContent>
        {pages.map((src, index) => (
          <CarouselItem key={src}>
            <img
              src={src}
              alt={`${example.label}, slide ${index + 1}`}
              width={900}
              height={1270}
              decoding="async"
              className="mx-auto h-auto max-h-[46vh] w-auto rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1" />
      <CarouselNext className="right-1" />
    </Carousel>
  );
}

export function DownsellModal({ open, onOpenChange }) {
  const [step, setStep] = useState('bi_diretrizes');
  const [exampleId, setExampleId] = useState(EXAMPLES[0].id);

  useEffect(() => {
    if (!open) return;
    setStep('bi_diretrizes');
    setExampleId(EXAMPLES[0].id);
    trackDownsellView('bi_diretrizes_3790');
  }, [open]);
  const offer = OFFERS[step];
  const example = EXAMPLES.find((item) => item.id === exampleId) || EXAMPLES[0];

  const goToSecond = () => {
    setStep('diretrizes');
    trackDownsellView('diretrizes_1990');
  };

  const handleOpenChange = (next) => {
    if (next) return;
    if (step === 'bi_diretrizes') {
      goToSecond();
      return;
    }
    onOpenChange(false);
  };

  const accept = () => {
    const offerId = step === 'bi_diretrizes' ? 'bi_diretrizes_3790' : 'diretrizes_1990';
    trackDownsellAccept(offerId);
    markDownsellAccepted();
    openWhatsApp(offer.message);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto bg-background">
        <div className="relative flex justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.7),rgba(96,165,250,0.28)_42%,transparent_70%)] blur-2xl"
          />
          <LotsBIWordmark size="hero" layout="stack" className="relative gap-1" />
        </div>
        <DialogTitle className="font-display text-2xl font-black tracking-tight">
          {offer.title}
        </DialogTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">{offer.body}</p>
        <p className="font-display text-4xl font-black rgb-gradient-text">{offer.price}</p>

        {step === 'diretrizes' ? (
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {EXAMPLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setExampleId(item.id)}
                  className={
                    item.id === exampleId
                      ? 'min-h-[44px] rounded-lg bg-brand-gradient px-3 text-sm font-semibold text-white'
                      : 'min-h-[44px] rounded-lg border border-white/15 px-3 text-sm text-muted-foreground'
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
            <ExampleCarousel example={example} />
          </div>
        ) : null}

        <button
          type="button"
          onClick={accept}
          className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-brand-gradient text-base font-bold text-white"
        >
          Quero por {offer.price}
        </button>
        <button
          type="button"
          onClick={() => {
            if (step === 'bi_diretrizes') {
              goToSecond();
              return;
            }
            onOpenChange(false);
          }}
          className="inline-flex min-h-[44px] w-full items-center justify-center text-sm text-muted-foreground"
        >
          Não, obrigado
        </button>
      </DialogContent>
    </Dialog>
  );
}
