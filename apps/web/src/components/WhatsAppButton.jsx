import React from 'react';
import { useUTMs } from '@/hooks/useUTMs.js';
import { cn } from '@/lib/utils.js';

export function WhatsAppButton({ 
  phoneNumber = "5511973290438", 
  baseMessage = "Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?", 
  className, 
  children 
}) {
  const getUTMs = useUTMs();
  // Call useUTMs to ensure tracking functionality is maintained
  getUTMs();

  const encodedMessage = encodeURIComponent(baseMessage);
  
  const link = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      id="zapbutton"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 active:scale-[0.98]",
        className
      )}
    >
      {children}
    </a>
  );
}