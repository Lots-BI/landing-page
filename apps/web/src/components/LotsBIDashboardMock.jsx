import React from 'react';
import {
  Activity,
  CheckSquare,
  Eye,
  GraduationCap,
  Heart,
  LayoutDashboard,
  MousePointerClick,
  Target,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';
import { LotsBIWordmark } from './LotsBIWordmark.jsx';
import { cn } from '@/lib/utils';

/** Cores de série — alinhadas ao Lots Portal (lotus charts). */
const META = '#9769b1';
const GOOGLE = '#67bee7';
const CONV = '#22c55e';

const NAV_PLATAFORMA = [
  { label: 'Visão geral', icon: LayoutDashboard, active: true },
  { label: 'Plano Estratégico', icon: Target },
  { label: 'Aprovações', icon: CheckSquare },
  { label: 'Brand book', icon: BookOpen },
  { label: 'Tutorial', icon: GraduationCap },
];

const KPIS = [
  { label: 'Alcance', value: '61', delta: 100, icon: Eye, hero: true },
  { label: 'Engajamento', value: '39', delta: 100, icon: Heart },
  { label: 'Impressões', value: '10.307', delta: 121, icon: Activity },
  { label: 'Cliques', value: '723', delta: 6, icon: MousePointerClick, hint: 'CTR 7.01%' },
  { label: 'Conversões', value: '64', delta: 77.8, icon: Target },
];

const PERIODS = [
  { label: 'Últimos 7 dias', spend: 'R$ 289', delta: 68.6, detail: '2 conversões · 0 sessões' },
  { label: 'Últimos 30 dias', spend: 'R$ 743', delta: 202.6, detail: '64 conversões · 0 sessões' },
  { label: 'Últimos 90 dias', spend: 'R$ 988', delta: 100, detail: '100 conversões · 0 sessões' },
];

function DeltaPill({ delta, suffix = false, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-emerald-400',
        className,
      )}
    >
      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
      {delta.toFixed(1)}%
      {suffix ? <span className="font-normal opacity-80"> vs período anterior</span> : null}
    </span>
  );
}

function Surface({ className, children }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatCard({ label, value, delta, icon: Icon, hint, hero }) {
  return (
    <Surface
      className={cn(
        'relative flex flex-col justify-between overflow-hidden p-3 sm:p-4',
        hero && 'bg-gradient-to-br from-[#9769b1]/15 via-white/[0.03] to-transparent sm:col-span-2',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/45">{label}</p>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/30 text-[#c4a0d8]">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
      <div className={cn('mt-2 flex flex-wrap items-baseline gap-2', hero && 'mt-3')}>
        <span
          className={cn(
            'font-display font-semibold tracking-tight tabular-nums text-white',
            hero ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl',
          )}
        >
          {value}
        </span>
        <DeltaPill delta={delta} />
      </div>
      {hint ? <p className="mt-1.5 text-[11px] text-white/40">{hint}</p> : null}
    </Surface>
  );
}

function EvolutionChart() {
  return (
    <svg
      viewBox="0 0 560 200"
      className="w-full h-[140px] sm:h-[180px]"
      preserveAspectRatio="none"
      role="img"
      aria-label="Gráfico de evolução de investimento e conversões"
    >
      <defs>
        <linearGradient id="mock-meta-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={META} stopOpacity="0.28" />
          <stop offset="100%" stopColor={META} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mock-google-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOOGLE} stopOpacity="0.32" />
          <stop offset="100%" stopColor={GOOGLE} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mock-conv-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CONV} stopOpacity="0.22" />
          <stop offset="100%" stopColor={CONV} stopOpacity="0" />
        </linearGradient>
      </defs>

      {[40, 80, 120, 160].map((y) => (
        <line
          key={y}
          x1="36"
          x2="548"
          y1={y}
          y2={y}
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="4 6"
        />
      ))}

      {/* Google Ads — dominante, pico ~22 jul */}
      <path
        d="M36,175 C80,172 110,168 140,155 C180,130 210,55 250,42 C290,35 310,70 340,95 C380,130 410,120 450,85 C490,55 520,58 548,55 L548,190 L36,190 Z"
        fill="url(#mock-google-fill)"
      />
      <path
        d="M36,175 C80,172 110,168 140,155 C180,130 210,55 250,42 C290,35 310,70 340,95 C380,130 410,120 450,85 C490,55 520,58 548,55"
        fill="none"
        stroke={GOOGLE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Meta Ads — baixo, sobe no final */}
      <path
        d="M36,185 C120,185 200,185 280,184 C340,182 380,175 420,155 C460,135 500,140 548,145 L548,190 L36,190 Z"
        fill="url(#mock-meta-fill)"
      />
      <path
        d="M36,185 C120,185 200,185 280,184 C340,182 380,175 420,155 C460,135 500,140 548,145"
        fill="none"
        stroke={META}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Conversões */}
      <path
        d="M36,182 C100,180 160,178 220,175 C280,170 320,160 360,148 C400,155 460,165 548,170 L548,190 L36,190 Z"
        fill="url(#mock-conv-fill)"
      />
      <path
        d="M36,182 C100,180 160,178 220,175 C280,170 320,160 360,148 C400,155 460,165 548,170"
        fill="none"
        stroke={CONV}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="36" y="198" fill="rgba(255,255,255,0.28)" fontSize="9">
        12 de jul.
      </text>
      <text x="200" y="198" fill="rgba(255,255,255,0.28)" fontSize="9" textAnchor="middle">
        22 de jul.
      </text>
      <text x="360" y="198" fill="rgba(255,255,255,0.28)" fontSize="9" textAnchor="middle">
        01 de ago.
      </text>
      <text x="548" y="198" fill="rgba(255,255,255,0.28)" fontSize="9" textAnchor="end">
        07 de ago.
      </text>
    </svg>
  );
}

