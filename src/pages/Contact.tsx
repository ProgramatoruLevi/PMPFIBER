import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Building2,
  CheckCircle2,
  Send,
} from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { company, telLink, whatsappLink } from '../data/company';
import { products } from '../data/products';
import { trackOfferRequest } from '../utils/analytics';
import { organizationLd, breadcrumbLd } from '../utils/seo';

interface FormState {
  name: string;
  phone: string;
  email: string;
  model: string;
  message: string;
}

interface Errors {
  name?: string;
  phone?: string;
  email?: string;
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  model: '',
  message: '',
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);

  // Preselectează modelul + mesajul din query params (?model=...&config=...)
  useEffect(() => {
    const model = searchParams.get('model') ?? '';
    const config = searchParams.get('config') ?? '';
    setForm((prev) => ({
      ...prev,
      model,
      message: config
        ? `Configurația mea:\n${config}`
        : model
          ? `Aș dori o ofertă pentru ${model}.`
          : prev.message,
    }));
  }, [searchParams]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Introdu numele complet.';
    if (!/^[0-9+\s().-]{6,}$/.test(form.phone.trim()))
      e.phone = 'Introdu un număr de telefon valid.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = 'Adresa de email nu este validă.';
    setErrors(e);
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    const firstError = (['name', 'phone', 'email'] as const).find((k) => e[k]);
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }
    setSending(true);
    setSendError(false);
    try {
      // Trimite la endpoint-ul PHP de pe hosting (contact@pmpfiber.ro).
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot.current?.value ?? '' }),
      });
      const data = (await res.json().catch(() => ({ ok: res.ok }))) as { ok?: boolean };
      if (res.ok && data.ok) {
        setSubmitted(true);
        trackOfferRequest(form.model || undefined);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const update =
    (field: keyof FormState) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: ev.target.value }));

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-ink-950/50 px-4 py-3 text-sm text-cream placeholder:text-sand/70 transition focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40 aria-[invalid=true]:border-red-400/70';

  return (
    <>
      <SEO
        title="Contact"
        description="Contactează PMPFIBER pentru o ofertă personalizată de ciubăr. Sună la +40 741 358 786 sau completează formularul. Producător român de ciubăre premium."
        path="/contact"
        jsonLd={[
          organizationLd(),
          breadcrumbLd([
            { name: 'Acasă', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Contact"
        title="Hai să configurăm ciubărul tău"
        subtitle="Sună-ne pentru cel mai rapid răspuns sau completează formularul și revenim cu o ofertă personalizată."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Contact' }]}
      />

      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
          {/* Formular */}
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-ink-800/40 p-6 sm:p-8">
              <h2 className="font-display text-2xl text-cream">Trimite o cerere</h2>
              <p className="mt-2 text-sm text-sand">
                Completează datele și îți răspundem cât mai repede.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 rounded-2xl border border-[#34d27f]/40 bg-[#34d27f]/10 p-8 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-12 w-12 text-[#37d07f]" />
                    <h3 className="mt-4 font-display text-xl text-cream">
                      Cererea ta a fost înregistrată
                    </h3>
                    <p className="mt-2 text-sm text-sand">
                      Îți mulțumim, {form.name.split(' ')[0] || 'mulțumim'}! Revenim
                      cu o ofertă în cel mai scurt timp. Pentru un răspuns imediat,
                      ne poți suna oricând.
                    </p>
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                      <a href={telLink} className="btn-call">
                        <Phone className="h-4 w-4" /> Sună acum
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setForm(initialForm);
                        }}
                        className="btn-outline"
                      >
                        Trimite altă cerere
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-7 space-y-5"
                    initial={{ opacity: 1 }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm text-cream/90">
                          Nume *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={update('name')}
                          className={inputCls}
                          placeholder="Numele tău"
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" role="alert" className="mt-1 text-xs text-red-300">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm text-cream/90">
                          Telefon *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={update('phone')}
                          className={inputCls}
                          placeholder="07xx xxx xxx"
                          autoComplete="tel"
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" role="alert" className="mt-1 text-xs text-red-300">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm text-cream/90">
                        Email (opțional)
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        className={inputCls}
                        placeholder="email@exemplu.ro"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1 text-xs text-red-300">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="model" className="mb-1.5 block text-sm text-cream/90">
                        Model dorit
                      </label>
                      <select id="model" value={form.model} onChange={update('model')} className={inputCls}>
                        <option value="">Alege un model (opțional)</option>
                        {products.map((p) => (
                          <option key={p.slug} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm text-cream/90">
                        Mesaj
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={update('message')}
                        rows={5}
                        className={`${inputCls} resize-none`}
                        placeholder="Spune-ne câte persoane vor folosi ciubărul și unde vrei să îl montezi."
                      />
                    </div>

                    {/* Honeypot anti-spam (ascuns vizual; boții îl completează) */}
                    <input
                      ref={honeypot}
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    />

                    {sendError && (
                      <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                        Nu am putut trimite cererea. Te rugăm încearcă din nou sau sună-ne la{' '}
                        <a href={telLink} className="font-semibold underline">{company.phoneDisplay}</a>.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-gold w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Send className="h-4 w-4" />
                      {sending ? 'Se trimite…' : 'Trimite cererea'}
                    </button>
                    <p className="text-center text-xs text-sand/80">
                      Sau sună direct la{' '}
                      <a href={telLink} className="text-gold-light underline-offset-2 hover:underline">
                        {company.phoneDisplay}
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Date contact + CTA */}
          <Reveal delay={0.1}>
            <div className="space-y-6">
              {/* CTA telefonic */}
              <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-ink-700 to-ink-900 p-7">
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />
                <p className="text-xs uppercase tracking-widest text-gold-light">Cel mai rapid răspuns</p>
                <a href={telLink} className="mt-2 block font-display text-3xl font-bold text-cream hover:text-gold-light">
                  {company.phoneDisplay}
                </a>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a href={telLink} className="btn-call flex-1">
                    <Phone className="h-5 w-5" /> Sună acum
                  </a>
                  <a
                    href={whatsappLink('Bună ziua! Aș dori o ofertă pentru un ciubăr PMPFiber.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex-1"
                  >
                    <MessageCircle className="h-5 w-5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Detalii */}
              <div className="rounded-3xl border border-white/10 bg-ink-800/40 p-7">
                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-medium text-cream">Adresă</p>
                      <p className="text-sand">{company.fullAddress}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-medium text-cream">Program</p>
                      <p className="text-sand">{company.schedule}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-medium text-cream">{company.legalName}</p>
                      <p className="text-sand">
                        CUI {company.cui} · {company.regCom}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hartă placeholder (fără API extern) */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
                <div className="bg-noise absolute inset-0 opacity-50" />
                <div
                  className="relative grid h-56 place-items-center bg-[radial-gradient(circle_at_30%_30%,rgba(180,138,74,0.18),transparent_60%)]"
                  aria-label="Locație orientativă PMPFIBER"
                >
                  <div className="text-center">
                    <MapPin className="mx-auto h-10 w-10 text-gold" />
                    <p className="mt-3 font-display text-lg text-cream">{company.locality}</p>
                    <p className="text-sm text-sand">{company.county}, România</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
