import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, Settings2 } from 'lucide-react';
import { ClientOnly } from 'vite-react-ssg';
import { getCookiePreferences, saveCookiePreferences } from '../utils/cookies';
import { enableAnalytics, disableAnalytics } from '../utils/analytics';

function useFocusOnShow(visible: boolean) {
  const ref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (visible) ref.current?.focus({ preventScroll: true });
  }, [visible]);
  return ref;
}

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

  const acceptRef = useFocusOnShow(visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[90] px-3 pb-3 pt-2 sm:px-6 sm:pb-6"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Consimțământ cookie"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-ink-900/95 p-5 shadow-premium backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold-light">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <h2 id="cookie-banner-title" className="font-display text-lg text-cream sm:text-xl">
                    Respectăm confidențialitatea ta
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-sand">
                  Folosim cookie-uri necesare și, opțional, cookie-uri analitice (Google Analytics)
                  pentru a îmbunătăți site-ul. Nimic nu se încarcă fără acordul tău. Detalii în{' '}
                  <Link to="/confidentialitate" className="text-gold-light underline underline-offset-2 hover:text-gold">
                    Politica de confidențialitate
                  </Link>
                  .
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:w-auto lg:flex-col xl:flex-row">
                <button
                  ref={acceptRef}
                  type="button"
                  onClick={acceptAll}
                  className="btn-gold w-full px-6 py-3 sm:w-auto"
                >
                  Acceptă toate
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="btn-outline w-full px-6 py-3 sm:w-auto"
                >
                  Doar necesare
                </button>
                <button
                  type="button"
                  onClick={goToSettings}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-semibold text-cream/80 transition-colors hover:text-cream sm:w-auto"
                >
                  <Settings2 className="h-4 w-4" />
                  Setări
                </button>
              </div>
            </div>
          </div>
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
