import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Menu } from 'lucide-react';
import { company, navLinks, telLink } from '../data/company';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Închide meniul mobil la schimbarea rutei
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl shadow-premium'
            : 'border-b border-transparent bg-gradient-to-b from-ink-950/70 to-transparent'
        }`}
      >
        <nav className="container-px flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center" aria-label="PMPFIBER — Acasă">
            <img
              src="/images/logo_PMP_FIBER.png"
              alt="PMPFIBER — ciubăre premium"
              className="h-9 w-auto sm:h-10"
              width={170}
              height={48}
            />
          </Link>

          {/* Meniu centrat — desktop */}
          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-gold-light'
                        : 'text-cream/80 hover:text-cream'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA dreapta — desktop. Accent pe APEL TELEFONIC (mai mare). */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={telLink}
              className="btn-call text-base px-6 py-3.5"
              aria-label={`Sună acum la ${company.phoneDisplay}`}
            >
              <Phone className="h-5 w-5" />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-normal uppercase tracking-widest opacity-80">
                  Sună acum
                </span>
                <span className="font-bold">{company.phoneDisplay}</span>
              </span>
            </a>
            <Link to="/contact" className="btn-outline">
              Cerere ofertă
            </Link>
          </div>

          {/* Mobil: apel rapid + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={telLink}
              className="btn-call !px-4 !py-2.5"
              aria-label={`Sună la ${company.phoneDisplay}`}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-bold">Sună</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream backdrop-blur-md transition hover:border-gold/50"
              aria-label="Deschide meniul"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
