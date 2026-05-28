import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import { company } from '../../data/company';

export default function Terms() {
  return (
    <>
      <SEO
        title="Termeni și Condiții"
        description="Termenii și condițiile de utilizare a site-ului PMPFIBER și de cumpărare a ciubărelor PMPFiber."
        path="/termeni"
        noindex
      />
      <PageHeader
        eyebrow="Legal"
        title="Termeni și condiții"
        subtitle="Condițiile de utilizare a site-ului și relația comercială cu PMPFIBER SRL."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Termeni' }]}
      />

      <section className="section">
        <div className="container-px mx-auto max-w-3xl space-y-10 text-sand">
          <S title="1. Informații generale">
            <p>
              Site-ul <strong className="text-cream">{company.siteUrl}</strong> este operat de
              <strong className="text-cream"> {company.legalName}</strong>, cu sediul în {company.fullAddress}.
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>CUI: {company.cui}</li>
              <li>Nr. Reg. Comerțului: {company.regCom}</li>
              <li>EUID: {company.euid}</li>
              <li>Data înființării: {company.foundedDate}</li>
              <li>Telefon: <a href={`tel:${company.phoneRaw}`} className="text-gold-light hover:text-gold">{company.phoneDisplay}</a></li>
            </ul>
          </S>

          <S title="2. Definiții">
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="text-cream">Site</strong> — pagina web {company.siteUrl}.</li>
              <li><strong className="text-cream">Utilizator</strong> — orice persoană care accesează Site-ul.</li>
              <li><strong className="text-cream">Vânzător / Prestator</strong> — {company.legalName}.</li>
              <li><strong className="text-cream">Produse</strong> — ciubărele PMPFiber, accesoriile și serviciile asociate.</li>
            </ul>
          </S>

          <S title="3. Informații despre produse și servicii">
            <p>
              Toate informațiile despre produsele și serviciile prezentate pe Site au caracter
              informativ. Prețurile sunt exprimate în LEI (RON) și <strong className="text-cream">includ TVA</strong>.
              Toate produsele PMPFiber beneficiază de <strong className="text-cream">garanție 2 ani</strong>.
            </p>
            <p>
              Vânzătorul își rezervă dreptul de a modifica prețurile și disponibilitatea produselor
              fără notificare prealabilă. Disponibilitatea finală și prețul exact pentru configurația
              dorită se confirmă la cerere.
            </p>
          </S>

          <S title="4. Solicitarea de ofertă">
            <p>
              Trimiterea formularului de contact sau a unei solicitări de ofertă <strong className="text-cream">nu
              reprezintă o comandă fermă</strong>. Contractul de vânzare se încheie doar după
              confirmarea scrisă a Vânzătorului și semnarea documentelor aferente.
            </p>
          </S>

          <S title="5. Garanție">
            <p>
              Produsele PMPFiber sunt acoperite de garanția legală conform OG 21/1992 și Legii
              449/2003, plus garanția extinsă de 2 ani oferită de producător pentru toate ciubărele.
              Detalii despre condițiile de garanție se comunică la livrare.
            </p>
          </S>

          <S title="6. Proprietate intelectuală">
            <p>
              Întregul conținut al Site-ului — texte, imagini, logo-uri, design — este proprietatea
              {company.legalName} sau a partenerilor săi și este protejat de legislația privind
              drepturile de autor și proprietatea intelectuală. Copierea, reproducerea sau utilizarea
              fără acord scris sunt interzise.
            </p>
          </S>

          <S title="7. Limitarea răspunderii">
            <ul className="list-disc space-y-2 pl-6">
              <li>Vânzătorul nu răspunde pentru erori de redactare evidente.</li>
              <li>Disponibilitatea Site-ului este asigurată în limitele rezonabile; pot exista întreruperi de mentenanță.</li>
              <li>Vânzătorul nu răspunde pentru conținutul linkurilor externe.</li>
            </ul>
          </S>

          <S title="8. Soluționarea litigiilor (ANPC)">
            <p>Orice litigiu se va soluționa amiabil. În caz contrar, ai următoarele opțiuni:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noreferrer" className="text-gold-light hover:text-gold underline">
                  ANPC — Soluționarea Alternativă a Litigiilor (SAL)
                </a>
              </li>
              <li>
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="text-gold-light hover:text-gold underline">
                  ANPC — Soluționarea Online a Litigiilor (SOL) / Platforma ODR — Uniunea Europeană
                </a>
              </li>
              <li>Instanțele de judecată competente din România.</li>
            </ul>
          </S>

          <S title="9. Modificarea termenilor">
            <p>
              Vânzătorul își rezervă dreptul de a modifica acești termeni în orice moment.
              Versiunea actualizată este disponibilă pe această pagină.
            </p>
          </S>

          <S title="10. Contact">
            <p>
              Pentru întrebări legate de acești termeni:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Telefon: <a href={`tel:${company.phoneRaw}`} className="text-gold-light hover:text-gold">{company.phoneDisplay}</a></li>
              <li>Adresă: {company.fullAddress}</li>
            </ul>
          </S>

          <p className="text-xs text-sand/60">Ultima actualizare: 28 mai 2026</p>
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
