import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, Settings2 } from 'lucide-react';
import { ClientOnly } from 'vite-react-ssg';
import { getCookiePreferences, saveCookiePreferences } from '../utils/cookies';
import { enableAnalytics, disableAnalytics } from '../utils/analytics';

const SETTINGS_PATH = '/setari-cookie';
const DELAY_MS = 1300;

function CookieBannerInner() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isSettingsPage = location.pathname === SETTINGS_PATH;

  useEffect(() => {
    if (isSettingsPage) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
      return;
    }
    const prefs = getCookiePreferences();
    if (prefs) {
      // User a ales deja — aplică starea analytics
      if (prefs.analytics) enableAnalytics();
      else disableAnalytics();
      return;
    }
    timerRef.current = setTimeout(() => setVisible(true), DELAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isSettingsPage]);

  const acceptAll = () => {
    saveCookiePreferences({ analytics: true, marketing: true });
    enableAnalytics();
    setVisible(false);
  };

  const rejectAll = () => {
    saveCookiePreferences({ analytics: false, marketing: false });
    disableAnalytics();
    setVisible(false);
  };

  const goToSettings = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    navigate(SETTINGS_PATH);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-banner-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-ink-900 p-6 shadow-premium sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold-light">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <h2 id="cookie-banner-title" className="font-display text-xl text-cream sm:text-2xl">
                  Respectăm confidențialitatea ta
                </h2>
                <p className="text-xs text-sand/70">Conform GDPR</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-sand">
              Folosim cookie-uri necesare pentru funcționarea site-ului și, opțional, cookie-uri
              analitice (Google Analytics) pentru a înțelege cum este folosit site-ul și a-l
              îmbunătăți. Nimic nu se încarcă fără acordul tău. Detalii în{' '}
              <Link to="/confidentialitate" className="text-gold-light underline underline-offset-2 hover:text-gold">
                Politica de confidențialitate
              </Link>
              .
            </p>

            <button
              type="button"
              onClick={acceptAll}
              className="btn-gold mt-6 w-full py-3.5 text-base"
            >
              Acceptă toate cookie-urile
            </button>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button type="button" onClick={rejectAll} className="btn-outline w-full !py-2.5 text-sm">
                Doar necesare
              </button>
              <button
                type="button"
                onClick={goToSettings}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold/40"
              >
                <Settings2 className="h-4 w-4" />
                Setări cookie
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Wrapped în ClientOnly: bannerul nu se randează la SSG (prevenim flash + hidratare incorectă). */
export default function CookieBanner() {
  return (
    <ClientOnly>
      {() => <CookieBannerInner />}
    </ClientOnly>
  );
}
