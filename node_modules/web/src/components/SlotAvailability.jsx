import React, { useState } from 'react';
import { PopupModal } from 'react-calendly';
import { Button } from '@/components/ui/button';

const SlotAvailability = ({
  total = 5,
  filled = 3
}) => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const slots = Array.from({
    length: total
  }, (_, i) => i < filled);
  const available = total - filled;
  return <>
      <div className="flex flex-col items-center gap-4 animate-fade-in-up glass-effect p-6 inline-block mx-auto mb-10" style={{
      animationDelay: '200ms'
    }}>
        <div className="flex gap-3">
          {slots.map((isFilled, index) => <div key={index} className={`h-4 w-4 rounded-full transition-all duration-500 ${isFilled ? 'bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'border-2 border-white/30 bg-transparent'}`} />)}
        </div>
        <p className="text-sm font-medium text-gray-100 glass-text-shadow">
          Vamos conversar sobre seus objetivos
        </p>
      </div>

      <Button id="botao-agendamento" size="lg" onClick={() => setIsCalendlyOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-lg px-4 sm:px-8 py-4 sm:py-6 h-auto whitespace-normal text-center transition-all duration-200 active:scale-[0.98] animate-pulse-glow shadow-lg w-full sm:w-auto max-w-full">
        Garanta sua reunião gratuita agora
      </Button>

      <PopupModal url="https://calendly.com/leandromajr/30min" rootElement={document.getElementById('root')} open={isCalendlyOpen} onModalClose={() => setIsCalendlyOpen(false)} />
    </>;
};
export default SlotAvailability;