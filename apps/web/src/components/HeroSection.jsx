import { FlowCtaButton } from '@/components/FlowCtaButton.jsx';

export function HeroSection() {
  return (
    <section id="hero" className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-transparent px-4 pb-16 pt-24 text-center">
      <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Atendemos um número limitado de clientes
      </p>
      <h1 className="max-w-5xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground text-balance sm:text-6xl md:text-7xl lg:text-8xl">
        Agência de Marketing <span className="rgb-gradient-text">digital</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance sm:text-lg md:text-2xl">
        A Lots opera a mídia, as redes e a página. Você acompanha cada real no painel Lots BI.
      </p>
      <FlowCtaButton id="hero-cta" className="mt-10 text-lg px-10">
        Quero minha operação Lots
      </FlowCtaButton>
    </section>
  );
}
