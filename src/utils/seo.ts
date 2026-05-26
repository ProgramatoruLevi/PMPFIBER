// Helperi SEO: construiesc obiectele JSON-LD și meta-urile de bază.
import { company } from '../data/company';
import type { Product } from '../data/products';
import { getFromPrice, productPath } from '../data/products';
import type { FaqItem } from '../data/faq';

export const SITE = company.siteUrl;
export const DEFAULT_OG_IMAGE = `${SITE}/images/imagine_background_hero.png`;

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
  logo: `${SITE}/images/logo_PMP_FIBER.png`,
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
  areaServed: { '@type': 'Country', name: 'România' },
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

export const productLd = (p: Product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: p.name,
  description: p.description,
  image: absUrl(p.images[0]),
  sku: p.slug,
  category: p.categoryLabel,
  brand: { '@type': 'Brand', name: company.brand },
  offers: {
    '@type': 'Offer',
    url: absUrl(productPath(p)),
    priceCurrency: 'RON',
    price: getFromPrice(p),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@id': `${SITE}/#organization` },
  },
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
