import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Carousel controls that avoid forced reflow during page boot:
 * autoplay starts only when the track is in view; geometry reads are rAF-batched.
 */
export function useCarouselControls({ autoScrollInterval = 4000, scrollAmount = 320 } = {}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scroll = useCallback((direction) => {
    const container = containerRef.current;
    if (!container) return;

    // Batch geometry read → write to avoid forced synchronous layout
    requestAnimationFrame(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const current = container.scrollLeft;
      const isAtEnd = current >= maxScrollLeft - 10;

      let newScrollLeft = current + (direction === 'right' ? scrollAmount : -scrollAmount);
      if (direction === 'right' && isAtEnd) {
        newScrollLeft = 0;
      }

      requestAnimationFrame(() => {
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });
      });
    });
  }, [scrollAmount]);

  const scrollLeft = useCallback(() => scroll('left'), [scroll]);
  const scrollRight = useCallback(() => scroll('right'), [scroll]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    if (distance > 50) scroll('right');
    else if (distance < -50) scroll('left');

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    if (!isInView || isHovered || !autoScrollInterval) return;

    const interval = setInterval(() => {
      scroll('right');
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isInView, isHovered, autoScrollInterval, scroll]);

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
    },
  };
}
