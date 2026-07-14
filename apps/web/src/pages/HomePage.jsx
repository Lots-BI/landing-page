import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import SEO from '@/components/SEO.jsx';
import { AnimatedSection } from '@/components/AnimatedSection.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { useUTMs } from '@/hooks/useUTMs.js';
import { WhatsAppButton } from '@/components/WhatsAppButton.jsx';

// Lazy loaded below-the-fold components
const ServicesSection = lazy(() => import('@/components/ServicesSection.jsx').then(module => ({ default: module.ServicesSection })));
const EcosistemaSection = lazy(() => import('@/components/EcosistemaSection.jsx').then(module => ({ default: module.EcosistemaSection })));
const ContentCreationSection = lazy(() => import('@/components/ContentCreationSection.jsx').then(module => ({ default: module.ContentCreationSection })));
const ClientAreaSection = lazy(() => import('@/components/ClientAreaSection.jsx').then(module => ({ default: module.ClientAreaSection })));
const ComparisonSection = lazy(() => import('@/components/ComparisonSection.jsx').then(module => ({ default: module.ComparisonSection })));
const RoadmapSection = lazy(() => import('@/components/RoadmapSection.jsx').then(module => ({ default: module.RoadmapSection })));
const NossoMetodoSection = lazy(() => import('@/components/NossoMetodoSection.jsx'));
const ResultadosDiretosSection = lazy(() => import('@/components/ResultadosDiretosSection.jsx'));
const ServicesPricing = lazy(() => import('@/components/ServicesPricing.jsx'));
const FounderCard = lazy(() => import('@/components/FounderCard.jsx'));
const FAQItem = lazy(() => import('@/components/FAQItem.jsx'));
const Accordion = lazy(() => import('@/components/ui/accordion.jsx').then(module => ({ default: module.Accordion })));

// Helper component for injecting CTAs between sections
const CTAContainer = ({ id, children }) => (
  <section id={id} className="py-12 relative z-10 flex justify-center items-center bg-transparent">
    <AnimatedSection className="container mx-auto px-4 flex justify-center">
      {children}
    </AnimatedSection>
  </section>
);

const LoaderFallback = () => (
  <div className="py-24 flex flex-col items-center justify-center text-primary/40">
    <Loader2 className="w-8 h-8 animate-spin mb-4" />
    <span className="animate-pulse">Carregando seção...</span>
  </div>
);

