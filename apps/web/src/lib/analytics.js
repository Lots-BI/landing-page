/**
 * GTM / Google Ads — lead conversion helpers.
 *
 * GTM setup (recomendado):
 * 1. Acionador → Evento personalizado → Nome do evento: lead_form_submit
 * 2. Tag Google Ads Conversion → esse acionador
 * 3. (Opcional) Acionador Visibilidade de elemento → CSS: #conversion-thank-you
 *
 * Variáveis de camada de dados úteis: form_id, form_name
 */

export function trackLeadFormSubmit({ formId, formName } = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'lead_form_submit',
    form_id: formId || 'unknown',
    form_name: formName || formId || 'unknown',
  });
}
