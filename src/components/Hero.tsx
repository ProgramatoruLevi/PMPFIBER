import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Flame, Snowflake, Users, Truck, ArrowRight } from 'lucide-react';
import { company, telLink } from '../data/company';

const badges = [
  { icon: Flame, label: 'Sobă inox inclusă' },
  { icon: Snowflake, label: 'Izolație spumă poliuretanică' },
  { icon: Users, label: 'Modele 4–10 persoane' },
  { icon: Truck, label: 'Livrare în România' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <>
      {/* ════════════ MOBIL ════════════
          Text pe fundal curat închis (lizibil) + ciubărul într-o imagine
          dedicată, vizibilă complet. Mai puține butoane (mai puțin insistent). */}
      <section className="relative bg-ink-950 pb-12 pt-28 md:hidden">
        <div className="container-px">
          <motion.span custom={0} variants={fadeUp} initial="hidden" animate="show" className="eyebrow">
            <span className="h-px w-8 bg-gold/60" />
            Producător român de ciubăre premium
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 font-display text-[2.1rem] font-bold leading-[1.08] text-cream"
          >
            Ciubăre premium pentru <span className="text-gold-gradient">relaxare autentică</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-3 text-[0.95rem] leading-relaxed text-sand"
          >
            Construite din fibră de sticlă rezistentă, finisate cu lemn premium și echipate
            pentru confort în orice sezon.
          </motion.p>

          {/* Ciubărul — imagine dedicată, complet vizibilă */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 shadow-premium"
          >
            <img
              src="/images/imagine_background_hero.png"
              alt="Ciubăr premium PMPFiber pe malul unui lac de munte, la apus"
              className="aspect-[4/3] w-full object-cover"
              style={{ objectPosition: 'center' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
            <ul className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
              {badges.slice(0, 2).map((b) => (
                <li
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/55 px-3 py-1 text-[11px] font-medium text-cream backdrop-blur-md"
                >
                  <b.icon className="h-3.5 w-3.5 text-gold-light" />
                  {b.label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Doar 2 acțiuni — primar Vezi modelele, apel discret dedesubt */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 space-y-3"
          >
            <Link to="/ciubare" className="btn-gold w-full py-4 text-base">
              Vezi modelele
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={telLink} className="btn-outline w-full">
              <Phone className="h-4 w-4 text-[#37d07f]" />
              Sună acum · {company.phoneDisplay}
            </a>
          </motion.div>

          {/* Restul de avantaje, discret */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {badges.slice(2).map((b) => (
              <li key={b.label} className="pill">
                <b.icon className="h-3.5 w-3.5" />
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════════════ DESKTOP / TABLETĂ ════════════
          Hero full-bleed cu fundal vizibil (neschimbat). */}
      <section className="relative isolate hidden min-h-[92svh] items-center overflow-hidden md:flex">
        <picture className="absolute inset-0 -z-10">
          <img
            src="/images/imagine_background_hero.png"
            alt="Ciubăr premium PMPFiber pe malul unui lac de munte, la apus"
            className="h-full w-full object-cover"
          />
        </picture>

        {/* Overlay — fundal vizibil, text lizibil pe stânga */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/72 via-ink-950/40 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/25" />

        <div className="container-px w-full pb-16 pt-32 sm:pt-36">
          <div className="max-w-2xl">
            <motion.span custom={0} variants={fadeUp} initial="hidden" animate="show" className="eyebrow">
              <span className="h-px w-8 bg-gold/60" />
              Producător român de ciubăre premium
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 font-display text-5xl font-bold leading-[1.05] text-cream lg:text-6xl xl:text-7xl"
            >
              Ciubăre premium pentru <span className="text-gold-gradient">relaxare autentică</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85"
            >
              Construite din fibră de sticlă rezistentă, finisate cu lemn premium și echipate
              pentru confort în orice sezon.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href={telLink} className="btn-call px-7 py-4 text-base">
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
            </motion.div>

            <motion.ul
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap gap-2.5"
            >
              {badges.map((b) => (
                <li key={b.label} className="pill">
                  <b.icon className="h-3.5 w-3.5" />
                  {b.label}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/25 p-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-gold-light"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
