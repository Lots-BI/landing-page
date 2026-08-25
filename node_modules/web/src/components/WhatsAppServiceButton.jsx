import React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WhatsAppServiceButton({ selectedServices, whatsappNumber }) {
  const hasSelection = selectedServices && selectedServices.length > 0;

  const handleWhatsAppClick = () => {
    if (!hasSelection) return;

    const serviceNames = selectedServices.map(s => s.title).join(', ');
    const message = `Olá, estive no site e gostaria de saber um pouco mais sobre os seus serviços de: ${serviceNames}.`;
    const encodedMessage = encodeURIComponent(message);
    
    const url = `https://wa.me/5511973290438?text=${encodedMessage}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      className={cn(
        "zapbutton w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300",
        hasSelection 
          ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer" 
          : "bg-white/5 text-muted-foreground border border-white/10 cursor-not-allowed opacity-70"
      )}
      onClick={handleWhatsAppClick}
      disabled={!hasSelection}
    >
      <MessageCircle className={cn("w-6 h-6", hasSelection ? "animate-pulse" : "")} />
      {hasSelection ? 'Enviar via WhatsApp' : 'Selecione um serviço'}
    </button>
  );
}