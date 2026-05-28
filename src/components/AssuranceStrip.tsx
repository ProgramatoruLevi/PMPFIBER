import { Factory, MapPin, BadgeCheck, ShieldCheck, Truck } from 'lucide-react';

const items = [
  { icon: Factory, label: 'Direct de la producător' },
  { icon: MapPin, label: 'Fabricat în România' },
  { icon: BadgeCheck, label: 'Prețuri cu TVA inclus' },
  { icon: ShieldCheck, label: 'Garanție 2 ani' },
  { icon: Truck, label: 'Livrare în toată România' },
];

/**
 * Bandă subțire de încredere, vizibilă pe TOATE ecranele (mobil inclus).
 * Comunică rapid avantajele cheie: preț de producător, fabricat în RO, garanție.
 */
export default function AssuranceStrip() {
  return (
    <section className="border-y border-white/10 bg-ink-900/80">
      <div className="container-px">
        <ul className="-mx-1 flex snap-x gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:py-5">
          {items.map((it) => (
            <li
              key={it.label}
              className="flex shrink-0 snap-start items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 md:justify-center md:rounded-xl md:border-transparent md:bg-transparent md:px-2"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-gold/25 bg-gold/10 text-gold-light">
                <it.icon className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap text-[13px] font-semibold text-cream/90">
                {it.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
