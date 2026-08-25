import React from 'react';
import SEO from '@/components/SEO.jsx';
import PortfolioSection from '@/components/PortfolioSection.jsx';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-20">
      <SEO 
        title="Portfólio" 
        description="Veja nossos projetos e cases de sucesso" 
        url="/portfolio" 
      />
      <PortfolioSection />
    </main>
  );
}