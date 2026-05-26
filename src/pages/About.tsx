import { Building2, ShieldCheck, Hammer, Leaf, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import { company } from '../data/company';
import { organizationLd, breadcrumbLd } from '../utils/seo';

const values = [
  {
    icon: ShieldCheck,
    title: 'Calitate fără compromis',
    text: 'Folosim fibră de sticlă rezistentă și lemn de calitate, finisate cu atenție la fiecare detaliu.',
  },
  {
    icon: Hammer,
    title: 'Producție proprie',
    text: 'Fabricăm în România și controlăm fiecare etapă, de la cuvă până la finisajul final.',
  },
  {
    icon: Leaf,
    title: 'Gândite pentru natură',
    text: 'Produse care se integrează firesc în curți, cabane și peisaje montane, pentru relaxare autentică.',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="Despre noi"
        description="PMPFIBER SRL este un producător român de ciubăre premium din fibră de sticlă și lemn, cu producție proprie în județul Bistrița-Năsăud."
        path="/despre-noi"
        jsonLd={[
          organizationLd(),
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Despre noi', path: '/despre-noi' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Despre noi"
        title="Ciubăre premium, fabricate cu atenție la detalii"
        subtitle="PMPFIBER este un brand românesc dedicat relaxării autentice. Construim ciubăre din fibră de sticlă și lemn, gândite pentru confort în orice sezon."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Despre noi' }]}
      />

      {/* Poveste + imagine */}
      <section className="section">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src="/images/ciubar1.png"
                alt="Ciubăr PMPFiber din lemn premium"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold/50" />
              Cine suntem
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
              Pasiune pentru relaxare, construită în România
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-sand">
              <p>
                PMPFIBER SRL produce ciubăre premium din fibră de sticlă și lemn,
                în județul Bistrița-Năsăud. Ne-am propus să aducem mai aproape de
                oameni experiența relaxării în apă caldă, în mijlocul naturii.
              </p>
              <p>
                Fiecare produs este construit cu materiale de calitate și echipat
                pentru confort în orice anotimp: corp izolat cu spumă poliuretanică,
                sobă din inox și finisaje rezistente la intemperii.
              </p>
              <p>
                Lucrăm cu clienți privați, cabane, pensiuni și zone wellness și
                configurăm fiecare ciubăr în funcție de spațiul și nevoile lor.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valori */}
      <section className="section bg-ink-900">
        <div className="container-px">
          <SectionHeading eyebrow="Valorile noastre" title="Ce ne ghidează" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-800/50 p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold-light">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-cream">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-sand">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Date firmă */}
      <section className="section">
        <div className="container-px">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-800/40">
              <div className="grid gap-0 md:grid-cols-[1fr_1.4fr]">
                <div className="flex flex-col justify-center border-b border-white/10 bg-gradient-to-br from-gold/10 to-transparent p-8 md:border-b-0 md:border-r">
                  <Building2 className="h-8 w-8 text-gold" />
                  <h2 className="mt-4 font-display text-2xl font-semibold text-cream">
                    Date oficiale
                  </h2>
                  <p className="mt-2 text-sm text-sand">
                    {company.legalName}, firmă românească înființată în {new Date(company.foundedDate).getFullYear()}.
                  </p>
                  <p className="mt-6 flex items-start gap-2 text-sm text-cream/85">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {company.fullAddress}
                  </p>
                </div>
                <dl className="divide-y divide-white/10 p-2">
                  {[
                    ['Denumire', company.legalName],
                    ['CUI', company.cui],
                    ['Nr. Reg. Com.', company.regCom],
                    ['EUID', company.euid],
                    ['Data înființării', new Date(company.foundedDate).toLocaleDateString('ro-RO')],
                    ['Județ', company.county],
                    ['Localitate', company.locality],
                    ['Telefon', company.phoneDisplay],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 px-5 py-4">
                      <dt className="text-sm text-sand">{label}</dt>
                      <dd className="text-right text-sm font-medium text-cream">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
