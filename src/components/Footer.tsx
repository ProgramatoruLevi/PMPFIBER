import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, MessageCircle, Building2, ExternalLink } from 'lucide-react';
import { company, telLink, whatsappLink, navLinks } from '../data/company';

const year = new Date().getFullYear();

const legalLinks = [
  { label: 'Termeni și condiții', to: '/termeni' },
  { label: 'Politică de confidențialitate', to: '/confidentialitate' },
  { label: 'Politică de cookie-uri', to: '/cookie' },
  { label: 'Setări cookie', to: '/setari-cookie' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-900">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-px relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-1">
          <img
            src="/images/logo_PMP_FIBER.webp"
            alt="PMPFIBER"
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand">
            {company.description}
          </p>
          <div className="mt-6 flex gap-3">
            <a href={telLink} className="btn-call !px-5 !py-2.5 text-sm">
              <Phone className="h-4 w-4" />
              Sună acum
            </a>
            <a
              href={whatsappLink('Bună ziua! Aș dori informații despre ciubărele PMPFiber.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !px-5 !py-2.5 text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {/* Badge-uri oficiale ANPC (SAL + SOL/ODR) */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noreferrer"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label="ANPC — Soluționarea Alternativă a Litigiilor"
            >
              <img src="/images/anpc-sal.svg" alt="ANPC SAL — Soluționarea Alternativă a Litigiilor" className="h-10 w-auto" />
            </a>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label="ANPC — Soluționarea Online a Litigiilor (ODR UE)"
            >
              <img src="/images/anpc-sol.svg" alt="ANPC SOL — Soluționarea Online a Litigiilor (ODR UE)" className="h-10 w-auto" />
            </a>
          </div>
        </div>

        {/* Navigare */}
        <div>
          <h3 className="font-display text-lg text-cream">Navigare</h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-sand transition-colors hover:text-gold-light"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/blog" className="text-sm text-sand transition-colors hover:text-gold-light">
                Blog
              </Link>
            </li>
          </ul>

          <h3 className="mt-8 font-display text-lg text-cream">Legal</h3>
          <ul className="mt-5 space-y-3">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-sand transition-colors hover:text-gold-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-lg text-cream">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-sand">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={telLink} className="transition-colors hover:text-gold-light">
                {company.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{company.fullAddress}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{company.schedule}</span>
            </li>
          </ul>

          <h3 className="mt-8 font-display text-lg text-cream">ANPC — Linkuri utile</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sand transition-colors hover:text-gold-light"
              >
                Soluționarea Alternativă a Litigiilor
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sand transition-colors hover:text-gold-light"
              >
                Soluționarea Online a Litigiilor
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sand transition-colors hover:text-gold-light"
              >
                Platforma ODR — Uniunea Europeană
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Date firmă */}
        <div>
          <h3 className="flex items-center gap-2 font-display text-lg text-cream">
            <Building2 className="h-4 w-4 text-gold" />
            Date firmă
          </h3>
          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-sand/70">Denumire</dt>
              <dd className="text-right text-cream/90">{company.legalName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sand/70">CUI</dt>
              <dd className="text-cream/90">{company.cui}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sand/70">Reg. Com.</dt>
              <dd className="text-cream/90">{company.regCom}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sand/70">EUID</dt>
              <dd className="text-right text-cream/90">{company.euid}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sand/70">Județ</dt>
              <dd className="text-cream/90">{company.county}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-xs text-sand/70 sm:flex-row">
          <p>
            © {year} {company.legalName}. Toate drepturile rezervate.
          </p>
          <p>Ciubăre premium · fabricate în România</p>
        </div>
      </div>
    </footer>
  );
}
