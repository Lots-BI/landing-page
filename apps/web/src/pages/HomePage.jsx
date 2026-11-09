import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { DeferredMount } from '@/components/DeferredMount.jsx';
import { HeroProductShot } from '@/components/HeroProductShot.jsx';
import { SalesLeadForm } from '@/components/SalesLeadForm.jsx';
import { SocialProofSection } from '@/components/SocialProofSection.jsx';
import { HeroSection } from '@/components/HeroSection.jsx';
import { FlowCtaButton } from '@/components/FlowCtaButton.jsx';
import { useUTMs } from '@/hooks/useUTMs.js';

const ClientAreaSection = lazy(() => import('@/components/ClientAreaSection.jsx').then(module => ({ default: module.ClientAreaSection })));
const NossoMetodoSection = lazy(() => import('@/components/NossoMetodoSection.jsx'));
const TeamSection = lazy(() => import('@/components/TeamSection.jsx'));

const SectionFallback = () => (
  <div className="py-16" aria-hidden="true" />
);

function MobileCtaBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById('formulario');
    if (!target) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-brand-gradient text-sm font-semibold text-white"
      >
        Falar com a Lots
      </button>
    </div>
  );
}

function LazyBlock({ children, height = 400, id }) {
  return (
    <DeferredMount
      id={id}
      placeholderHeight={height}
      className={id ? 'scroll-mt-24 md:scroll-mt-28' : undefined}
    >
      <Suspense fallback={<SectionFallback />}>{children}</Suspense>
    </DeferredMount>
  );
}

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  useUTMs();

  // Restore the CTA viewport after returning from /orcamento
  useEffect(() => {
    const returnToId = location.state?.returnToId;
    const returnScrollY = location.state?.returnScrollY;
    if (!returnToId && typeof returnScrollY !== 'number') return;

    let cancelled = false;
    let attempts = 0;

    const clearReturnState = () => {
      navigate('.', { replace: true, state: {} });
    };

    const restore = () => {
      if (cancelled) return true;

      if (returnToId) {
        const el = document.getElementById(returnToId);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'center' });
          clearReturnState();
          return true;
        }
      }

      if (typeof returnScrollY === 'number') {
        window.scrollTo({ top: returnScrollY, left: 0, behavior: 'instant' });
      }

      attempts += 1;
      if (attempts >= 8) {
        clearReturnState();
        return true;
      }
      return false;
    };

    if (restore()) return undefined;

    const timers = [50, 150, 350, 700, 1200, 2000, 3200].map((ms) =>
      window.setTimeout(() => {
        if (!restore() && ms === 3200) clearReturnState();
      }, ms),
    );

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen relative bg-transparent">
      <SEO
        title="Agência de Marketing digital"
        description="A Lots opera tráfego, redes e página. Você acompanha cada real no painel Lots BI."
        url="/"
      />

      <HeroSection />

      <section id="plataforma" className="relative z-10 scroll-mt-24 border-t border-white/10 bg-white/[0.025] py-16 md:scroll-mt-28 md:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-5 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground text-balance sm:text-5xl">
              Seu marketing, baseado em dados
            </h2>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground text-balance sm:text-lg">
              O gestor não manda um PDF no fim do mês. O painel Lots BI mostra investimento, conversas e custo por resultado.
            </p>
            <div className="flex justify-center">
              <FlowCtaButton id="plataforma-cta">
                Quero meu painel Lots
              </FlowCtaButton>
            </div>
          </div>
          <HeroProductShot />
        </div>
      </section>

      <section id="formulario" className="relative z-10 scroll-mt-24 border-t border-white/10 py-16 md:scroll-mt-28 md:py-24">
        <div className="container mx-auto grid items-start gap-10 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-16">
          <div className="flex flex-col lg:h-full">
            <ul className="flex flex-1 flex-col justify-between gap-4">
              {[
                'Investimento, conversas e custo por resultado no mesmo painel.',
                'Tráfego, redes e página no mesmo time.',
                'Gestão de Tráfego, Social Media, Desenvolvimento Web e Gestão de Redes Sociais.',
                'Reunião por Google Meet, sem compromisso.',
                'Fechou: Lots BI grátis durante todo o contrato.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-foreground md:text-lg">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-7 lg:sticky lg:top-24">
            <div className="absolute inset-x-0 top-0 h-px bg-brand-gradient" aria-hidden="true" />
            <SalesLeadForm />
          </div>
        </div>
      </section>

      <LazyBlock>
        <ClientAreaSection />
      </LazyBlock>

      <SocialProofSection />

      <LazyBlock>
        <NossoMetodoSection />
      </LazyBlock>

      <section className="cv-auto relative z-10 border-t border-white/10 bg-white/[0.025] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-[0.12]" aria-hidden="true" />
            <div className="relative">
              <p className="font-display text-3xl font-black leading-tight text-foreground text-balance md:text-5xl">
                Nossos clientes têm acesso gratuito à plataforma Lots BI.
              </p>
              <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
                Atendemos um número limitado de clientes.
              </p>
              <button
                type="button"
                onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-brand-gradient px-8 text-base font-semibold text-white shadow-md hover:brightness-110"
              >
                Falar com a Lots
              </button>
            </div>
          </div>
        </div>
      </section>

      <LazyBlock id="equipe" height={560}>
        <TeamSection />
      </LazyBlock>

      <MobileCtaBar />
    </div>
  );
}
