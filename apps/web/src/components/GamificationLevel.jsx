import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection.jsx';

export function GamificationLevel({ level, title, description, active = false, isLast = false }) {
  return (
    <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 pb-12 last:pb-0">
      {/* Vertical Line - Hidden on small mobile to save space, visible sm+ */}
      {!isLast && (
        <div className="hidden sm:block absolute left-6 top-14 bottom-0 w-0.5 bg-primary/10">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full bg-gradient-to-b from-primary to-secondary shadow-[0_0_15px_hsl(var(--primary))]" 
          />
        </div>
      )}

      {/* Node */}
      <div className="relative z-10 flex-shrink-0 flex items-center sm:items-start gap-4 sm:gap-0">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
            active ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_hsla(var(--primary)/0.5)]" : "bg-white/5 border-white/20 text-muted-foreground"
          )}
        >
          {active ? <Check className="w-6 h-6" /> : <span className="font-bold">{level}</span>}
        </motion.div>
        <h4 className={cn("text-lg font-bold sm:hidden", active ? "text-primary" : "text-foreground")}>
          {title}
        </h4>
      </div>

      {/* Content */}
      <AnimatedSection direction="left" className="pt-0 sm:pt-2">
        <h4 className={cn("hidden sm:block text-xl font-bold mb-2", active ? "text-primary" : "text-foreground")}>
          {title}
        </h4>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </AnimatedSection>
    </div>
  );
}