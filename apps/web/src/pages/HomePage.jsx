import React from 'react';
import { HealthHeroSection } from '@/components/HealthHeroSection';
import { HealthSocialProof } from '@/components/HealthSocialProof';
import { HealthPainPoints } from '@/components/HealthPainPoints';
import { HealthSolutionSection } from '@/components/HealthSolutionSection';
import { HealthTargetAudience } from '@/components/HealthTargetAudience';
import { HealthLeadForm } from '@/components/HealthLeadForm';
import {
  Workflow,
  Stethoscope,
  Sparkles,
  Brain,
  LayoutDashboard,
  Target,
  Building2,
} from 'lucide-react';
import {
  SiGoogleads,
  SiMeta,
  SiInstagram,
  SiYoutube,
  SiGoogleanalytics
} from 'react-icons/si';

export const GoogleAdsIcon = () => <SiGoogleads className="w-4 h-4" />;
export const MetaAdsIcon = () => <SiMeta className="w-4 h-4" />;
export const InstagramIcon = () => <SiInstagram className="w-4 h-4" />;
export const YouTubeIcon = () => <SiYoutube className="w-4 h-4" />;
export const AnalyticsIcon = () => <SiGoogleanalytics className="w-4 h-4" />;

export const DoctorIcon = () => <Stethoscope className="w-10 h-10" />;
export const BeautyIcon = () => <Sparkles className="w-10 h-10" />;
export const PsychologyIcon = () => <Brain className="w-10 h-10" />;
export const DashboardIcon = () => <LayoutDashboard className="w-10 h-10" />;
export const LeadIcon = () => <Target className="w-10 h-10" />;
export const AgencyIcon = () => <Building2 className="w-10 h-10" />;

export default function HomePage() {
  const heroSectionData = {
    headline: "Inteligência de Dados para Escalar sua Clínica e Atrair Pacientes Particulares",
    subheadline: "Esqueça métricas de vaidade. Nossa gestão de tráfego e posicionamento é desenhada para médicos, esteticistas e psicólogos que exigem previsibilidade de agendamentos.",
    ctaText: "Agendar Diagnóstico Gratuito"
  };

  const socialProofData = {
    text: "Tecnologia de ponta e painéis automatizados de Business Intelligence",
    icons: [GoogleAdsIcon, MetaAdsIcon, InstagramIcon, YouTubeIcon, AnalyticsIcon],
    titles: ["Google Ads", "Meta Ads", "Instagram", "Youtube", "Analytics"]
  };

  const painPointsData = {
    headline: "Você atrai cliques, mas a sua agenda continua vazia?",
    items: [
      {
        icon: LeadIcon,
        title: "Leads Desqualificados",
        description: "Seu WhatsApp lota de pessoas buscando consultas gratuitas, convênios ou pesquisando preços que não condizem com seu serviço."
      },
      {
        icon: AgencyIcon,
        title: "Agências Amadoras",
        description: "Profissionais que focam apenas em \"likes\" e designs bonitos no Canva, sem estratégia de performance para o consultório."
      },
      {
        icon: DashboardIcon,
        title: "A Caixa Preta",
        description: "Você investe em anúncios todos os meses, mas nunca sabe de onde os lucros realmente vêm. Falta inteligência de dados."
      }
    ]
  };

  const solutionSectionData = {
    headline: "O Ecossistema Completo de Captação"
  };

  const targetAudienceData = {
    headline: "Atendimento Estratégico para Especialidades Exigentes",
    items: [
      {
        icon: DoctorIcon,
        title: "Médicos e Consultórios",
        description: "Foco em escalar agendamentos particulares e cirurgias."
      },
      {
        icon: BeautyIcon,
        title: "Clínicas de Estética",
        description: "Venda de procedimentos e protocolos de alto ticket."
      },
      {
        icon: PsychologyIcon,
        title: "Psicologia e Terapia",
        description: "Construção de autoridade online e atração de pacientes qualificados."
      }
    ]
  };

  const leadFormData = {
    headline: "Assuma o Controle da Sua Agenda Hoje"
  };

  return (
    <div className="min-h-screen">
      <HealthHeroSection {...heroSectionData} />
      <HealthSocialProof {...socialProofData} />
      <HealthPainPoints {...painPointsData} />
      <HealthSolutionSection {...solutionSectionData} />
      <HealthTargetAudience {...targetAudienceData} />
      <HealthLeadForm {...leadFormData} />
    </div>
  );
}