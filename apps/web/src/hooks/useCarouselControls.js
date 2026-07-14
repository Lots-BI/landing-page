import { useRef, useState, useEffect, useCallback } from 'react';

export function useCarouselControls({ autoScrollInterval = 4000, scrollAmount = 320 } = {}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const scroll = useCallback((direction) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Check if we are at the end
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const isAtEnd = container.scrollLeft >= maxScrollLeft - 10;
    
    let newScrollLeft = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);

    // Auto wrap-around logic
    if (direction === 'right' && isAtEnd) {
       newScrollLeft = 0;
    }

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }, [scrollAmount]);

  const scrollLeft = useCallback(() => scroll('left'), [scroll]);
  const scrollRight = useCallback(() => scroll('right'), [scroll]);

  // Handle touch events
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      scroll('right');
    } else if (isRightSwipe) {
      scroll('left');
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    if (isHovered || !autoScrollInterval) return;

    const interval = setInterval(() => {
      scroll('right');
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isHovered, autoScrollInterval, scroll]);

  return {
    containerRef,
    scrollLeft,
    scrollRight,
    handlers: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  };
}