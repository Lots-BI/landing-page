import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FlowCtaButton } from '@/components/FlowCtaButton.jsx';
import { AnimatedSection } from '@/components/AnimatedSection.jsx';

const TESTIMONIALS = [
  {
    name: 'Antena',
    subtitle: 'Imobiliária',
    // TODO: substituir pelo depoimento real da Antena antes de subir para produção.
    text: 'Coletando...',
    image: '/testimonials/antena.webp',
  },
  {
    name: 'Rafa Teo',
    subtitle: 'Corretor',
    // TODO: restaurar o depoimento real do Rafa Teo antes de subir para produção.
    // Texto original: 'O que mais me motiva a continuar com a Lots, é a qualidade dos leads que chegam ao meu CRM!'
    text: 'Coletando...',
    image: '/testimonials/rafa-teo.webp',
  },
  {
    name: 'Leandro Mellado',
    subtitle: 'Corretor de Imóveis',
    // TODO: substituir pelo depoimento real do Leandro Mellado antes de subir para produção.
    text: 'Coletando...',
    image: '/testimonials/leandro-mellado.webp',
  },
  {
    name: 'Edgar Haine',
    subtitle: 'Corretor de Imóveis',
    // TODO: substituir pelo depoimento real do Edgar antes de subir para produção.
    text: 'Coletando...',
    image: '/testimonials/edgar-haine.webp',
  },
  {
    name: 'Fernanda Teixeira',
    subtitle: 'Psicóloga',
    // TODO: substituir pelo depoimento real da Fernanda antes de subir para produção.
    text: 'Coletando...',
    image: '/testimonials/fernanda-teixeira.webp',
  },
];

export function SocialProofSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;
    const clamped = ((index % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
    container.scrollTo({ left: clamped * container.clientWidth, behavior: 'smooth' });
  }, []);

  const goPrev = useCallback(() => scrollToIndex(activeIndex - 1), [activeIndex, scrollToIndex]);
  const goNext = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);

  useEffect(() => {
    if (TESTIMONIALS.length < 2 || isHovered) return undefined;
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % TESTIMONIALS.length;
        scrollToIndex(next);
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, scrollToIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const width = container.clientWidth || 1;
        const index = Math.round(container.scrollLeft / width);
        setActiveIndex((current) => (current === index ? current : index));
      });
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="resultados"
      className="cv-auto relative z-10 scroll-mt-24 py-16 md:scroll-mt-28 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div
            className="group relative mx-auto max-w-3xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {TESTIMONIALS.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Depoimento anterior"
                  className="carousel-nav-btn carousel-nav-btn-left"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Próximo depoimento"
                  className="carousel-nav-btn carousel-nav-btn-right"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div
              ref={containerRef}
              className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            >
              {TESTIMONIALS.map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className="w-full shrink-0 snap-center px-1 text-center"
                >
                  <blockquote className="font-display text-2xl font-medium leading-snug text-foreground text-balance md:text-4xl">
                    “{testimonial.text}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center justify-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-14 rounded-full object-cover ring-1 ring-white/15"
                    />
                    <div className="text-left">
                      <p className="font-display text-lg font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.subtitle}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            {TESTIMONIALS.length > 1 && (
              <div className="mt-6 flex justify-center">
                {TESTIMONIALS.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Ir para depoimento de ${testimonial.name}`}
                    className="flex shrink-0 items-center justify-center"
                    style={{ minWidth: 24, minHeight: 24 }}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex ? 'w-6 bg-brand-gradient' : 'w-1.5 bg-foreground/20'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10 flex justify-center">
          <FlowCtaButton id="cta-btn-resultados">
            Quero leads assim
          </FlowCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
