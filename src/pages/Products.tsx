import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import CTASection from '../components/CTASection';
import { allProducts, getFilter } from '../data/products';
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

  const visible = useMemo(() => allProducts.filter(getFilter(active).match), [active]);

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
          <ProductFilters
            active={active}
            onSelect={selectFilter}
            resultCount={visible.length}
          />

          <p className="mt-6 text-sm text-sand/70">
            <span className="font-semibold text-cream">{visible.length}</span>{' '}
            {visible.length === 1 ? 'model disponibil' : 'modele disponibile'}
          </p>

          <div className="mt-6">
            <ProductGrid products={visible} columns={3} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
