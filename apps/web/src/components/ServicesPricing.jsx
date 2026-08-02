import React, { useEffect, useMemo, useState } from 'react';
import {
  Target,
  Share2,
  Users,
  BarChart,
  RefreshCw,
  PenTool,
  FileText,
  Lightbulb,
  Eye,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection.jsx';
import { ConversionThankYouDialog } from '@/components/ConversionThankYouDialog.jsx';
import { ServiceSelectionCards } from './ServiceSelectionCards.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { useUTMs } from '@/hooks/useUTMs.js';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { cn } from '@/lib/utils';

const WHATSAPP_PHONE = '5511973290438';

const BUSINESS_TYPES = [
  'Prestador de serviço',
  'Clínica / saúde',
  'Infoproduto / educação',
  'E-commerce',
  'B2B / consultoria',
  'Outro',
];

const BUDGET_OPTIONS = [
  'Até R$ 2.000/mês',
  'R$ 2.000 – R$ 5.000/mês',
  'R$ 5.000 – R$ 10.000/mês',
  'R$ 10.000 – R$ 25.000/mês',
  'Acima de R$ 25.000/mês',
  'Ainda sem orçamento definido',
];

const CURRENT_STAGE = [
  'Ainda não faço marketing digital',
  'Faço sozinho / equipe interna',
  'Já anuncio, mas sem previsibilidade',
  'Tenho agência e quero trocar / complementar',
  'Quero estruturar do zero',
];

const MAIN_GOALS = [
  'Gerar leads qualificados',
  'Aumentar vendas / faturamento',
  'Escalar com previsibilidade',
  'Organizar operação e dados',
  'Fortalecer marca / autoridade',
];

const TIMELINE = [
  'Imediato (esta semana)',
  'Em até 30 dias',
  'Em 1–3 meses',
  'Só pesquisando por agora',
];

const emptyForm = {
  name: '',
  contactChannel: '',
  phone: '',
  email: '',
  company: '',
  businessType: '',
  budget: '',
  stage: '',
  goal: '',
  timeline: '',
  notes: '',
};

function buildWhatsAppMessage(selectedServices, form) {
  const services = selectedServices.map((s) => `• ${s.title}`).join('\n');
  const contact =
    form.contactChannel === 'email'
      ? `E-mail: ${form.email.trim()}`
      : `WhatsApp: ${form.phone.trim()}`;

  return [
    'Olá! Quero um orçamento da Agência Lots.',
    '',
    `Nome: ${form.name.trim()}`,
    `Empresa: ${form.company.trim()}`,
    contact,
    `Segmento: ${form.businessType}`,
    `Orçamento: ${form.budget}`,
    `Situação atual: ${form.stage}`,
    `Objetivo: ${form.goal}`,
    `Prazo: ${form.timeline}`,
    '',
    'Serviços de interesse:',
    services || '• (não informado)',
    form.notes.trim() ? `\nObservações:\n${form.notes.trim()}` : '',
    '',
    '[Fluxo: form_complete]',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildSkipFormMessage(selectedServices, phase) {
  const services = selectedServices.map((s) => `• ${s.title}`).join('\n');
  return [
    'Olá! Prefiro falar direto no WhatsApp antes de preencher o formulário.',
    '',
    `[Fluxo: skip_form | etapa: ${phase}]`,
    services
      ? `Atividades selecionadas:\n${services}`
      : 'Atividades selecionadas: nenhuma (pulou sem selecionar)',
  ].join('\n');
}

function ChoiceGrid({ options, value, onPick, columns = 1 }) {
  return (
    <div
      className={cn(
        'grid gap-3 w-full',
        columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1',
      )}
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onPick(opt.value)}
            className={cn(
              'rounded-2xl border px-5 py-4 text-left text-base font-medium transition-all duration-200 active:scale-[0.98]',
              selected
                ? 'border-primary bg-primary/20 text-foreground shadow-[0_0_24px_hsla(var(--primary)/0.25)]'
                : 'border-border/80 bg-background/50 text-foreground/90 hover:border-primary/50 hover:bg-primary/10',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

const ServicesPricing = () => {
  const { content } = useEditableContent();
  const { appendUtmsToMessage } = useUTMs();
  const s = content.serviceSelection || {};

  const [phase, setPhase] = useState('services'); // services | quiz
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [animKey, setAnimKey] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [conversionOpen, setConversionOpen] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const servicesList = useMemo(
    () => [
      { id: 's1', icon: Target, title: s.s1Title || 'Gestão de Tráfego Pago', desc: s.s1Desc || 'Anúncios de alta performance no Meta e Google Ads focados em ROI.' },
      { id: 's2', icon: Share2, title: s.s2Title || 'Social Media', desc: s.s2Desc || 'Posicionamento de marca premium e criação de autoridade.' },
      { id: 's3', icon: Users, title: s.s3Title || 'Gestão de Redes Sociais', desc: s.s3Desc || 'Administração completa para engajamento e crescimento.' },
      { id: 's4', icon: BarChart, title: s.s4Title || 'Análise de Campanhas', desc: s.s4Desc || 'Auditoria profunda para identificar gargalos e oportunidades.' },
      { id: 's5', icon: RefreshCw, title: s.s5Title || 'Aprimoramento Diário', desc: s.s5Desc || 'Otimização constante para garantir o menor custo por aquisição.' },
      { id: 's6', icon: PenTool, title: s.s6Title || 'Copywriting', desc: s.s6Desc || 'Textos persuasivos estruturados para conversão imediata.' },
      { id: 's7', icon: FileText, title: s.s7Title || 'Relatórios Semanais', desc: s.s7Desc || 'Dashboards atualizados e acompanhamento claro de KPIs.' },
      { id: 's8', icon: Lightbulb, title: s.s8Title || 'Criação de Estratégia', desc: s.s8Desc || 'Desenho do funil de vendas personalizado para o seu negócio.' },
      { id: 's9', icon: Eye, title: s.s9Title || 'Acompanhamento Diário', desc: s.s9Desc || 'Monitoramento contínuo da sua operação com ajustes e otimizações constantes para resultados crescentes.' },
    ],
    [s],
  );

  const quizSteps = useMemo(() => {
    const contactDetail =
      form.contactChannel === 'email'
        ? {
            id: 'email',
            title: 'Qual e-mail usamos?',
            hint: 'Vamos responder por aí se precisar detalhar o orçamento.',
            type: 'input',
            inputType: 'email',
            placeholder: 'voce@empresa.com',
            autoComplete: 'email',
            validate: (f) =>
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())
                ? ''
                : 'Informe um e-mail válido',
          }
        : {
            id: 'phone',
            title: 'Qual o seu WhatsApp?',
            hint: 'Usamos só para o retorno do briefing.',
            type: 'input',
            inputType: 'tel',
            placeholder: '(11) 99999-9999',
            autoComplete: 'tel',
            validate: (f) =>
              f.phone.replace(/\D/g, '').length >= 10
                ? ''
                : 'Informe um WhatsApp válido',
          };

    return [
      {
        id: 'name',
        title: 'Como você se chama?',
        hint: 'Pode ser o primeiro nome mesmo.',
        type: 'input',
        inputType: 'text',
        placeholder: 'Seu nome',
        autoComplete: 'name',
        validate: (f) => (f.name.trim() ? '' : 'Digite seu nome'),
      },
      {
        id: 'company',
        title: 'Qual o nome do negócio?',
        hint: 'Empresa, marca ou projeto.',
        type: 'input',
        inputType: 'text',
        placeholder: 'Nome da empresa',
        autoComplete: 'organization',
        validate: (f) => (f.company.trim() ? '' : 'Informe a empresa ou negócio'),
      },
      {
        id: 'contactChannel',
        title: 'Como prefere o contato?',
        hint: 'Escolha um caminho — só isso.',
        type: 'choice',
        columns: 2,
        options: [
          { value: 'whatsapp', label: 'WhatsApp' },
          { value: 'email', label: 'E-mail' },
        ],
        validate: (f) => (f.contactChannel ? '' : 'Escolha uma opção'),
      },
      contactDetail,
      {
        id: 'businessType',
        title: 'Qual o segmento do negócio?',
        hint: 'Isso muda o tipo de estrutura que montamos.',
        type: 'choice',
        options: BUSINESS_TYPES.map((v) => ({ value: v, label: v })),
        validate: (f) => (f.businessType ? '' : 'Selecione o segmento'),
      },
      {
        id: 'budget',
        title: 'Quanto pretende investir por mês?',
        hint: 'Orçamento de mídia + operação — estimativa já ajuda.',
        type: 'choice',
        options: BUDGET_OPTIONS.map((v) => ({ value: v, label: v })),
        validate: (f) => (f.budget ? '' : 'Selecione o orçamento'),
      },
      {
        id: 'stage',
        title: 'Como está a operação hoje?',
        hint: 'Seja sincero — filtramos o nível certo de proposta.',
        type: 'choice',
        options: CURRENT_STAGE.map((v) => ({ value: v, label: v })),
        validate: (f) => (f.stage ? '' : 'Selecione a situação atual'),
      },
      {
        id: 'goal',
        title: 'Qual o objetivo principal?',
        hint: 'O foco #1 agora.',
        type: 'choice',
        options: MAIN_GOALS.map((v) => ({ value: v, label: v })),
        validate: (f) => (f.goal ? '' : 'Selecione o objetivo'),
      },
      {
        id: 'timeline',
        title: 'Quando quer começar?',
        hint: 'Urgência muda o plano de onboarding.',
        type: 'choice',
        options: TIMELINE.map((v) => ({ value: v, label: v })),
        validate: (f) => (f.timeline ? '' : 'Selecione o prazo'),
      },
      {
        id: 'notes',
        title: 'Algo mais que devemos saber?',
        hint: 'Opcional — dor, meta ou contexto rápido.',
        type: 'textarea',
        placeholder: 'Contexto, dor principal, resultados que busca...',
        optional: true,
        validate: () => '',
      },
    ];
  }, [form.contactChannel]);

  const currentStep = quizSteps[quizIndex];
  const totalQuiz = quizSteps.length;
  const progress = phase === 'services' ? 8 : Math.round(((quizIndex + 1) / totalQuiz) * 100);

  useEffect(() => {
    if (phase === 'quiz') {
      document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [phase, quizIndex]);

  const handleToggleService = (service) => {
    setSelectedServices((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === service.id);
      if (isAlreadySelected) return prev.filter((item) => item.id !== service.id);
      return [...prev, service];
    });
    setError('');
  };

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const goNext = () => {
    setAnimKey((k) => k + 1);
    if (quizIndex >= totalQuiz - 1) {
      openWhatsApp();
      return;
    }
    setQuizIndex((i) => Math.min(i + 1, totalQuiz - 1));
  };

  const goBack = () => {
    setError('');
    setAnimKey((k) => k + 1);
    if (quizIndex === 0) {
      setPhase('services');
      return;
    }
    setQuizIndex((i) => Math.max(i - 1, 0));
  };

  const validateCurrent = () => {
    if (!currentStep) return false;
    const msg = currentStep.validate?.(form) || '';
    setError(msg);
    return !msg;
  };

  const advanceFromChoice = (key, value) => {
    if (isAdvancing) return;
    setField(key, value);
    setIsAdvancing(true);
    window.setTimeout(() => {
      setIsAdvancing(false);
      setAnimKey((k) => k + 1);
      setQuizIndex((i) => {
        if (i >= totalQuiz - 1) return i;
        return i + 1;
      });
    }, 220);
  };

  const goToQuiz = () => {
    if (selectedServices.length === 0) {
      setError('Selecione ao menos uma atividade para continuar');
      return;
    }
    setError('');
    setQuizIndex(0);
    setAnimKey((k) => k + 1);
    setPhase('quiz');
  };

  const openWhatsApp = () => {
    const message = appendUtmsToMessage(buildWhatsAppMessage(selectedServices, form));
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    setConversionOpen(true);
  };

  const openWhatsAppSkipForm = () => {
    const message = appendUtmsToMessage(
      buildSkipFormMessage(selectedServices, phase === 'services' ? 'atividades' : `quiz_${quizIndex + 1}`),
    );
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const SkipFormLink = ({ className }) => (
    <button
      type="button"
      onClick={openWhatsAppSkipForm}
      id="planos-skip-form"
      data-cta="skip_form"
      data-phase={phase}
      className={cn(
        'text-[11px] text-green-600/70 hover:text-green-500 underline-offset-2 hover:underline transition-colors',
        className,
      )}
    >
      Não preencher formulário
    </button>
  );

  const submitCurrent = (event) => {
    event?.preventDefault?.();
    if (!validateCurrent()) return;
    if (quizIndex >= totalQuiz - 1) {
      openWhatsApp();
      return;
    }
    goNext();
  };

  const displayTitle =
    phase === 'services'
      ? s.title || 'Qual atividade você precisa?'
      : currentStep?.title || 'Briefing';

  const displaySubtitle =
    phase === 'services'
      ? s.subtitle || 'Toque nas atividades de interesse e avance para o briefing'
      : currentStep?.hint || '';

  return (
    <section id="planos" className="py-12 md:py-16 relative bg-transparent overflow-hidden scroll-mt-24 md:scroll-mt-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto mb-8">
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#A855F7] to-[#60A5FA] transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progress, phase === 'services' ? 10 : 12)}%` }}
            />
          </div>
          <p className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {phase === 'services'
              ? 'Fase 1 · Atividades'
              : `Fase 2 · Pergunta ${quizIndex + 1} de ${totalQuiz}`}
          </p>
        </div>

        <AnimatedSection className="text-center mb-8 max-w-3xl mx-auto">
          <h2
            key={`title-${phase}-${animKey}`}
            className="text-3xl md:text-5xl font-black mb-4 text-foreground font-display animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {phase === 'services'
              ? displayTitle.split(/(atividade)/i).map((part, i) =>
                  /^atividade$/i.test(part) ? (
                    <span key={i} className="rgb-gradient-text">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )
              : displayTitle}
          </h2>
          <p
            key={`sub-${phase}-${animKey}`}
            className="text-base md:text-lg text-muted-foreground animate-in fade-in duration-300"
          >
            {displaySubtitle}
          </p>
        </AnimatedSection>

        {phase === 'services' ? (
          <>
            <div className="max-w-6xl mx-auto mb-8 relative z-10">
              <ServiceSelectionCards
                services={servicesList}
                selectedIds={selectedServices.map((item) => item.id)}
                onToggle={handleToggleService}
              />
            </div>

            {error ? (
              <p className="text-center text-sm text-red-400 mb-4" role="alert">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col justify-center items-center gap-3 text-center w-full relative z-10 mt-4">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <p className="text-sm text-muted-foreground sm:mr-2">
                  {selectedServices.length} selecionada{selectedServices.length === 1 ? '' : 's'}
                </p>
                <button
                  type="button"
                  onClick={goToQuiz}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:brightness-110 shadow-[0_0_30px_hsla(var(--primary)/0.35)]"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <SkipFormLink className="mt-1" />
            </div>
          </>
        ) : (
          <div
            key={animKey}
            className="max-w-xl mx-auto relative z-10 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            {selectedServices.length > 0 ? (
              <div className="mb-6 flex flex-wrap gap-2 justify-center">
                {selectedServices.map((service) => (
                  <span
                    key={service.id}
                    className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-foreground"
                  >
                    {service.title}
                  </span>
                ))}
              </div>
            ) : null}

            <form onSubmit={submitCurrent} className="space-y-6">
              {currentStep?.type === 'choice' ? (
                <ChoiceGrid
                  options={currentStep.options}
                  value={form[currentStep.id]}
                  columns={currentStep.columns || 1}
                  onPick={(value) => advanceFromChoice(currentStep.id, value)}
                />
              ) : null}

              {currentStep?.type === 'input' ? (
                <Input
                  id={`quiz-${currentStep.id}`}
                  type={currentStep.inputType || 'text'}
                  value={form[currentStep.id]}
                  onChange={(e) => setField(currentStep.id, e.target.value)}
                  placeholder={currentStep.placeholder}
                  autoComplete={currentStep.autoComplete}
                  className="h-14 rounded-2xl bg-background/60 text-lg px-5"
                  autoFocus
                />
              ) : null}

              {currentStep?.type === 'textarea' ? (
                <Textarea
                  id={`quiz-${currentStep.id}`}
                  value={form.notes}
                  onChange={(e) => setField('notes', e.target.value)}
                  placeholder={currentStep.placeholder}
                  className="min-h-[120px] rounded-2xl bg-background/60 text-base px-5 py-4"
                  autoFocus
                />
              ) : null}

              {error ? (
                <p className="text-sm text-red-400 text-center" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>

                {currentStep?.type !== 'choice' ? (
                  <button
                    type="submit"
                    className={cn(
                      'inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-colors',
                      quizIndex >= totalQuiz - 1
                        ? 'bg-green-800 hover:bg-green-700 text-white shadow-[0_0_20px_hsla(142,71%,25%,0.35)]'
                        : 'bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_20px_hsla(var(--primary)/0.3)]',
                    )}
                  >
                    {quizIndex >= totalQuiz - 1
                      ? currentStep?.optional && !form.notes.trim()
                        ? 'Pular e enviar no WhatsApp'
                        : 'Enviar no WhatsApp'
                      : 'Próxima'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <p className="flex-1 text-center sm:text-right text-sm text-muted-foreground self-center">
                    Toque em uma opção para avançar
                  </p>
                )}
              </div>

              <div className="flex justify-center pt-1">
                <SkipFormLink />
              </div>
            </form>
          </div>
        )}
      </div>

      <ConversionThankYouDialog
        open={conversionOpen}
        onOpenChange={setConversionOpen}
        formId="planos_quiz"
        formName="Planos briefing completo"
        whatsappUrl={whatsappUrl}
      />
    </section>
  );
};

export default ServicesPricing;
