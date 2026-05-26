import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, X, MessageCircle, ArrowUpRight } from 'lucide-react';
import { company, navLinks, telLink, whatsappLink } from '../data/company';

interface Props {
  open: boolean;
  onClose: () => void;
}

const panel = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-ink-950/97 backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="container-px flex h-20 items-center justify-between">
            <img
              src="/images/logo_PMP_FIBER.png"
              alt="PMPFIBER"
              className="h-9 w-auto"
            />
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream"
              aria-label="Închide meniul"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <motion.nav
            className="container-px flex flex-1 flex-col justify-center gap-1"
            variants={panel}
            initial="hidden"
            animate="show"
          >
            {navLinks.map((link) => (
              <motion.div key={link.to} variants={item}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-white/5 py-4 font-display text-3xl text-cream transition-colors hover:text-gold-light"
                >
                  {link.label}
                  <ArrowUpRight className="h-6 w-6 text-gold/40 transition-all group-hover:translate-x-1 group-hover:text-gold-light" />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* CTA jos — accent pe apel */}
          <motion.div
            className="container-px space-y-3 pb-10"
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.35 }}
          >
            <a href={telLink} className="btn-call w-full text-base py-4">
              <Phone className="h-5 w-5" />
              Sună acum · {company.phoneDisplay}
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappLink('Bună ziua! Sunt interesat(ă) de un ciubăr PMPFiber.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
              <Link to="/contact" onClick={onClose} className="btn-outline w-full">
                Cerere ofertă
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
