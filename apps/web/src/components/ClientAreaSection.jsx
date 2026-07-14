import React from 'react';
import { LayoutDashboard, Calendar, DollarSign, CheckSquare } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export function ClientAreaSection() {
  const { content } = useEditableContent();
  const c = content.clientArea;

  const features = [
    { icon: LayoutDashboard, title: c.f1Title, desc: c.f1Desc },
    { icon: Calendar, title: c.f2Title, desc: c.f2Desc },
    { icon: DollarSign, title: c.f3Title, desc: c.f3Desc },
    { icon: CheckSquare, title: c.f4Title, desc: c.f4Desc }
  ];

  return (
    <section className="py-12 md:py-16 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <AnimatedSection direction="right" className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/20 group bg-card">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?q=80&w=1200&auto=format&fit=crop" 
                alt="Dashboard da Área do Cliente" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="glass p-4 rounded-xl backdrop-blur-md border-border bg-card/60">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-foreground font-medium text-sm">Sistema Online e Atualizado</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              {c.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {c.subtitle}
            </p>

            <div className="space-y-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass bg-card/50 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                    <feat.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">{feat.title}</h4>
                    <p className="text-sm text-muted-foreground">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}