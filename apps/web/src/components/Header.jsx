import React, { useEffect, useState } from 'react';
import { LotsBIWordmark } from './LotsBIWordmark.jsx';
import { cn } from '@/lib/utils';
import { useUTMs } from '@/hooks/useUTMs.js';
import { buildWhatsAppHref, WHATSAPP_PRESET_MESSAGE } from '@/lib/whatsapp.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { appendUtmsToMessage } = useUTMs();
  const [whatsappHref, setWhatsappHref] = useState(buildWhatsAppHref());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setWhatsappHref(buildWhatsAppHref(appendUtmsToMessage(WHATSAPP_PRESET_MESSAGE)));
  }, [appendUtmsToMessage]);

  const scrollToHero = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-white/10 bg-background/80 py-2 shadow-lg backdrop-blur-xl md:py-4'
          : 'border-transparent bg-transparent py-3 md:py-6',
      )}
    >
      <div className="container mx-auto flex min-h-[56px] items-center justify-between px-4 md:min-h-[64px] md:px-6">
        <div
          className="touch-target flex cursor-pointer items-center"
          onClick={scrollToHero}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToHero();
            }
          }}
        >
          <LotsBIWordmark size="xl" />
        </div>

        <a
          id="header-whatsapp"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center rounded-none bg-[#39FF14] px-4 text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_18px_rgba(57,255,20,0.45)] transition-colors hover:bg-[#5CFF4D]"
        >
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}
