import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const OFFSETS = {
  up: 'translate3d(0, 30px, 0)',
  down: 'translate3d(0, -30px, 0)',
  left: 'translate3d(30px, 0, 0)',
  right: 'translate3d(-30px, 0, 0)',
  none: 'none',
};

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
  /** Skip fade/slide so LCP text is visible on first paint */
  immediate = false,
}) {
  const ref = useRef(null);
  const [skip] = useState(() => immediate || prefersReducedMotion());
  const [visible, setVisible] = useState(skip);

  useEffect(() => {
    if (skip) return undefined;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: '-50px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [skip, once]);

  if (skip) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : OFFSETS[direction],
        transition: `opacity 0.6s cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delay}s, transform 0.6s cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
