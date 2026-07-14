import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection.jsx';

export function TechStackSection() {
  const tools = [
    { name: "Next.js", role: "Frontend Enterprise" },
    { name: "Supabase", role: "Backend & Auth" },
    { name: "Make.com", role: "Automação Complexa" },
    { name: "Meta Ads", role: "Tráfego Social" },
    { name: "Google Ads", role: "Tráfego de Intenção" },
    { name: "Blender", role: "Criativos 3D Premium" }
  ];

  return (
    <section className="py-24 relative border-y border-white/5 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid-asymmetric items-center">
          <AnimatedSection className="col-span-left mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              The <span className="text-accent neon-text-blue">Tech Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Enquanto agências comuns focam em "fazer posts", nós utilizamos as ferramentas mais avançadas do mercado global para construir infraestruturas de vendas inabaláveis.
            </p>
          </AnimatedSection>

          <div className="col-span-right grid grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl text-center group hover:bg-white/10 transition-colors cursor-default"
              >
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{tool.name}</h4>
                <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">{tool.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}