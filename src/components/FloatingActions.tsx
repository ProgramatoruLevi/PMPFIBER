import { Phone, MessageCircle } from 'lucide-react';
import { company, telLink, whatsappLink } from '../data/company';

/**
 * Butoane plutitoare „Sună acum" + WhatsApp.
 * Accentul este pe apelul telefonic (buton mai mare, cu etichetă).
 */
export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={whatsappLink('Bună ziua! Sunt interesat(ă) de un ciubăr PMPFiber.')}
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-[#06351c] shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
        style={{ height: 52, width: 52 }}
        aria-label="Scrie-ne pe WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={telLink}
        className="group flex items-center gap-2 rounded-full bg-[#1f8a4c] px-4 py-3.5 text-cream shadow-[0_14px_36px_-8px_rgba(31,138,76,0.7)] transition-transform hover:scale-[1.03]"
        aria-label={`Sună acum la ${company.phoneDisplay}`}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
          <Phone className="h-4 w-4" />
        </span>
        <span className="hidden pr-1 font-semibold sm:inline">Sună acum</span>
      </a>
    </div>
  );
}
