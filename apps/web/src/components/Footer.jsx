import React from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppButton } from './WhatsAppButton.jsx';
import { ArrowUpRight, ShieldCheck, Building2, CheckCircle2, Lock } from 'lucide-react';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

export default function Footer() {
  const { content } = useEditableContent();
  
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-primary/20 bg-transparent pt-16 md:pt-20 pb-8 overflow-hidden z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* TOP SECTION: Main Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="lg:col-span-2">
            <div className="text-xl md:text-2xl font-black tracking-tighter text-foreground flex items-center gap-2 mb-4 md:mb-6">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg bg-card">
                <img 
                  src="https://horizons-cdn.hostinger.com/08b0c8e1-5b98-47df-a3f1-7bb9b617c89c/66624de7e895af08958ad9d08e9c0464.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </span>
              {content.hero.brand}
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-sm mb-8 leading-relaxed">
              {content.footer.description}
            </p>
            <WhatsAppButton 
              phoneNumber="5511973290438"
              baseMessage="Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?"
              className="px-6 py-3 text-sm w-full sm:w-auto shadow-[0_0_15px_hsla(142,71%,45%,0.3)] hover:shadow-[0_0_20px_hsla(142,71%,45%,0.5)]"
            >
              {content.hero.cta}
            </WhatsAppButton>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4 md:mb-6">{content.footer.navTitle}</h4>
            <ul className="flex flex-col gap-2">
              {[
                { name: 'Início', id: 'solucao' },
                { name: 'Motivação', id: 'metodologia' },
                { name: 'Ecossistema', id: 'equipe' },
                { name: 'Audiência', id: 'planos' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollTo(item.id)}
                    className="text-sm md:text-base text-muted-foreground hover:text-secondary transition-colors touch-target"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-secondary" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4 md:mb-6">{content.footer.contactTitle}</h4>
            <ul className="flex flex-col gap-2 text-sm md:text-base text-muted-foreground">
              <li>
                <a href="https://wa.me/5511973290438" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors py-2">
                  +55 11 97329-0438
                </a>
              </li>
              <li>
                <a href="mailto:contato@leandromajr.com" className="hover:text-foreground transition-colors py-2">
                  contato@leandromajr.com
                </a>
              </li>
              <li className="pt-2 md:pt-4">
                <span className="text-xs tracking-wider uppercase opacity-50 text-foreground">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* MIDDLE SECTION: Trust Indicators & Legal Links */}
        <div className="pt-8 md:pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border text-xs md:text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ambiente Seguro</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border text-xs md:text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Empresa Verificada</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border text-xs md:text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-primary" />
              <span>Dados Protegidos</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-end text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors py-2 touch-target inline-flex items-center">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors py-2 touch-target inline-flex items-center">
              Termos de Uso
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors py-2 touch-target inline-flex items-center">
              Contato
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION: CNPJ & Copyright */}
        <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-border flex flex-col lg:flex-row items-center justify-between gap-6 text-xs md:text-sm text-muted-foreground text-center lg:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 order-2 lg:order-1">
            <p>© {new Date().getFullYear()} {content.hero.brand}. Todos os direitos reservados.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 order-1 lg:order-2 bg-card p-3 md:p-4 rounded-xl border border-border w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="font-medium text-foreground">Empresa Legalmente Constituída</span>
                <span className="text-muted-foreground/80 font-mono mt-0.5">CNPJ: 65.225.964/0001-83</span>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-border mx-2"></div>
            
            <div className="flex items-center gap-2 mt-2 sm:mt-0 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-400 text-xs font-medium tracking-wide uppercase">Registro Ativo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}