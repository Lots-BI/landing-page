import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils'; 

export function ScrollReveal({ 
  children, 
  className,
  animateOnce = true 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (animateOnce && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!animateOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        // 0.05 significa que só 5% do elemento precisa aparecer para ativar
        threshold: 0.05, 
        // Margem POSITIVA de 100px faz a animação começar um pouco antes de
        // aparecer na tela, evitando que o usuário veja um espaço em branco ao rolar rápido
        rootMargin: '100px 0px 100px 0px' 
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateOnce]);

  return (
    <div
      ref={domRef}
      className={cn(
        "reveal-zoom",
        isVisible && "is-visible",
        className
      )}
    >
      {children}
    </div>
  );
}