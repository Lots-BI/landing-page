import React from 'react';
import { GlassBar } from './GlassBar';
import { cn } from '@/lib/utils';

export function HealthSolutionSection({ 
  headline,
  leftContent,
  rightContent,
  className
}) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {headline}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <GlassBar className="p-8 backdrop-blur-xl h-full">
              <h3 className="text-2xl font-bold text-white mb-4">
                Tráfego de Alta Intenção e Decisões Baseadas na Coleta e análise de Dados
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Nossa metodologia se baseia em dados concretos para direcionar seu marketing. 
                Através de análises avançadas, identificamos os perfis que mais geram resultados 
                e otimizamos continuamente suas campanhas para maximizar o retorno sobre o investimento.
              </p>
            </GlassBar>
          </div>
          
          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <GlassBar className="p-8 backdrop-blur-xl h-full">
              <h3 className="text-2xl font-bold text-white mb-4">
                Transparência Lots BI
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Você no controle. Nossos clientes acompanham cada centavo investido e cada paciente 
                gerado através de dashboards exclusivos e atualizados em tempo real.
              </p>
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-4 h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-lg font-bold mb-2">Dashboard</div>
                  <div className="text-gray-300 text-sm">Pacientes Gerados: 142</div>
                  <div className="text-gray-300 text-sm">ROI: 4.2x</div>
                </div>
              </div>
            </GlassBar>
          </div>
        </div>
      </div>
    </section>
  );
}