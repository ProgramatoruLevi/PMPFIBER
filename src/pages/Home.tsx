import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Home as HomeIcon,
  TreePine,
  BedDouble,
  Waves,
  Sun,
  Check,
} from 'lucide-react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import ProductGrid from '../components/ProductGrid';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import Configurator from '../components/Configurator';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import { popularProducts } from '../data/products';
import { faqs } from '../data/faq';
import {
  organizationLd,
  websiteLd,
  faqLd,
  type SeoMeta,
} from '../utils/seo';

const meta: SeoMeta = {
  title: 'Ciubăre premium din fibră de sticlă și lemn',
  description:
    'PMPFIBER SRL — producător român de ciubăre premium din fibră de sticlă și lemn. Modele 4–10 persoane, sobă inox inclusă, izolație cu spumă poliuretanică, livrare în România.',
  path: '/',
};

const tiers = [
  {
    name: 'Base',
    tagline: 'Relaxare tradițională',
    points: ['Variantă clasică, fără dotări suplimentare', 'Corp izolat cu spumă poliuretanică', 'Sobă din inox inclusă'],
  },
  {
    name: 'Comfort',
    tagline: 'Confort și relaxare',
    points: ['Sistem aeromasaj sau hidromasaj', 'Bec LED multicolor inclus', 'Panou electric cu siguranță'],
    featured: true,
  },
  {
    name: 'Luxury',
    tagline: 'Experiență completă de spa',
    points: ['Aeromasaj 12 duze + hidromasaj 8 duze', 'Tetiere, suport pahare, termometru', 'Iluminare LED multicolor'],
  },
];

const audiences = [
  { icon: HomeIcon, label: 'Case private' },
  { icon: TreePine, label: 'Cabane' },
  { icon: BedDouble, label: 'Pensiuni' },
  { icon: Waves, label: 'Zone SPA' },
  { icon: Sun, label: 'Terase' },
];

export default function Home() {
  return (
    <>
      <SEO {...meta} jsonLd={[organizationLd(), websiteLd(), faqLd(faqs)]} />

      <Hero />
      <FeatureSection />

      {/* Modele populare */}
      <section className="section bg-ink-900">
        <div className="container-px">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Modele populare"
              title="Cele mai alese ciubăre PMPFiber"
              subtitle="O selecție din gama noastră, pentru 4–10 persoane, în variante Base, Comfort și Luxury."
            />
            <Link to="/ciubare" className="btn-outline shrink-0">
              Vezi toate modelele
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <ProductGrid products={popularProducts} columns={3} />
          </div>
        </div>
      </section>

      {/* Alege ciubărul potrivit */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Alege ciubărul potrivit"
            title="Base, Comfort sau Luxury?"
            subtitle="Trei niveluri de dotări, aceeași calitate a construcției. Alege experiența potrivită pentru tine."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    t.featured
                      ? 'border-gold/50 bg-gradient-to-b from-gold/[0.08] to-transparent shadow-gold'
                      : 'border-white/10 bg-ink-800/50'
                  }`}
                >
                  {t.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950">
                      Recomandat
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-semibold text-cream">{t.name}</h3>
                  <p className="mt-1 text-sm text-gold-light">{t.tagline}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-sand">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/ciubare?filter=${t.name.toLowerCase()}`}
                    className={`mt-7 ${t.featured ? 'btn-gold' : 'btn-outline'} w-full`}
                  >
                    Vezi modelele {t.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Relaxare în mijlocul naturii — editorial split */}
      <section className="section bg-ink-900">
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  src="/images/imagine_background_hero.png"
                  alt="Ciubăr PMPFiber într-un peisaj montan, la apus de soare"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow">
                <span className="h-px w-8 bg-gold/50" />
                Experiența PMPFiber
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-[2.7rem]">
                Relaxare în mijlocul naturii
              </h2>
              <p className="mt-5 text-base leading-relaxed text-sand sm:text-lg">
                Apă caldă, abur care se ridică în aerul rece și liniștea din jur.
                Un ciubăr PMPFiber transformă curtea, cabana sau pensiunea într-un
                loc unde te oprești din grabă și te bucuri de momentul prezent —
                indiferent de anotimp.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  'Confort termic datorat izolației cu spumă poliuretanică',
                  'Soba din inox încălzește apa eficient, cu lemne',
                  'Finisaj premium din lemn, rezistent la intemperii',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-cream/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to="/despre-noi" className="btn-outline mt-8">
                Despre PMPFiber
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pentru cine sunt ciubărele */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Pentru cine"
            title="Ciubăre PMPFiber pentru orice spațiu"
            subtitle="De la curți private la pensiuni și zone wellness — configurăm modelul potrivit fiecărui proiect."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {audiences.map((a, i) => (
              <Reveal key={a.label} delay={i * 0.06}>
                <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/40 px-4 py-8 text-center transition-all hover:-translate-y-1 hover:border-gold/40">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold-light">
                    <a.icon className="h-7 w-7" />
                  </div>
                  <span className="text-sm font-medium text-cream">{a.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator inteligent */}
      <section className="section bg-ink-900">
        <div className="container-px">
          <SectionHeading
            eyebrow="Configurator inteligent"
            title="Configurează ciubărul potrivit pentru tine"
            subtitle="Răspunde la câțiva pași și îți recomandăm modelul potrivit, cu preț estimativ. Trimite configurația sau sună-ne pentru ofertă."
          />
          <div className="mt-12">
            <Configurator />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Întrebări frecvente"
            title="Răspunsuri la cele mai frecvente întrebări"
          />
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
