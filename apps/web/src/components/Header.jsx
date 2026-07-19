import React, { useState, useEffect } from 'react';
import { Menu, User, Sun, Moon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { WhatsAppButton } from './WhatsAppButton.jsx';
import { cn } from '@/lib/utils';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { useTheme } from 'next-themes';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useEditableContent();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { name: 'Início', id: 'solucao' },
    { name: 'Motivação', id: 'metodologia' },
    { name: 'Ecossistema', id: 'equipe' },
    { name: 'Audiência', id: 'planos' }
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled ? "bg-background/80 backdrop-blur-xl border-primary/20 py-2 md:py-4 shadow-2xl" : "bg-transparent border-transparent py-3 md:py-6"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between min-h-[48px] md:min-h-[56px]">
        {/* Logo */}
        <div 
          className="text-lg md:text-xl font-black tracking-tighter cursor-pointer text-foreground flex items-center gap-2 touch-target"
          onClick={() => scrollTo('hero')}
        >
          <img 
            src="https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/66624de7e895af08958ad9d08e9c0464.png" 
            alt="Lotus Logo" 
            className="w-8 h-8 rounded-full object-cover shadow-[0_0_15px_hsla(var(--primary)/0.5)]"
          />
          <span className="inline-block">Leandro MAJR</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:text-shadow-[0_0_10px_hsla(var(--primary)/0.8)] transition-all touch-target px-2"
            >
              {link.name}
            </button>
          ))}
          
           <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
             <button 
               aria-label="Alternar modo claro/escuro"
               className="p-2 rounded-full glass-interactive touch-target flex items-center justify-center"
               onClick={toggleTheme}
             >
               {theme === 'light' ? <Moon className="w-5 h-5 text-blue-300" /> : <Sun className="w-5 h-5 text-yellow-400" />}
             </button>
            
            <a 
              href="https://leandromajr.lovable.app" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ver Portfólio de Leandro MAJR"
              className="portfolio-btn touch-target text-muted-foreground hover:text-foreground"
            >
              <User className="w-4 h-4 text-primary" />
              <span>Área do Cliente</span>
            </a>
            
            <WhatsAppButton 
              phoneNumber="5511973290438"
              baseMessage="Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?"
              className="px-6 py-2 text-sm shadow-[0_0_15px_hsla(142,71%,45%,0.3)] hover:shadow-[0_0_20px_hsla(142,71%,45%,0.5)]"
            >
              {content.hero.cta}
            </WhatsAppButton>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="lg:hidden">
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
                  aria-label="Alternar modo claro/escuro"
                  className="p-3 rounded-full glass-interactive touch-target flex items-center justify-center"
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? <Moon className="w-5 h-5 text-blue-300" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                </button>
                
                <a 
                  href="https://leandromajr.lovable.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Ver Portfólio de Leandro MAJR"
                  className="portfolio-btn justify-center py-3 border border-white/5 text-foreground touch-target"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>Área do Cliente</span>
                </a>
                
                <WhatsAppButton 
                  phoneNumber="5511973290438"
                  baseMessage="Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?"
                  className="w-full px-6 py-3 text-sm shadow-[0_0_15px_hsla(142,71%,45%,0.3)] hover:shadow-[0_0_20px_hsla(142,71%,45%,0.5)]"
                >
                  {content.hero.cta}
                </WhatsAppButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
