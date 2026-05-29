// ============================================================================
//  PRODUSE PMPFIBER
//  Aici modifici TOATE produsele site-ului: nume, descriere, dotări, prețuri,
//  imagini. Imaginile sunt servite din /public/images (referite prin path
//  absolut, ex: "/images/ciubar1.webp"). Pentru a schimba o imagine, înlocuiește
//  fișierul din /public/images sau modifică array-ul `images` al produsului.
// ============================================================================

export type ProductCategory =
  | 'rotund-200'
  | 'rotund-225'
  | 'patrat'
  | 'incastrabil'
  | 'icetube'
  | 'cuve';

export type ProductTier = 'Base' | 'Comfort' | 'Luxury';

export interface PriceVariant {
  label: string;
  price: number;
}

export interface PriceLine {
  label: string;
  price: number;
}

export interface CuvaVariant {
  name: string;
  diameter?: string;
  height?: string;
  capacity?: string;
  price: number;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  tier?: ProductTier;
  shape?: 'rotund' | 'patrat';
  diameter?: string;
  size?: '200' | '225';
  capacity?: string;
  description: string;
  longDescription?: string;
  images: string[];
  features: string[];
  prices: PriceVariant[];
  optionals?: PriceLine[];
  components?: PriceLine[];
  variants?: CuvaVariant[];
  benefits?: string[];
  recommendedFor?: string[];
  availableFor?: string[];
  badges: string[];
  tags: string[];
  popular?: boolean;
  /** Rută dedicată în afara /ciubare (ex. cuvele). */
  routeOverride?: string;
}

const IMG = (n: string) => `/images/${n}`;

/** Galerie multi-imagine dintr-un subfolder (ex. `/images/base-200/img-1..N.webp`). */
const GALLERY = (folder: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `/images/${folder}/img-${i + 1}.webp`);

