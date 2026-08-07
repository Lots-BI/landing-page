export const ORCAMENTO_PATH = '/orcamento';
export const ORCAMENTO_OBRIGADO_PATH = '/orcamento/obrigado';

const STORAGE_KEY = 'lots_orcamento_conversion';

/**
 * Persists WhatsApp payload so /orcamento/obrigado survives refresh
 * and still opens the correct prefilled message.
 */
export function saveOrcamentoConversion({ whatsappUrl, formId, formName }) {
  if (typeof window === 'undefined' || !whatsappUrl) return;
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        whatsappUrl,
        formId: formId || 'orcamento_quiz',
        formName: formName || 'Orçamento briefing dedicado',
        savedAt: Date.now(),
      }),
    );
  } catch {
    // ignore quota / private mode
  }
}

export function readOrcamentoConversion() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.whatsappUrl) return null;
    // Discard stale payloads (2h)
    if (data.savedAt && Date.now() - data.savedAt > 2 * 60 * 60 * 1000) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function clearOrcamentoConversion() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
