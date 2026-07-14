import React from 'react';
import SEO from '@/components/SEO.jsx';
import { ServicesSection } from '@/components/ServicesSection.jsx';

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20">
      <SEO 
        title="Serviços" 
        description="Conheça nossos serviços de design e desenvolvimento" 
        url="/servicos" 
      />
      <ServicesSection />
    </main>
  );
}