import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Circle,
  Square,
  Sparkles,
  Phone,
  MessageCircle,
  ArrowRight,
  Check,
} from 'lucide-react';
import {
  products,
  formatLei,
  getFromPrice,
  productPath,
  offerLink,
  type Product,
} from '../data/products';
import { company, telLink, whatsappLink } from '../data/company';

type Capacity = '4-6' | '8-10';
type Shape = 'rotund' | 'patrat';
type Tier = 'Base' | 'Comfort' | 'Luxury';
type Lid = 'fibra' | 'termo';

interface OptionMeta {
  id: string;
  label: string;
  price: number;
}

const EXTRAS: OptionMeta[] = [
  { id: 'termometru', label: 'Termometru pentru apă', price: 200 },
  { id: 'suport-mare', label: 'Suport pahare (4 locuri)', price: 200 },
  { id: 'tetiera', label: 'Tetieră suplimentară', price: 50 },
  { id: 'led', label: 'Bec LED multicolor pneumatic', price: 300 },
];

const choiceBtn = (active: boolean) =>
  `flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
    active
      ? 'border-gold bg-gold/10 text-cream ring-1 ring-gold/40'
      : 'border-white/10 bg-ink-800/50 text-sand hover:border-gold/40 hover:text-cream'
  }`;

