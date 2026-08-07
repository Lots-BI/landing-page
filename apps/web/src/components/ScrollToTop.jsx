import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useLayoutEffect(() => {
    const restoreY = state?.returnScrollY;
    if (typeof restoreY === 'number') {
      window.scrollTo({ top: restoreY, left: 0, behavior: 'instant' });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Only on route change — clearing return state must not jump to top.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: pathname only
  }, [pathname]);

  return null;
};

export default ScrollToTop;
