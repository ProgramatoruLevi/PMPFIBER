import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../data/faq';
import Reveal from './Reveal';

export default function FAQ({ items = faqs }: { items?: typeof faqs }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-3">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.question} delay={i * 0.04}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-gold/40 bg-ink-800/60' : 'border-white/10 bg-ink-800/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-cream">{f.question}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/30 text-gold-light transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-gold/15' : ''
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-sand">
                        {f.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
