import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Pagină negăsită"
        description="Pagina căutată nu există. Descoperă gama de ciubăre premium PMPFiber."
        path="/404"
        noindex
      />
      <section className="flex min-h-[80svh] items-center pt-20">
        <div className="container-px text-center">
          <span className="font-display text-[7rem] font-bold leading-none text-gold-gradient sm:text-[10rem]">
            404
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-cream sm:text-4xl">
            Pagina nu a fost găsită
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-sand">
            Se pare că pagina căutată nu există sau a fost mutată. Hai să te
            întoarcem la relaxare.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-gold">
              <Home className="h-4 w-4" />
              Mergi la pagina principală
            </Link>
            <Link to="/ciubare" className="btn-outline">
              Vezi modelele
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
