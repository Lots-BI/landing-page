import React from 'react';
import { GlassBar } from './GlassBar';
import { cn } from '@/lib/utils';
import dashboardPic from '../assets/dashboard.png';

export function HealthSolutionSection({ 
  headline,
  leftContent,
  rightContent,
  className
}) {
  return (
    <section className={cn("py-16 md:py-24", className)} id='equipe'>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {headline}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <GlassBar className="p-8 backdrop-blur-xl h-full">
              <h3 className="text-2xl font-bold mb-4">
                Tráfego de Alta Intenção e Decisões Baseadas na Coleta e análise de Dados
              </h3>
              <p className="leading-relaxed">
                Nossa metodologia se baseia em dados concretos para direcionar seu marketing. 
                Através de análises avançadas, identificamos os perfis que mais geram resultados 
                e otimizamos continuamente suas campanhas para maximizar o retorno sobre o investimento.
              </p>
            </GlassBar>
          </div>
          
          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <GlassBar className="p-6 sm:p-8 backdrop-blur-xl h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Transparência Lots BI
              </h3>
              
              {/* Added `relative` and `overflow-hidden` to keep the absolute overlay contained */}
              <div className="relative rounded-lg overflow-hidden flex-1 flex">
                
                {/* Ensure image takes full width and maintains aspect ratio */}
                <img 
                  src={dashboardPic} 
                  alt="Dashboard" 
                  className="w-full h-full object-cover" 
                />
                
                {/* Changed `class` to `className` and added responsive padding/text sizes */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6">
                  <p className="text-white font-bold font-sans tracking-wide text-center drop-shadow-md text-xs sm:text-sm lg:text-base w-[95%] sm:w-[85%] leading-relaxed">
                    Você no controle. Nossos clientes acompanham cada centavo investido e cada paciente 
                    gerado através de dashboards exclusivos e atualizados em tempo real.
                  </p>
                </div>

              </div>
            </GlassBar>
          </div>
        </div>
      </div>
    </section>
  );
}