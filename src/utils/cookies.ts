// Preferințele cookie ale utilizatorului (salvate în localStorage).
// Cheie: pmpfiber_cookie_prefs. NU se schimbă fără să anunți pagina Cookie Policy.

export interface CookiePreferences {
  necessary: true; // mereu activ
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp când a fost dat consimțământul. */
  decidedAt: string;
}

const STORAGE_KEY = 'pmpfiber_cookie_prefs';
const EVENT = 'pmpfiber:cookie-prefs-changed';

const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';

export const getCookiePreferences = (): CookiePreferences | null => {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    if (typeof parsed !== 'object' || parsed === null) return null;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      decidedAt: typeof parsed.decidedAt === 'string' ? parsed.decidedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
};

export const saveCookiePreferences = (prefs: Omit<CookiePreferences, 'necessary' | 'decidedAt'>): CookiePreferences => {
  const next: CookiePreferences = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    decidedAt: new Date().toISOString(),
  };
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  }
  return next;
};

export const clearCookiePreferences = (): void => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: null }));
};

/** Ascultă schimbările de preferințe (folosit de banner / setări). */
export const onCookiePreferencesChanged = (cb: (prefs: CookiePreferences | null) => void): (() => void) => {
  if (!isBrowser()) return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<CookiePreferences | null>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
};
