import React from 'react';
import { HealthHeroSection } from '@/components/HealthHeroSection';
import { HealthSocialProof } from '@/components/HealthSocialProof';
import { HealthPainPoints } from '@/components/HealthPainPoints';
import { HealthSolutionSection } from '@/components/HealthSolutionSection';
import { HealthTargetAudience } from '@/components/HealthTargetAudience';
import { HealthLeadForm } from '@/components/HealthLeadForm';
import { GlassBar } from '@/components/GlassBar';

// Icons as React components
const GoogleAdsIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.18-.54-.27-1.11-.27-1.7s.09-1.16.27-1.7V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const MetaAdsIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.691-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.252 0-3.664.014-4.946.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.282-.073 1.694-.073 4.946 0 3.252.014 3.664.072 4.946.2 4.358 2.618 6.78 6.98 6.98 1.282.058 1.694.072 4.946.072 3.252 0 3.664-.014 4.946-.072 4.354-.2 6.78-2.618 6.98-6.98.059-1.282.073-1.694.073-4.946 0-3.252-.014-3.664-.072-4.946-.2-4.354-2.618-6.78-6.98-6.98-1.282-.059-1.694-.073-4.946-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.638-.245-15.238 0-3.6.245-4.736 2.914-4.736 7.314 0 4.4 1.136 7.074 4.736 7.314 3.6.245 11.639.245 15.238 0 3.6-.245 4.736-2.914 4.736-7.314 0-4.4-1.136-7.074-4.736-7.314zm-10.615 12.814v-8l8 3.993-8 4.007z"/>
  </svg>
);

const MakeIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const WordPressIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

const DoctorIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
);

const BeautyIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

const PsychologyIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

const LeadIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const AgencyIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

export default function HomePage() {
  const heroSectionData = {
    headline: "Inteligência de Dados para Escalar sua Clínica e Atrair Pacientes Particulares",
    subheadline: "Esqueça métricas de vaidade. Nossa gestão de tráfego e posicionamento é desenhada para médicos, esteticistas e psicólogos que exigem previsibilidade de agendamentos.",
    ctaText: "Agendar Diagnóstico Gratuito"
  };

  const socialProofData = {
    text: "Tecnologia de ponta e painéis automatizados de Business Intelligence.",
    icons: [GoogleAdsIcon, MetaAdsIcon, InstagramIcon, YouTubeIcon, MakeIcon, WordPressIcon]
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
    headline: "O Ecossistema Completo de Captação."
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
    headline: "Assuma o Controle da Sua Agenda Hoje."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <HealthHeroSection {...heroSectionData} />
      <HealthSocialProof {...socialProofData} />
      <HealthPainPoints {...painPointsData} />
      <HealthSolutionSection {...solutionSectionData} />
      <HealthTargetAudience {...targetAudienceData} />
      <HealthLeadForm {...leadFormData} />
    </div>
  );
}