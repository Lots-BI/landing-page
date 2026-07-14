import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';

const projects = [
  {
    id: 1,
    title: 'E-commerce Premium',
    category: 'Desenvolvimento Web',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    span: 'col-span-1 md:col-span-2 row-span-2'
  },
  {
    id: 2,
    title: 'App de Finanças',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 3,
    title: 'Dashboard Analítico',
    category: 'Sistemas Web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 4,
    title: 'Identidade Visual',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800',
    span: 'col-span-1 md:col-span-2 row-span-1'
  }
];

export default function PortfolioSection() {
  return (
    <section className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            Nosso <span className="rgb-gradient-text">Portfólio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore alguns dos nossos projetos mais recentes e descubra como transformamos ideias em experiências digitais memoráveis.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project, idx) => (
            <AnimatedSection 
              key={project.id} 
              delay={idx * 0.1}
              className={`group relative rounded-3xl overflow-hidden glass border-border/50 ${project.span}`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-primary mb-2">{project.category}</p>
                  <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-background/20 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-foreground" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}