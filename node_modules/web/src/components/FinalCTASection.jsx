import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { ConversionThankYouDialog } from './ConversionThankYouDialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { useUTMs } from '@/hooks/useUTMs.js';
import { cn } from '@/lib/utils';

const WHATSAPP_PHONE = '5511973290438';

const OBJECTIVES = [
  'Gerar leads qualificados',
  'Aumentar vendas',
  'Estruturar a operação',
  'Escalar com previsibilidade',
];

const emptyLead = {
  name: '',
  phone: '',
  goal: '',
};

function buildLeadMessage(form) {
  return [
    'Olá! Quero falar com a Agência Lots.',
    '',
    `Nome: ${form.name.trim()}`,
    `WhatsApp: ${form.phone.trim()}`,
    `Objetivo: ${form.goal}`,
    '',
    '[Fluxo: cta_lead_form]',
  ].join('\n');
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export default function FinalCTASection() {
  const { content } = useEditableContent();
  const { appendUtmsToMessage } = useUTMs();
  const m = content.motivational || {};

  const [form, setForm] = useState(emptyLead);
  const [error, setError] = useState('');
  const [conversionOpen, setConversionOpen] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Informe seu nome';
    if (form.phone.replace(/\D/g, '').length < 10) return 'Informe um WhatsApp válido';
    if (!form.goal) return 'Selecione o objetivo principal';
    return '';
  };

  const openWhatsAppDirect = (message) => {
    window.open(
      buildWhatsAppUrl(appendUtmsToMessage(message)),
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    const url = buildWhatsAppUrl(appendUtmsToMessage(buildLeadMessage(form)));
    setWhatsappUrl(url);
    setConversionOpen(true);
  };

  const handleSkip = () => {
    openWhatsAppDirect(
      'Olá! Prefiro falar direto no WhatsApp.\n\n[Fluxo: cta_skip_form]',
    );
  };

  return (
    <section id="cta" className="py-20 md:py-28 relative z-10 bg-transparent">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Próximo passo
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-display tracking-tight text-balance leading-[1.1]">
            {m.title}
          </h2>
          {m.subtitle ? (
            <p className="mt-5 text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
              {m.subtitle}
            </p>
          ) : null}
        </AnimatedSection>

        <AnimatedSection className="max-w-md mx-auto">
          <form
            id="cta-lead-form"
            onSubmit={handleSubmit}
            className="space-y-5 text-left"
            noValidate
          >
            <div>
              <label
                htmlFor="cta-name"
                className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground"
              >
                Nome
              </label>
              <Input
                id="cta-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                className="h-12 rounded-xl bg-background/40 border-white/10"
              />
            </div>

            <div>
              <label
                htmlFor="cta-phone"
                className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground"
              >
                WhatsApp
              </label>
              <Input
                id="cta-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChange={(e) => setField('phone', e.target.value)}
                className="h-12 rounded-xl bg-background/40 border-white/10"
              />
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Objetivo
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OBJECTIVES.map((goal) => {
                  const selected = form.goal === goal;
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setField('goal', goal)}
                      className={cn(
                        'rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 active:scale-[0.98]',
                        selected
                          ? 'border-primary bg-primary/20 text-foreground'
                          : 'border-white/10 bg-background/30 text-foreground/85 hover:border-primary/40 hover:bg-primary/10',
                      )}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              id="cta-whatsapp-footer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 hover:bg-green-700 text-white font-bold h-12 px-6 transition-all duration-300 shadow-lg hover:shadow-green-800/30 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              {m.cta || 'Quero um orçamento'}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleSkip}
                className="text-[11px] text-green-600/70 hover:text-green-500 underline-offset-2 hover:underline transition-colors"
              >
                Preferir falar direto no WhatsApp
              </button>
            </div>
          </form>
        </AnimatedSection>
      </div>

      <ConversionThankYouDialog
        open={conversionOpen}
        onOpenChange={setConversionOpen}
        formId="cta_lead_form"
        formName="CTA lead curto"
        whatsappUrl={whatsappUrl}
      />
    </section>
  );
}
