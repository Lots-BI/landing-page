import React, { useState } from 'react';
import { Target, Share2, Users, BarChart, RefreshCw, PenTool, FileText, Lightbulb, Eye } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection.jsx';
import { ServiceSelectionCards } from './ServiceSelectionCards.jsx';
import { WhatsAppButton } from './WhatsAppButton.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

const ServicesPricing = () => {
  const { content } = useEditableContent();
  const s = content.serviceSelection || {};
  
  const [selectedServices, setSelectedServices] = useState([]);

  // Map the editable content to our services array with icons
  const servicesList = [
    { id: 's1', icon: Target, title: s.s1Title || 'Gestão de Tráfego Pago', desc: s.s1Desc || 'Anúncios de alta performance no Meta e Google Ads focados em ROI.' },
    { id: 's2', icon: Share2, title: s.s2Title || 'Social Media', desc: s.s2Desc || 'Posicionamento de marca premium e criação de autoridade.' },
    { id: 's3', icon: Users, title: s.s3Title || 'Gestão de Redes Sociais', desc: s.s3Desc || 'Administração completa para engajamento e crescimento.' },
    { id: 's4', icon: BarChart, title: s.s4Title || 'Análise de Campanhas', desc: s.s4Desc || 'Auditoria profunda para identificar gargalos e oportunidades.' },
    { id: 's5', icon: RefreshCw, title: s.s5Title || 'Aprimoramento Diário', desc: s.s5Desc || 'Otimização constante para garantir o menor custo por aquisição.' },
    { id: 's6', icon: PenTool, title: s.s6Title || 'Copywriting', desc: s.s6Desc || 'Textos persuasivos estruturados para conversão imediata.' },
    { id: 's7', icon: FileText, title: s.s7Title || 'Relatórios Semanais', desc: s.s7Desc || 'Dashboards atualizados e acompanhamento claro de KPIs.' },
    { id: 's8', icon: Lightbulb, title: s.s8Title || 'Criação de Estratégia', desc: s.s8Desc || 'Desenho do funil de vendas personalizado para o seu negócio.' },
    { id: 's9', icon: Eye, title: s.s9Title || 'Acompanhamento Diário', desc: s.s9Desc || 'Monitoramento contínuo da sua operação com ajustes e otimizações constantes para resultados crescentes.' }
  ];

  const handleToggleService = (service) => {
    setSelectedServices(prev => {
      const isAlreadySelected = prev.some(s => s.id === service.id);
      if (isAlreadySelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const displayTitle = s.title || 'Escolha os Serviços que Você Precisa';

  return (
    <section id="planos" className="py-12 md:py-16 relative bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection className="text-center mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-foreground">
            {displayTitle.split(/(Serviços)/).map((part, i) => 
              part === 'Serviços' ? <span key={i} className="rgb-gradient-text">{part}</span> : part
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            {s.subtitle || 'Selecione os serviços de interesse e envie uma mensagem personalizada via WhatsApp'}
          </p>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto mb-8 relative z-10">
          <ServiceSelectionCards 
            services={servicesList}
            selectedIds={selectedServices.map(s => s.id)}
            onToggle={handleToggleService}
          />
        </div>

        <AnimatedSection className="flex justify-center text-center w-full relative z-10 mt-8">
          <WhatsAppButton 
            phoneNumber="5511973290438"
            baseMessage="Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?"
            className="w-full md:w-auto text-lg px-8 py-4 shadow-[0_0_30px_hsla(142,71%,45%,0.3)] hover:shadow-[0_0_40px_hsla(142,71%,45%,0.5)]"
          >
            💬 Enviar via WhatsApp
          </WhatsAppButton>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default ServicesPricing;