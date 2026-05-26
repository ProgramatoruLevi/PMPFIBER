import { ShieldCheck, ThermometerSun, Factory, SlidersHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from './Reveal';

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: 'Materiale premium',
    text: 'Fibră de sticlă rezistentă și lemn de calitate, finisate cu atenție la fiecare detaliu.',
  },
  {
    icon: ThermometerSun,
    title: 'Confort în orice sezon',
    text: 'Izolație cu spumă poliuretanică și sobă din inox pentru apă caldă pe tot parcursul anului.',
  },
  {
    icon: Factory,
    title: 'Producție proprie',
    text: 'Fabricăm în România și controlăm calitatea de la cuvă până la finisajul final.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Configurații personalizabile',
    text: 'Alegi dimensiunea, dotările și tipul capacului — configurăm ciubărul pentru spațiul tău.',
  },
];

export default function FeatureSection() {
  return (
    <section className="section relative">
      <div className="container-px">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold-light transition-colors group-hover:bg-gold/20">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-cream">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-sand">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
