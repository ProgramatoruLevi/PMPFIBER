import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';

export default function Cookies() {
  return (
    <>
      <SEO
        title="Politică de Cookie-uri"
        description="Politica detaliată privind cookie-urile folosite pe site-ul PMPFIBER — necesare, analitice și marketing."
        path="/cookie"
        noindex
      />
      <PageHeader
        eyebrow="Legal"
        title="Politică de cookie-uri"
        subtitle="Ce cookie-uri folosim, cu ce scop și cum îți controlezi preferințele."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Cookie' }]}
      />

      <section className="section">
        <div className="container-px mx-auto max-w-3xl space-y-10 text-sand">
          <S title="1. Ce sunt cookie-urile?">
            <p>
              Cookie-urile sunt fișiere text mici, salvate de site în browserul tău. Sunt folosite
              pentru a face site-ul să funcționeze corect, pentru a memora preferințele tale și,
              opțional, pentru a genera statistici anonime de utilizare.
            </p>
          </S>

          <S title="2. Tipuri de cookie-uri folosite">
            <h3 className="mt-4 text-lg font-semibold text-cream">2.1 Cookie-uri strict necesare</h3>
            <p className="text-sm">Necesare pentru funcționarea de bază a site-ului. Nu pot fi dezactivate.</p>
            <Table
              rows={[
                ['pmpfiber_cookie_prefs', 'Preferințele tale de consimțământ', 'Nelimitată (localStorage)'],
              ]}
            />

            <h3 className="mt-6 text-lg font-semibold text-cream">2.2 Cookie-uri analitice <span className="text-xs text-sand/80">(opțional, doar cu acord)</span></h3>
            <p className="text-sm">Ne ajută să înțelegem cum este folosit site-ul. Datele sunt agregate și anonimizate.</p>
            <Table
              rows={[
                ['_ga', 'Google Analytics — utilizator anonim', '2 ani'],
                ['_gid', 'Google Analytics — sesiune navigare', '24 ore'],
                ['_ga_*', 'Google Analytics GA4 — stare sesiune', '2 ani'],
              ]}
            />

            <h3 className="mt-6 text-lg font-semibold text-cream">2.3 Cookie-uri marketing <span className="text-xs text-sand/80">(opțional, doar cu acord)</span></h3>
            <p className="text-sm">Pentru remarketing și măsurarea conversiilor din campanii.</p>
            <Table
              rows={[['Google Ads', 'Conversii și remarketing', 'Variabilă']]}
            />
          </S>

          <S title="3. Cum controlezi cookie-urile">
            <ul className="list-disc space-y-2 pl-6">
              <li>Bannerul de consimțământ — apare la prima vizită.</li>
              <li>Pagina <Link to="/setari-cookie" className="text-gold-light hover:text-gold underline">Setări cookie</Link> — schimbi alegerea oricând.</li>
              <li>Setările browserului — poți șterge cookie-urile direct din browser.</li>
            </ul>
            <p className="mt-3 rounded-xl border border-gold/20 bg-gold/5 p-4 text-sm text-cream/90">
              Dacă alegi „Doar necesare", <strong>niciun tracker nu se încarcă</strong> — nici Google Analytics,
              nici Google Ads, niciun alt script terț.
            </p>
          </S>

          <S title="4. Fonturi și imagini locale">
            <p>
              Site-ul nostru servește fonturile (Playfair Display, Plus Jakarta Sans) și toate imaginile
              <strong className="text-cream"> de pe propriul server</strong> — zero requesturi către
              Google Fonts, Google CDN sau alte servere externe înainte de consimțământ.
            </p>
          </S>

          <S title="5. Contact">
            <p>
              Detalii despre prelucrarea datelor și drepturile tale găsești în{' '}
              <Link to="/confidentialitate" className="text-gold-light hover:text-gold underline">
                Politica de confidențialitate
              </Link>.
            </p>
          </S>

          <p className="text-xs text-sand/80">Ultima actualizare: 28 mai 2026</p>
        </div>
      </section>
    </>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-2xl font-semibold text-cream">{title}</h2>
      <div className="space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}

function Table({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-ink-800/60 text-xs uppercase tracking-wide text-sand/70">
          <tr>
            <th className="px-4 py-3">Denumire</th>
            <th className="px-4 py-3">Scop</th>
            <th className="px-4 py-3">Durată</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/5">
              <td className="px-4 py-3 font-mono text-xs text-cream">{r[0]}</td>
              <td className="px-4 py-3 text-sand">{r[1]}</td>
              <td className="px-4 py-3 text-sand/80">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
