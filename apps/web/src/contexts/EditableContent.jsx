import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultContent = {
  hero: {
    brand: "Agência Lots",
    badge: "Marketing digital com operação e dados",
    title: "Agência de Marketing digital",
    subtitle: "Estruturação e gestão completa",
    cta: "Quero estruturar meu marketing"
  },
  ecosystem: {
    title: "Operação Digital Inteligente",
    subtitle: "Cada peça conversa com a outra. Você vê o todo — e escala o que já funciona.",
    c1Title: "Lots BI",
    c1Desc: "Seu painel ao vivo: métricas, aprovações e plano estratégico em um só lugar.",
    c2Title: "Meta & Google Ads",
    c2Desc: "Campanhas com rastreio de ponta a ponta — da impressão à conversão.",
    c3Title: "Páginas que convertem",
    c3Desc: "Landing pages alinhadas à oferta e à campanha. Tráfego com destino certo.",
    c4Title: "Operação diária",
    c4Desc: "Acompanhamos, ajustamos e otimizamos. A máquina não fica no piloto automático cego."
  },
  contentCreation: {
    title: "Conteúdo & Design com função",
    subtitle: "Criativo que gera autoridade — e conversa com a mídia e o funil.",
    c1Title: "Agendamento",
    c1Desc: "Publicação nos horários certos, com calendário sob controle.",
    c1Bullets: ["Horários de pico", "Automação", "Calendário"],
    c2Title: "Criação visual",
    c2Desc: "Identidade consistente, limpa e profissional.",
    c2Bullets: ["Design alinhado", "Marca forte", "Consistência"],
    c3Title: "Posts",
    c3Desc: "Peças com hierarquia clara — feitas para reter atenção.",
    c3Bullets: ["Templates", "Personalização", "Engajamento"],
    c4Title: "Otimização",
    c4Desc: "Testes e cortes: o que performa sobe, o resto sai.",
    c4Bullets: ["Testes A/B", "Performance", "Melhoria contínua"],
    c5Title: "Calendário editorial",
    c5Desc: "Temas e campanhas planejados — sem apagar incêndio toda semana.",
    c5Bullets: ["Planejamento", "Organização", "Ritmo"],
    c6Title: "Métricas",
    c6Desc: "Leitura objetiva do que gera resultado de verdade.",
    c6Bullets: ["KPIs", "Engajamento", "ROI"]
  },
  roadmap: {
    title: "Método Lots",
    subtitle: "Do diagnóstico à escala — com critério e dados.",
    s1Title: "Diagnóstico",
    s1Desc: "Onde a operação trava: oferta, funil, mídia e oportunidades.",
    s2Title: "Arquitetura",
    s2Desc: "Desenho do ecossistema e do plano alinhado ao objetivo de negócio.",
    s3Title: "Implementação",
    s3Desc: "Funis, páginas, rastreamento e automações no ar.",
    s4Title: "Otimização",
    s4Desc: "Campanhas ativas, testes e leitura diária no Lots BI.",
    s5Title: "Escala",
    s5Desc: "Mais verba onde o ROI já validou. Crescimento com base, não com fé.",
  },
  services: {
    title: "Nossos Serviços",
    subtitle: "O ecossistema para atrair os clientes certos — e sustentar o crescimento.",
    s1Title: "Gestão de tráfego pago",
    s1Desc: "Meta e Google com foco em ROI e escala.",
    s1Bullets: ["Segmentação", "Orçamento", "Conversão"],
    s2Title: "Social media",
    s2Desc: "Posicionamento que gera desejo e autoridade.",
    s2Bullets: ["Identidade", "Estratégia", "Autoridade"],
    s3Title: "Gestão de redes sociais",
    s3Desc: "Canais vivos: engajamento, ritmo e conversão.",
    s3Bullets: ["Interação", "Crescimento", "Monitoramento"],
    s4Title: "Análise de campanhas",
    s4Desc: "Auditoria para cortar desperdício e achar lucro.",
    s4Bullets: ["Métricas", "Gargalos", "Relatórios"],
    s5Title: "Aprimoramento diário",
    s5Desc: "Ajustes constantes para baixar CPA.",
    s5Bullets: ["Tempo real", "Custo", "Resultado"],
    s6Title: "Copywriting",
    s6Desc: "Textos feitos para converter — não só para postar.",
    s6Bullets: ["Persuasão", "Oferta clara", "Vendas"],
    s7Title: "Relatórios semanais",
    s7Desc: "Indicadores claros. Sem surpresa no fechamento.",
    s7Bullets: ["Transparência", "Dashboards", "KPIs"],
    s8Title: "Criação de estratégia",
    s8Desc: "Funil e plano sob medida para o seu modelo.",
    s8Bullets: ["Funil", "Planejamento", "Sob medida"],
    cta: "Quero estruturar meu marketing"
  },
  serviceSelection: {
    title: "Quais Serviços Procura?",
    subtitle: "Selecione tudo que procure!",
    whatsappNumber: "5511999999999",
    s1Title: "Gestão de Tráfego Pago",
    s1Desc: "Meta e Google com foco em ROI.",
    s2Title: "Social Media",
    s2Desc: "Posicionamento e autoridade de marca.",
    s3Title: "Gestão de Redes Sociais",
    s3Desc: "Operação completa dos canais.",
    s4Title: "Análise de Campanhas",
    s4Desc: "Auditoria de gargalos e oportunidades.",
    s5Title: "Aprimoramento Diário",
    s5Desc: "Otimização contínua para menor CPA.",
    s6Title: "Copywriting",
    s6Desc: "Textos feitos para converter.",
    s7Title: "Relatórios Semanais",
    s7Desc: "KPIs claros, semana a semana.",
    s8Title: "Criação de Estratégia",
    s8Desc: "Funil e plano sob medida.",
    s9Title: "Acompanhamento Diário",
    s9Desc: "Monitoramento e ajustes constantes."
  },
  comparison: {
    title: "Por que escolher a Agência Lots",
    subtitle: "Menos promessa. Mais operação no painel.",
    f1Name: "Relatórios",
    f1Common: "PDF genérico no fechamento",
    f1Majr: "Lots BI ao vivo — cada real rastreado",
    f2Name: "Rastreamento",
    f2Common: "Curtidas, alcance e “está bom”",
    f2Majr: "Conversão, CPA e ROI no mesmo lugar",
    f3Name: "Acompanhamento",
    f3Common: "Call mensal (se lembrar)",
    f3Majr: "Leitura diária da operação",
    f4Name: "Suporte",
    f4Common: "Fila e resposta tarde",
    f4Majr: "Acesso direto a quem executa",
    f5Name: "Execução",
    f5Common: "Você ainda faz o pesado",
    f5Majr: "Nós operamos. Você decide e escala",
  },
  clientArea: {
    title: "Lots BI — clareza em tempo real",
    subtitle: "O painel da operação: métricas, aprovações e estratégia. Sem planilha espalhada.",
    f1Title: "Visão geral",
    f1Desc: "Investimento, conversões, CTR, CPA e evolução — consolidado.",
    f2Title: "Plano estratégico",
    f2Desc: "Diagnóstico, objetivos e decisões alinhados à execução.",
    f3Title: "Aprovações",
    f3Desc: "Kanban e calendário para revisar e publicar com status claro.",
    f4Title: "Painel da marca",
    f4Desc: "Meta, Google, Instagram, GA4 — visão por canal e unificada.",
  },
  team: {
    title: "Quem conduz",
    subtitle: "Dados e criação no mesmo time — operação com identidade e critério.",
    together:
      "Um estrutura sistemas, dados e produto. O outro traduz a marca em visual e presença. Juntos, a operação escala sem perder clareza nem identidade.",
    founder1Role: "Especialista em dados",
    founder1Desc: "",
    founder2Role: "Social Media",
    founder2Desc: ""
  },
  faq: {
    title: "Dúvidas antes do orçamento",
    subtitle: "O que a maioria pergunta no primeiro contato — direto ao ponto.",
    q1: "Como funciona o orçamento?",
    a1: "Você conta o momento do negócio. Montamos proposta sob medida: escopo, prioridades e investimento — sem pacote genérico.",
    q2: "Em quanto tempo começa e aparece resultado?",
    a2: "Após o alinhamento, a estrutura sobe rápido. Nos primeiros 30 dias: fundação e primeiras vitórias mensuráveis. Escala vem com o ritmo da operação.",
    q3: "O valor de anúncios está incluso?",
    a3: "Não. A mídia (Meta, Google etc.) é paga por você nas plataformas. Nós estruturamos, gerimos e otimizamos — você acompanha no Lots BI.",
    q4: "O que a Lots faz e o que fica comigo?",
    a4: "Cuidamos de estratégia, funil, conteúdo operacional, mídia e painel. Você define oferta, decisões comerciais e aprova criativos — com processo para não travar a semana.",
    q5: "Preciso de contrato longo já no início?",
    a5: "Começamos com escopo e prazo claros. Parceria longa faz sentido quando a operação está performando.",
    q6: "Para que tipo de negócio funciona?",
    a6: "Negócios com oferta clara e aquisição digital mensurável: serviços, imobiliário, local, e-commerce e profissionais liberais.",
    ctaText: "Pronto para o próximo passo?",
    ctaLabel: "Montar meu briefing",
  },
  motivational: {
    badge: "Próximo passo",
    title: "Vamos alinhar o seu próximo passo.",
    subtitle: "Três campos. A gente retorna com um caminho claro de orçamento.",
    cta: "Enviar e abrir WhatsApp"
  },
  footer: {
    description: "Marketing digital com operação, dados e escala.",
    contactTitle: "Contato",
    navTitle: "Navegação"
  },
  navigation: {
    nav1: "Solução",
    nav2: "Metodologia",
    nav3: "Equipe",
    nav4: "Planos"
  }
};

