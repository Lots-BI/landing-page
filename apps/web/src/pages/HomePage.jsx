import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { DeferredMount } from '@/components/DeferredMount.jsx';
import { SalesLeadForm } from '@/components/SalesLeadForm.jsx';
import { SocialProofSection } from '@/components/SocialProofSection.jsx';
import { ServicesGridSection } from '@/components/ServicesGridSection.jsx';
import { HeroSection } from '@/components/HeroSection.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import { useUTMs } from '@/hooks/useUTMs.js';

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
        title="Gestão de tráfego pago"
        description="Agência Lots — gestão de Meta Ads e Google Ads com operação diária para gerar leads e vendas."
        url="/"
      />

      <HeroSection />

      <div className="theme-light relative z-10 bg-white text-foreground">
        <SocialProofSection />
      </div>

      <LazyBlock id="metodo" height={640}>
        <NossoMetodoSection />
      </LazyBlock>

      <div className="theme-light relative z-10 bg-white text-foreground">
        <ServicesGridSection />

        <LazyBlock id="equipe" height={560}>
          <TeamSection />
        </LazyBlock>
      </div>

      <section id="formulario" className="relative z-10 scroll-mt-24 bg-transparent py-16 md:scroll-mt-28 md:py-24">
        <div className="container mx-auto mb-10 max-w-2xl px-4 text-center md:mb-14 md:px-6">
          <h2 className="font-display text-3xl font-black text-foreground text-balance md:text-5xl">
            Pronto para escalar seu tráfego pago com a Lots?
          </h2>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-brand-gradient" aria-hidden="true" />
            <SalesLeadForm />
          </div>
        </div>
      </section>

      <MobileCtaBar />
      <FloatingWhatsAppButton />
    </div>
  );
}
