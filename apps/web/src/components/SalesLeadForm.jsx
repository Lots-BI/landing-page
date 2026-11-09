import React, { useState } from 'react';
import { Input } from '@/components/ui/input.jsx';
import { saveLandingLead } from '@/lib/landingLeads.js';
import { trackLeadFormSubmit } from '@/lib/analytics.js';

const FORM_ID = 'cta-lead-form';
const FORM_NAME = 'Landing vendas';

export function SalesLeadForm() {
  const [form, setForm] = useState({ nome: '', email: '', instagram: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const validate = () => {
    const nome = form.nome.trim();
    const email = form.email.trim();
    const instagram = form.instagram.trim();

    if (!nome) return 'Informe seu nome';
    if (!email && !instagram) return 'Informe e-mail ou Instagram';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Informe um e-mail válido';
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
    setError('');

    try {
      await saveLandingLead({
        nome: form.nome.trim(),
        email: form.email.trim() || undefined,
        instagram: form.instagram.trim() || undefined,
      });
      trackLeadFormSubmit({ formId: FORM_ID, formName: FORM_NAME });
      setDone(true);
    } catch (err) {
      setError(err?.message || 'Não foi possível enviar. Tente novamente.');
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="space-y-3 py-6 text-center" role="status">
        <p className="font-display text-2xl font-bold text-foreground">Recebemos seu contato.</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Em breve a Lots fala com você para agendar a reunião.
        </p>
      </div>
    );
  }

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
        {submitting ? 'Enviando…' : 'Falar com a Lots'}
      </button>
      <div className="flex flex-wrap justify-center gap-3 pt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>Dados protegidos</span>
        <span aria-hidden="true">·</span>
        <span>Reunião sem compromisso</span>
      </div>
    </form>
  );
}