export const products: Product[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-base-200',
    name: 'PMPFiber Base 200',
    category: 'rotund-200',
    categoryLabel: 'Ciubăr rotund 200 cm',
    tier: 'Base',
    shape: 'rotund',
    diameter: '200 cm',
    size: '200',
    capacity: '4–6 persoane',
    description: 'Model simplu, ideal pentru relaxare tradițională.',
    longDescription:
      'PMPFiber Base 200 este alegerea echilibrată pentru cei care își doresc experiența autentică a unui ciubăr cu apă caldă, fără dotări suplimentare. Corpul din fibră de sticlă izolat cu spumă poliuretanică păstrează temperatura, iar soba din inox încălzește apa eficient.',
    images: [IMG('ciubar1.webp'), ...GALLERY('base-200', 3)],
    features: [
      'Diametru ciubăr: 200 cm',
      'Variantă clasică, fără dotări suplimentare',
      'Ideal pentru relaxare tradițională',
      'Corp izolat cu spumă poliuretanică',
      'Sobă exterioară din inox',
      'Burlan inox 2 m + pălărie',
      'Scăriță de acces',
      'Scurgere cu evacuare prin sobă',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 9000 },
      { label: 'Cu capac termoizolant', price: 9500 },
    ],
    recommendedFor: ['Case private', 'Curți și terase', 'Cabane'],
    badges: ['Base', '200 cm', '4–6 pers.', 'Sobă inox inclusă'],
    tags: ['200', 'rotund', 'base'],
    popular: true,
  },

  // 2 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-comfort-200',
    name: 'PMPFiber Comfort 200',
    category: 'rotund-200',
    categoryLabel: 'Ciubăr rotund 200 cm',
    tier: 'Comfort',
    shape: 'rotund',
    diameter: '200 cm',
    size: '200',
    capacity: '4–6 persoane',
    description: 'Confort și relaxare, cu sistem de aeromasaj sau hidromasaj.',
    longDescription:
      'PMPFiber Comfort 200 adaugă confortului tradițional un plus de relaxare prin sistemul de masaj și iluminarea LED multicolor. Panoul electric cu siguranță face utilizarea simplă și sigură pe tot parcursul anului.',
    images: [IMG('ciubar2.webp'), ...GALLERY('comfort-200', 5)],
    features: [
      'Diametru ciubăr: 200 cm',
      'Sistem aeromasaj sau hidromasaj',
      'Bec LED multicolor',
      'Panou electric cu siguranță',
      'Corp izolat cu spumă poliuretanică',
      'Sobă exterioară din inox',
      'Burlan inox 2 m + pălărie',
      'Scăriță de acces',
      'Scurgere cu evacuare prin sobă',
      'Experiență modernă și relaxantă',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 11500 },
      { label: 'Cu capac termoizolant', price: 12000 },
    ],
    optionals: [
      { label: 'Termometru pentru apă', price: 200 },
      { label: 'Suport pahare mare', price: 200 },
    ],
    recommendedFor: ['Case private', 'Cabane', 'Pensiuni'],
    badges: ['Comfort', '200 cm', '4–6 pers.', 'Aero / Hidromasaj'],
    tags: ['200', 'rotund', 'comfort'],
    popular: true,
  },

  // 3 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-luxury-200',
    name: 'PMPFiber Luxury 200',
    category: 'rotund-200',
    categoryLabel: 'Ciubăr rotund 200 cm',
    tier: 'Luxury',
    shape: 'rotund',
    diameter: '200 cm',
    size: '200',
    capacity: '4–6 persoane',
    description: 'Experiență completă de spa.',
    longDescription:
      'PMPFiber Luxury 200 este experiența completă de spa, cu aeromasaj și hidromasaj, tetiere, suport pentru pahare și termometru. Fiecare detaliu este gândit pentru relaxare premium, în orice anotimp.',
    images: [IMG('ciubar3.webp'), ...GALLERY('luxury-200', 3)],
    features: [
      'Diametru ciubăr: 200 cm',
      'Aeromasaj cu 12 duze',
      'Hidromasaj cu 8 duze',
      'Bec LED multicolor',
      'Termometru pentru apă',
      'Suport pentru pahare',
      'Tetiere pentru confort maxim',
      'Panou electric cu siguranță',
      'Corp izolat cu spumă poliuretanică',
      'Sobă exterioară din inox',
      'Burlan inox 2 m + pălărie',
      'Scăriță de acces',
      'Scurgere cu evacuare prin sobă',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 13000 },
      { label: 'Cu capac termoizolant', price: 13500 },
    ],
    recommendedFor: ['Case private premium', 'Pensiuni', 'Zone SPA'],
    badges: ['Luxury', '200 cm', '4–6 pers.', 'Spa complet'],
    tags: ['200', 'rotund', 'luxury'],
    popular: true,
  },

  // 4 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-family-225-base',
    name: 'PMPFiber Family 225 Base',
    category: 'rotund-225',
    categoryLabel: 'Ciubăr rotund 225 cm',
    tier: 'Base',
    shape: 'rotund',
    diameter: '225 cm',
    size: '225',
    capacity: '8–10 persoane',
    description: 'Model simplu pentru familie sau grupuri.',
    longDescription:
      'PMPFiber Family 225 Base este construit pentru grupuri mari și familii numeroase. Soba exterioară și coșul de fum din inox cu pălărie de protecție oferă încălzire eficientă și utilizare comodă.',
    images: [IMG('ciubar4.webp'), ...GALLERY('family-225-base', 4)],
    features: [
      'Diametru ciubăr: 225 cm',
      'Variantă clasică, fără dotări suplimentare',
      'Ideal pentru relaxare tradițională în familie sau cu prietenii',
      'Sobă exterioară din inox',
      'Burlan inox 2 m + pălărie',
      'Scăriță de acces',
      'Sistem de scurgere acționat prin buton',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 11000 },
      { label: 'Cu capac termoizolant', price: 11500 },
    ],
    recommendedFor: ['Familii numeroase', 'Cabane', 'Pensiuni'],
    badges: ['Base', '225 cm', '8–10 pers.', 'Sobă exterioară'],
    tags: ['225', 'rotund', 'base'],
    popular: true,
  },

  // 5 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-family-225-comfort',
    name: 'PMPFiber Family 225 Comfort',
    category: 'rotund-225',
    categoryLabel: 'Ciubăr rotund 225 cm',
    tier: 'Comfort',
    shape: 'rotund',
    diameter: '225 cm',
    size: '225',
    capacity: '8–10 persoane',
    description: 'Confort și relaxare pentru familie.',
    longDescription:
      'PMPFiber Family 225 Comfort combină capacitatea generoasă pentru 8–10 persoane cu sistemul de masaj și iluminarea LED, pentru momente de relaxare împărtășite cu cei dragi.',
    images: [IMG('ciubar5.webp'), ...GALLERY('family-225-comfort', 5)],
    features: [
      'Diametru ciubăr: 225 cm',
      'Sistem aeromasaj sau hidromasaj',
      'Bec LED multicolor',
      'Panou electric cu siguranță',
      'Sobă exterioară din inox',
      'Burlan inox 2 m + pălărie',
      'Scăriță de acces',
      'Sistem de scurgere acționat prin buton',
      'Experiență modernă și relaxantă',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 13000 },
      { label: 'Cu capac termoizolant', price: 13500 },
    ],
    recommendedFor: ['Familii numeroase', 'Pensiuni', 'Cabane'],
    badges: ['Comfort', '225 cm', '8–10 pers.', 'Aero / Hidromasaj'],
    tags: ['225', 'rotund', 'comfort'],
    popular: true,
  },

  // 6 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-family-225-luxury',
    name: 'PMPFiber Family 225 Luxury',
    category: 'rotund-225',
    categoryLabel: 'Ciubăr rotund 225 cm',
    tier: 'Luxury',
    shape: 'rotund',
    diameter: '225 cm',
    size: '225',
    capacity: '8–10 persoane',
    description: 'Experiență completă de spa pentru grupuri.',
    longDescription:
      'PMPFiber Family 225 Luxury aduce experiența completă de spa pentru grupuri mari: aeromasaj și hidromasaj, tetiere, suport pentru pahare și termometru, totul într-un format generos de 225 cm.',
    images: [IMG('ciubar6.webp'), ...GALLERY('family-225-luxury', 8)],
    features: [
      'Diametru ciubăr: 225 cm',
      'Aeromasaj cu 12 duze',
      'Hidromasaj cu 8 duze',
      'Bec LED multicolor',
      'Termometru pentru apă',
      'Suport pentru pahare',
      'Tetiere pentru confort maxim',
      'Panou electric cu siguranță',
      'Sobă exterioară din inox',
      'Burlan inox 2 m + pălărie',
      'Scăriță de acces',
      'Sistem de scurgere acționat prin buton',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 14500 },
      { label: 'Cu capac termoizolant', price: 15000 },
    ],
    recommendedFor: ['Pensiuni', 'Zone SPA', 'Case private premium'],
    badges: ['Luxury', '225 cm', '8–10 pers.', 'Spa complet'],
    tags: ['225', 'rotund', 'luxury'],
    popular: true,
  },

  // 7 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-premium-225-base',
    name: 'PMPFiber Premium 225 Base',
    category: 'rotund-225',
    categoryLabel: 'Ciubăr rotund 225 cm',
    tier: 'Base',
    shape: 'rotund',
    diameter: '225 cm',
    size: '225',
    capacity: '6–8 persoane',
    description: 'Model simplu, ideal pentru relaxare modernă și eficiență termică ridicată.',
    longDescription:
      'PMPFiber Premium 225 Base pune accent pe eficiența termică și pe un design modern, curat, cu sobă integrată din inox AISI 304 și bănci interioare ergonomice. O variantă clasică, fără dotări suplimentare, pentru relaxare simplă și autentică.',
    images: [IMG('ciubar7.webp'), ...GALLERY('premium-225-base', 5)],
    features: [
      'Diametru ciubăr: 225 cm',
      'Variantă clasică, fără dotări suplimentare',
      'Ideal pentru relaxare modernă și eficiență termică ridicată',
      'Sobă integrată din inox AISI 304',
      'Burlan inox 2 m + pălărie + protecție',
      'Corp izolat cu spumă poliuretanică',
      'Bănci interioare ergonomice',
      'Sistem de scurgere cu evacuare prin sobă',
      'Scăriță de acces',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 11500 },
      { label: 'Cu capac termoizolant', price: 12000 },
    ],
    recommendedFor: ['Case private', 'Cabane', 'Terase'],
    badges: ['Base', '225 cm', '6–8 pers.', 'Sobă AISI 304'],
    tags: ['225', 'rotund', 'base'],
  },

  // 8 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-premium-225-comfort',
    name: 'PMPFiber Premium 225 Comfort',
    category: 'rotund-225',
    categoryLabel: 'Ciubăr rotund 225 cm',
    tier: 'Comfort',
    shape: 'rotund',
    diameter: '225 cm',
    size: '225',
    capacity: '6–8 persoane',
    description: 'Confort și relaxare cu dotări moderne.',
    longDescription:
      'PMPFiber Premium 225 Comfort adaugă designului modern dotări care contează: sistem de masaj, iluminare LED multicolor și panou electric cu siguranță, peste o construcție cu sobă integrată din inox AISI 304 și bănci ergonomice.',
    images: [IMG('ciubar8.webp'), ...GALLERY('premium-225-comfort', 5)],
    features: [
      'Diametru ciubăr: 225 cm',
      'Sistem aeromasaj sau hidromasaj',
      'Bec LED multicolor',
      'Panou electric cu siguranță',
      'Sobă integrată din inox AISI 304',
      'Burlan inox 2 m + pălărie + protecție',
      'Corp izolat cu spumă poliuretanică',
      'Bănci interioare ergonomice',
      'Sistem de scurgere cu evacuare prin sobă',
      'Scăriță de acces',
      'Experiență modernă și relaxantă',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 13500 },
      { label: 'Cu capac termoizolant', price: 14000 },
    ],
    recommendedFor: ['Case private', 'Pensiuni', 'Cabane'],
    badges: ['Comfort', '225 cm', '6–8 pers.', 'Aero / Hidromasaj'],
    tags: ['225', 'rotund', 'comfort'],
  },

  // 9 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-premium-225-luxury',
    name: 'PMPFiber Premium 225 Luxury',
    category: 'rotund-225',
    categoryLabel: 'Ciubăr rotund 225 cm',
    tier: 'Luxury',
    shape: 'rotund',
    diameter: '225 cm',
    size: '225',
    capacity: '6–8 persoane',
    description: 'Experiență completă de spa.',
    longDescription:
      'PMPFiber Premium 225 Luxury este expresia maximă a relaxării moderne: aeromasaj, hidromasaj, tetiere, suport pahare și termometru, peste o construcție premium cu sobă integrată din inox AISI 304 și bănci interioare ergonomice.',
    images: [IMG('ciubar9.webp'), ...GALLERY('premium-225-luxury', 6)],
    features: [
      'Diametru ciubăr: 225 cm',
      'Aeromasaj cu 12 duze',
      'Hidromasaj cu 8 duze',
      'Bec LED multicolor',
      'Termometru pentru apă',
      'Suport pentru pahare',
      'Tetiere pentru confort maxim',
      'Panou electric cu siguranță',
      'Sobă integrată din inox AISI 304',
      'Burlan inox 2 m + pălărie + protecție',
      'Corp izolat cu spumă poliuretanică',
      'Bănci interioare ergonomice',
      'Sistem de scurgere cu evacuare prin sobă',
      'Scăriță de acces',
    ],
    prices: [
      { label: 'Cu capac din fibră de sticlă', price: 15000 },
      { label: 'Cu capac termoizolant', price: 15500 },
    ],
    recommendedFor: ['Zone SPA', 'Pensiuni', 'Case private premium'],
    badges: ['Luxury', '225 cm', '6–8 pers.', 'Spa complet'],
    tags: ['225', 'rotund', 'luxury'],
    popular: true,
  },

  // 10 ────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-square-spa-base',
    name: 'PMPFiber Square Spa Base 200x200',
    category: 'patrat',
    categoryLabel: 'Ciubăr pătrat 200 × 200 cm',
    tier: 'Base',
    shape: 'patrat',
    diameter: '200 × 200 cm',
    capacity: '6–8 persoane',
    description: 'Model simplu, ideal pentru relaxare modernă în familie sau cu prietenii.',
    longDescription:
      'PMPFiber Square Spa Base 200x200 propune un design modern, pătrat, ideal pentru spațiile contemporane. Variantă clasică, fără dotări suplimentare, pentru relaxare simplă și elegantă.',
    images: [IMG('ciubar10.webp'), ...GALLERY('square-base', 5)],
    features: [
      'Dimensiune ciubăr: 200 × 200 cm',
      'Variantă clasică, fără dotări suplimentare',
      'Ideal pentru relaxare modernă în familie sau cu prietenii',
      'Corp izolat cu spumă poliuretanică',
      'Sobă externă din inox',
      'Burlan inox 2 m + pălărie',
      'Sistem de scurgere cu acționare prin buton',
      'Scăriță de acces',
    ],
    prices: [{ label: 'Cu capac termoizolant', price: 11500 }],
    recommendedFor: ['Terase moderne', 'Case private', 'Spații SPA'],
    badges: ['Base', '200 × 200 cm', '6–8 pers.'],
    tags: ['patrat', 'base'],
  },

  // 11 ────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-square-spa-comfort',
    name: 'PMPFiber Square Spa Comfort 200x200',
    category: 'patrat',
    categoryLabel: 'Ciubăr pătrat 200 × 200 cm',
    tier: 'Comfort',
    shape: 'patrat',
    diameter: '200 × 200 cm',
    capacity: '6–8 persoane',
    description: 'Confort și relaxare într-un design modern pătrat.',
    longDescription:
      'PMPFiber Square Spa Comfort 200x200 îmbină linia modernă, pătrată, cu dotări care ridică experiența: sistem de masaj, iluminare LED multicolor și panou electric cu siguranță.',
    images: [IMG('ciubar11.webp'), ...GALLERY('square-comfort', 3)],
    features: [
      'Dimensiune ciubăr: 200 × 200 cm',
      'Sistem aeromasaj sau hidromasaj',
      'Bec LED multicolor',
      'Panou electric cu siguranță',
      'Corp izolat cu spumă poliuretanică',
      'Sobă externă din inox',
      'Burlan inox 2 m + pălărie',
      'Sistem de scurgere cu acționare prin buton',
      'Scăriță de acces',
      'Experiență modernă și relaxantă',
    ],
    prices: [{ label: 'Cu capac termoizolant', price: 13500 }],
    recommendedFor: ['Terase moderne', 'Pensiuni', 'Spații SPA'],
    badges: ['Comfort', '200 × 200 cm', 'Aero / Hidromasaj'],
    tags: ['patrat', 'comfort'],
  },

  // 12 ────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-square-spa-luxury',
    name: 'PMPFiber Square Spa Luxury 200x200',
    category: 'patrat',
    categoryLabel: 'Ciubăr pătrat 200 × 200 cm',
    tier: 'Luxury',
    shape: 'patrat',
    diameter: '200 × 200 cm',
    capacity: '6–8 persoane',
    description: 'Experiență completă de spa într-un format modern.',
    longDescription:
      'PMPFiber Square Spa Luxury 200x200 este experiența completă de spa într-un format modern, pătrat: aeromasaj, hidromasaj, tetiere, suport pahare și termometru.',
    images: [IMG('ciubar12.webp'), ...GALLERY('square-luxury', 8)],
    features: [
      'Dimensiune ciubăr: 200 × 200 cm',
      'Aeromasaj cu 12 duze',
      'Hidromasaj cu 8 duze',
      'Bec LED multicolor',
      'Termometru pentru apă',
      'Suport pentru pahare',
      'Tetiere pentru confort maxim',
      'Panou electric cu siguranță',
      'Corp izolat cu spumă poliuretanică',
      'Sobă externă din inox',
      'Burlan inox 2 m + pălărie',
      'Sistem de scurgere cu acționare prin buton',
      'Scăriță de acces',
    ],
    prices: [{ label: 'Cu capac termoizolant', price: 15000 }],
    recommendedFor: ['Spații SPA', 'Pensiuni premium', 'Terase moderne'],
    badges: ['Luxury', '200 × 200 cm', 'Spa complet'],
    tags: ['patrat', 'luxury'],
  },

  // 13 ────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-incastrabil',
    name: 'PMPFiber Încastrabil',
    category: 'incastrabil',
    categoryLabel: 'Sisteme încastrabile',
    description: 'Sisteme modulare pentru montaj în terasă sau podea.',
    longDescription:
      'Sistemele încastrabile PMPFiber sunt soluții modulare gândite pentru integrarea ciubărului direct în terasă, deck sau foișor. Alegi componentele de care ai nevoie și construiești configurația potrivită pentru spațiul tău.',
    images: [IMG('ciubar13.webp'), ...GALLERY('incastrabil', 11)],
    features: [
      'Sisteme modulare pentru montaj în terasă sau podea',
      'Disponibil pentru model rotund 200 cm',
      'Disponibil pentru model rotund 225 cm',
      'Disponibil pentru model pătrat 200 × 200 cm',
    ],
    prices: [{ label: 'Preț', price: 4000 }],
    availableFor: ['Model rotund 200 cm', 'Model rotund 225 cm', 'Model pătrat 200 × 200 cm'],
    components: [
      { label: 'Cadă ciubăr din fibră de sticlă cu inel montaj', price: 2700 },
      { label: 'Cadă izolată cu suport și sistem de racordare pentru sobă', price: 4000 },
      { label: 'Sobă cu accesorii complete', price: 3000 },
      { label: 'Capac termoizolant', price: 1500 },
      { label: 'Capac din fibră de sticlă', price: 500 },
      { label: 'Sistem aeromasaj', price: 1300 },
      { label: 'Sistem hidromasaj', price: 1400 },
      { label: 'LED RGB submersibil', price: 300 },
      { label: 'Scăriță acces', price: 300 },
    ],
    recommendedFor: [
      'Terase încastrate',
      'Deck-uri din lemn',
      'Foișoare',
      'Spații SPA moderne',
      'Pensiuni și cabane',
    ],
    badges: ['Modular', 'Montaj încastrat', '4.000 lei'],
    tags: ['incastrabil'],
  },

  // 14 ────────────────────────────────────────────────────────────────────
  {
    slug: 'pmpfiber-icetube',
    name: 'PMPFiber IceTube',
    category: 'icetube',
    categoryLabel: 'Terapie rece',
    description: 'Terapie cu apă rece pentru recuperare și revitalizare.',
    longDescription:
      'PMPFiber IceTube este soluția compactă pentru terapia cu apă rece (cold plunge). Finisajul premium din lemn și capacul termoizolant inclus o transformă într-un accesoriu de recuperare elegant pentru curte, terasă sau zonă wellness.',
    images: [IMG('ciubar14.webp'), ...GALLERY('icetube', 3)],
    features: [
      'Design compact și elegant',
      'Finisaj exterior premium din lemn',
      'Capac termoizolant inclus',
      'Scăriță din lemn inclusă',
      'Sistem de evacuare apă',
      'Ușor de întreținut și utilizat',
    ],
    benefits: [
      'Recuperare musculară accelerată',
      'Reducerea inflamațiilor și oboselii musculare',
      'Revitalizare și energie crescută',
      'Îmbunătățirea circulației sanguine',
      'Relaxare și tonifiere corporală',
    ],
    prices: [{ label: 'Preț', price: 3000 }],
    recommendedFor: ['Sportivi', 'Zone wellness', 'Case private', 'Pensiuni'],
    badges: ['Cold plunge', 'Lemn premium', 'Capac inclus'],
    tags: ['icetube'],
  },

  // 15 ────────────────────────────────────────────────────────────────────
  {
    slug: 'cuve-fibra-de-sticla',
    name: 'Cuve din fibră de sticlă PMPFiber',
    category: 'cuve',
    categoryLabel: 'Cuve fibră de sticlă',
    routeOverride: '/cuve-fibra-de-sticla',
    description:
      'Cuve premium pentru ciubăre, mini piscine și proiecte SPA încastrabile.',
    longDescription:
      'Cuvele din fibră de sticlă PMPFiber sunt baza solidă pentru ciubăre, mini piscine și proiecte SPA încastrabile. Sunt rezistente, ușor de întreținut și disponibile în mai multe dimensiuni rotunde și pătrate, cu sau fără sobă integrată.',
    images: [IMG('ciubar15.webp'), ...GALLERY('cuve', 8)],
    features: [
      'Material premium din fibră de sticlă',
      'Rezistente și ușor de întreținut',
      'Disponibile rotunde sau pătrate',
      'Variantă cu sobă integrată',
      'Ideale pentru proiecte încastrabile',
    ],
    variants: [
      {
        name: 'Cuvă rotundă 200 cm',
        diameter: '200 cm',
        height: '84 cm',
        capacity: '1200 litri',
        price: 2700,
      },
      {
        name: 'Cuvă rotundă 225 cm',
        diameter: '225 cm',
        height: '87 cm',
        capacity: '1700 litri',
        price: 3500,
      },
      {
        name: 'Cuvă rotundă 225 cm cu sobă integrată',
        diameter: '225 cm',
        height: '87 cm',
        capacity: '1500 litri',
        price: 3500,
      },
      {
        name: 'Cuvă pătrată 200 cm',
        diameter: '200 × 200 cm',
        height: '87 cm',
        capacity: '1500 litri',
        price: 3000,
      },
    ],
    prices: [{ label: 'Preț', price: 2700 }],
    optionals: [
      { label: 'Capac din fibră de sticlă', price: 500 },
      { label: 'Capac termoizolant', price: 1500 },
    ],
    recommendedFor: ['Proiecte SPA încastrabile', 'Mini piscine', 'Ciubăre la comandă'],
    badges: ['Fibră de sticlă', '4 variante', '2.700 lei'],
    tags: ['cuve'],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

/** Cel mai mic preț al unui produs (folosit pentru „De la X lei"). */
export const getFromPrice = (p: Product): number => {
  const pool: number[] = [];
  p.prices?.forEach((pr) => pool.push(pr.price));
  p.variants?.forEach((v) => pool.push(v.price));
  p.components?.forEach((c) => pool.push(c.price));
  return pool.length ? Math.min(...pool) : 0;
};

export const formatLei = (n: number): string =>
  new Intl.NumberFormat('ro-RO').format(n) + ' lei';

export const productPath = (p: Product): string =>
  p.routeOverride ?? `/ciubare/${p.slug}`;

/** Link către Contact cu modelul preselectat în query param. */
export const offerLink = (name: string): string =>
  `/contact?model=${encodeURIComponent(name)}`;

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/** Produsele afișate pe pagina /ciubare (toate). */
export const allProducts = products;

/** Produse pentru rutele /ciubare/:slug (exclude cuvele, care au pagină proprie). */
export const ciubareProducts = products.filter((p) => !p.routeOverride);

export const popularProducts = products.filter((p) => p.popular).slice(0, 6);

export const getRelated = (slug: string, count = 3): Product[] => {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, count);
  const sameCat = products.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = products.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCat, ...rest].slice(0, count);
};

