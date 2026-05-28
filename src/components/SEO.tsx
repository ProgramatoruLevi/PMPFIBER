import { Head } from 'vite-react-ssg';
import { company } from '../data/company';
import { absUrl, DEFAULT_OG_IMAGE, type SeoMeta } from '../utils/seo';

interface SEOProps extends SeoMeta {
  /** Obiecte JSON-LD (Organization, Product, Breadcrumb, FAQ...) */
  jsonLd?: Record<string, unknown>[];
}

/**
 * Componentă SEO reutilizabilă. Setează title, meta description, canonical,
 * OpenGraph, Twitter card, limbă ro-RO și injectează JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  jsonLd = [],
}: SEOProps) {
  const fullTitle =
    title === company.brand ? title : `${title} · ${company.brand}`;
  const canonical = absUrl(path);
  const ogImage = image ? absUrl(image) : DEFAULT_OG_IMAGE;

  return (
    <Head>
      <html lang="ro-RO" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ro-RO" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />

      {/* OpenGraph */}
      <meta property="og:site_name" content={company.brand} />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data */}
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Head>
  );
}
