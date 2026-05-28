import { Head } from 'vite-react-ssg';
import { company } from '../data/company';
import {
  absUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_WIDTH,
  DEFAULT_OG_HEIGHT,
  type SeoMeta,
} from '../utils/seo';

interface SEOProps extends SeoMeta {
  /** Obiecte JSON-LD (Organization, Product, Breadcrumb, FAQ...) */
  jsonLd?: Record<string, unknown>[];
  /** Alt text pentru og:image (Facebook recomandă, accesibilitate). */
  imageAlt?: string;
  /** Data publicării (ISO) pentru og:type=article. */
  publishedTime?: string;
  /** Secțiunea pentru og:type=article (ex. „Ghiduri ciubăre"). */
  articleSection?: string;
  /** Preț pentru og:type=product (extensia Facebook). */
  priceAmount?: number;
  /** Cod monedă pentru og:type=product (default RON). */
  priceCurrency?: string;
  /** Dimensiuni reale ale og:image (px). Emise doar când sunt cunoscute. */
  imageWidth?: number;
  imageHeight?: number;
}

/**
 * Componentă SEO reutilizabilă. Setează title, meta description, canonical,
 * hreflang, OpenGraph (cu tag-uri product/article specifice), Twitter card,
 * limbă ro-RO și injectează JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  jsonLd = [],
  imageAlt,
  publishedTime,
  articleSection,
  priceAmount,
  priceCurrency = 'RON',
  imageWidth,
  imageHeight,
}: SEOProps) {
  const fullTitle =
    title === company.brand ? title : `${title} · ${company.brand}`;
  const canonical = absUrl(path);
  const ogImage = image ? absUrl(image) : DEFAULT_OG_IMAGE;
  // Dimensiunile sunt cunoscute doar pentru imaginea OG implicită (1200×630)
  // sau când sunt furnizate explicit — altfel nu le declarăm (evităm valori greșite).
  const ogW = image ? imageWidth : DEFAULT_OG_WIDTH;
  const ogH = image ? imageHeight : DEFAULT_OG_HEIGHT;
  const ogImageType = ogImage.endsWith('.webp')
    ? 'image/webp'
    : ogImage.endsWith('.png')
      ? 'image/png'
      : 'image/jpeg';

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
      <meta property="og:image:type" content={ogImageType} />
      {ogW && <meta property="og:image:width" content={String(ogW)} />}
      {ogH && <meta property="og:image:height" content={String(ogH)} />}
      <meta property="og:image:alt" content={imageAlt ?? fullTitle} />

      {/* OG — article (pentru blog) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={company.brand} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}

      {/* OG — product (extensia Facebook Product) */}
      {type === 'product' && priceAmount !== undefined && (
        <>
          <meta property="product:price:amount" content={String(priceAmount)} />
          <meta property="product:price:currency" content={priceCurrency} />
          <meta property="og:price:amount" content={String(priceAmount)} />
          <meta property="og:price:currency" content={priceCurrency} />
          <meta property="product:availability" content="in stock" />
          <meta property="product:condition" content="new" />
          <meta property="product:brand" content={company.brand} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt ?? fullTitle} />

      {/* JSON-LD structured data */}
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Head>
  );
}
