import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import { company } from '../../data/company';

export default function Privacy() {
  return (
    <>
      <SEO
        title="Politică de Confidențialitate | GDPR"
        description="Politica de confidențialitate PMPFIBER SRL — date colectate, scop, temei legal, drepturile utilizatorului conform GDPR."
        path="/confidentialitate"
        noindex
      />
      <PageHeader
        eyebrow="Legal"
        title="Politică de confidențialitate"
        subtitle="Cum prelucrăm datele tale personale conform GDPR (Regulamentul UE 2016/679)."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Confidențialitate' }]}
      />

      <section className="section">
        <div className="container-px mx-auto max-w-3xl space-y-10 text-sand">
          <Section title="1. Operatorul de date">
            <p>
              Operatorul datelor cu caracter personal este <strong className="text-cream">{company.legalName}</strong>,
              cu sediul în {company.fullAddress}, CUI {company.cui}, Nr. Reg. Comerțului {company.regCom},
              EUID {company.euid}.
            </p>
            <p>
              Contact: <a href={`tel:${company.phoneRaw}`} className="text-gold-light hover:text-gold">{company.phoneDisplay}</a>
            </p>
          </Section>

          <Section title="2. Datele personale colectate">
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="text-cream">Date din formularul de contact:</strong> nume, telefon, e-mail, model dorit, mesaj.</li>
              <li><strong className="text-cream">Date tehnice de navigare:</strong> adresă IP, tip browser, sistem de operare, pagini vizitate — colectate <em>doar dacă ai acceptat cookie-urile analitice</em>.</li>
              <li><strong className="text-cream">Preferințe cookie:</strong> stocate local în browserul tău (localStorage).</li>
            </ul>
          </Section>

          <Section title="3. Scopul prelucrării">
            <ul className="list-disc space-y-2 pl-6">
              <li>Răspuns la solicitări și pregătirea ofertelor pentru ciubăre PMPFiber.</li>
              <li>Comunicare cu clienții pe parcursul tranzacției.</li>
              <li>Statistici anonime pentru îmbunătățirea site-ului (Google Analytics).</li>
              <li>Îndeplinirea obligațiilor legale (documente fiscale).</li>
            </ul>
          </Section>

          <Section title="4. Temei legal (GDPR Art. 6)">
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="text-cream">Consimțământ</strong> (Art. 6.1.a) — cookie-uri analitice și marketing.</li>
              <li><strong className="text-cream">Executarea unui contract</strong> (Art. 6.1.b) — procesarea solicitărilor și ofertelor.</li>
              <li><strong className="text-cream">Interes legitim</strong> (Art. 6.1.f) — securitatea site-ului, prevenirea abuzurilor.</li>
              <li><strong className="text-cream">Obligație legală</strong> (Art. 6.1.c) — documente fiscale și contabile.</li>
            </ul>
          </Section>

          <Section title="5. Cookie-uri utilizate" id="cookies">
            <p>
              Detalii complete pe pagina dedicată: <Link to="/cookie" className="text-gold-light hover:text-gold underline">Politică de cookie-uri</Link>. Pe scurt:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="text-cream">Necesare:</strong> <code className="text-xs">pmpfiber_cookie_prefs</code> (localStorage, nelimitat) — păstrează preferințele tale de consimțământ.</li>
              <li><strong className="text-cream">Analitice (opțional):</strong> Google Analytics — <code className="text-xs">_ga</code> (2 ani), <code className="text-xs">_gid</code> (24h), <code className="text-xs">_ga_*</code> (2 ani). Se încarcă <em>doar</em> după accept.</li>
              <li><strong className="text-cream">Marketing (opțional):</strong> Google Ads — pentru remarketing și măsurarea conversiilor.</li>
            </ul>
            <p>
              Îți poți schimba alegerea oricând din <Link to="/setari-cookie" className="text-gold-light hover:text-gold underline">Setări cookie</Link>.
            </p>
          </Section>

          <Section title="6. Durata stocării">
            <ul className="list-disc space-y-2 pl-6">
              <li>Date din formulare: maximum 3 ani de la ultima interacțiune.</li>
              <li>Documente fiscale: 10 ani (conform legislației în vigoare).</li>
              <li>Date analitice Google: maximum 26 luni.</li>
            </ul>
          </Section>

          <Section title="7. Drepturile tale">
            <p>Conform GDPR ai următoarele drepturi:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Acces la datele personale</li>
              <li>Rectificare (corectare) a datelor inexacte</li>
              <li>Ștergere („dreptul de a fi uitat")</li>
              <li>Restricționarea prelucrării</li>
              <li>Portabilitatea datelor</li>
              <li>Opoziție la prelucrare</li>
              <li>Retragerea consimțământului în orice moment</li>
              <li>Plângere la <strong className="text-cream">ANSPDCP</strong></li>
            </ul>
            <p className="mt-3 rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm">
              <strong className="text-cream">Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal</strong><br />
              B-dul G-ral Gheorghe Magheru nr. 28-30, Sector 1, București<br />
              Site: <a href="https://www.dataprotection.ro" target="_blank" rel="noreferrer" className="text-gold-light hover:text-gold underline">www.dataprotection.ro</a>
            </p>
          </Section>

          <Section title="8. Transfer date către terți">
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="text-cream">Google LLC</strong> (Analytics, Ads) — sub EU-US Data Privacy Framework. Doar cu consimțământ.</li>
              <li><strong className="text-cream">Furnizori de găzduire</strong> — pentru funcționarea site-ului.</li>
              <li>Nu vindem și nu închiriem date personale către terți.</li>
            </ul>
          </Section>

          <Section title="9. Securitatea datelor">
            <ul className="list-disc space-y-2 pl-6">
              <li>HTTPS/TLS obligatoriu pentru toate paginile.</li>
              <li>Validare strictă a formularelor + protecție anti-spam (honeypot).</li>
              <li>Acces restricționat la date — doar personalul autorizat.</li>
              <li>Fonturi servite local (zero transfer IP către Google Fonts).</li>
              <li>Niciun script de tracking nu se încarcă fără consimțământ explicit.</li>
            </ul>
          </Section>

          <Section title="10. Contact">
            <p>
              Pentru orice solicitare privind datele tale personale, ne poți contacta:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Telefon: <a href={`tel:${company.phoneRaw}`} className="text-gold-light hover:text-gold">{company.phoneDisplay}</a></li>
              <li>Adresă: {company.fullAddress}</li>
            </ul>
          </Section>

          <p className="text-xs text-sand/60">Ultima actualizare: 28 mai 2026</p>
        </div>
      </section>
    </>
  );
}

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="font-display text-2xl font-semibold text-cream">{title}</h2>
      <div className="space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
