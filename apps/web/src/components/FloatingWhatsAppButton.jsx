import React, { useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { useUTMs } from '@/hooks/useUTMs.js';

const FloatingWhatsAppButton = () => {
  const { appendUtmsToMessage } = useUTMs();

  const href = useMemo(() => {
    const message = appendUtmsToMessage(
      'Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?'
    );
    return `https://wa.me/5511973290438?text=${encodeURIComponent(message)}`;
  }, [appendUtmsToMessage]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale Conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-800 px-4 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-700 active:scale-95 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden font-medium md:inline-block">Fale Conosco</span>
    </a>
  );
};

export default FloatingWhatsAppButton;
