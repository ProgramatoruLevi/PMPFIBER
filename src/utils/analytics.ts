// Google Analytics — încărcare DOAR după consimțământ.
// Niciun script GA nu se află în index.html; totul se injectează dinamic aici.
//
// CONFIGURARE: înlocuiește GA_ID cu ID-ul real (G-XXXXXXXXXX) când îl ai.
// Restul codului funcționează identic.

import { getCookiePreferences } from './cookies';

/**
 * ID Google Analytics (Measurement ID GA4).
 * Placeholder pentru dezvoltare. Înlocuiește cu ID-ul real al PMPFIBER.
 */
export const GA_ID = 'G-TESTPMPFBR0';

let gaLoaded = false;

const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Injectează scriptul GA și configurează gtag. Apelat doar după consimțământ. */
export const enableAnalytics = (): void => {
  if (!isBrowser() || gaLoaded) return;
  gaLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });
};

/** Elimină scriptul GA și șterge cookie-urile asociate. */
export const disableAnalytics = (): void => {
  if (!isBrowser()) return;
  gaLoaded = false;

  // Elimină scripturile GA / GTM din DOM
  document
    .querySelectorAll('script[src*="googletagmanager.com"], script[src*="google-analytics.com"]')
    .forEach((s) => s.remove());

  // Curăță gtag și dataLayer
  if (window.gtag) {
    window.gtag = () => {};
  }
  window.dataLayer = [];

  // Șterge cookie-urile _ga, _gid, _ga_*
  const hostname = window.location.hostname;
  const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
  const cookies = document.cookie.split(';').map((c) => c.trim().split('=')[0]);
  cookies
    .filter((name) => name.startsWith('_ga') || name === '_gid')
    .forEach((name) => {
      document.cookie = `${name}=; ${expiry}; path=/;`;
      document.cookie = `${name}=; ${expiry}; path=/; domain=.${hostname};`;
      document.cookie = `${name}=; ${expiry}; path=/; domain=${hostname};`;
    });
};

/** Verifică starea consimțământului și activează/dezactivează corespunzător. */
export const syncAnalyticsWithConsent = (): void => {
  const prefs = getCookiePreferences();
  if (prefs?.analytics) enableAnalytics();
  else disableAnalytics();
};

/** Trimite un eveniment custom — verifică întâi consimțământul. */
export const trackEvent = (name: string, params: Record<string, unknown> = {}): void => {
  if (!isBrowser()) return;
  const prefs = getCookiePreferences();
  if (!prefs?.analytics || !window.gtag) return;
  window.gtag('event', name, params);
};

/** Track pentru click pe butonul „Sună acum". */
export const trackCallClick = (source: string): void =>
  trackEvent('call_click', { source });

/** Track pentru click pe WhatsApp. */
export const trackWhatsAppClick = (source: string): void =>
  trackEvent('whatsapp_click', { source });

/** Track pentru cerere ofertă (submit formular). */
export const trackOfferRequest = (model?: string): void =>
  trackEvent('offer_request', { model });
