import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resetează scroll-ul la începutul paginii la fiecare schimbare de rută. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}
