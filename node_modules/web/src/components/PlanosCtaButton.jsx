import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils.js';
import { MessageCircle } from 'lucide-react';
import { ORCAMENTO_PATH } from '@/lib/orcamentoConversion.js';

export { ORCAMENTO_PATH, ORCAMENTO_OBRIGADO_PATH } from '@/lib/orcamentoConversion.js';
export {
  saveOrcamentoConversion,
  readOrcamentoConversion,
  clearOrcamentoConversion,
} from '@/lib/orcamentoConversion.js';

/**
 * Navega para a página dedicada de orçamento / briefing.
 * @param {Function} navigate - react-router navigate
 * @param {{ returnToId?: string | null, returnScrollY?: number | null }} [options]
 */
export function goToOrcamento(navigate, options = {}) {
  const state = {
    returnToId: options.returnToId || null,
    returnScrollY:
      typeof options.returnScrollY === 'number'
        ? options.returnScrollY
        : typeof window !== 'undefined'
          ? window.scrollY
          : 0,
  };

  if (typeof navigate === 'function') {
    navigate(ORCAMENTO_PATH, { state });
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

  const handleClick = (event) => {
    const button = event.currentTarget;
    const returnToId =
      id ||
      button.id ||
      button.closest('section[id], [id^="cta-"]')?.id ||
      null;

    goToOrcamento(navigate, {
      returnToId,
      returnScrollY: window.scrollY,
    });
  };

  return (
    <button
      type="button"
      id={id}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]',
        className,
      )}
      {...props}
    >
      {showIcon ? <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