export default function HomePage() {
  const { content } = useEditableContent();
  
  // Initialize UTM tracking on page load
  useUTMs();

  const PHONE_NUMBER = "5511973290438";
  const WHATSAPP_BTN_CLASSES = "text-lg px-10 py-5 shadow-[0_0_30px_hsla(142,71%,45%,0.3)] hover:shadow-[0_0_40px_hsla(142,71%,45%,0.5)]";
  const GLOBAL_MSG = "Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?";

  return (
    <main className="min-h-screen relative bg-transparent">
      <SEO 
        title="Home" 
        description="Lótus Gear - Soluções inovadoras em design e desenvolvimento" 
        url="/" 
      />

      {/* 1. HERO REDESIGNED - Centered Layout (Synchronous) */}
      <section id="hero" className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden z-10 bg-transparent">
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <AnimatedSection delay={0.1} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-card/50 border-primary/30 text-primary text-xs md:text-sm font-medium shadow-[0_0_15px_hsla(var(--primary)/0.2)]">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {content.hero.badge}
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="max-w-5xl w-full">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.1] tracking-tighter mb-6 md:mb-8 text-balance">
              {'Estruturação e Gestão Completa'.split(/(Completa)/).map((part, i) => 
                part === 'Completa' ? <span key={i} className="rgb-gradient-text">{part}</span> : part
              )}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3} className="max-w-3xl mb-10 md:mb-12 px-4">
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed text-balance">
              {content.hero.subtitle}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4} direction="up" className="w-full sm:w-auto px-4 sm:px-0 flex justify-center text-center">
            <WhatsAppButton 
              phoneNumber={PHONE_NUMBER}
              baseMessage={GLOBAL_MSG}
              className={WHATSAPP_BTN_CLASSES}
            >
              {content.hero.cta}
            </WhatsAppButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Single Suspense boundary wrapping all lazy-loaded sections */}
      <Suspense fallback={<LoaderFallback />}>
        {/* 2. SERVICES SELECTION CARDS (6 cards with checkboxes) */}
        <ServicesPricing />

        {/* 3. ECOSSISTEMA DE SOLUÇÕES */}
        <EcosistemaSection />

        <CTAContainer id="cta-whatsapp-servicos">
          <WhatsAppButton 
            phoneNumber={PHONE_NUMBER}
            baseMessage={GLOBAL_MSG}
            className={WHATSAPP_BTN_CLASSES}
          >
            💬 Falar com um Especialista
          </WhatsAppButton>
        </CTAContainer>

        {/* 4. CRIAÇÃO DE CONTEÚDO & DESIGN */}
        <ContentCreationSection />

        <CTAContainer id="cta-whatsapp-conteudo">
          <WhatsAppButton 
            phoneNumber={PHONE_NUMBER}
            baseMessage={GLOBAL_MSG}
            className={WHATSAPP_BTN_CLASSES}
          >
            💬 Quero transformar meu conteúdo
          </WhatsAppButton>
        </CTAContainer>

        {/* 5. CLIENT AREA SECTION */}
        <ClientAreaSection />

        {/* 6. VANTAGEM COMPETITIVA */}
        <ComparisonSection />

        {/* 7. ROADMAP INTERATIVO */}
        <RoadmapSection />

        <CTAContainer id="cta-whatsapp-roadmap">
          <WhatsAppButton 
            phoneNumber={PHONE_NUMBER}
            baseMessage={GLOBAL_MSG}
            className={WHATSAPP_BTN_CLASSES}
          >
            💬 Iniciar meu Projeto
          </WhatsAppButton>
        </CTAContainer>

        {/* 8. NOSSO MÉTODO (ENGENHARIA DE VENDAS) */}
        <NossoMetodoSection />

        {/* 9. RESULTADOS DIRETOS */}
        <ResultadosDiretosSection />

        {/* 10. SERVICES SECTION (4 cards) */}
        <ServicesSection />

        {/* 11. TEAM */}
        <section id="equipe" className="py-24 md:py-32 relative z-10 border-y border-border bg-transparent">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">{content.team.title}</h2>
              <p className="text-xl text-muted-foreground">{content.team.subtitle}</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <AnimatedSection>
                <FounderCard 
                  name="Leandro"
                  role={content.team.founder1Role}
                  description={content.team.founder1Desc}
                  image="https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/1a43fef9d05f538311ded5a48e06f772.png"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <FounderCard 
                  name="Rafaela"
                  role={content.team.founder2Role}
                  description={content.team.founder2Desc}
                  image="https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/cff80b7598ead1aa5119b5da37e5ad16.jpg"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* 12. FAQ */}
        <section className="py-24 md:py-32 relative z-10 max-w-4xl mx-auto px-4 md:px-6 bg-transparent">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">{content.faq?.title || "Perguntas Frequentes"}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <FAQItem value="item-1" question={content.faq?.q1} answer={content.faq?.a1} />
              <FAQItem value="item-2" question={content.faq?.q2} answer={content.faq?.a2} />
              <FAQItem value="item-3" question={content.faq?.q3} answer={content.faq?.a3} />
              <FAQItem value="item-4" question={content.faq?.q4} answer={content.faq?.a4} />
              <FAQItem value="item-5" question={content.faq?.q5} answer={content.faq?.a5} />
            </Accordion>
          </AnimatedSection>
        </section>

        {/* FINAL CTA */}
        <section id="cta" className="py-24 md:py-32 relative z-10 overflow-hidden bg-transparent">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection id="cta-whatsapp-footer" className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center bg-card/80 backdrop-blur-2xl p-10 md:p-20 rounded-[3rem] border border-primary/30 shadow-[0_0_80px_hsla(var(--primary)/0.15)]">
              <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 leading-tight">
                {content.motivational.title}
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                {content.motivational.subtitle}
              </p>
              <WhatsAppButton 
                phoneNumber={PHONE_NUMBER}
                baseMessage={GLOBAL_MSG}
                className={WHATSAPP_BTN_CLASSES}
              >
                💬 Fale conosco no WhatsApp
              </WhatsAppButton>
            </AnimatedSection>
          </div>
        </section>
      </Suspense>
    </main>
  );
}