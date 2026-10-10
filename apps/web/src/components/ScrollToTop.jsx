import { useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useIsomorphicLayoutEffect(() => {
    const restoreY = state?.returnScrollY;
    if (typeof restoreY === 'number') {
      window.scrollTo({ top: restoreY, left: 0, behavior: 'instant' });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Only on route change — clearing return state must not jump to top.
  }, [pathname]);

  return null;
};

export default ScrollToTop;
