import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders children only when near/in viewport — keeps below-fold JS off the LCP path.
 */
export function DeferredMount({ children, rootMargin = '200px', placeholderHeight = 320 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {show ? children : <div style={{ minHeight: placeholderHeight }} aria-hidden="true" />}
    </div>
  );
}
