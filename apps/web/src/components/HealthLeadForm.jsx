import React from 'react';
import { GlassBar } from './GlassBar';
import { cn } from '@/lib/utils';

export function HealthLeadForm({ 
  headline,
  className
}) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <GlassBar className="p-8 md:p-12 backdrop-blur-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              {headline}
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="whatsapp" className="block text-gray-300 mb-2">WhatsApp</label>
                  <input 
                    type="tel" 
                    id="whatsapp"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="specialty" className="block text-gray-300 mb-2">Especialidade / Ramo de Atuação</label>
                <input 
                  type="text" 
                  id="specialty"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Sua especialidade ou ramo de atuação"
                />
              </div>
              
              <div>
                <label htmlFor="investment" className="block text-gray-300 mb-2">Qual seu investimento atual em anúncios?</label>
                <select 
                  id="investment"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="none">Não invisto ainda</option>
                  <option value="1k">Até R$ 1.000</option>
                  <option value="1k-3k">De R$ 1.000 a R$ 3.000</option>
                  <option value="3k">Acima de R$ 3.000</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="instagram" className="block text-gray-300 mb-2">Link do Instagram</label>
                  <input 
                    type="url" 
                    id="instagram"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500"
                    placeholder="https://instagram.com/seu-perfil"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-gray-300 mb-2">Link do Site atual</label>
                  <input 
                    type="url" 
                    id="website"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500"
                    placeholder="https://seusite.com.br"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
              >
                Solicitar Reunião Estratégica
              </button>
            </form>
          </GlassBar>
        </div>
      </div>
    </section>
  );
}