import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultContent = {
  hero: {
    brand: "Agência Lots",
    badge: "Engenharia de Vendas & Dados - Agência de Marketing Digital",
    title: "Estruturação e Gestão Digital",
    subtitle: "Construímos o seu ecossistema digital para encontrar as pessoas certas no momento certo. Arquitetura avançada para prestadores de serviço que buscam escalar com previsibilidade matemática.",
    cta: "Quero um Orçamento"
  },
  ecosystem: {
    title: "A estrutura Completa para dominar o seu nicho",
    subtitle: "Não vendemos serviços isolados. Construímos uma máquina interligada onde cada engrenagem potencializa a outra para prestadores de serviço.",
    c1Title: "Área do Cliente",
    c1Desc: "Acesso facilitado aos seus relatórios, calendário editorial, aprovação de postagens e mais.",
    c2Title: "Meta & Google Ads",
    c2Desc: "Anúncios precisos que chegam na pessoa certa, na hora certa, com rastreamento completo de resultados.",
    c3Title: "Landing Pages Conversivas",
    c3Desc: "Páginas otimizadas para converter visitantes em clientes. Design estratégico + copywriting persuasivo = mais vendas.",
    c4Title: "Acompanhamento de Perto",
    c4Desc: "Nós acompanhamos sua operação diariamente. Ajustes constantes, otimizações contínuas e resultados crescentes."
  },
  contentCreation: {
    title: "Criação de Conteúdo & Design",
    subtitle: "Do visual à publicação e à métrica — conteúdo que gera autoridade e conversão.",
    c1Title: "Agendamento Inteligente",
    c1Desc: "Distribuição estratégica de conteúdo nos horários de pico da sua audiência. Maximize seu alcance sem esforço manual.",
    c1Bullets: ["Melhores horários de postagem", "Automação completa", "Gestão de calendário"],
    c2Title: "Criação de Conteúdo Visual",
    c2Desc: "Design premium alinhado à identidade da sua marca. Criamos materiais que transmitem profissionalismo e confiança.",
    c2Bullets: ["Designs profissionais", "Alinhamento de marca", "Consistência visual"],
    c3Title: "Design de Posts",
    c3Desc: "Templates exclusivos focados em hierarquia visual e engajamento. Cada post é desenhado para reter a atenção do seu público.",
    c3Bullets: ["Designs personalizados", "Criação de templates", "Foco em engajamento"],
    c4Title: "Otimização de Campanhas",
    c4Desc: "Testes contínuos e refinamento de público para maximizar conversões. Seu investimento sempre focado no melhor resultado.",
    c4Bullets: ["Testes A/B", "Análise de performance", "Melhoria contínua"],
    c5Title: "Calendário Editorial",
    c5Desc: "Planejamento estratégico de temas e campanhas com visão de longo prazo. Nunca mais fique sem saber o que postar.",
    c5Bullets: ["Planejamento de conteúdo", "Organização estratégica", "Consistência garantida"],
    c6Title: "Análise de Performance",
    c6Desc: "Métricas detalhadas e mensuração de ROI para decisões baseadas em dados. Saiba exatamente o que funciona para o seu negócio.",
    c6Bullets: ["Acompanhamento de métricas", "Análise de engajamento", "Rastreamento de ROI"]
  },
  roadmap: {
    title: "Método Lots",
    subtitle: "Cinco etapas claras — da auditoria à escala — com critério, dados e execução sob o mesmo comando.",
    s1Title: "Diagnóstico",
    s1Desc: "Auditoria da operação atual: funil, mídia, oferta e gargalos que travam crescimento.",
    s2Title: "Arquitetura",
    s2Desc: "Desenho do ecossistema digital e do plano de campanhas alinhado ao objetivo de negócio.",
    s3Title: "Implementação",
    s3Desc: "Funis, páginas, rastreamento e automações no ar — base pronta para medir de verdade.",
    s4Title: "Otimização",
    s4Desc: "Campanhas ativas, testes e ajustes diários com leitura no Lots BI.",
    s5Title: "Escala",
    s5Desc: "Ampliação de verba onde o ROI já validou — crescimento previsível, não esperança.",
  },
  services: {
    title: "Nossos Serviços",
    subtitle: "O ecossistema completo para dominar o seu mercado e atrair os melhores clientes.",
    s1Title: "Gestão de tráfego pago",
    s1Desc: "Campanhas de alta performance no Meta e Google Ads com foco absoluto em ROI e escala para o seu negócio.",
    s1Bullets: ["Anúncios direcionados", "Otimização de orçamento", "Foco em conversão"],
    s2Title: "Social media",
    s2Desc: "Posicionamento de marca premium que gera desejo e autoridade instantânea no seu nicho de atuação.",
    s2Bullets: ["Identidade visual", "Posicionamento estratégico", "Criação de autoridade"],
    s3Title: "Gestão de redes sociais",
    s3Desc: "Administração completa dos seus canais para engajamento, crescimento de audiência e conversão contínua.",
    s3Bullets: ["Interação com público", "Crescimento orgânico", "Monitoramento de menções"],
    s4Title: "Análise de campanhas",
    s4Desc: "Auditoria profunda de métricas para identificar gargalos, reduzir custos e encontrar oportunidades de lucro.",
    s4Bullets: ["Auditoria de métricas", "Identificação de gargalos", "Relatórios de performance"],
    s5Title: "Aprimoramento diário",
    s5Desc: "Acompanhamento e otimização constante de anúncios e campanhas para garantir o menor custo por aquisição.",
    s5Bullets: ["Ajustes em tempo real", "Redução de custos", "Maximização de resultados"],
    s6Title: "Copywriting",
    s6Desc: "Textos persuasivos estruturados com gatilhos mentais para conversão imediata e atração de clientes qualificados.",
    s6Bullets: ["Textos persuasivos", "Gatilhos mentais", "Foco em vendas"],
    s7Title: "Relatórios semanais",
    s7Desc: "Transparência total com dashboards atualizados e acompanhamento claro de todos os indicadores importantes.",
    s7Bullets: ["Transparência total", "Dashboards claros", "Acompanhamento de KPIs"],
    s8Title: "Criação de estratégia",
    s8Desc: "Desenho do funil de vendas personalizado e planejamento completo para o seu modelo específico de negócio.",
    s8Bullets: ["Funil personalizado", "Planejamento completo", "Estratégia sob medida"],
    cta: "Quero um Orçamento"
  },
  serviceSelection: {
    title: "Qual Atividade Está Buscando?",
    subtitle: "Toque nas atividades de interesse e avance para o briefing",
    whatsappNumber: "5511999999999",
    s1Title: "Gestão de Tráfego Pago",
    s1Desc: "Anúncios de alta performance no Meta e Google Ads focados em ROI.",
    s2Title: "Social Media",
    s2Desc: "Posicionamento de marca premium e criação de autoridade.",
    s3Title: "Gestão de Redes Sociais",
    s3Desc: "Administração completa para engajamento e crescimento.",
    s4Title: "Análise de Campanhas",
    s4Desc: "Auditoria profunda para identificar gargalos e oportunidades.",
    s5Title: "Aprimoramento Diário",
    s5Desc: "Otimização constante para garantir o menor custo por aquisição.",
    s6Title: "Copywriting",
    s6Desc: "Textos persuasivos estruturados para conversão imediata.",
    s7Title: "Relatórios Semanais",
    s7Desc: "Dashboards atualizados e acompanhamento claro de KPIs.",
    s8Title: "Criação de Estratégia",
    s8Desc: "Desenho do funil de vendas personalizado para o seu negócio.",
    s9Title: "Acompanhamento Diário",
    s9Desc: "Monitoramento contínuo da sua operação com ajustes e otimizações constantes para resultados crescentes."
  },
  comparison: {
    title: "Por que prestadores de serviço escolhem a Agência Lots",
    subtitle: "Não é sobre quem cobra mais barato. É sobre quem assume a operação — e quem só entrega relatório no fim do mês.",
    f1Name: "Relatórios",
    f1Common: "PDF genérico no fechamento",
    f1Majr: "Lots BI ao vivo — cada centavo rastreado",
    f2Name: "Rastreamento",
    f2Common: "Curtidas, alcance e “está bom”",
    f2Majr: "Conversão, CPA e ROI no mesmo painel",
    f3Name: "Acompanhamento",
    f3Common: "Call mensal (se lembrar)",
    f3Majr: "Leitura diária da operação",
    f4Name: "Suporte",
    f4Common: "Fila de atendimento e resposta tardia",
    f4Majr: "Acesso direto a quem executa",
    f5Name: "Execução",
    f5Common: "Você ainda faz o trabalho pesado",
    f5Majr: "Nós operamos. Você decide e escala",
  },
  clientArea: {
    title: "Lots BI — a área do cliente da operação",
    subtitle: "Business Intelligence para marketing digital. Consolidamos métricas, aprovações e o plano estratégico num único painel — a plataforma que sua equipe usa de verdade.",
    f1Title: "Visão geral",
    f1Desc: "Resultados consolidados: investimento, conversões, CTR, CPA e evolução por período — sem planilha espalhada.",
    f2Title: "Plano Estratégico",
    f2Desc: "Diagnóstico, objetivos, hipóteses e decisões em um só lugar, alinhados à execução da agência.",
    f3Title: "Aprovações",
    f3Desc: "Kanban e calendário editorial para revisar, aprovar e publicar criativos com rastreio do status.",
    f4Title: "Painel da marca",
    f4Desc: "Meta Ads, Google Ads, Instagram, GA4 e mais — visão por plataforma e visão unificada.",
  },
  team: {
    title: "Quem conduz",
    subtitle: "Dados, produto e criação — a equipe que estrutura a operação e comunica a marca com consistência.",
    together:
      "Um fecha a engenharia: dados, produto e automações. O outro fecha a narrativa: visual, social e design. Juntos, a operação não fica só no técnico nem só no criativo — escala com clareza e identidade.",
    founder1Role: "Especialista em Dados | Dev Web",
    founder1Desc: "",
    founder2Role: "Social Media | Designer",
    founder2Desc: ""
  },
  faq: {
    title: "Dúvidas antes de pedir orçamento",
    subtitle: "Respostas diretas do que a maioria pergunta no primeiro contato.",
    q1: "Como funciona o orçamento?",
    a1: "Você conta o momento do negócio e o que precisa. Montamos uma proposta sob medida — escopo, prioridades e investimento claros, sem pacote genérico.",
    q2: "Quanto tempo leva para começar e ver resultado?",
    a2: "Após alinhamento, a estrutura inicia rápido. Nos primeiros 30 dias o foco é fundação e primeiras vitórias mensuráveis; escala e previsibilidade entram com o ritmo da operação.",
    q3: "O orçamento de anúncios está incluso?",
    a3: "Não. A mídia (Meta, Google etc.) é investimento à parte, pago direto nas plataformas. Nós estruturamos, gerimos e otimizamos — você acompanha tudo no Lots BI.",
    q4: "O que entra na parceria e o que fica comigo?",
    a4: "Cuidamos de estratégia, funil, conteúdo operacional, mídia e painel. Você define oferta, decisão comercial e aprovação de criativos — com processo claro para não travar a semana.",
    q5: "Preciso fechar contrato longo logo de cara?",
    a5: "Começamos com escopo e prazo alinhados à sua necessidade. O objetivo é gerar resultado e confiança — fidelidade longa só faz sentido quando a operação está performando.",
    q6: "Para que tipo de negócio isso funciona?",
    a6: "Negócios com oferta clara e potencial de aquisição digital: serviços, imobiliário, local, e-commerce e profissionais liberais. Se dá para medir lead e venda, dá para estruturar.",
    ctaText: "Ainda em dúvida? O atalho mais rápido é uma conversa de 5 minutos.",
    ctaLabel: "Pedir orçamento no WhatsApp",
  },
  motivational: {
    badge: "Próximo passo",
    title: "Vamos estruturar o seu próximo passo.",
    subtitle: "Conte o essencial — a gente retorna com um caminho claro de orçamento.",
    cta: "Enviar e abrir WhatsApp"
  },
  footer: {
    description: "Estruturação e gestão de vendas digitais.",
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
          hero: { ...defaultContent.hero, ...(parsed.hero || {}), brand: defaultContent.hero.brand },
          comparison: {
            ...defaultContent.comparison,
            ...(parsed.comparison || {}),
            title: defaultContent.comparison.title,
            subtitle: defaultContent.comparison.subtitle,
            f1Common: defaultContent.comparison.f1Common,
            f1Majr: defaultContent.comparison.f1Majr,
            f2Common: defaultContent.comparison.f2Common,
            f2Majr: defaultContent.comparison.f2Majr,
            f3Common: defaultContent.comparison.f3Common,
            f3Majr: defaultContent.comparison.f3Majr,
            f4Common: defaultContent.comparison.f4Common,
            f4Majr: defaultContent.comparison.f4Majr,
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
          },
          contentCreation: {
            ...defaultContent.contentCreation,
            ...(parsed.contentCreation || {}),
            subtitle: defaultContent.contentCreation.subtitle,
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