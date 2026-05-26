import { Link, useParams } from 'react-router-dom';
import { CalendarDays, Clock, ArrowLeft, Check } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import CTASection from '../components/CTASection';
import NotFound from './NotFound';
import { getPostBySlug } from '../data/blog';
import { organizationLd, articleLd, breadcrumbLd } from '../utils/seo';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });

export default function BlogPost() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return <NotFound />;

  const path = `/blog/${post.slug}`;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={path}
        image={post.cover}
        type="article"
        jsonLd={[
          organizationLd(),
          articleLd({
            title: post.title,
            description: post.excerpt,
            path,
            image: post.cover,
            date: post.date,
          }),
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Blog"
        title={post.title}
        crumbs={[
          { name: 'Acasă', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title },
        ]}
      >
        <div className="flex items-center gap-5 text-sm text-sand/80">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-gold" />
            {fmtDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gold" />
            {post.readingTime} de citit
          </span>
        </div>
      </PageHeader>

      <article className="section">
        <div className="container-px mx-auto max-w-3xl">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src={post.cover}
                alt={post.title}
                className="aspect-[16/9] w-full object-cover"
                loading="eager"
              />
            </div>
          </Reveal>

          <div className="mt-10 space-y-8">
            {post.sections.map((section, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <section>
                  {section.heading && (
                    <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  <div className={section.heading ? 'mt-4 space-y-4' : 'space-y-4'}>
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed text-sand">
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-cream/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <Link to="/blog" className="btn-ghost">
              <ArrowLeft className="h-4 w-4" />
              Înapoi la blog
            </Link>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
