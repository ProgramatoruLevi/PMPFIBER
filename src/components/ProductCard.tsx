import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Users } from 'lucide-react';
import {
  type Product,
  formatLei,
  getFromPrice,
  productPath,
  offerLink,
} from '../data/products';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const href = productPath(product);
  const from = getFromPrice(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-premium">
      {/* Imagine */}
      <Link
        to={href}
        className="relative block aspect-[4/3] overflow-hidden bg-ink-900"
        aria-label={`Vezi detalii ${product.name}`}
      >
        <img
          src={product.images[0]}
          alt={`${product.name} — ${product.categoryLabel}`}
          loading={index < 3 ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
        {product.tier && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950">
            {product.tier}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-[11px] font-medium text-cream/90 backdrop-blur-md">
          {product.categoryLabel}
        </span>
      </Link>

      {/* Conținut */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-cream">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-sand">
          {product.description}
        </p>

        {/* Specificații rapide */}
        {(product.capacity || product.diameter) && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-cream/70">
            {product.capacity && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-gold" />
                {product.capacity}
              </span>
            )}
            {product.diameter && (
              <span className="inline-flex items-center gap-1.5">
                <Ruler className="h-3.5 w-3.5 text-gold" />
                {product.diameter}
              </span>
            )}
          </div>
        )}

        {/* Badge-uri dotări */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 3).map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-medium text-sand"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Preț + acțiuni */}
        <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <span className="font-display text-3xl font-bold leading-none text-gold-light sm:text-[2rem]">
              {formatLei(from)}
            </span>
            <span className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-[11px] font-bold">
              <span className="text-[#ff5d4d]">TVA inclus</span>
              <span className="text-sand/40">·</span>
              <span className="text-[#34d27f]">garanție 2 ani</span>
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to={href} className="btn-gold !px-4 !py-2.5 text-xs">
            Vezi detalii
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to={offerLink(product.name)}
            className="btn-outline !px-4 !py-2.5 text-xs"
          >
            Cere ofertă
          </Link>
        </div>
      </div>
    </article>
  );
}
