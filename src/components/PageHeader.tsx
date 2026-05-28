import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Crumb {
  name: string;
  path?: string;
}

interface Props {
  eyebrow?: string;
  /** Opțional: dacă lipsește, antetul e compact (doar breadcrumb + eyebrow),
   *  iar titlul H1 al paginii e furnizat de conținut (ex. pagina de produs). */
  title?: ReactNode;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/** Antet de pagină cu spațiu pentru navbar-ul fix + breadcrumb. */
export default function PageHeader({ eyebrow, title, subtitle, crumbs, children }: Props) {
  const compact = !title;
  return (
    <section
      className={`relative overflow-hidden border-b border-white/10 bg-ink-900 ${
        compact ? 'pb-7 pt-28 sm:pt-28' : 'pb-14 pt-32 sm:pt-36'
      }`}
    >
      <div className="pointer-events-none absolute -right-24 -top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-px relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-sand/70">
            {crumbs.map((c, i) => (
              <span key={c.name} className="flex items-center gap-1.5">
                {c.path ? (
                  <Link to={c.path} className="transition-colors hover:text-gold-light">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-cream/80">{c.name}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 text-sand/40" />}
              </span>
            ))}
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold/50" />
              {eyebrow}
            </span>
          )}
          {title && (
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-sand sm:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
