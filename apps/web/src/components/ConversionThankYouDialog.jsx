import React, { useEffect, useRef } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx';
import { trackLeadFormSubmit } from '@/lib/analytics.js';

/**
 * Popup de agradecimento pós-formulário.
 * Dispara dataLayer `lead_form_submit` e abre o WhatsApp em seguida.
 * GTM: evento personalizado `lead_form_submit` OU visibilidade de `#conversion-thank-you`.
 */
export function ConversionThankYouDialog({
  open,
  onOpenChange,
  formId,
  formName,
  whatsappUrl,
  autoOpenWhatsApp = true,
}) {
  const trackedRef = useRef(false);
  const waOpenedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      trackedRef.current = false;
      waOpenedRef.current = false;
      return;
    }

    if (!trackedRef.current) {
      trackedRef.current = true;
      trackLeadFormSubmit({ formId, formName });
    }

    if (!autoOpenWhatsApp || !whatsappUrl || waOpenedRef.current) return;

    const timer = window.setTimeout(() => {
      if (waOpenedRef.current) return;
      waOpenedRef.current = true;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 450);

    return () => window.clearTimeout(timer);
  }, [open, formId, formName, whatsappUrl, autoOpenWhatsApp]);

  const openWhatsAppNow = () => {
    if (!whatsappUrl) return;
    waOpenedRef.current = true;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id="conversion-thank-you"
        data-gtm-conversion="lead_form_submit"
        data-form-id={formId}
        className="max-w-md border-white/10 bg-background/95 sm:rounded-2xl"
        aria-describedby="conversion-thank-you-desc"
      >
        <DialogHeader className="text-center sm:text-center items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <DialogTitle className="font-display text-2xl font-bold text-foreground">
            Recebemos seu briefing
          </DialogTitle>
          <DialogDescription
            id="conversion-thank-you-desc"
            className="text-muted-foreground text-base leading-relaxed"
          >
            Em seguida abrimos o WhatsApp. Se não abrir, use o botão abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-3">
          <button
            type="button"
            id="conversion-open-whatsapp"
            onClick={openWhatsAppNow}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 hover:bg-green-700 text-white font-bold h-12 px-6 transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            Continuar no WhatsApp
          </button>
          <button
            type="button"
            id="conversion-back-to-landing"
            onClick={() => onOpenChange?.(false)}
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-transparent hover:bg-white/5 text-foreground font-medium h-11 px-6 transition-colors"
          >
            Voltar à página
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
