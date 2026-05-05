import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll both window and main container to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}