import React from 'react';
import { User } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

export default function MobileMenu({ open, onOpenChange, navLinks, onNavigate, clientAreaUrl, clientAreaLabel }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="glass-heavy border-l-primary/20 w-[300px] p-6 flex flex-col bg-background/95 backdrop-blur-2xl">
        <SheetTitle className="text-left text-xl font-black mb-8 text-foreground flex items-center gap-2">
          Menu
        </SheetTitle>
        <nav className="flex flex-col gap-2 flex-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-3 touch-target w-full justify-start"
            >
              {link.name}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => onNavigate('formulario')}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-gradient px-4 text-sm font-semibold text-white"
          >
            Falar com a Lots
          </button>
          <a
            href={clientAreaUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={clientAreaLabel}
            className="portfolio-btn justify-center py-3 border border-white/5 text-foreground touch-target"
          >
            <User className="w-4 h-4 text-primary" />
            <span>Área do Cliente</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
