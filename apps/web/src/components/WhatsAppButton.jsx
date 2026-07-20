import React from 'react';
import { useUTMs } from '@/hooks/useUTMs.js';
import { cn } from '@/lib/utils.js';

export function WhatsAppButton({ 
  phoneNumber = "5511973290438", 
  baseMessage = "Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?", 
  className, 
  children,
  type // Added type prop
}) {
  const getUTMs = useUTMs();
  getUTMs();

  const baseStyles = cn(
    "inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 active:scale-[0.98]",
    className
  );

  // If used inside a form as a submit button, render a native <button>
  if (type === 'submit' || type === 'button') {
    return (
      <button type={type} id="zapbutton" className={baseStyles}>
        {children}
      </button>
    );
  }

  // Otherwise, render the standard <a> tag link
  const encodedMessage = encodeURIComponent(baseMessage);
  const link = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      id="zapbutton"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={baseStyles}
    >
      {children}
    </a>
  );
}