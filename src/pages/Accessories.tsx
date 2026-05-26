import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import CTASection from '../components/CTASection';
import { ArrowRight } from 'lucide-react';
import { accessories, accessoryPath } from '../data/accessories';
import { formatLei, offerLink } from '../data/products';
import { organizationLd, breadcrumbLd } from '../utils/seo';

export default function Accessories() {
  return (
    <>
      <SEO
        title="Accesorii ciubăre"
        description="Accesorii premium pentru ciubărele PMPFiber: termometru pentru apă, suport pahare și tetiere suplimentare. Finisaje asortate, calitate premium."
        path="/accesorii"
        jsonLd={[
          organizationLd(),
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Accesorii', path: '/accesorii' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Accesorii"
        title="Accesorii pentru ciubărul tău"
        subtitle="Detalii care ridică experiența: termometru, suporturi pentru pahare și tetiere suplimentare, toate cu finisaj premium."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Accesorii' }]}
      />

      <section className="section">
        <div className="container-px">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {accessories.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 shadow-card transition-all hover:-translate-y-1.5 hover:border-gold/40">
                  <Link
                    to={accessoryPath(a)}
                    className="block aspect-square overflow-hidden bg-ink-900"
                    aria-label={`Vezi detalii ${a.name}`}
                  >
                    <img
                      src={a.images[0]}
                      alt={`${a.name} — accesoriu PMPFiber`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold text-cream">
                      <Link to={accessoryPath(a)} className="transition-colors hover:text-gold-light">
                        {a.name}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-sand">{a.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-display text-xl font-semibold text-gold-light">
                        {formatLei(a.price)}
                        {a.unit && <span className="text-sm text-sand/70"> / {a.unit}</span>}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link to={accessoryPath(a)} className="btn-gold !px-3 !py-2.5 text-xs">
                        Vezi detalii
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link to={offerLink(a.name)} className="btn-outline !px-3 !py-2.5 text-xs">
                        Cere ofertă
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ai nevoie de ajutor?"
        title="Nu ești sigur ce accesorii ți se potrivesc?"
        subtitle="Sună-ne și îți recomandăm accesoriile potrivite modelului tău de ciubăr."
      />
    </>
  );
}
