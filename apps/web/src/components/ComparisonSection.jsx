import React from 'react';
import { Check, X } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export function ComparisonSection() {
  const { content } = useEditableContent();
  const c = content.comparison;

  const features = [
    { name: c.f1Name, common: c.f1Common, majr: c.f1Majr },
    { name: c.f2Name, common: c.f2Common, majr: c.f2Majr },
    { name: c.f3Name, common: c.f3Common, majr: c.f3Majr },
    { name: c.f4Name, common: c.f4Common, majr: c.f4Majr },
    { name: c.f5Name, common: c.f5Common, majr: c.f5Majr }
  ];

  return (
    <section className="py-12 md:py-16 relative bg-transparent">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            {c.title.split(/(Leandro MAJR)/).map((part, i) => 
              part === 'Leandro MAJR' ? <span key={i} className="rgb-gradient-text">{part}</span> : part
            )}
          </h2>
          <p className="text-lg text-muted-foreground">{c.subtitle}</p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto bg-card/60 backdrop-blur-md rounded-3xl overflow-hidden border border-border shadow-xl">
          <div className="grid grid-cols-3 bg-background/60 p-6 border-b border-border">
            <div className="col-span-1 font-bold text-muted-foreground">Dimensão</div>
            <div className="col-span-1 font-bold text-destructive/80 text-center">Agências Comuns</div>
            <div className="col-span-1 font-bold text-primary text-center neon-text">{content.hero.brand}</div>
          </div>
          
          {features.map((feat, idx) => (
            <AnimatedSection 
              key={idx} 
              delay={idx * 0.1}
              className="grid grid-cols-3 p-6 border-b border-border/50 hover:bg-muted/30 transition-colors items-center"
            >
              <div className="col-span-1 font-medium text-foreground">{feat.name}</div>
              <div className="col-span-1 flex flex-col items-center text-center text-muted-foreground text-sm">
                <X className="w-5 h-5 text-destructive mb-2" />
                {feat.common}
              </div>
              <div className="col-span-1 flex flex-col items-center text-center text-foreground font-medium text-sm">
                <Check className="w-5 h-5 text-primary mb-2" />
                {feat.majr}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}