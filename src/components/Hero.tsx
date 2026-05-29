import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Factory, BadgeCheck, ShieldCheck } from 'lucide-react';
import { company, telLink } from '../data/company';
import { products, getFromPrice, formatLei } from '../data/products';
import { trackCallClick } from '../utils/analytics';

// Cel mai accesibil ciubăr COMPLET (are tier) — ancora de preț din hero.
const fromPrice = Math.min(...products.filter((p) => p.tier).map(getFromPrice));

const trust = [
  { icon: Factory, label: 'Direct de la producător' },
  { icon: BadgeCheck, label: 'TVA inclus' },
  { icon: ShieldCheck, label: 'Garanție 2 ani' },
];

/** Bloc-ancoră de preț, reutilizat pe mobil și desktop. */
function PriceAnchor({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="flex items-baseline gap-2">
        <span className="text-sm font-medium uppercase tracking-widest text-sand/80">
          Ciubăr complet de la
        </span>
      </p>
      <p className="mt-0.5 font-display text-4xl font-bold leading-none text-gold-gradient sm:text-5xl">
        {formatLei(fromPrice)}
      </p>
      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] font-semibold text-cream/90">
        {trust.map((t) => (
          <li key={t.label} className="inline-flex items-center gap-1.5">
            <t.icon className="h-4 w-4 text-gold-light" />
            {t.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      {/* ════════════ MOBIL — hero full-bleed, imersiv ════════════ */}
      <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden md:hidden">
        <img
          src="/images/imagine_background_hero_mobil-w1080.webp"
          srcSet="/images/imagine_background_hero_mobil-w768.webp 768w, /images/imagine_background_hero_mobil-w1080.webp 1080w"
          sizes="100vw"
          alt="Ciubăr premium PMPFiber pe malul unui lac de munte, la apus"
          width={1800}
          height={3199}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        {/* Gradient sus (doar pentru navbar) + jos (concentrat în treimea de
            jos, ca să rămână VIZIBIL ciubărul deasupra textului). */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/55 via-transparent to-transparent" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              'linear-gradient(to top, #0E0F0D 0%, rgba(14,15,13,0.82) 24%, rgba(14,15,13,0.32) 46%, transparent 62%)',
          }}
        />

        <div className="container-px animate-fade-up pb-9 pt-28 [text-shadow:0_1px_18px_rgba(0,0,0,0.55)]">
          <h1 className="font-display text-[2.05rem] font-bold leading-[1.08] text-cream">
            Ciubăre premium pentru <span className="text-gold-gradient">relaxare autentică</span>
          </h1>

          <PriceAnchor className="mt-5" />

          <div className="mt-7 space-y-3">
            <Link to="/ciubare" className="btn-gold w-full py-4 text-base">
              Vezi modelele
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={telLink}
              onClick={() => trackCallClick('hero-mobile')}
              className="btn-call w-full py-4 text-base"
            >
              <Phone className="h-5 w-5" />
              Sună acum · {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ════════════ DESKTOP / TABLETĂ — full-bleed ════════════ */}
      <section className="relative isolate hidden min-h-[92svh] items-center overflow-hidden md:flex">
        <img
          src="/images/imagine_background_hero.webp"
          srcSet="/images/imagine_background_hero-w1280.webp 1280w, /images/imagine_background_hero.webp 1800w"
          sizes="100vw"
          alt="Ciubăr premium PMPFiber pe malul unui lac de munte, la apus"
          width={1800}
          height={1014}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/70 via-ink-950/30 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/10" />

        <div className="container-px w-full pb-16 pt-32 sm:pt-36">
          <div className="max-w-2xl animate-fade-up [text-shadow:0_1px_20px_rgba(0,0,0,0.45)]">
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold/60" />
              Producător român de ciubăre premium
            </span>

            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-cream lg:text-6xl xl:text-7xl">
              Ciubăre premium pentru <span className="text-gold-gradient">relaxare autentică</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
              Construite din fibră de sticlă rezistentă, finisate cu lemn premium și echipate
              pentru confort în orice sezon.
            </p>

            <PriceAnchor className="mt-7" />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={telLink}
                onClick={() => trackCallClick('hero-desktop')}
                className="btn-call px-7 py-4 text-base"
              >
                <Phone className="h-5 w-5" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-normal uppercase tracking-widest opacity-80">
                    Sună acum
                  </span>
                  <span className="text-base font-bold">{company.phoneDisplay}</span>
                </span>
              </a>
              <Link to="/ciubare" className="btn-gold">
                Vezi modelele
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Cere ofertă
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
