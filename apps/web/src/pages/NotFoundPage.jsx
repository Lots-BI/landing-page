import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEO from '@/components/SEO.jsx';
import { NeonButton } from '@/components/NeonButton.jsx';
import { AnimatedSection } from '@/components/AnimatedSection.jsx';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20 relative z-10">
      <SEO 
        title="Página não encontrada" 
        description="A página que você está procurando não existe."
        url="/404" 
      />
      
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection className="max-w-2xl mx-auto">
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/20 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Perdido no Espaço?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.
          </p>
          
          <Link to="/">
            <NeonButton className="inline-flex items-center gap-2 px-8 py-4">
              <Home className="w-5 h-5" />
              Voltar para o Início
            </NeonButton>
          </Link>
        </AnimatedSection>
      </div>
    </main>
  );
}