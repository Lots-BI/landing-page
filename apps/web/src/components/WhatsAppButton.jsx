import React from 'react';
import { useUTMs } from '@/hooks/useUTMs.js';
import { cn } from '@/lib/utils.js';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({
  phoneNumber = '5511973290438',
  baseMessage = 'Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?',
  className,
  children,
  showIcon = true,
}) {
  const { appendUtmsToMessage } = useUTMs();
  const encodedMessage = encodeURIComponent(appendUtmsToMessage(baseMessage));
  const link = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      id="zapbutton"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-800/30 active:scale-[0.98]',
        className,
      )}
    >
      {showIcon ? <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" /> : null}
      {children}
    </a>
  );
}
