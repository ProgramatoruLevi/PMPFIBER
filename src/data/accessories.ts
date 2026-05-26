// Accesorii PMPFIBER — modifică liber prețuri, descrieri și imagini aici.
// Fiecare accesoriu are pagină proprie la /accesorii/:slug.

export interface Accessory {
  slug: string;
  name: string;
  price: number;
  unit?: string;
  description: string;
  longDescription?: string;
  /** Galerie — poate avea mai multe poze (ex. becul LED are 2). */
  images: string[];
  features?: string[];
}

export const accessories: Accessory[] = [
  {
    slug: 'termometru-apa',
    name: 'Termometru pentru apă',
    price: 200,
    description:
      'Termometru flotant pentru monitorizarea precisă a temperaturii apei.',
    longDescription:
      'Termometru flotant pentru monitorizarea precisă a temperaturii apei, esențial pentru o experiență de relaxare controlată. Plutește la suprafață și se citește ușor, indiferent de anotimp.',
    images: ['/images/termometru.jpeg'],
    features: ['Citire ușoară', 'Rezistent la apă', 'Compatibil cu toate modelele PMPFiber'],
  },
  {
    slug: 'suport-pahare-mare',
    name: 'Suport pahare mare',
    price: 200,
    description: 'Suport din lemn pentru 4 pahare, fixat pe marginea ciubărului.',
    longDescription:
      'Suport din lemn pentru 4 pahare, fixat pe marginea ciubărului. Finisaj premium, asortat designului produselor PMPFiber — perfect pentru momentele de relaxare în grup.',
    images: ['/images/suport_pahare_mare_4locuri.jpeg'],
    features: ['4 locuri pentru pahare', 'Lemn finisat premium', 'Montare pe marginea ciubărului'],
  },
  {
    slug: 'suport-pahare-mic',
    name: 'Suport pahare mic',
    price: 100,
    description: 'Suport din lemn pentru 3 pahare, compact și elegant.',
    longDescription:
      'Suport din lemn pentru 3 pahare, compact și elegant, perfect pentru momentele de relaxare în doi. Finisaj asortat designului PMPFiber.',
    images: ['/images/suport_pahare_mic_3locuri.jpeg'],
    features: ['3 locuri pentru pahare', 'Compact și elegant', 'Lemn finisat premium'],
  },
  {
    slug: 'tetiera-suplimentara',
    name: 'Tetieră suplimentară',
    price: 50,
    unit: 'buc',
    description: 'Tetieră ergonomică suplimentară pentru confort maxim.',
    longDescription:
      'Tetieră ergonomică suplimentară pentru confort maxim. Se adaugă oricărui model pentru sprijin optim al cefei, în timpul relaxării.',
    // TODO: înlocuiește cu poza reală — pune fișierul în public/images/ ca „tetiera.jpeg".
    images: ['/images/tetiera.jpeg'],
    features: ['Ergonomică', 'Sprijin optim pentru ceafă', 'Compatibilă cu toate modelele'],
  },
  {
    slug: 'bec-led-multicolor',
    name: 'Bec LED multicolor pneumatic',
    price: 300,
    description: 'Iluminare LED multicolor cu acționare pneumatică.',
    longDescription:
      'Iluminare LED multicolor cu acționare pneumatică, pentru o atmosferă relaxantă pe timp de seară. Schimbi culoarea simplu, cu o atingere — fără cabluri vizibile.',
    // TODO: înlocuiește cu cele 2 poze reale — pune fișierele în public/images/
    // ca „bec_led_1.jpeg" și „bec_led_2.jpeg".
    images: ['/images/bec_led_1.jpeg', '/images/bec_led_2.jpeg'],
    features: ['Multiple culori', 'Acționare pneumatică', 'Atmosferă relaxantă seara'],
  },
];

export const getAccessoryBySlug = (slug: string): Accessory | undefined =>
  accessories.find((a) => a.slug === slug);

export const accessoryPath = (a: Accessory): string => `/accesorii/${a.slug}`;
