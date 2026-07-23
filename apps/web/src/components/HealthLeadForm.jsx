import React, { useState } from 'react';
import { GlassBar } from './GlassBar';
import { cn } from '@/lib/utils';
import { InputGroup } from './ui/input-group';
import { WhatsAppButton } from './WhatsAppButton.jsx';

export function HealthLeadForm({ 
  headline,
  className
}) {

    const [inputName, setInputName] = useState('');
    const [inputEspecial, setInputEspecial] = useState('');
    const [inputInvest, setInputInvest] = useState('');
    const [inputInsta, setInputInsta] = useState('');
    const [inputSite, setInputSite] = useState('');

    const handleNameChange = (event) => setInputName(event.target.value);
    const handleEspecialChange = (event) => setInputEspecial(event.target.value);
    const handleInvestChange = (event) => setInputInvest(event.target.value);
    const handleInstaChange = (event) => setInputInsta(event.target.value);
    const handleSiteChange = (event) => setInputSite(event.target.value);

    // This handler only triggers if all "required" fields are filled out
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevents the page from refreshing

      const baseMessage = `Olá, estou com interesse nos seus serviços, poderia me passar mais algumas informações?\n\nMeu nome é ${inputName}, atuo com ${inputEspecial}. ${inputInvest} em anúncios atualmente, meu perfil do Instagram é @${inputInsta} e meu site está em ${inputSite}.`;
      
      const encodedMessage = encodeURIComponent(baseMessage);
      const link = `https://wa.me/5511973290438?text=${encodedMessage}`;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submit',
        formId: 'health_lead_form',
        formName: 'Solicitar Reunião Estratégica',
        leadData: {
          especialidade: inputEspecial,
          investimento: inputInvest
        }
      });
      
      window.open(link, '_blank');
    };

  return (
    <section className={cn("py-16 md:py-24", className)} id="forms">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <GlassBar className="p-8 md:p-12 backdrop-blur-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {headline}
            </h2>
            
            {/* Added onSubmit handler here */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    id="name"
                    value={inputName}
                    onChange={handleNameChange}
                    className="w-full px-4 py-3 text-white bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-300"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="specialty" className="block mb-2">Especialidade / Ramo de Atuação</label>
                <input 
                  type="text" 
                  id="specialty"
                  value={inputEspecial}
                  onChange={handleEspecialChange}
                  className="w-full px-4 py-3 text-white bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-300"
                  placeholder="Sua especialidade ou ramo de atuação"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="investment" className="block mb-2">Qual seu investimento atual em anúncios?</label>
                <select 
                  id="investment"
                  value={inputInvest}
                  onChange={handleInvestChange}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-300"
                  required
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Não invisto ainda">Não invisto ainda</option>
                  <option value="Invisto até R$ 1.000">Até R$ 1.000</option>
                  <option value="Invisto de R$ 1.000 a R$ 3.000">De R$ 1.000 a R$ 3.000</option>
                  <option value="Invisto acima de R$ 3.000">Acima de R$ 3.000</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="instagram" className="block mb-2">Perfil do Instagram</label>
                  <InputGroup className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-300">
                    <span className="prefix pb-1 text-white">@</span>
                    <input 
                      type="text" // Changed from 'url' to 'text' to prevent URL validation errors on usernames
                      value={inputInsta}
                      id="instagram"
                      placeholder="seu-perfil"
                      onChange={handleInstaChange}
                      className="px-1 bg-transparent text-white border border-transparent focus:outline-none focus:border-transparent placeholder-gray-300"
                      required
                    />
                  </InputGroup>
                </div>
                
                <div>
                  <label htmlFor="website" className="block mb-2">Link do Site atual</label>
                  <input 
                    type="text"
                    value={inputSite}
                    onChange={handleSiteChange}
                    id="website"
                    className="w-full px-4 py-3 bg-black/30 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-300"
                    placeholder="https://seusite.com.br"
                    required
                  />
                </div>
              </div>
              
              <WhatsAppButton 
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
              >
                Solicitar Reunião Estratégica
              </WhatsAppButton>
            </form>
          </GlassBar>
        </div>
      </div>
    </section>
  );
}