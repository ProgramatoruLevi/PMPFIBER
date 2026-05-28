import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ProductDetails from '../components/ProductDetails';
import ProductGrid from '../components/ProductGrid';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import NotFound from './NotFound';
import { getProductBySlug, getRelated, productPath, getFromPrice } from '../data/products';
import { organizationLd, productLd, breadcrumbLd } from '../utils/seo';

export default function ProductDetail() {
  const { slug = '' } = useParams();
  const product = getProductBySlug(slug);

  if (!product) return <NotFound />;

  const related = getRelated(slug, 3);
  const path = productPath(product);

  return (
    <>
      <SEO
        title={product.name}
        description={`${product.description} ${product.categoryLabel}. Producător PMPFiber. Cere ofertă sau sună acum.`}
        path={path}
        image={product.images[0]}
        imageAlt={`${product.name} — ${product.categoryLabel}`}
        type="product"
        priceAmount={getFromPrice(product)}
        jsonLd={[
          organizationLd(),
          productLd(product),
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Ciubăre', path: '/ciubare' },
            { name: product.name, path },
          ]),
        ]}
      />

      <PageHeader
        eyebrow={product.categoryLabel}
        title={product.name}
        crumbs={[
          { name: 'Acasă', path: '/' },
          { name: 'Ciubăre', path: '/ciubare' },
          { name: product.name },
        ]}
      />

      <section className="section">
        <div className="container-px">
          <ProductDetails product={product} />
        </div>
      </section>

      {/* Produse similare */}
      <section className="section bg-ink-900">
        <div className="container-px">
          <SectionHeading
            align="left"
            eyebrow="Ai putea fi interesat și de"
            title="Produse similare"
          />
          <div className="mt-12">
            <ProductGrid products={related} columns={3} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
