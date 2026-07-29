import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection.jsx';
import { NeonButton } from './NeonButton.jsx';
import { toast } from 'sonner';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      e.target.reset();
    }, 1500);
  };

  return (
    <section className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Vamos <span className="rgb-gradient-text">Conversar</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              Tem um projeto em mente? Nossa equipe está pronta para ajudar a transformar sua visão em realidade.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Email</h3>
                  <a href="mailto:contato@agencia.lots" className="text-muted-foreground hover:text-primary transition-colors">
                    contato@agencia.lots
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Telefone</h3>
                  <a href="tel:+5511999999999" className="text-muted-foreground hover:text-primary transition-colors">
                    +55 11 99999-9999
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Localização</h3>
                  <p className="text-muted-foreground">
                    São Paulo, SP<br />Brasil
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="glass-heavy p-8 md:p-10 rounded-3xl space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="João Silva"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="joao@exemplo.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Mensagem</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <NeonButton 
                type="submit" 
                className="w-full py-4 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </NeonButton>
            </form>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}