import React, { Suspense, lazy, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { useUTMs } from '@/hooks/useUTMs.js';
import { PlanosCtaButton } from '@/components/PlanosCtaButton.jsx';
import { DeferredMount } from '@/components/DeferredMount.jsx';

const EcosistemaSection = lazy(() => import('@/components/EcosistemaSection.jsx').then(module => ({ default: module.EcosistemaSection })));
const ContentCreationSection = lazy(() => import('@/components/ContentCreationSection.jsx').then(module => ({ default: module.ContentCreationSection })));
const ClientAreaSection = lazy(() => import('@/components/ClientAreaSection.jsx').then(module => ({ default: module.ClientAreaSection })));
const ComparisonSection = lazy(() => import('@/components/ComparisonSection.jsx').then(module => ({ default: module.ComparisonSection })));
const RoadmapSection = lazy(() => import('@/components/RoadmapSection.jsx').then(module => ({ default: module.RoadmapSection })));
const NossoMetodoSection = lazy(() => import('@/components/NossoMetodoSection.jsx'));
const ResultadosDiretosSection = lazy(() => import('@/components/ResultadosDiretosSection.jsx'));
const ServicesPricing = lazy(() => import('@/components/ServicesPricing.jsx'));
const TeamSection = lazy(() => import('@/components/TeamSection.jsx'));
const FAQSection = lazy(() => import('@/components/FAQSection.jsx'));
const FinalCTASection = lazy(() => import('@/components/FinalCTASection.jsx'));

const CTAContainer = ({ id, children }) => (
  <section id={id} className="py-12 relative z-10 flex justify-center items-center bg-transparent">
    <div className="container mx-auto px-4 flex justify-center">{children}</div>
  </section>
);

const SectionFallback = () => (
  <div className="py-16" aria-hidden="true" />
);

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
  const { content } = useEditableContent();
  const location = useLocation();
  const navigate = useNavigate();
  useUTMs();

  const CTA_BTN_CLASSES = "text-lg px-10 py-5 shadow-[0_0_14px_hsla(142,71%,25%,0.14)] hover:shadow-[0_0_18px_hsla(142,71%,25%,0.22)]";

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
        title="Home" 
        description="Agência Lots — marketing digital com operação, dados e previsibilidade" 
        url="/" 
      />

      {/* Hero only — paints with the main bundle, never waits on lazy chunks */}
      <section id="hero" className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden z-10 bg-transparent">
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <div className="max-w-5xl w-full">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.1] tracking-tighter mb-6 md:mb-8 text-balance">
              {(content.hero.title || 'Agência de Marketing digital').split(/(digital)/i).map((part, i) =>
                /^digital$/i.test(part) ? (
                  <span key={i} className="text-secondary">{part}</span>
                ) : (
                  part
                ),
              )}
            </h1>
          </div>
          
          <div className="max-w-3xl mb-10 md:mb-12 px-4">
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed text-balance">
              {content.hero.subtitle}
            </p>
          </div>
          
          <div className="w-full sm:w-auto px-4 sm:px-0 flex justify-center text-center">
            <PlanosCtaButton id="hero-cta" className={CTA_BTN_CLASSES}>
              {content.hero.cta}
            </PlanosCtaButton>
          </div>
        </div>
      </section>

      {/* Below-fold: one Suspense per block, only when near viewport */}
      <LazyBlock id="planos" height={520}>
        <ServicesPricing sectionId={null} />
      </LazyBlock>

      <LazyBlock id="solucao-section">
        <EcosistemaSection />
      </LazyBlock>

      <LazyBlock height={160}>
        <CTAContainer id="cta-whatsapp-servicos">
          <PlanosCtaButton id="cta-btn-servicos" className={CTA_BTN_CLASSES}>
            Falar com a Lots
          </PlanosCtaButton>
        </CTAContainer>
      </LazyBlock>

      <LazyBlock>
        <ContentCreationSection />
      </LazyBlock>

      <LazyBlock height={160}>
        <CTAContainer id="cta-whatsapp-conteudo">
          <PlanosCtaButton id="cta-btn-conteudo" className={CTA_BTN_CLASSES}>
            Quero conteúdo que vende
          </PlanosCtaButton>
        </CTAContainer>
      </LazyBlock>

      <LazyBlock>
        <ClientAreaSection />
      </LazyBlock>

      <LazyBlock>
        <ComparisonSection />
      </LazyBlock>

      <LazyBlock id="metodologia-section">
        <RoadmapSection />
      </LazyBlock>

      <LazyBlock height={160}>
        <CTAContainer id="cta-whatsapp-roadmap">
          <PlanosCtaButton id="cta-btn-roadmap" className={CTA_BTN_CLASSES}>
            Começar meu projeto
          </PlanosCtaButton>
        </CTAContainer>
      </LazyBlock>

      <LazyBlock>
        <NossoMetodoSection />
      </LazyBlock>

      <LazyBlock>
        <ResultadosDiretosSection />
      </LazyBlock>

      <LazyBlock id="equipe" height={560}>
        <TeamSection />
      </LazyBlock>

      <LazyBlock height={560}>
        <FinalCTASection />
      </LazyBlock>

      <LazyBlock height={640}>
        <FAQSection />
      </LazyBlock>
    </div>
  );
}
