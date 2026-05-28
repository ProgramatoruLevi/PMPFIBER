import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Users } from 'lucide-react';
import ResponsiveImg from './ResponsiveImg';
import {
  type Product,
  formatLei,
  getFromPrice,
  productPath,
  offerLink,
} from '../data/products';

const CARD_IMG_SIZES = '(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw';

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
        className="product-media relative block aspect-[4/3] overflow-hidden"
        aria-label={`Vezi detalii ${product.name}`}
      >
        <ResponsiveImg
          src={product.images[0]}
          sizes={CARD_IMG_SIZES}
          alt={`${product.name} — ${product.categoryLabel}`}
          width={800}
          height={600}
          loading={index < 3 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : undefined}
          decoding="async"
          className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent" />
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
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-semibold text-cream sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-sand">
          {product.description}
        </p>

        {/* Specificații rapide */}
        {(product.capacity || product.diameter) && (
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-cream/75">
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

        {/* Badge-uri dotări — doar pe ecrane >= sm (densitate pe mobil) */}
        <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
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
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div>
            <span className="font-display text-3xl font-bold leading-none text-gold-light sm:text-[2rem]">
              {formatLei(from)}
            </span>
            <span className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-[11px] font-bold">
              <span className="text-[#ff6b5b]">TVA inclus</span>
              <span className="text-sand/40">·</span>
              <span className="text-[#4ade80]">garanție 2 ani</span>
            </span>
          </div>
          <span className="shrink-0 rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold text-gold-light">
            Preț producător
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link to={href} className="btn-gold min-h-11 !px-4 !py-2.5 text-sm">
            Vezi detalii
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={offerLink(product.name)}
            className="btn-outline min-h-11 !px-4 !py-2.5 text-sm"
          >
            Cere ofertă
          </Link>
        </div>
      </div>
    </article>
  );
}