const EditableContentContext = createContext();

export function EditableContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('siteContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep-ish merge so new brand defaults win over stale Leandro MAJR storage
        return {
          ...defaultContent,
          ...parsed,
          hero: {
            ...defaultContent.hero,
            ...(parsed.hero || {}),
            brand: defaultContent.hero.brand,
            badge: defaultContent.hero.badge,
            title: defaultContent.hero.title,
            subtitle: defaultContent.hero.subtitle,
            cta: defaultContent.hero.cta,
          },
          ecosystem: {
            ...defaultContent.ecosystem,
            ...(parsed.ecosystem || {}),
            title: defaultContent.ecosystem.title,
            subtitle: defaultContent.ecosystem.subtitle,
            c1Title: defaultContent.ecosystem.c1Title,
            c1Desc: defaultContent.ecosystem.c1Desc,
            c2Title: defaultContent.ecosystem.c2Title,
            c2Desc: defaultContent.ecosystem.c2Desc,
            c3Title: defaultContent.ecosystem.c3Title,
            c3Desc: defaultContent.ecosystem.c3Desc,
            c4Title: defaultContent.ecosystem.c4Title,
            c4Desc: defaultContent.ecosystem.c4Desc,
          },
          contentCreation: {
            ...defaultContent.contentCreation,
            ...(parsed.contentCreation || {}),
            title: defaultContent.contentCreation.title,
            subtitle: defaultContent.contentCreation.subtitle,
            c1Title: defaultContent.contentCreation.c1Title,
            c1Desc: defaultContent.contentCreation.c1Desc,
            c2Title: defaultContent.contentCreation.c2Title,
            c2Desc: defaultContent.contentCreation.c2Desc,
            c3Title: defaultContent.contentCreation.c3Title,
            c3Desc: defaultContent.contentCreation.c3Desc,
            c4Title: defaultContent.contentCreation.c4Title,
            c4Desc: defaultContent.contentCreation.c4Desc,
            c5Title: defaultContent.contentCreation.c5Title,
            c5Desc: defaultContent.contentCreation.c5Desc,
            c6Title: defaultContent.contentCreation.c6Title,
            c6Desc: defaultContent.contentCreation.c6Desc,
          },
          comparison: {
            ...defaultContent.comparison,
            ...(parsed.comparison || {}),
            title: defaultContent.comparison.title,
            subtitle: defaultContent.comparison.subtitle,
            f1Name: defaultContent.comparison.f1Name,
            f1Common: defaultContent.comparison.f1Common,
            f1Majr: defaultContent.comparison.f1Majr,
            f2Name: defaultContent.comparison.f2Name,
            f2Common: defaultContent.comparison.f2Common,
            f2Majr: defaultContent.comparison.f2Majr,
            f3Name: defaultContent.comparison.f3Name,
            f3Common: defaultContent.comparison.f3Common,
            f3Majr: defaultContent.comparison.f3Majr,
            f4Name: defaultContent.comparison.f4Name,
            f4Common: defaultContent.comparison.f4Common,
            f4Majr: defaultContent.comparison.f4Majr,
            f5Name: defaultContent.comparison.f5Name,
            f5Common: defaultContent.comparison.f5Common,
            f5Majr: defaultContent.comparison.f5Majr,
          },
          roadmap: {
            ...defaultContent.roadmap,
            ...(parsed.roadmap || {}),
            title: defaultContent.roadmap.title,
            subtitle: defaultContent.roadmap.subtitle,
            s1Title: defaultContent.roadmap.s1Title,
            s1Desc: defaultContent.roadmap.s1Desc,
            s2Title: defaultContent.roadmap.s2Title,
            s2Desc: defaultContent.roadmap.s2Desc,
            s3Title: defaultContent.roadmap.s3Title,
            s3Desc: defaultContent.roadmap.s3Desc,
            s4Title: defaultContent.roadmap.s4Title,
            s4Desc: defaultContent.roadmap.s4Desc,
            s5Title: defaultContent.roadmap.s5Title,
            s5Desc: defaultContent.roadmap.s5Desc,
          },
          serviceSelection: {
            ...defaultContent.serviceSelection,
            ...(parsed.serviceSelection || {}),
            title: defaultContent.serviceSelection.title,
            subtitle: defaultContent.serviceSelection.subtitle,
            s1Title: defaultContent.serviceSelection.s1Title,
            s1Desc: defaultContent.serviceSelection.s1Desc,
            s2Title: defaultContent.serviceSelection.s2Title,
            s2Desc: defaultContent.serviceSelection.s2Desc,
            s3Title: defaultContent.serviceSelection.s3Title,
            s3Desc: defaultContent.serviceSelection.s3Desc,
            s4Title: defaultContent.serviceSelection.s4Title,
            s4Desc: defaultContent.serviceSelection.s4Desc,
            s5Title: defaultContent.serviceSelection.s5Title,
            s5Desc: defaultContent.serviceSelection.s5Desc,
            s6Title: defaultContent.serviceSelection.s6Title,
            s6Desc: defaultContent.serviceSelection.s6Desc,
            s7Title: defaultContent.serviceSelection.s7Title,
            s7Desc: defaultContent.serviceSelection.s7Desc,
            s8Title: defaultContent.serviceSelection.s8Title,
            s8Desc: defaultContent.serviceSelection.s8Desc,
            s9Title: defaultContent.serviceSelection.s9Title,
            s9Desc: defaultContent.serviceSelection.s9Desc,
          },
          clientArea: {
            ...defaultContent.clientArea,
            ...(parsed.clientArea || {}),
            title: defaultContent.clientArea.title,
            subtitle: defaultContent.clientArea.subtitle,
            f1Title: defaultContent.clientArea.f1Title,
            f1Desc: defaultContent.clientArea.f1Desc,
            f2Title: defaultContent.clientArea.f2Title,
            f2Desc: defaultContent.clientArea.f2Desc,
            f3Title: defaultContent.clientArea.f3Title,
            f3Desc: defaultContent.clientArea.f3Desc,
            f4Title: defaultContent.clientArea.f4Title,
            f4Desc: defaultContent.clientArea.f4Desc,
          },
          team: {
            ...defaultContent.team,
            ...(parsed.team || {}),
            title: defaultContent.team.title,
            subtitle: defaultContent.team.subtitle,
            together: defaultContent.team.together,
            founder1Role: defaultContent.team.founder1Role,
            founder1Desc: defaultContent.team.founder1Desc,
            founder2Role: defaultContent.team.founder2Role,
            founder2Desc: defaultContent.team.founder2Desc,
          },
          faq: {
            ...defaultContent.faq,
            ...(parsed.faq || {}),
            title: defaultContent.faq.title,
            subtitle: defaultContent.faq.subtitle,
            q1: defaultContent.faq.q1,
            a1: defaultContent.faq.a1,
            q2: defaultContent.faq.q2,
            a2: defaultContent.faq.a2,
            q3: defaultContent.faq.q3,
            a3: defaultContent.faq.a3,
            q4: defaultContent.faq.q4,
            a4: defaultContent.faq.a4,
            q5: defaultContent.faq.q5,
            a5: defaultContent.faq.a5,
            q6: defaultContent.faq.q6,
            a6: defaultContent.faq.a6,
            ctaText: defaultContent.faq.ctaText,
            ctaLabel: defaultContent.faq.ctaLabel,
          },
          motivational: {
            ...defaultContent.motivational,
            ...(parsed.motivational || {}),
            badge: defaultContent.motivational.badge,
            title: defaultContent.motivational.title,
            subtitle: defaultContent.motivational.subtitle,
            cta: defaultContent.motivational.cta,
          },
          footer: {
            ...defaultContent.footer,
            ...(parsed.footer || {}),
            description: defaultContent.footer.description,
            contactTitle: defaultContent.footer.contactTitle,
            navTitle: defaultContent.footer.navTitle,
          },
        };
      } catch (e) {
        return defaultContent;
      }
    }
    return defaultContent;
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(content));
  }, [content]);

  const updateContent = (section, key, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('siteContent');
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <EditableContentContext.Provider value={{ 
      content, 
      updateContent, 
      resetContent,
      isEditMode,
      toggleEditMode 
    }}>
      {children}
    </EditableContentContext.Provider>
  );
}

export function useEditableContent() {
  const context = useContext(EditableContentContext);
  if (!context) {
    throw new Error('useEditableContent must be used within an EditableContentProvider');
  }
  return context;
}