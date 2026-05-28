import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X, Check, RotateCcw } from 'lucide-react';
import { filterGroups, getFilter, countFor } from '../data/products';

interface Props {
  active: string;
  onSelect: (id: string) => void;
  /** Numărul de rezultate vizibile pentru filtrul curent. */
  resultCount: number;
}

const Chip = ({
  id,
  active,
  onClick,
  block = false,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  block?: boolean;
}) => {
  const f = getFilter(id);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        block ? 'w-full justify-between' : ''
      } ${
        active
          ? 'border-gold bg-gold-gradient text-ink-950 shadow-gold'
          : 'border-white/12 bg-ink-800/60 text-sand hover:border-gold/40 hover:text-cream'
      }`}
    >
      <span className="inline-flex items-center gap-2">
        {active && !block && <Check className="h-3.5 w-3.5" />}
        {f.label}
      </span>
      <span
        className={`text-[11px] font-semibold tabular-nums ${
          active ? 'text-ink-950/70' : 'text-sand/70'
        }`}
      >
        {countFor(id)}
      </span>
    </button>
  );
};

export default function ProductFilters({ active, onSelect, resultCount }: Props) {
  const [open, setOpen] = useState(false);
  const isAll = active === 'toate';
  const activeLabel = getFilter(active).label;

  const Groups = ({ block = false }: { block?: boolean }) => (
    <div className={block ? 'space-y-6' : 'grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4'}>
      {filterGroups.map((group) => (
        <div key={group.label}>
          <h3 className="flex items-center gap-2 text-base font-bold uppercase tracking-wide text-cream">
            <span className="h-4 w-1 rounded-full bg-gold-gradient" />
            {group.label}
          </h3>
          <div className={`mt-3.5 flex flex-wrap gap-2 ${block ? 'flex-col' : ''}`}>
            {group.ids.map((id) => (
              <Chip
                key={id}
                id={id}
                active={active === id}
                block={block}
                onClick={() => {
                  onSelect(id);
                  if (block) setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* ───────── DESKTOP / TABLETĂ: panou cu facete grupate ───────── */}
      <div className="hidden rounded-2xl border border-white/10 bg-ink-900/50 p-6 md:block">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-cream">Filtrează modelele</span>
            <button
              type="button"
              onClick={() => onSelect('toate')}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                isAll
                  ? 'border-gold bg-gold-gradient text-ink-950'
                  : 'border-white/12 bg-ink-800/60 text-sand hover:border-gold/40 hover:text-cream'
              }`}
            >
              Toate · {countFor('toate')}
            </button>
          </div>
          {!isAll && (
            <button
              type="button"
              onClick={() => onSelect('toate')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sand transition-colors hover:text-gold-light"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Resetează
            </button>
          )}
        </div>
        <Groups />
      </div>

      {/* ───────── MOBIL: buton „Filtre" + bottom-sheet drawer ───────── */}
      <div className="md:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex flex-1 items-center justify-between gap-2 rounded-full border border-white/12 bg-ink-800/60 px-4 py-3 text-sm font-medium text-cream"
          >
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gold" />
              Filtrează
            </span>
            <span className="rounded-full bg-gold-gradient px-2.5 py-0.5 text-xs font-semibold text-ink-950">
              {isAll ? 'Toate' : activeLabel}
            </span>
          </button>
          {!isAll && (
            <button
              type="button"
              onClick={() => onSelect('toate')}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 bg-ink-800/60 text-sand"
              aria-label="Resetează filtrele"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[70] flex flex-col justify-end bg-ink-950/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setOpen(false);
              }}
            >
              <motion.div
                className="max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-ink-900 p-6 pb-8"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              >
                <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-white/15" />
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-display text-xl text-cream">Filtrează modelele</h2>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-ink-800/60 text-cream"
                    aria-label="Închide"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelect('toate');
                    setOpen(false);
                  }}
                  className={`mb-6 flex w-full items-center justify-between rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                    isAll
                      ? 'border-gold bg-gold-gradient text-ink-950'
                      : 'border-white/12 bg-ink-800/60 text-sand'
                  }`}
                >
                  <span>Toate modelele</span>
                  <span className={isAll ? 'text-ink-950/70' : 'text-sand/70'}>{countFor('toate')}</span>
                </button>

                <Groups block />

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-gold mt-7 w-full py-3.5"
                >
                  Vezi {resultCount} {resultCount === 1 ? 'model' : 'modele'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
