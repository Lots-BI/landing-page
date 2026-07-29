import React from 'react';
import {
  KeyRound,
  BarChart3,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { LotsBIIcon } from './LotsBIWordmark.jsx';

const POINTS = [
  {
    icon: KeyRound,
    title: 'Acesso só com login e senha',
    desc: 'O cliente entra no Lots BI com as credenciais da conta. Sem instalação, sem planilha compartilhada, sem pedir relatório por WhatsApp.',
  },
  {
    icon: RefreshCw,
    title: 'Dashboard automático',
    desc: 'Meta Ads, Google Ads, Instagram, GA4 e demais fontes alimentam a Visão geral sozinhas — investimento, conversões, CTR, CPA e evolução por período.',
  },
  {
    icon: BarChart3,
    title: 'Tudo que a operação usa',
    desc: 'Além dos números: Plano Estratégico, Aprovações (kanban e calendário), Painel da marca e Brand book — o mesmo ecossistema da agência, na conta do cliente.',
  },
  {
    icon: ShieldCheck,
    title: 'Acesso e manutenção gratuitos',
    desc: 'Para o cliente, o uso da plataforma e a manutenção do ambiente não têm custo extra. A Agência Lots cuida da estrutura; o cliente só acompanha e decide.',
  },
];

export default function NossoMetodoSection() {
  return (
    <section
      id="nosso-metodo"
      className="py-16 md:py-24 relative bg-transparent border-t border-border z-10 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <LotsBIIcon size="lg" className="!h-10 !w-10" aria-hidden="true" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Lots BI · Conta do cliente
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 font-display text-balance">
            Dashboard automático —{' '}
            <span className="text-primary">acesso e manutenção gratuitos</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
            A área do cliente é a própria plataforma Lots BI. Enquanto a agência opera mídia,
            conteúdo e dados, o cliente entra com login e senha e vê o montante de recursos
            consolidado: métricas, estratégia, aprovações e o painel da marca — em tempo real.
          </p>
        </AnimatedSection>

        <ul className="max-w-3xl mx-auto divide-y divide-white/10 border-y border-white/10">
          {POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.title} delay={idx * 0.06}>
                <li className="flex gap-4 py-6 first:pt-7 last:pb-7">
                  <Icon
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 font-display">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              </AnimatedSection>
            );
          })}
        </ul>

        <AnimatedSection className="max-w-2xl mx-auto mt-10 text-center">
          <p className="text-sm text-muted-foreground/90 text-balance">
            Sem custo adicional de plataforma para o cliente. Sem curva de ferramenta complexa:
            basta autenticar e acompanhar a operação com a mesma clareza da equipe Lots.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
