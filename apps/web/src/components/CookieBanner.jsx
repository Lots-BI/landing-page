import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const consent = localStorage.getItem('cookieConsent');
    
    if (!consent) {
      // Small delay to ensure smooth entrance after page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsExiting(true);
    setTimeout(() => setIsVisible(false), 400); // Match exit animation duration
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsExiting(true);
    setTimeout(() => setIsVisible(false), 400);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none flex justify-center ${
        isExiting ? 'animate-fade-out-exit' : 'animate-slide-up-enter'
      }`}
      aria-live="polite"
    >
      <div className="pointer-events-auto w-full max-w-5xl glass rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 border-primary/20 bg-background/80 dark:bg-background/60">
        
        <div className="flex items-start gap-4 flex-1">
          <div className="hidden sm:flex mt-1 h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Cookie className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold mb-1 text-foreground">Sua privacidade é importante</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nós usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar o conteúdo. 
              Ao continuar navegando, você concorda com a nossa{' '}
              <Link to="/privacy-policy" className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors">
                Política de Privacidade
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          <Button 
            variant="outline" 
            onClick={handleReject} 
            className="w-full sm:w-auto border-border hover:bg-muted transition-colors"
          >
            Rejeitar
          </Button>
          <Button 
            onClick={handleAccept} 
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
          >
            Aceitar Tudo
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CookieBanner;