import React from 'react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { Shield } from 'lucide-react';

export function BoutiqueSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid-asymmetric items-center">
          <AnimatedSection className="col-span-left mb-12 lg:mb-0 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 text-primary text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              Atendimento Exclusivo
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Por que somos uma agência <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Boutique?</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Não trabalhamos com volume. Trabalhamos com profundidade. Nosso modelo de negócios foi desenhado para atender um número seleto de parceiros estratégicos.
              </p>
              <p>
                Isso garante que sua empresa receba atenção total dos fundadores, soluções customizadas de alta complexidade e um comprometimento real com o seu faturamento.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" className="col-span-right relative">
            <div className="aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl absolute inset-0" />
            <div className="glass-panel p-10 rounded-3xl relative z-10 border-t border-l border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">O Padrão MAJR</h3>
              <ul className="space-y-4">
                {[
                  "Acesso direto aos estrategistas",
                  "Vagas limitadas por trimestre",
                  "Foco absoluto em High-Ticket",
                  "Soluções 100% customizadas"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}