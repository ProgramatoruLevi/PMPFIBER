// Helperi SEO: construiesc obiectele JSON-LD și meta-urile de bază.
import { company } from '../data/company';
import type { Product } from '../data/products';
import { getFromPrice, productPath } from '../data/products';
import type { FaqItem } from '../data/faq';

export const SITE = company.siteUrl;
/** Imagine OG dedicată, format social 1200×630 (JPEG, suport universal). */
export const DEFAULT_OG_IMAGE = `${SITE}/images/og-default.jpg`;
export const DEFAULT_OG_WIDTH = 1200;
export const DEFAULT_OG_HEIGHT = 630;

export const absUrl = (path: string): string =>
  path.startsWith('http') ? path : `${SITE}${path.startsWith('/') ? '' : '/'}${path}`;

export interface SeoMeta {
  title: string;
  description: string;
  path: string; // ex: "/ciubare"
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

// ── JSON-LD generators ───────────────────────────────────────────────────

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#organization`,
  name: company.legalName,
  alternateName: company.brand,
  description: company.description,
  url: SITE,
  telephone: company.phoneDisplay,
  image: DEFAULT_OG_IMAGE,
  logo: `${SITE}/images/logo_PMP_FIBER.webp`,
  priceRange: '$$',
  vatID: `RO${company.cui}`,
  taxID: company.cui,
  foundingDate: company.foundedDate,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address,
    addressLocality: company.locality,
    addressRegion: company.county,
    postalCode: company.postalCode,
    addressCountry: 'RO',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: company.phoneDisplay,
      contactType: 'sales',
      areaServed: 'RO',
      availableLanguage: ['Romanian'],
    },
  ],
  // Program de lucru (derivat din company.schedule).
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  areaServed: { '@type': 'Country', name: 'România' },
  knowsLanguage: ['ro'],
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: company.brand,
  inLanguage: 'ro-RO',
  publisher: { '@id': `${SITE}/#organization` },
});

/** Toate prețurile relevante ale unui produs (variante de capac, cuve, componente). */
const allPrices = (p: Product): number[] => {
  const pool: number[] = [];
  p.prices?.forEach((pr) => pool.push(pr.price));
  p.variants?.forEach((v) => pool.push(v.price));
  p.components?.forEach((c) => pool.push(c.price));
  return pool.length ? pool : [getFromPrice(p)];
};

/** Valabilitatea prețului — sfârșitul anului următor (recomandat de Google). */
const priceValidUntil = (): string => `${new Date().getFullYear() + 1}-12-31`;

const returnPolicy = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'RO',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 14,
};

export const productLd = (p: Product) => {
  const prices = allPrices(p);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const seller = { '@id': `${SITE}/#organization` };

  const offers =
    low === high
      ? {
          '@type': 'Offer',
          url: absUrl(productPath(p)),
          priceCurrency: 'RON',
          price: low,
          priceValidUntil: priceValidUntil(),
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller,
          hasMerchantReturnPolicy: returnPolicy,
        }
      : {
          '@type': 'AggregateOffer',
          url: absUrl(productPath(p)),
          priceCurrency: 'RON',
          lowPrice: low,
          highPrice: high,
          offerCount: prices.length,
          priceValidUntil: priceValidUntil(),
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller,
          hasMerchantReturnPolicy: returnPolicy,
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.images.map((img) => absUrl(img)),
    sku: p.slug,
    category: p.categoryLabel,
    brand: { '@type': 'Brand', name: company.brand },
    manufacturer: { '@id': `${SITE}/#organization` },
    offers,
  };
};

/** ItemList JSON-LD pentru pagina /ciubare — îmbunătățește rezultatele rich list. */
export const itemListLd = (products: Product[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: absUrl(productPath(p)),
    name: p.name,
  })),
});

export interface Crumb {
  name: string;
  path: string;
}

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absUrl(c.path),
  })),
});

export const faqLd = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

export const articleLd = (opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: opts.title,
  description: opts.description,
  image: absUrl(opts.image),
  datePublished: opts.date,
  mainEntityOfPage: absUrl(opts.path),
  author: { '@type': 'Organization', name: company.brand },
  publisher: { '@id': `${SITE}/#organization` },
});
