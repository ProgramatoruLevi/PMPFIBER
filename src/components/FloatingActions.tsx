import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { company, telLink, whatsappLink } from '../data/company';
import { useShowOnScrollUp } from '../hooks/useScrollDirection';
import { trackCallClick, trackWhatsAppClick } from '../utils/analytics';

/** Pagini cu CTA-uri telefon/WhatsApp proeminente în conținut — acolo FAB-urile
 *  ar fi redundante și ar acoperi câmpuri/butoane, deci le ascundem. */
const hasInlineContactCtas = (pathname: string): boolean =>
  pathname === '/contact' ||
  pathname === '/cuve-fibra-de-sticla' ||
  /^\/ciubare\/.+/.test(pathname) ||
  /^\/accesorii\/.+/.test(pathname);

/**
 * Acțiuni plutitoare „Sună acum" + WhatsApp.
 * Se ascund la derulare în jos (citire) și reapar la derulare în sus / lângă
 * vârf — astfel NU mai acoperă conținutul. Pe paginile cu CTA-uri inline
 * (contact, detaliu produs/accesoriu/cuve) nu se afișează deloc.
 */
export default function FloatingActions() {
  const show = useShowOnScrollUp();
  const { pathname } = useLocation();

  if (hasInlineContactCtas(pathname)) return null;

  return (
    <motion.div
      aria-hidden={!show}
      initial={false}
      animate={show ? { y: 0, opacity: 1 } : { y: 96, opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3.5 sm:bottom-6 sm:right-6 ${
        show ? '' : 'pointer-events-none'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={whatsappLink('Bună ziua! Sunt interesat(ă) de un ciubăr PMPFiber.')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating')}
        tabIndex={show ? undefined : -1}
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-[#06351c] shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
        aria-label="Scrie-ne pe WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={telLink}
        onClick={() => trackCallClick('floating')}
        tabIndex={show ? undefined : -1}
        className="group flex items-center gap-2 rounded-full bg-[#167a3c] px-4 py-3 text-cream shadow-[0_14px_36px_-8px_rgba(22,122,60,0.7)] transition-transform hover:scale-[1.03]"
        aria-label={`Sună acum la ${company.phoneDisplay}`}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
          <Phone className="h-4 w-4" />
        </span>
        <span className="hidden pr-1 font-semibold sm:inline">Sună acum</span>
      </a>
    </motion.div>
  );
}
