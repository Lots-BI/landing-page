import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO.jsx';
import { LotsBIWordmark } from '@/components/LotsBIWordmark.jsx';
import { trackLeadFormSubmit } from '@/lib/analytics.js';
import {
  ORCAMENTO_PATH,
  ORCAMENTO_OBRIGADO_PATH,
  clearOrcamentoConversion,
  readOrcamentoConversion,
} from '@/lib/orcamentoConversion.js';

const WA_REDIRECT_DELAY_MS = 900;

/**
 * Página de agradecimento pós-briefing.
 * URL estável para conversão GTM (page view) → em seguida abre o WhatsApp.
 */
export default function OrcamentoObrigadoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const trackedRef = useRef(false);
  const redirectedRef = useRef(false);

  const stored = readOrcamentoConversion();
  const whatsappUrl = location.state?.whatsappUrl || stored?.whatsappUrl || '';
  const formId = location.state?.formId || stored?.formId || 'orcamento_quiz';
  const formName =
    location.state?.formName || stored?.formName || 'Orçamento briefing dedicado';

  const [status, setStatus] = useState(whatsappUrl ? 'ready' : 'missing');

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    trackLeadFormSubmit({ formId, formName });
  }, [formId, formName]);

  useEffect(() => {
    if (!whatsappUrl || redirectedRef.current) return;

    const timer = window.setTimeout(() => {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      clearOrcamentoConversion();
      setStatus('redirecting');
      window.location.assign(whatsappUrl);
    }, WA_REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [whatsappUrl]);

  const openWhatsAppNow = () => {
    if (!whatsappUrl) return;
    redirectedRef.current = true;
    clearOrcamentoConversion();
    window.location.assign(whatsappUrl);
  };

  return (
    <div
      id="conversion-thank-you"
      data-gtm-conversion="lead_form_submit"
      data-form-id={formId}
      className="min-h-screen relative bg-transparent flex flex-col"
    >
      <SEO
        title="Obrigado"
        description="Recebemos seu briefing. Em instantes você será direcionado ao WhatsApp da Agência Lots."
        url={ORCAMENTO_OBRIGADO_PATH}
      />

      <header className="relative z-10 pt-8 md:pt-10 pb-2">
        <div className="container mx-auto px-4 md:px-6 flex justify-center">
          <Link to={ORCAMENTO_PATH} className="inline-flex touch-target" aria-label="Ir ao orçamento">
            <LotsBIWordmark size="xl" />
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Recebemos seu briefing
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
              {status === 'missing'
                ? 'Seu pedido foi registrado. Se quiser, fale conosco pelo WhatsApp ou volte ao início.'
                : 'Abrindo o WhatsApp com o resumo das suas respostas…'}
            </p>
          </div>

          {whatsappUrl ? (
            <button
              type="button"
              id="conversion-open-whatsapp"
              onClick={openWhatsAppNow}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 hover:bg-green-700 text-white font-bold h-12 px-6 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              Continuar no WhatsApp
            </button>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent hover:bg-white/5 text-foreground font-medium h-11 px-6 transition-colors"
            >
              Voltar ao início
            </button>
            <button
              type="button"
              onClick={() => navigate(ORCAMENTO_PATH)}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent hover:bg-white/5 text-foreground font-medium h-11 px-6 transition-colors"
            >
              Novo orçamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
