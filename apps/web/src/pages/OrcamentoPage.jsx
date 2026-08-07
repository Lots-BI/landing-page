import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO.jsx';
import { LotsBIWordmark } from '@/components/LotsBIWordmark.jsx';
import ServicesPricing from '@/components/ServicesPricing.jsx';
import { useUTMs } from '@/hooks/useUTMs.js';

export default function OrcamentoPage() {
  useUTMs();

  return (
    <div className="min-h-screen relative bg-transparent">
      <SEO
        title="Orçamento"
        description="Monte seu briefing com a Agência Lots — escolha as atividades e receba uma proposta no WhatsApp."
        url="/orcamento"
      />

      <header className="relative z-10 pt-6 md:pt-8 pb-2">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/40 px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              Voltar ao início
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <Link
              to="/"
              className="inline-flex touch-target"
              aria-label="Voltar para a página inicial"
            >
              <LotsBIWordmark size="xl" />
            </Link>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Orçamento · Briefing comercial
            </p>
          </div>
        </div>
      </header>

      <div className="relative z-10 pb-16 md:pb-24">
        <ServicesPricing
          variant="standalone"
          sectionId="orcamento"
          formId="orcamento_quiz"
          formName="Orçamento briefing dedicado"
        />
      </div>
    </div>
  );
}
