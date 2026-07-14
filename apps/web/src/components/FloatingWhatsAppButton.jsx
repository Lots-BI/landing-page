import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5511973290438"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale Conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/90 active:scale-95 animate-pulse-glow md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden font-medium md:inline-block">Fale Conosco</span>
    </a>
  );
};

export default FloatingWhatsAppButton;