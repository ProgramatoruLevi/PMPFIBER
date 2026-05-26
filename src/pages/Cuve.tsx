import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ProductDetails from '../components/ProductDetails';
import CTASection from '../components/CTASection';
import { getProductBySlug } from '../data/products';
import { organizationLd, productLd, breadcrumbLd } from '../utils/seo';

const SLUG = 'cuve-fibra-de-sticla';

export default function Cuve() {
  const product = getProductBySlug(SLUG)!;
  const path = '/cuve-fibra-de-sticla';

  return (
    <>
      <SEO
        title="Cuve din fibră de sticlă"
        description="Cuve premium din fibră de sticlă PMPFiber pentru ciubăre, mini piscine și proiecte SPA încastrabile. Variante rotunde 200/225 cm și pătrate, de la 2.700 lei."
        path={path}
        image={product.images[0]}
        type="product"
        jsonLd={[
          organizationLd(),
          productLd(product),
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Cuve fibră de sticlă', path },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Cuve fibră de sticlă"
        title="Cuve premium din fibră de sticlă"
        subtitle="Baza solidă pentru ciubăre, mini piscine și proiecte SPA încastrabile. Disponibile în mai multe dimensiuni, cu sau fără sobă integrată."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Cuve fibră de sticlă' }]}
      />

      <section className="section">
        <div className="container-px">
          <ProductDetails product={product} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
