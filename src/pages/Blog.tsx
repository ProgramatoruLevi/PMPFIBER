import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import CTASection from '../components/CTASection';
import { blogPosts } from '../data/blog';
import { organizationLd, breadcrumbLd } from '../utils/seo';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog"
        description="Ghiduri și sfaturi despre ciubăre premium: cum alegi modelul potrivit, aeromasaj vs. hidromasaj și de ce contează izolația. Articole PMPFiber."
        path="/blog"
        jsonLd={[
          organizationLd(),
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Blog"
        title="Ghiduri și sfaturi despre ciubăre"
        subtitle="Articole utile care te ajută să alegi, să configurezi și să te bucuri de ciubărul potrivit."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Blog' }]}
      />

      <section className="section">
        <div className="container-px">
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 shadow-card transition-all hover:-translate-y-1.5 hover:border-gold/40">
                  <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-ink-900">
                    <img
                      src={post.cover}
                      alt={post.title}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs text-sand/70">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-gold" />
                        {fmtDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gold" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-cream">
                      <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-gold-light">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-sand">{post.excerpt}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-light transition-all group-hover:gap-3"
                    >
                      Citește articolul
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
