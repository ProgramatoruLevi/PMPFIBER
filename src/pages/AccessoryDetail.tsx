import { Link, useParams } from 'react-router-dom';
import { Check, Phone, MessageCircle, Sparkles, ArrowLeft, BadgeCheck, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ProductGallery from '../components/ProductGallery';
import Reveal from '../components/Reveal';
import CTASection from '../components/CTASection';
import NotFound from './NotFound';
import { getAccessoryBySlug, accessories, accessoryPath } from '../data/accessories';
import { formatLei, offerLink } from '../data/products';
import { company, telLink, whatsappLink } from '../data/company';
import { organizationLd, breadcrumbLd, absUrl } from '../utils/seo';

export default function AccessoryDetail() {
  const { slug = '' } = useParams();
  const acc = getAccessoryBySlug(slug);
  if (!acc) return <NotFound />;

  const path = accessoryPath(acc);
  const others = accessories.filter((a) => a.slug !== acc.slug).slice(0, 3);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: acc.name,
    description: acc.description,
    image: absUrl(acc.images[0]),
    sku: acc.slug,
    category: 'Accesorii ciubăre',
    brand: { '@type': 'Brand', name: company.brand },
    offers: {
      '@type': 'Offer',
      url: absUrl(path),
      priceCurrency: 'RON',
      price: acc.price,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${company.siteUrl}/#organization` },
    },
  };

  return (
    <>
      <SEO
        title={acc.name}
        description={`${acc.description} Accesoriu PMPFiber, ${formatLei(acc.price)}${acc.unit ? ` / ${acc.unit}` : ''}. Cere ofertă sau sună acum.`}
        path={path}
        image={acc.images[0]}
        imageAlt={`${acc.name} — accesoriu ciubăr PMPFiber`}
        type="product"
        priceAmount={acc.price}
        jsonLd={[
          organizationLd(),
          productLd,
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Accesorii', path: '/accesorii' },
            { name: acc.name, path },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Accesoriu"
        title={acc.name}
        crumbs={[
          { name: 'Acasă', path: '/' },
          { name: 'Accesorii', path: '/accesorii' },
          { name: acc.name },
        ]}
      />

      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <ProductGallery images={acc.images} alt={acc.name} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <span className="pill">Accesorii ciubăre</span>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-cream sm:text-4xl">
                {acc.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-sand">
                {acc.longDescription ?? acc.description}
              </p>

              <div className="mt-6">
                <span className="text-xs uppercase tracking-widest text-sand/60">Preț</span>
                <p className="font-display text-4xl font-semibold text-gold-light">
                  {formatLei(acc.price)}
                  {acc.unit && <span className="text-lg text-sand/70"> / {acc.unit}</span>}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2.5 text-sm font-bold">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff5d4d]/40 bg-[#ff5d4d]/10 px-3 py-1.5 text-[#ff6b5b]">
                    <BadgeCheck className="h-4 w-4" />
                    Prețul include TVA
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#34d27f]/40 bg-[#34d27f]/10 px-3 py-1.5 text-[#4ade80]">
                    <ShieldCheck className="h-4 w-4" />
                    Garanție 2 ani
                  </span>
                </div>
              </div>

              {acc.features && acc.features.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {acc.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-cream/85">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-light">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-col gap-3">
                <Link to={offerLink(acc.name)} className="btn-gold w-full text-base py-4">
                  <Sparkles className="h-5 w-5" />
                  Cere ofertă pentru acest accesoriu
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a href={telLink} className="btn-call w-full">
                    <Phone className="h-5 w-5" />
                    Sună acum
                  </a>
                  <a
                    href={whatsappLink(`Bună ziua! Sunt interesat(ă) de accesoriul ${acc.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                </div>
                <p className="text-center text-xs text-sand/60">{company.phoneDisplay}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Alte accesorii */}
      <section className="section bg-ink-900">
        <div className="container-px">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl text-cream sm:text-3xl">Alte accesorii</h2>
            <Link to="/accesorii" className="btn-ghost">
              <ArrowLeft className="h-4 w-4" />
              Toate accesoriile
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((a) => (
              <Link
                key={a.slug}
                to={accessoryPath(a)}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 transition-all hover:-translate-y-1.5 hover:border-gold/40"
              >
                <div className="aspect-square overflow-hidden bg-ink-900">
                  <img
                    src={a.images[0]}
                    alt={a.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-cream">{a.name}</h3>
                  <p className="mt-1 font-display text-lg font-semibold text-gold-light">
                    {formatLei(a.price)}
                    {a.unit && <span className="text-sm text-sand/70"> / {a.unit}</span>}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
