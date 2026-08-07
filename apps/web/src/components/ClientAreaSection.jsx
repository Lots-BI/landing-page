import React from 'react';
import {
  LayoutDashboard,
  Compass,
  CheckSquare,
  Layers,
} from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { LotsBIWordmark } from './LotsBIWordmark.jsx';
import { PlanosCtaButton } from './PlanosCtaButton.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

const PLATFORMS = ['Meta Ads', 'Google Ads', 'Instagram', 'GA4', 'Google Business'];

function LotsBIProductMock() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-[0_0_28px_hsla(271,91%,65%,0.06)]"
      aria-hidden="true"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-5">
        <LotsBIWordmark size="sm" />
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.16em] text-white/40">
            Visão geral
          </span>
          <span className="h-2 w-2 rounded-full bg-green-400/90" />
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">Sua conta no Lots BI</p>
          <p className="text-sm md:text-base font-semibold text-white/90 font-display">
            Resultados consolidados
          </p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Investimento', value: 'R$ 18,4k' },
            { label: 'Conversões', value: '326' },
            { label: 'CTR', value: '2,8%' },
            { label: 'CPA', value: 'R$ 56' },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
            >
              <p className="text-[10px] text-white/45 mb-1">{kpi.label}</p>
              <p className="text-sm font-semibold text-white font-display">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Evolution chart — SVG estático estilo Lots BI (sem Recharts) */}
        <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-white/45">Investimento · evolução</p>
            <div className="flex items-center gap-3 text-[9px] text-white/50">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" /> Meta
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" /> Google
              </span>
            </div>
          </div>
          <svg
            viewBox="0 0 360 120"
            className="w-full h-[7.5rem]"
            preserveAspectRatio="none"
            role="img"
            aria-label="Gráfico de evolução Meta e Google Ads"
          >
            <defs>
              <linearGradient id="lots-meta-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lots-google-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* grid */}
            {[30, 60, 90].map((y) => (
              <line
                key={y}
                x1="0"
                x2="360"
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 6"
              />
            ))}
            {/* Meta area + line */}
            <path
              d="M0,88 C40,80 60,92 90,70 C120,48 140,55 180,42 C220,28 250,38 290,22 C320,12 340,18 360,14 L360,120 L0,120 Z"
              fill="url(#lots-meta-fill)"
            />
            <path
              d="M0,88 C40,80 60,92 90,70 C120,48 140,55 180,42 C220,28 250,38 290,22 C320,12 340,18 360,14"
              fill="none"
              stroke="#A855F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Google area + line */}
            <path
              d="M0,98 C35,90 70,95 100,82 C130,68 155,74 190,58 C230,40 260,48 300,36 C330,28 345,32 360,30 L360,120 L0,120 Z"
              fill="url(#lots-google-fill)"
            />
            <path
              d="M0,98 C35,90 70,95 100,82 C130,68 155,74 190,58 C230,40 260,48 300,36 C330,28 345,32 360,30"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex justify-between mt-1 text-[9px] text-white/30 px-0.5">
            <span>01 mar</span>
            <span>15 mar</span>
            <span>30 mar</span>
          </div>
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1.5">
          {PLATFORMS.map((name) => (
            <span
              key={name}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/65"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClientAreaSection() {
  const { content } = useEditableContent();
  const c = content.clientArea;

  const modules = [
    {
      icon: LayoutDashboard,
      title: c.f1Title,
      desc: c.f1Desc,
    },
    {
      icon: Compass,
      title: c.f2Title,
      desc: c.f2Desc,
    },
    {
      icon: CheckSquare,
      title: c.f3Title,
      desc: c.f3Desc,
    },
    {
      icon: Layers,
      title: c.f4Title,
      desc: c.f4Desc,
    },
  ];

  return (
    <section
      id="lots-bi"
      className="py-16 md:py-24 relative bg-transparent overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="flex justify-center mb-5">
            <LotsBIWordmark size="xl" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Plataforma · Área do cliente
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 font-display text-balance">
            {c.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
            {c.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          <AnimatedSection direction="right" className="order-2 lg:order-1">
            <LotsBIProductMock />
          </AnimatedSection>

          <AnimatedSection direction="left" className="order-1 lg:order-2">
            <ul className="space-y-0 divide-y divide-white/10 border-y border-white/10">
              {modules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <li key={mod.title} className="flex gap-4 py-5 first:pt-6 last:pb-6">
                    <Icon
                      className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 font-display">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 text-xs text-muted-foreground/80 tracking-wide">
              Meta Ads · Google Ads · Instagram · GA4 · Google Business · TikTok
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="flex justify-center mt-12 md:mt-16">
          <PlanosCtaButton
            id="cta-btn-lots-bi"
            className="text-base md:text-lg px-8 md:px-10 py-4 shadow-[0_0_14px_hsla(142,71%,25%,0.14)] hover:shadow-[0_0_18px_hsla(142,71%,25%,0.22)]"
          >
            Quero clareza na operação
          </PlanosCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
