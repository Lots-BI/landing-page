import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils.js';
import { MessageCircle } from 'lucide-react';

export const ORCAMENTO_PATH = '/orcamento';

/** Navega para a página dedicada de orçamento / briefing. */
export function goToOrcamento(navigate) {
  if (typeof navigate === 'function') {
    navigate(ORCAMENTO_PATH);
    return;
  }
  window.location.assign(ORCAMENTO_PATH);
}

/**
 * CTA de marketing: abre a página de orçamento em etapas (/orcamento).
 */
export function PlanosCtaButton({
  className,
  children,
  showIcon = true,
  id,
  ...props
}) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      id={id}
      onClick={() => goToOrcamento(navigate)}
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
