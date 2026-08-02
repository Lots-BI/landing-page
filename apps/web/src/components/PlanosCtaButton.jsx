import React from 'react';
import { cn } from '@/lib/utils.js';
import { MessageCircle } from 'lucide-react';

export function scrollToPlanos() {
  const el = document.getElementById('planos');
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * CTA de marketing: leva ao início do formulário
 * "Qual Atividade Está Buscando?" (#planos).
 */
export function PlanosCtaButton({
  className,
  children,
  showIcon = true,
  id,
  ...props
}) {
  return (
    <button
      type="button"
      id={id}
      onClick={scrollToPlanos}
      className={cn(
        'inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-800/30 active:scale-[0.98]',
        className,
      )}
      {...props}
    >
      {showIcon ? <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
