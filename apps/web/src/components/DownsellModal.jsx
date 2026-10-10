import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog.jsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.jsx';
import { LotsBIIcon, LotsBIWordmark } from '@/components/LotsBIWordmark.jsx';
import { ZoomablePrint } from '@/components/ZoomablePrint.jsx';
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
    title: 'Diretriz da sua marca',
    body: 'Só as diretrizes da marca. Entrega em 1 semana.',
    message: 'Olá, gostaria da produção das diretrizes da minha marca no valor de R$19,90!\nPoderia me enviar o modelo da Lots para eu ter uma ideia de como ficaria, por favor!',
  },
};

const EXAMPLE = { id: 'exemplo-3', label: 'Exemplo 3', pages: 8 };

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
            <ZoomablePrint
              src={src}
              alt={`${example.label}, slide ${index + 1}`}
              className="mx-auto w-fit"
            >
              <img
                src={src}
                alt=""
                width={900}
                height={1270}
                decoding="async"
                className="mx-auto h-auto max-h-[46vh] w-auto rounded-lg"
              />
            </ZoomablePrint>
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

  useEffect(() => {
    if (!open) return;
    setStep('bi_diretrizes');
    trackDownsellView('bi_diretrizes_3790');
  }, [open]);
  const offer = OFFERS[step];

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
        <div className="relative flex justify-center py-1">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.7),rgba(96,165,250,0.28)_42%,transparent_70%)] blur-2xl"
          />
          <LotsBIIcon size="hero" className="relative" />
        </div>
        <DialogTitle className="text-center font-display text-2xl font-semibold tracking-tight text-balance text-foreground/70">
          {step === 'bi_diretrizes' ? (
            <>
              3 meses de{' '}
              <LotsBIWordmark
                size="inline"
                showIcon={false}
                label="Lots BI"
                className="mx-1 inline-flex items-baseline align-baseline"
              />
              + as diretrizes da sua marca
            </>
          ) : (
            offer.title
          )}
        </DialogTitle>
        {step === 'bi_diretrizes' ? (
          <ZoomablePrint src="/lots-bi/plataformas.webp" alt="Mídia paga, orgânico e analytics na Lots BI">
            <img
              src="/lots-bi/plataformas.webp"
              alt=""
              width={793}
              height={708}
              decoding="async"
              className="h-auto w-full rounded-xl"
            />
          </ZoomablePrint>
        ) : null}
        {step === 'bi_diretrizes' ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{offer.body}</p>
        ) : null}
        <p className="text-center font-display text-4xl font-black rgb-gradient-text">{offer.price}</p>

        {step === 'diretrizes' ? (
          <div>
            <ExampleCarousel example={EXAMPLE} />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{offer.body}</p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={accept}
          className="inline-flex min-h-[68px] w-full items-center justify-center rounded-xl bg-brand-gradient text-lg font-bold text-white"
        >
          Quero
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
