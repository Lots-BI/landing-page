import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input.jsx';
import {
  ORCAMENTO_OBRIGADO_PATH,
  saveOrcamentoConversion,
} from '@/lib/orcamentoConversion.js';
import { saveLandingLead } from '@/lib/landingLeads.js';
import { markLandingSubmitted } from '@/lib/downsellSession.js';

const WHATSAPP_PHONE = '5511973290438';
const FORM_ID = 'cta-lead-form';
const FORM_NAME = 'Landing vendas';

function buildMessage(form) {
  return [
    'Olá! Quero falar com a Lots.',
    '',
    `Nome: ${form.nome.trim()}`,
    `E-mail: ${form.email.trim()}`,
    `Instagram: ${form.instagram.trim()}`,
  ].join('\n');
}

export function SalesLeadForm({ onDecline }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', instagram: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const validate = () => {
    if (!form.nome.trim()) return 'Informe seu nome';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return 'Informe um e-mail válido';
    if (!form.instagram.trim()) return 'Informe seu Instagram';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    markLandingSubmitted();

    await saveLandingLead({
      nome: form.nome.trim(),
      email: form.email.trim(),
      instagram: form.instagram.trim(),
    });

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildMessage(form))}`;
    saveOrcamentoConversion({
      whatsappUrl: url,
      formId: FORM_ID,
      formName: FORM_NAME,
    });
    navigate(ORCAMENTO_OBRIGADO_PATH, {
      state: { whatsappUrl: url, formId: FORM_ID, formName: FORM_NAME },
    });
  };

  return (
    <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="lead-nome" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Nome
        </label>
        <Input
          id="lead-nome"
          name="nome"
          type="text"
          autoComplete="name"
          value={form.nome}
          onChange={(event) => setField('nome', event.target.value)}
          className="h-12 rounded-xl border-white/10 bg-background/40"
        />
      </div>
      <div>
        <label htmlFor="lead-email" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          E-mail
        </label>
        <Input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={form.email}
          onChange={(event) => setField('email', event.target.value)}
          className="h-12 rounded-xl border-white/10 bg-background/40"
        />
      </div>
      <div>
        <label htmlFor="lead-instagram" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Instagram
        </label>
        <Input
          id="lead-instagram"
          name="instagram"
          type="text"
          autoComplete="off"
          value={form.instagram}
          onChange={(event) => setField('instagram', event.target.value)}
          className="h-12 rounded-xl border-white/10 bg-background/40"
        />
      </div>
      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        id="cta-whatsapp-footer"
        disabled={submitting}
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-brand-gradient px-6 text-base font-bold text-white shadow-md disabled:opacity-70"
      >
        Falar com a Lots
      </button>
      <div className="flex flex-wrap justify-center gap-3 pt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>Dados protegidos</span>
        <span aria-hidden="true">·</span>
        <span>Reunião sem compromisso</span>
      </div>
      <button
        type="button"
        onClick={() => onDecline?.()}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 bg-white/[0.06] px-6 text-sm font-semibold text-foreground transition hover:border-white/45 hover:bg-white/[0.1]"
      >
        Não quero preencher agora
      </button>
    </form>
  );
}
