// Single source of truth for company / brand data.
// Modifică aici datele firmei și acestea se actualizează în tot site-ul.

export const company = {
  brand: 'PMPFIBER',
  legalName: 'PMPFIBER SRL',
  tagline: 'Ciubăre premium din fibră de sticlă și lemn',
  description:
    'Producător român de ciubăre premium din fibră de sticlă și lemn. Modele pentru 4–10 persoane, sobă din inox inclusă, izolație cu spumă poliuretanică și livrare în toată România.',

  // Contact
  phoneDisplay: '+40 741 358 786',
  phoneRaw: '+40741358786',
  whatsapp: '40741358786',
  email: '', // momentan indisponibil

  // Date juridice
  cui: '48756689',
  regCom: 'J06/830/2023',
  euid: 'ROONRC.J6/830/2023',
  foundedDate: '2023-09-08',

  // Adresă
  county: 'Bistrița-Năsăud',
  locality: 'Loc. Unirea',
  address: '66 A',
  postalCode: '420005',
  fullAddress: 'Loc. Unirea, nr. 66 A, jud. Bistrița-Năsăud, cod 420005',

  // Web
  siteUrl: 'https://www.pmpfiber.ro',

  // Program
  schedule: 'Luni – Vineri: 08:00 – 18:00 · Sâmbătă: 09:00 – 14:00',
} as const;

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${company.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

export const telLink = `tel:${company.phoneRaw}`;

export const navLinks = [
  { label: 'Acasă', to: '/' },
  { label: 'Ciubăre', to: '/ciubare' },
  { label: 'Cuve fibră de sticlă', to: '/cuve-fibra-de-sticla' },
  { label: 'Încastrabile', to: '/ciubare/pmpfiber-incastrabil' },
  { label: 'Accesorii', to: '/accesorii' },
  { label: 'Despre noi', to: '/despre-noi' },
  { label: 'Contact', to: '/contact' },
] as const;