export default function Configurator() {
  const [capacity, setCapacity] = useState<Capacity>('4-6');
  const [shape, setShape] = useState<Shape>('rotund');
  const [tier, setTier] = useState<Tier>('Comfort');
  const [lid, setLid] = useState<Lid>('termo');
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (id: string) =>
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  // Modelul pătrat nu are categorie de mărime — îl tratăm separat.
  const recommended: Product | undefined = useMemo(() => {
    const wantSize = capacity === '4-6' ? '200' : '225';
    const score = (p: Product): number => {
      let s = 0;
      if (p.tier === tier) s += 4;
      if (shape === 'patrat') {
        if (p.shape === 'patrat') s += 5;
      } else {
        if (p.shape === 'rotund') s += 3;
        if (p.size === wantSize) s += 4;
      }
      return s;
    };
    const candidates = products
      .filter((p) => p.tier && (shape === 'patrat' ? p.shape === 'patrat' : p.shape === 'rotund'))
      .map((p) => ({ p, s: score(p) }))
      .sort((a, b) => b.s - a.s);
    return candidates[0]?.p;
  }, [capacity, shape, tier]);

  const lidLabel = lid === 'fibra' ? 'Cu capac din fibră de sticlă' : 'Cu capac termoizolant';

  // Preț estimat
  const estimate = useMemo(() => {
    if (!recommended) return 0;
    const match =
      recommended.prices.find((pr) =>
        lid === 'termo'
          ? /termoizolant/i.test(pr.label)
          : /fibră de sticlă/i.test(pr.label),
      ) ?? recommended.prices[0];
    const base = match?.price ?? getFromPrice(recommended);
    const extrasTotal = extras.reduce(
      (sum, id) => sum + (EXTRAS.find((e) => e.id === id)?.price ?? 0),
      0,
    );
    return base + extrasTotal;
  }, [recommended, lid, extras]);

  const configSummary = useMemo(() => {
    const parts = [
      `Model recomandat: ${recommended?.name ?? '—'}`,
      `Capacitate: ${capacity === '4-6' ? '4–6 persoane' : '8–10 persoane'}`,
      `Formă: ${shape === 'rotund' ? 'Rotund' : 'Pătrat'}`,
      `Gamă: ${tier}`,
      `Capac: ${lid === 'termo' ? 'Termoizolant' : 'Fibră de sticlă'}`,
    ];
    if (extras.length) {
      parts.push(
        `Opționale: ${extras
          .map((id) => EXTRAS.find((e) => e.id === id)?.label)
          .filter(Boolean)
          .join(', ')}`,
      );
    }
    parts.push(`Preț estimativ: ${formatLei(estimate)}`);
    return parts.join('\n');
  }, [recommended, capacity, shape, tier, lid, extras, estimate]);

  const waMessage = `Bună ziua! Am configurat un ciubăr pe site:\n\n${configSummary}\n\nAș dori o ofertă.`;
  const contactHref = recommended
    ? `${offerLink(recommended.name)}&config=${encodeURIComponent(configSummary)}`
    : '/contact';

  const Step = ({
    n,
    title,
    children,
  }: {
    n: number;
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <h3 className="flex items-center gap-2.5 text-sm font-semibold text-cream">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-xs font-bold text-gold-light">
          {n}
        </span>
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      {/* Pași configurare */}
      <div className="space-y-7 rounded-3xl border border-white/10 bg-ink-800/40 p-6 sm:p-8">
        <Step n={1} title="Câte persoane vor folosi ciubărul?">
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className={choiceBtn(capacity === '4-6')} onClick={() => setCapacity('4-6')}>
              <Users className="h-5 w-5 text-gold" /> 4–6 persoane
            </button>
            <button type="button" className={choiceBtn(capacity === '8-10')} onClick={() => setCapacity('8-10')}>
              <Users className="h-5 w-5 text-gold" /> 8–10 persoane
            </button>
          </div>
        </Step>

        <Step n={2} title="Ce formă preferi?">
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className={choiceBtn(shape === 'rotund')} onClick={() => setShape('rotund')}>
              <Circle className="h-5 w-5 text-gold" /> Rotund
            </button>
            <button type="button" className={choiceBtn(shape === 'patrat')} onClick={() => setShape('patrat')}>
              <Square className="h-5 w-5 text-gold" /> Pătrat
            </button>
          </div>
          {shape === 'patrat' && capacity === '8-10' && (
            <p className="mt-2 text-xs text-gold-light/80">
              Modelele pătrate sunt disponibile în special pentru grupuri mici–medii. Îți recomandăm și o variantă rotundă de 225 cm pentru 8–10 persoane.
            </p>
          )}
        </Step>

        <Step n={3} title="Ce nivel de dotări îți dorești?">
          <div className="grid grid-cols-3 gap-3">
            {(['Base', 'Comfort', 'Luxury'] as Tier[]).map((t) => (
              <button key={t} type="button" className={choiceBtn(tier === t)} onClick={() => setTier(t)}>
                {t}
              </button>
            ))}
          </div>
        </Step>

        <Step n={4} title="Ce tip de capac?">
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className={choiceBtn(lid === 'fibra')} onClick={() => setLid('fibra')}>
              Fibră de sticlă
            </button>
            <button type="button" className={choiceBtn(lid === 'termo')} onClick={() => setLid('termo')}>
              Termoizolant
            </button>
          </div>
        </Step>

        <Step n={5} title="Adaugă opționale (opțional)">
          <div className="flex flex-wrap gap-2.5">
            {EXTRAS.map((e) => {
              const active = extras.includes(e.id);
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => toggleExtra(e.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                    active
                      ? 'border-gold bg-gold/15 text-cream'
                      : 'border-white/10 bg-ink-800/60 text-sand hover:border-gold/40'
                  }`}
                >
                  {active && <Check className="h-3.5 w-3.5 text-gold-light" />}
                  {e.label} · {formatLei(e.price)}
                </button>
              );
            })}
          </div>
        </Step>
      </div>

      {/* Rezultat */}
      <div className="lg:sticky lg:top-28">
        <div className="overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-b from-ink-700/80 to-ink-900">
          {recommended && (
            <Link to={productPath(recommended)} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={recommended.images[0]}
                  alt={recommended.name}
                  className="h-full w-full object-contain p-3"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                <span className="absolute left-4 top-4 pill">Recomandarea noastră</span>
              </div>
            </Link>
          )}

          <div className="p-6">
            <p className="text-xs uppercase tracking-widest text-sand/60">Model recomandat</p>
            <AnimatePresence mode="wait">
              <motion.h3
                key={recommended?.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1 font-display text-2xl font-semibold text-cream"
              >
                {recommended?.name ?? 'Configurează mai sus'}
              </motion.h3>
            </AnimatePresence>
            <p className="mt-1 text-sm text-sand">{lidLabel}</p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-ink-950/50 p-4">
              <span className="text-xs uppercase tracking-widest text-sand/60">
                Preț estimativ
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={estimate}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-display text-4xl font-semibold text-gold-light"
                >
                  {formatLei(estimate)}
                </motion.p>
              </AnimatePresence>
              <p className="mt-1 text-xs text-sand/60">
                Estimare orientativă, TVA inclus. Prețul final îl confirmăm la cerere.
              </p>
              <p className="mt-1 text-xs text-gold-light/80">
                Toate prețurile includ TVA · Garanție 2 ani
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <Link to={contactHref} className="btn-gold w-full">
                <Sparkles className="h-4 w-4" />
                Trimite configurația
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href={telLink} className="btn-call w-full">
                  <Phone className="h-4 w-4" />
                  Sună acum
                </a>
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
              <p className="text-center text-xs text-sand/60">{company.phoneDisplay}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
