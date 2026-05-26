import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { company, telLink, whatsappLink } from '../data/company';

interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function CTASection({
  eyebrow = 'Hai să configurăm împreună',
  title = 'Vrei un ciubăr configurat pentru spațiul tău?',
  subtitle = 'Spune-ne câte persoane îl vor folosi și unde vrei să îl montezi. Îți recomandăm modelul potrivit și îți pregătim o ofertă clară.',
}: Props) {
  return (
    <section className="section">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-ink-800 px-6 py-14 text-center sm:px-12 lg:py-20">
            {/* Glow decor */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold/50" />
                {eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
                {subtitle}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={telLink} className="btn-call text-base px-7 py-4">
                  <Phone className="h-5 w-5" />
                  Sună acum · {company.phoneDisplay}
                </a>
                <Link to="/contact" className="btn-gold">
                  Solicită ofertă
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink('Bună ziua! Aș dori o ofertă pentru un ciubăr PMPFiber.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
