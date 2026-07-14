import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Palette, LayoutTemplate, Target, CalendarDays, LineChart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { GlassCard } from './GlassCard.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export function ContentCreationSection() {
  const { content } = useEditableContent();
  const c = content.contentCreation;

  const cards = [
    {
      icon: Clock,
      title: c.c1Title,
      desc: c.c1Desc,
      bullets: c.c1Bullets,
      color: "text-primary",
      bg: "bg-primary/20"
    },
    {
      icon: Palette,
      title: c.c2Title,
      desc: c.c2Desc,
      bullets: c.c2Bullets,
      color: "text-secondary",
      bg: "bg-secondary/20"
    },
    {
      icon: LayoutTemplate,
      title: c.c3Title,
      desc: c.c3Desc,
      bullets: c.c3Bullets,
      color: "text-accent",
      bg: "bg-accent/20"
    },
    {
      icon: Target,
      title: c.c4Title,
      desc: c.c4Desc,
      bullets: c.c4Bullets,
      color: "text-primary",
      bg: "bg-primary/20"
    },
    {
      icon: CalendarDays,
      title: c.c5Title,
      desc: c.c5Desc,
      bullets: c.c5Bullets,
      color: "text-secondary",
      bg: "bg-secondary/20"
    },
    {
      icon: LineChart,
      title: c.c6Title,
      desc: c.c6Desc,
      bullets: c.c6Bullets,
      color: "text-accent",
      bg: "bg-accent/20"
    }
  ];

  return (
    <section className="py-12 md:py-16 relative bg-transparent z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            {c.title.split(/(Conteúdo|Design)/).map((part, i) => 
              ['Conteúdo', 'Design'].includes(part) ? <span key={i} className="rgb-gradient-text">{part}</span> : part
            )}
          </h2>
          <p className="text-lg text-muted-foreground">
            {c.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col group hover-glow bg-card/60">
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-6`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{card.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{card.desc}</p>
                <ul className="space-y-2 mt-auto pt-4 border-t border-border/50">
                  {card.bullets.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className={`w-1.5 h-1.5 rounded-full ${card.bg.replace('/20', '')}`} /> {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}