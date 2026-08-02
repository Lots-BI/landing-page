import React from 'react';
import { motion } from 'framer-motion';
import { Target, Share2, Users, BarChart, RefreshCw, PenTool, FileText, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { GlassCard } from './GlassCard.jsx';
import { PlanosCtaButton } from './PlanosCtaButton.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { useCarouselControls } from '@/hooks/useCarouselControls.js';

export function ServicesSection() {
  const { content } = useEditableContent();
  const { containerRef, scrollLeft, scrollRight, handlers } = useCarouselControls({ autoScrollInterval: 4000, scrollAmount: 360 });
  
  const s = content?.services || {};

  const services = [
    { 
      id: 's1', icon: Target, 
      title: s.s1Title || 'Gestão de tráfego pago', 
      desc: s.s1Desc || 'Campanhas de alta performance no Meta e Google Ads com foco absoluto em ROI e escala para o seu negócio.', 
      bullets: s.s1Bullets || ["Anúncios direcionados", "Otimização de orçamento", "Foco em conversão"] 
    },
    { 
      id: 's2', icon: Share2, 
      title: s.s2Title || 'Social media', 
      desc: s.s2Desc || 'Posicionamento de marca premium que gera desejo e autoridade instantânea no seu nicho de atuação.', 
      bullets: s.s2Bullets || ["Identidade visual", "Posicionamento estratégico", "Criação de autoridade"] 
    },
    { 
      id: 's3', icon: Users, 
      title: s.s3Title || 'Gestão de redes sociais', 
      desc: s.s3Desc || 'Administração completa dos seus canais para engajamento, crescimento de audiência e conversão contínua.', 
      bullets: s.s3Bullets || ["Interação com público", "Crescimento orgânico", "Monitoramento de menções"] 
    },
    { 
      id: 's4', icon: BarChart, 
      title: s.s4Title || 'Análise de campanhas', 
      desc: s.s4Desc || 'Auditoria profunda de métricas para identificar gargalos, reduzir custos e encontrar oportunidades de lucro.', 
      bullets: s.s4Bullets || ["Auditoria de métricas", "Identificação de gargalos", "Relatórios de performance"] 
    },
    { 
      id: 's5', icon: RefreshCw, 
      title: s.s5Title || 'Aprimoramento diário', 
      desc: s.s5Desc || 'Acompanhamento e otimização constante de anúncios e campanhas para garantir o menor custo por aquisição.', 
      bullets: s.s5Bullets || ["Ajustes em tempo real", "Redução de custos", "Maximização de resultados"] 
    },
    { 
      id: 's6', icon: PenTool, 
      title: s.s6Title || 'Copywriting', 
      desc: s.s6Desc || 'Textos persuasivos estruturados com gatilhos mentais para conversão imediata e atração de clientes qualificados.', 
      bullets: s.s6Bullets || ["Textos persuasivos", "Gatilhos mentais", "Foco em vendas"] 
    },
    { 
      id: 's7', icon: FileText, 
      title: s.s7Title || 'Relatórios semanais', 
      desc: s.s7Desc || 'Transparência total com dashboards atualizados e acompanhamento claro de todos os indicadores importantes.', 
      bullets: s.s7Bullets || ["Transparência total", "Dashboards claros", "Acompanhamento de KPIs"] 
    },
    { 
      id: 's8', icon: Lightbulb, 
      title: s.s8Title || 'Criação de estratégia', 
      desc: s.s8Desc || 'Desenho do funil de vendas personalizado e planejamento completo para o seu modelo específico de negócio.', 
      bullets: s.s8Bullets || ["Funil personalizado", "Planejamento completo", "Estratégia sob medida"] 
    }
  ];

  const displayTitle = s.title === "Nossos Serviços" ? "Escolha os Serviços que Você Precisa" : (s.title || 'Escolha os Serviços que Você Precisa');

  return (
    <section id="servicos" className="py-12 md:py-16 relative bg-transparent z-10 overflow-visible">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            {displayTitle.split(/(Serviços)/).map((part, i) => 
              part === 'Serviços' ? <span key={i} className="rgb-gradient-text">{part}</span> : part
            )}
          </h2>
          <p className="text-lg text-muted-foreground">
            {s.subtitle || 'O ecossistema completo para dominar o seu mercado e atrair os melhores clientes.'}
          </p>
        </AnimatedSection>

        {(!services || services.length === 0) ? (
          <div className="text-center py-12 text-muted-foreground bg-card/50 rounded-2xl border border-border">
            <p>Nenhum serviço disponível no momento.</p>
          </div>
        ) : (
          <div className="relative group mb-8" {...handlers}>
            <button onClick={scrollLeft} className="carousel-nav-btn carousel-nav-btn-left" aria-label="Anterior">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={scrollRight} className="carousel-nav-btn carousel-nav-btn-right" aria-label="Próximo">
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={containerRef}
              className="flex flex-row overflow-x-auto gap-6 pt-12 pb-20 -mx-4 px-4 sm:px-8 snap-x snap-mandatory scroll-smooth hide-scrollbar bg-transparent relative z-10"
            >
              {services.map((service, idx) => (
                <motion.div
                  key={service.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex-shrink-0 min-w-[280px] w-[85vw] max-w-[360px] snap-center transition-all duration-300 h-full"
                >
                  <GlassCard className="h-full flex flex-col group/card hover-lift bg-card/60 border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover/card:bg-primary/20 transition-colors group-hover/card:scale-110 duration-300">
                      <service.icon className="w-6 h-6 text-secondary group-hover/card:text-secondary transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-primary group-hover/card:to-secondary transition-all">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {service.desc}
                    </p>
                    
                    {Array.isArray(service.bullets) && service.bullets.length > 0 && (
                      <ul className="space-y-2 mt-auto pt-4 border-t border-border/50">
                        {service.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                            <div className="w-1 h-1 rounded-full bg-primary shrink-0" /> 
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <AnimatedSection className="flex justify-center w-full text-center">
          <PlanosCtaButton 
            className="px-10 py-4 text-lg shadow-[0_0_30px_hsla(142,71%,25%,0.35)] hover:shadow-[0_0_40px_hsla(142,71%,25%,0.5)]"
          >
            {s.cta || 'Quero um Orçamento'}
          </PlanosCtaButton>
        </AnimatedSection>
      </div>
    </section>
  );
}