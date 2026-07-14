import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultContent = {
  hero: {
    brand: "Leandro MAJR",
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
    subtitle: "Não fazemos apenas posts. Construímos ecossistemas visuais que capturam atenção, geram autoridade e convertem seguidores em clientes.",
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
    title: "Roadmap Interativo",
    subtitle: "O caminho exato da estagnação para a escala exponencial do seu negócio.",
    s1Title: "Diagnóstico",
    s1Desc: "Auditoria profunda da sua operação atual para identificar gargalos e oportunidades.",
    s2Title: "Arquitetura",
    s2Desc: "Desenho do ecossistema digital e planejamento estratégico das campanhas.",
    s3Title: "Implementação",
    s3Desc: "Construção de funis, páginas, automações e configuração de rastreamento.",
    s4Title: "Otimização",
    s4Desc: "Lançamento de campanhas, testes A/B e ajustes finos diários para maximizar resultados.",
    s5Title: "Escala Exponencial",
    s5Desc: "Injeção de verba baseada em ROI validado para crescimento previsível e contínuo."
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
    title: "Escolha os Serviços que Você Precisa",
    subtitle: "Selecione os serviços de interesse e envie uma mensagem personalizada via WhatsApp",
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
    title: "Por que prestadores de serviço escolhem a Leandro MAJR",
    subtitle: "A diferença entre tentar fazer tudo sozinho e ter uma operação digital completa trabalhando por você.",
    f1Name: "Relatórios",
    f1Common: "Superficiais e confusos",
    f1Majr: "Relatórios Detalhados",
    f2Name: "Rastreamento",
    f2Common: "Apenas curtidas e cliques",
    f2Majr: "Rastreamento Completo de Resultados",
    f3Name: "Acompanhamento",
    f3Common: "Mensal ou inexistente",
    f3Majr: "Acompanhamento Diário",
    f4Name: "Suporte",
    f4Common: "Lento e genérico",
    f4Majr: "Suporte Contínuo",
    f5Name: "Execução",
    f5Common: "Você faz a maior parte",
    f5Majr: "Nós Fazemos Tudo"
  },
  clientArea: {
    title: "Área do Cliente Exclusiva",
    subtitle: "Transparência, controle e previsibilidade na palma da sua mão. Acompanhe o crescimento do seu negócio em tempo real.",
    f1Title: "Relatórios em Tempo Real",
    f1Desc: "Acesse dashboards interativos com o desempenho exato de cada centavo investido.",
    f2Title: "Calendário Editorial",
    f2Desc: "Visualize e acompanhe o cronograma completo de publicações e campanhas.",
    f3Title: "Gestão Financeira",
    f3Desc: "Controle de faturas, notas fiscais e histórico de investimentos de forma centralizada.",
    f4Title: "Aprovação de Posts",
    f4Desc: "Sistema ágil para revisar, solicitar alterações e aprovar criativos com um clique."
  },
  team: {
    title: "Especialistas em Crescimento",
    subtitle: "Especialistas orientados a dados focados em impulsionar a sua empresa.",
    founder1Role: "Arquiteto de Growth e Automação",
    founder1Desc: "Especialista na estruturação técnica da máquina de vendas. Engenharia de tráfego e automações complexas.",
    founder2Role: "Head de Estratégia e Conversão",
    founder2Desc: "Mestre em psicologia do consumidor e copywriting de conversão que gera desejo imediato de compra."
  },
  faq: {
    title: "Perguntas Frequentes",
    q1: "Como funciona o processo de Estruturação Digital Completa?",
    a1: "Nossa metodologia mapeia seu potencial oculto e constrói um ecossistema robusto. Transformamos sua operação em uma máquina de aquisição previsível e escalável.",
    q2: "Quanto tempo leva para ver resultados?",
    a2: "Nos primeiros 30 dias, focamos em vitórias rápidas e na estruturação da sua máquina de vendas. A partir de 90 dias, você experimentará a verdadeira escala e previsibilidade.",
    q3: "Como vocês garantem o ROI do investimento?",
    a3: "Implementamos dashboards de medição precisos e rastreamento avançado. Você terá clareza absoluta sobre cada centavo investido, garantindo decisões baseadas em dados.",
    q4: "Qual é a diferença entre os planos oferecidos?",
    a4: "O Setup Core constrói sua fundação digital. A Estruturação Completa acelera suas vendas com automação avançada, e o Scale & Partner é nossa parceria definitiva.",
    q5: "Vocês trabalham com qual tipo de negócio?",
    a5: "Impulsionamos prestadores de serviço, infoprodutores, e-commerces, coaches e consultores. Se você tem um negócio com potencial de transformação, nós temos a arquitetura para escalá-lo."
  },
  motivational: {
    badge: "Resultados Comprovados",
    title: "Sua Transformação Começa Aqui.",
    subtitle: "Nossa metodologia já impulsionou dezenas de negócios. Estamos prontos para aplicar a mesma arquitetura de crescimento na sua empresa para que você alcance resultados extraordinários.",
    cta: "Quero um Orçamento"
  },
  footer: {
    description: "Agência de Marketing Digital especializada em estruturação completa e previsibilidade de vendas para prestadores de serviço.",
    contactTitle: "Contato Direto",
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
        return { ...defaultContent, ...JSON.parse(saved) };
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