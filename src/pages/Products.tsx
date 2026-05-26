import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ProductGrid from '../components/ProductGrid';
import CTASection from '../components/CTASection';
import { allProducts, filters } from '../data/products';
import {
  organizationLd,
  breadcrumbLd,
  type SeoMeta,
} from '../utils/seo';

const meta: SeoMeta = {
  title: 'Ciubăre premium',
  description:
    'Descoperă gama completă de ciubăre PMPFiber: modele rotunde de 200 și 225 cm, pătrate, încastrabile, IceTube și cuve din fibră de sticlă. Variante Base, Comfort și Luxury.',
  path: '/ciubare',
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get('filter') ?? 'toate';
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const f = searchParams.get('filter') ?? 'toate';
    setActive(f);
  }, [searchParams]);

  const selectFilter = (id: string) => {
    setActive(id);
    if (id === 'toate') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ filter: id }, { replace: true });
    }
  };

  const visible = useMemo(() => {
    const f = filters.find((x) => x.id === active) ?? filters[0];
    return allProducts.filter(f.match);
  }, [active]);

  return (
    <>
      <SEO
        {...meta}
        jsonLd={[
          organizationLd(),
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Ciubăre', path: '/ciubare' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Gama PMPFiber"
        title="Ciubăre premium pentru orice spațiu"
        subtitle="Filtrează după dimensiune, formă sau nivel de dotări și găsește modelul potrivit curții, cabanei sau pensiunii tale."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Ciubăre' }]}
      />

      <section className="section">
        <div className="container-px">
          {/* Filtre */}
          <div className="-mx-1 flex flex-wrap gap-2 pb-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => selectFilter(f.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  active === f.id
                    ? 'border-gold bg-gold-gradient text-ink-950'
                    : 'border-white/10 bg-ink-800/50 text-sand hover:border-gold/40 hover:text-cream'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="mt-5 text-sm text-sand/70">
            {visible.length} {visible.length === 1 ? 'model' : 'modele'} disponibile
          </p>

          <div className="mt-8">
            <ProductGrid products={visible} columns={3} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
