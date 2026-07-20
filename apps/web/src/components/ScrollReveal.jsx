import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have your cn utility

export function ScrollReveal({ 
  children, 
  className,
  animateOnce = true // Set to false if you want it to animate EVERY time you scroll up/down
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the element enters the screen
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stop observing if we only want it to happen once
            if (animateOnce && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!animateOnce) {
            // If animateOnce is false, reset it so it animates again next time
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before it fully hits the bottom
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