function MixDonut() {
  const size = 140;
  const thickness = 18;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const googleFrac = 0.904;
  const metaFrac = 0.096;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={thickness}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={GOOGLE}
            strokeWidth={thickness}
            strokeDasharray={`${googleFrac * c} ${c - googleFrac * c}`}
            strokeDashoffset={0}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={META}
            strokeWidth={thickness}
            strokeDasharray={`${metaFrac * c} ${c - metaFrac * c}`}
            strokeDashoffset={-googleFrac * c}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Total</p>
          <p className="font-display text-base font-semibold tabular-nums text-white">R$ 743</p>
        </div>
      </div>
      <ul className="w-full space-y-2.5 text-[11px] sm:text-xs">
        <li className="flex items-center justify-between gap-3 text-white/70">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: GOOGLE }} />
            Google Ads
          </span>
          <span className="tabular-nums text-white/90">
            R$ 671 <span className="text-white/40">90.4%</span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 text-white/70">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: META }} />
            Meta Ads
          </span>
          <span className="tabular-nums text-white/90">
            R$ 71,66 <span className="text-white/40">9.6%</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

/**
 * Representação estática do painel "Visão geral" do Lots BI
 * (estrutura espelhada do lots-portal /cliente/$cliente).
 */
export function LotsBIDashboardMock({ className }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] text-left shadow-lg',
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex min-h-0">
        {/* Sidebar — desktop */}
        <aside className="hidden md:flex w-[200px] shrink-0 flex-col border-r border-white/[0.07] bg-black/40 px-3 py-4">
          <div className="mb-5 px-1">
            <LotsBIWordmark size="sm" />
          </div>

          <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Plataforma
          </p>
          <nav className="space-y-0.5">
            {NAV_PLATAFORMA.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px]',
                    item.active
                      ? 'bg-white/[0.08] font-medium text-white'
                      : 'text-white/45',
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  <span className="truncate">{item.label}</span>
                </div>
              );
            })}
          </nav>

          <div className="mt-auto rounded-xl border border-white/[0.08] bg-white/[0.03] px-2.5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#9769b1]/30 text-[11px] font-semibold text-[#e4d0f0]">
                C
              </span>
              <div className="min-w-0">
                <p className="truncate text-[10px] text-white/80">corretor@gmail.com</p>
                <p className="text-[9px] text-white/40">Cliente · Lots BI</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Mobile top bar */}
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 md:hidden">
            <LotsBIWordmark size="sm" />
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">Visão geral</span>
          </div>

          <div className="space-y-4 p-3 sm:space-y-5 sm:p-5">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c4a0d8]/80">
                  Conta cliente
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  Agência Lots
                </h3>
                <p className="mt-0.5 text-[11px] sm:text-xs text-white/45">
                  Resultados consolidados das suas plataformas
                </p>
              </div>
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-white/55">
                Últimos 30 dias
              </span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {KPIS.map((kpi) => (
                <StatCard key={kpi.label} {...kpi} />
              ))}
            </div>

            {/* Period strip */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
              {PERIODS.map((p) => (
                <Surface key={p.label} className="flex items-center justify-between gap-3 p-3.5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                      {p.label}
                    </p>
                    <p className="mt-0.5 font-display text-lg font-semibold tabular-nums text-white">
                      {p.spend}
                    </p>
                    <p className="mt-0.5 text-[10px] sm:text-[11px] text-white/40 truncate">{p.detail}</p>
                  </div>
                  <DeltaPill delta={p.delta} className="shrink-0" />
                </Surface>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-3 xl:gap-4">
              <Surface className="overflow-hidden xl:col-span-2">
                <header className="flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.06] px-4 pb-3 pt-3.5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c4a0d8]/90">
                      Evolução
                    </p>
                    <h4 className="font-display text-[14px] font-semibold text-white">
                      Investimento e conversões
                    </h4>
                    <p className="mt-0.5 text-[11px] text-white/40">
                      Comportamento diário no período selecionado.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-semibold tabular-nums text-white">R$ 743</p>
                    <DeltaPill delta={202.6} suffix className="mt-1" />
                  </div>
                </header>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b border-white/[0.05] bg-white/[0.02] px-4 py-2 text-[11px] text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: META }} />
                    Meta Ads <span className="text-white/70">R$ 71,66</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOOGLE }} />
                    Google Ads <span className="text-white/70">R$ 671</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: CONV }} />
                    Conversões <span className="text-white/70">64</span>
                  </span>
                </div>
                <div className="px-2 py-2 sm:px-3">
                  <EvolutionChart />
                </div>
              </Surface>

              <Surface className="overflow-hidden">
                <header className="border-b border-white/[0.06] px-4 pb-3 pt-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c4a0d8]/90">
                    Distribuição
                  </p>
                  <h4 className="font-display text-[14px] font-semibold text-white">
                    Mix de investimento
                  </h4>
                  <p className="mt-0.5 text-[11px] text-white/40">
                    Onde o orçamento foi alocado no período.
                  </p>
                </header>
                <div className="px-4 py-4">
                  <MixDonut />
                </div>
              </Surface>
            </div>
          </div>
        </div>
      </div>

      {/* Fade inferior — encaixa na landing */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/50 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

export default LotsBIDashboardMock;
