import React, { useState, useEffect } from 'react';
import { Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LotsBIWordmark } from './LotsBIWordmark.jsx';
import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/brand';

const CLIENT_AREA_URL = 'https://lotsbi.leandromajr.com';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    // rAF: sheet close / layout settle before measuring
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const navLinks = [
    { name: 'Plataforma', id: 'plataforma' },
    { name: 'Benefícios', id: 'formulario' },
    { name: 'Resultados', id: 'resultados' },
    { name: 'Equipe', id: 'equipe' },
  ];

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled ? "bg-background/80 backdrop-blur-xl border-white/10 py-2 md:py-4 shadow-lg" : "bg-transparent border-transparent py-3 md:py-6"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between min-h-[56px] md:min-h-[64px]">
        <div
          className="cursor-pointer touch-target flex items-center"
          onClick={() => scrollTo('hero')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollTo('hero');
            }
          }}
        >
          <LotsBIWordmark size="xl" />
        </div>

        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors touch-target px-2"
            >
              {link.name}
            </button>
          ))}

          <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
            <button
              type="button"
              onClick={() => scrollTo('formulario')}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-gradient px-4 text-sm font-semibold text-white"
            >
              Falar com a Lots
            </button>
            <a
              href={CLIENT_AREA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Área do Cliente — ${BRAND_NAME}`}
              className="portfolio-btn touch-target text-muted-foreground hover:text-foreground"
            >
              <User className="w-4 h-4 text-primary" />
              <span>Área do Cliente</span>
            </a>
          </div>
        </nav>

        <div className="xl:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="text-foreground p-2 touch-target" aria-label="Abrir menu">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="glass-heavy border-l-primary/20 w-[300px] p-6 flex flex-col bg-background/95 backdrop-blur-2xl">
              <SheetTitle className="text-left text-xl font-black mb-8 text-foreground flex items-center gap-2">
                Menu
              </SheetTitle>
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-3 touch-target w-full justify-start"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
              <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => scrollTo('formulario')}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-gradient px-4 text-sm font-semibold text-white"
                >
                  Falar com a Lots
                </button>
                <a
                  href={CLIENT_AREA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Área do Cliente — ${BRAND_NAME}`}
                  className="portfolio-btn justify-center py-3 border border-white/5 text-foreground touch-target"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>Área do Cliente</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
