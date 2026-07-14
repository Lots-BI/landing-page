import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Rocket, Settings, TrendingUp } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export function RoadmapSection() {
  const { content } = useEditableContent();
  const r = content.roadmap;

  const stages = [
    { icon: Search, title: r.s1Title, desc: r.s1Desc },
    { icon: PenTool, title: r.s2Title, desc: r.s2Desc },
    { icon: Settings, title: r.s3Title, desc: r.s3Desc },
    { icon: Rocket, title: r.s4Title, desc: r.s4Desc },
    { icon: TrendingUp, title: r.s5Title, desc: r.s5Desc }
  ];

  const displayTitle = r.title === "Roadmap Interativo" ? "Sua Jornada de Transformação Digital" : r.title;

  return (
    <section id="metodologia-section" className="py-12 md:py-16 relative bg-transparent border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            {displayTitle.split(/(Transformação|Digital)/).map((part, i) => 
              ['Transformação', 'Digital'].includes(part) ? <span key={i} className="rgb-gradient-text">{part}</span> : part
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">{r.subtitle}</p>
        </AnimatedSection>

        <div className="relative">
          {/* Connecting Line (Vertical on mobile, Horizontal on desktop) */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-border md:left-0 md:top-1/2 md:w-full md:h-1 md:-translate-y-1/2 z-0 rounded-full overflow-hidden">
            <motion.div 
              className="w-full h-full bg-gradient-to-b md:bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ scaleY: 0, scaleX: 0 }}
              whileInView={{ scaleY: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top left" }}
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-12 md:gap-4 relative z-10">
            {stages.map((stage, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-6 w-full md:w-1/5 group"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary transition-all duration-500 shrink-0 relative z-10">
                    <stage.icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  {/* Pulsing dot behind icon */}
                  <div className="absolute inset-0 bg-primary/30 rounded-2xl animate-ping -z-10" style={{ animationDelay: `${idx * 0.2}s` }} />
                </div>
                
                <div className="text-left md:text-center flex-1 pt-2 md:pt-0">
                  <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Fase {idx + 1}</div>
                  <h4 className="text-xl font-bold text-foreground mb-2">{stage.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}