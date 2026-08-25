import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
      // Ensure we wait for the page to be fully ready
      const initBanner = () => {
        // Small delay to ensure smooth entrance after page load
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      };

      // Check if document is already loaded
      if (document.readyState === 'complete') {
        initBanner();
      } else {
        window.addEventListener('load', initBanner);
        return () => window.removeEventListener('load', initBanner);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsExiting(true);
    setTimeout(() => setIsVisible(false), 400);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsExiting(true);
    setTimeout(() => setIsVisible(false), 400);
  };

  if (!isVisible) return null;

  // Create a wrapper that ensures proper viewport anchoring
  const bannerContent = (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[999] p-3 sm:p-4 md:p-6 pointer-events-auto flex justify-center w-full ${
        isExiting ? 'animate-fade-out-exit' : 'animate-slide-up-enter'
      }`}
      aria-live="polite"
      style={{
        width: '100vw',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}
    >
      <div className="w-full max-w-full glass rounded-xl p-4 sm:p-5 md:p-6 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-5 border border-primary/20 bg-background/95 backdrop-blur-md dark:bg-background/95">
        
        <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
          <div className="hidden sm:flex mt-1 h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Cookie className="h-5 w-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-1.5 text-foreground">
              Sua privacidade é importante
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Nós usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar o conteúdo. 
              Ao continuar navegando, você concorda com a nossa{' '}
              <Link 
                to="/privacy-policy" 
                className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors whitespace-nowrap"
              >
                Política de Privacidade
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
          <Button 
            variant="outline" 
            onClick={handleReject} 
            className="w-full sm:w-auto border-border hover:bg-muted transition-colors text-xs sm:text-sm h-9 sm:h-10"
          >
            Rejeitar
          </Button>
          <Button 
            onClick={handleAccept} 
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-xs sm:text-sm h-9 sm:h-10"
          >
            Aceitar Tudo
          </Button>
        </div>

      </div>
    </div>
  );

  return createPortal(bannerContent, document.body);
};

export default CookieBanner;