import React from 'react';
import SEO from '@/components/SEO.jsx';
import ContactSection from '@/components/ContactSection.jsx';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <SEO 
        title="Contato" 
        description="Entre em contato conosco para mais informações" 
        url="/contato" 
      />
      <ContactSection />
    </main>
  );
}