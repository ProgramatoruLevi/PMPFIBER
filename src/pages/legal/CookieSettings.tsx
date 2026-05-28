import { useEffect, useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { ClientOnly } from 'vite-react-ssg';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import { getCookiePreferences, saveCookiePreferences } from '../../utils/cookies';
import { enableAnalytics, disableAnalytics } from '../../utils/analytics';

function CookieSettingsInner() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefs = getCookiePreferences();
    if (prefs) {
      setAnalytics(prefs.analytics);
      setMarketing(prefs.marketing);
    }
  }, []);

  const handleSave = () => {
    saveCookiePreferences({ analytics, marketing });
    if (analytics) enableAnalytics();
    else disableAnalytics();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-4">
      <Toggle
        label="Necesare"
        description="Necesare pentru funcționarea site-ului. Includ preferințele tale de cookie."
        checked
        disabled
      />
      <Toggle
        label="Analitice"
        description="Google Analytics — ne ajută să îmbunătățim experiența. Date anonimizate."
        checked={analytics}
        onChange={setAnalytics}
      />
      <Toggle
        label="Marketing"
        description="Google Ads — pentru personalizare și măsurarea conversiilor."
        checked={marketing}
        onChange={setMarketing}
      />

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" onClick={handleSave} className="btn-gold px-6 py-3">
          Salvează preferințele
        </button>
        {saved && (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#4ade80]">
            <Check className="h-4 w-4" />
            Preferințele au fost salvate.
          </span>
        )}
      </div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}

function Toggle({ label, description, checked, disabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-ink-800/60 p-5">
      <div className="flex-1">
        <h3 className="flex items-center gap-2 font-semibold text-cream">
          {label}
          {disabled && <Lock className="h-3.5 w-3.5 text-sand/80" />}
        </h3>
        <p className="mt-1 text-sm text-sand">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-gold-gradient' : 'bg-white/15'
        } ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-cream shadow transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export default function CookieSettings() {
  return (
    <>
      <SEO
        title="Setări cookie"
        description="Controlează preferințele tale privind cookie-urile folosite pe site-ul PMPFIBER."
        path="/setari-cookie"
        noindex
      />
      <PageHeader
        eyebrow="Legal"
        title="Setări cookie"
        subtitle="Controlează preferințele tale de confidențialitate. Modificările se aplică imediat."
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Setări cookie' }]}
      />
      <section className="section">
        <div className="container-px mx-auto max-w-2xl">
          <ClientOnly>{() => <CookieSettingsInner />}</ClientOnly>
        </div>
      </section>
    </>
  );
}
