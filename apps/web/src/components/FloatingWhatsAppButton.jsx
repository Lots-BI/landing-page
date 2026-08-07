import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { goToOrcamento } from './PlanosCtaButton.jsx';

const FloatingWhatsAppButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => goToOrcamento(navigate)}
      aria-label="Ir para o formulário de orçamento"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-800 px-4 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-700 active:scale-95 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden font-medium md:inline-block">Orçamento</span>
    </button>
  );
};

export default FloatingWhatsAppButton;
