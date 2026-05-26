// Generează public/sitemap.xml + public/robots.txt din rutele site-ului.
// Rulează cu: node scripts/generate-sitemap.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://www.pmpfiber.ro';
const today = new Date().toISOString().slice(0, 10);

// Slug-urile produselor (ținute sincron cu src/data/products.ts)
const ciubareSlugs = [
  'pmpfiber-base-200',
  'pmpfiber-comfort-200',
  'pmpfiber-luxury-200',
  'pmpfiber-family-225-base',
  'pmpfiber-family-225-comfort',
  'pmpfiber-family-225-luxury',
  'pmpfiber-premium-225-base',
  'pmpfiber-premium-225-comfort',
  'pmpfiber-premium-225-luxury',
  'pmpfiber-square-spa-base',
  'pmpfiber-square-spa-comfort',
  'pmpfiber-square-spa-luxury',
  'pmpfiber-incastrabil',
  'pmpfiber-icetube',
];
const blogSlugs = [
  'cum-alegi-un-ciubar-potrivit',
  'aeromasaj-sau-hidromasaj',
  'de-ce-conteaza-izolatia',
];

const routes = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/ciubare', priority: '0.9', freq: 'weekly' },
  ...ciubareSlugs.map((s) => ({ path: `/ciubare/${s}`, priority: '0.8', freq: 'monthly' })),
  { path: '/cuve-fibra-de-sticla', priority: '0.8', freq: 'monthly' },
  { path: '/accesorii', priority: '0.7', freq: 'monthly' },
  { path: '/despre-noi', priority: '0.6', freq: 'monthly' },
  { path: '/contact', priority: '0.7', freq: 'monthly' },
  { path: '/blog', priority: '0.6', freq: 'weekly' },
  ...blogSlugs.map((s) => ({ path: `/blog/${s}`, priority: '0.6', freq: 'monthly' })),
];

const urls = routes
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.freq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;

const pub = resolve(__dirname, '..', 'public');
writeFileSync(resolve(pub, 'sitemap.xml'), sitemap);
writeFileSync(resolve(pub, 'robots.txt'), robots);
console.log(`✓ sitemap.xml (${routes.length} URL-uri) și robots.txt generate în /public`);
