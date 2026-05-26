import { Link } from 'react-router-dom';
import {
  Check,
  Phone,
  MessageCircle,
  Sparkles,
  Ruler,
  Users,
  Box,
  Layers,
  ChevronRight,
} from 'lucide-react';
import {
  type Product,
  formatLei,
  getFromPrice,
  offerLink,
} from '../data/products';
import { company, telLink, whatsappLink } from '../data/company';
import ProductGallery from './ProductGallery';
import Reveal from './Reveal';

interface Props {
  product: Product;
}

export default function ProductDetails({ product: p }: Props) {
  const from = getFromPrice(p);
  const isSinglePrice =
    p.prices.length === 1 &&
    /^(preț|de la|preț de la)$/i.test(p.prices[0].label.trim());

  // Specificații tehnice derivate
  const specs: { label: string; value: string }[] = [];
  specs.push({ label: 'Categorie', value: p.categoryLabel });
  if (p.diameter) specs.push({ label: 'Diametru', value: p.diameter });
  if (p.capacity) specs.push({ label: 'Capacitate', value: p.capacity });
  if (p.shape)
    specs.push({ label: 'Formă', value: p.shape === 'rotund' ? 'Rotund' : 'Pătrat' });
  if (p.tier) specs.push({ label: 'Gamă', value: p.tier });

  return (
    <div>
      {/* ── Top: galerie + info ─────────────────────────────────────── */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <ProductGallery images={p.images} alt={`${p.name} — ${p.categoryLabel}`} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill">{p.categoryLabel}</span>
              {p.tier && (
                <span className="rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950">
                  {p.tier}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              {p.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-sand">
              {p.longDescription ?? p.description}
            </p>

            {/* Chips rapide */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/80">
              {p.capacity && (
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-gold" />
                  {p.capacity}
                </span>
              )}
              {p.diameter && (
                <span className="inline-flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-gold" />
                  {p.diameter}
                </span>
              )}
            </div>

            {/* Prețuri */}
            <div className="mt-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-sand/60">
                {isSinglePrice ? 'Preț' : 'Prețuri'}
              </h2>
              {isSinglePrice ? (
                <p className="mt-2 font-display text-4xl font-semibold text-gold-light">
                  {formatLei(from)}
                </p>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {p.prices.map((pr) => (
                    <div
                      key={pr.label}
                      className="rounded-xl border border-white/10 bg-ink-800/60 p-4"
                    >
                      <span className="block text-xs leading-snug text-sand">
                        {pr.label}
                      </span>
                      <span className="mt-1 block font-display text-2xl font-semibold text-cream">
                        {formatLei(pr.price)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA — accent pe apel */}
            <div className="mt-7 flex flex-col gap-3">
              <Link to={offerLink(p.name)} className="btn-gold w-full text-base py-4">
                <Sparkles className="h-5 w-5" />
                Cere ofertă pentru acest model
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href={telLink} className="btn-call w-full">
                  <Phone className="h-5 w-5" />
                  Sună acum
                </a>
                <a
                  href={whatsappLink(`Bună ziua! Sunt interesat(ă) de ${p.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
              <p className="text-center text-xs text-sand/60">
                Răspuns rapid · {company.phoneDisplay}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Secțiuni detaliate ──────────────────────────────────────── */}
      <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-2 lg:gap-14">
        {/* Dotări incluse */}
        {p.features.length > 0 && (
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2 font-display text-2xl text-cream">
                <Check className="h-5 w-5 text-gold" />
                Dotări incluse
              </h2>
              <ul className="mt-5 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-cream/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-light">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {/* Specificații tehnice */}
        <Reveal delay={0.1}>
          <section>
            <h2 className="flex items-center gap-2 font-display text-2xl text-cream">
              <Layers className="h-5 w-5 text-gold" />
              Specificații tehnice
            </h2>
            <dl className="mt-5 divide-y divide-white/10 rounded-xl border border-white/10 bg-ink-800/40">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center justify-between px-4 py-3">
                  <dt className="text-sm text-sand">{s.label}</dt>
                  <dd className="text-sm font-medium text-cream">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        {/* Beneficii (IceTube) */}
        {p.benefits && p.benefits.length > 0 && (
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2 font-display text-2xl text-cream">
                <Sparkles className="h-5 w-5 text-gold" />
                Beneficii
              </h2>
              <ul className="mt-5 space-y-3">
                {p.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-cream/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-light">
                      <Check className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {/* Disponibil pentru (Încastrabil) */}
        {p.availableFor && p.availableFor.length > 0 && (
          <Reveal delay={0.1}>
            <section>
              <h2 className="flex items-center gap-2 font-display text-2xl text-cream">
                <Box className="h-5 w-5 text-gold" />
                Disponibil pentru
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.availableFor.map((a) => (
                  <li key={a} className="pill !text-cream">
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}
      </div>

      {/* Componente (Încastrabil) */}
      {p.components && p.components.length > 0 && (
        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-2xl text-cream">Componente și prețuri</h2>
            <p className="mt-2 text-sm text-sand">
              Alegi componentele de care ai nevoie și construiești configurația potrivită.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-white/10">
                  {p.components.map((c) => (
                    <tr key={c.label} className="bg-ink-800/40 hover:bg-ink-800/70">
                      <td className="px-4 py-3.5 text-cream/85">{c.label}</td>
                      <td className="px-4 py-3.5 text-right font-medium text-gold-light">
                        {formatLei(c.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>
      )}

      {/* Variante (Cuve) */}
      {p.variants && p.variants.length > 0 && (
        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-2xl text-cream">Variante disponibile</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {p.variants.map((v) => (
                <div
                  key={v.name}
                  className="rounded-2xl border border-white/10 bg-ink-800/50 p-5 transition hover:border-gold/40"
                >
                  <h3 className="font-display text-lg text-cream">{v.name}</h3>
                  <dl className="mt-3 space-y-1.5 text-sm text-sand">
                    {v.diameter && (
                      <div className="flex justify-between">
                        <dt>Dimensiune</dt>
                        <dd className="text-cream/85">{v.diameter}</dd>
                      </div>
                    )}
                    {v.height && (
                      <div className="flex justify-between">
                        <dt>Înălțime</dt>
                        <dd className="text-cream/85">{v.height}</dd>
                      </div>
                    )}
                    {v.capacity && (
                      <div className="flex justify-between">
                        <dt>Capacitate</dt>
                        <dd className="text-cream/85">{v.capacity}</dd>
                      </div>
                    )}
                  </dl>
                  <p className="mt-4 border-t border-white/10 pt-3 font-display text-2xl font-semibold text-gold-light">
                    {formatLei(v.price)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Opționale */}
      {p.optionals && p.optionals.length > 0 && (
        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-2xl text-cream">Opționale</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {p.optionals.map((o) => (
                <div
                  key={o.label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-800/40 px-4 py-3 text-sm"
                >
                  <span className="text-cream/85">{o.label}</span>
                  <span className="font-medium text-gold-light">{formatLei(o.price)}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Recomandat pentru */}
      {p.recommendedFor && p.recommendedFor.length > 0 && (
        <Reveal>
          <section className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-r from-ink-800/70 to-transparent p-7">
            <h2 className="font-display text-2xl text-cream">Recomandat pentru</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {p.recommendedFor.map((r) => (
                <li
                  key={r}
                  className="inline-flex items-center gap-2 text-sm text-cream/85"
                >
                  <ChevronRight className="h-4 w-4 text-gold" />
                  {r}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}
    </div>
  );
}
