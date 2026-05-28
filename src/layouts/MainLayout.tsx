import { Outlet } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import ScrollToTop from '../components/ScrollToTop';
import CookieBanner from '../components/CookieBanner';

export default function MainLayout() {
  return (
    // reducedMotion="user" → framer-motion respectă prefers-reduced-motion automat.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-ink-950">
        <a href="#main" className="skip-link">
          Sari la conținut
        </a>
        <ScrollToTop />
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          <Outlet />
        </main>
        <Footer />
        <FloatingActions />
        <CookieBanner />
      </div>
    </MotionConfig>
  );
}