// Filtre pentru pagina Ciubăre
export interface Filter {
  id: string;
  label: string;
  match: (p: Product) => boolean;
}

export const filters: Filter[] = [
  { id: 'toate', label: 'Toate modelele', match: () => true },
  { id: '200', label: '200 cm', match: (p) => p.size === '200' },
  { id: '225', label: '225 cm', match: (p) => p.size === '225' },
  { id: 'rotund', label: 'Rotunde', match: (p) => p.shape === 'rotund' },
  { id: 'patrat', label: 'Pătrate', match: (p) => p.shape === 'patrat' },
  { id: 'base', label: 'Base', match: (p) => p.tier === 'Base' },
  { id: 'comfort', label: 'Comfort', match: (p) => p.tier === 'Comfort' },
  { id: 'luxury', label: 'Luxury', match: (p) => p.tier === 'Luxury' },
  { id: 'incastrabil', label: 'Încastrabile', match: (p) => p.category === 'incastrabil' },
  { id: 'icetube', label: 'IceTube', match: (p) => p.category === 'icetube' },
  { id: 'cuve', label: 'Cuve', match: (p) => p.category === 'cuve' },
];

/** Filtrele organizate pe categorii, pentru un UI grupat și scanabil. */
export const filterGroups: { label: string; ids: string[] }[] = [
  { label: 'Dimensiune', ids: ['200', '225'] },
  { label: 'Formă', ids: ['rotund', 'patrat'] },
  { label: 'Gamă', ids: ['base', 'comfort', 'luxury'] },
  { label: 'Tip produs', ids: ['incastrabil', 'icetube', 'cuve'] },
];

export const getFilter = (id: string): Filter =>
  filters.find((f) => f.id === id) ?? filters[0];

/** Câte produse corespund unui filtru (pentru badge-urile de numărător). */
export const countFor = (id: string): number =>
  allProducts.filter(getFilter(id).match).length;
