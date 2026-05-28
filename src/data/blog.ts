// Articole de blog statice pentru SEO. Conținut în limba română, natural.
// Fiecare articol are slug propriu și body structurat pe paragrafe/secțiuni.

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingTime: string;
  cover: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'cum-alegi-un-ciubar-potrivit',
    title: 'Cum alegi un ciubăr potrivit pentru curtea ta',
    excerpt:
      'Capacitate, dimensiune, dotări și tipul capacului — un ghid clar pentru a alege ciubărul potrivit spațiului și nevoilor tale.',
    date: '2025-11-10',
    readingTime: '5 min',
    cover: '/images/ciubar1.webp',
    sections: [
      {
        paragraphs: [
          'Un ciubăr cu apă caldă transformă curtea, cabana sau pensiunea într-un spațiu de relaxare folosit tot anul. Pentru a face alegerea potrivită, e util să pornești de la câteva întrebări simple: câte persoane vor folosi ciubărul, cât spațiu ai disponibil și ce nivel de confort îți dorești.',
        ],
      },
      {
        heading: 'Stabilește capacitatea',
        paragraphs: [
          'Numărul de persoane determină diametrul. Modelele rotunde de 200 cm sunt confortabile pentru 4–6 persoane, în timp ce modelele de 225 cm găzduiesc 8–10 persoane, fiind ideale pentru familii numeroase și grupuri.',
        ],
      },
      {
        heading: 'Alege nivelul de dotări',
        paragraphs: [
          'Gamele Base, Comfort și Luxury acoperă nevoi diferite:',
        ],
        bullets: [
          'Base — varianta clasică, fără dotări suplimentare, pentru relaxare tradițională.',
          'Comfort — adaugă sistem de aeromasaj sau hidromasaj și iluminare LED.',
          'Luxury — experiența completă de spa, cu aeromasaj, hidromasaj, tetiere, suport pahare și termometru.',
        ],
      },
      {
        heading: 'Nu uita de capac',
        paragraphs: [
          'Capacul termoizolant păstrează căldura mai bine și scurtează timpul de încălzire, fiind recomandat dacă folosești ciubărul des sau pe timp de iarnă. Capacul din fibră de sticlă este o variantă mai accesibilă, potrivită pentru protecția apei.',
        ],
      },
    ],
  },
  {
    slug: 'aeromasaj-sau-hidromasaj',
    title: 'Ciubăr cu aeromasaj sau hidromasaj: ce alegi?',
    excerpt:
      'Cele două sisteme oferă senzații diferite. Iată cum funcționează fiecare și cum alegi varianta potrivită stilului tău de relaxare.',
    date: '2025-11-24',
    readingTime: '4 min',
    cover: '/images/ciubar3.webp',
    sections: [
      {
        paragraphs: [
          'Atât aeromasajul, cât și hidromasajul ridică nivelul de relaxare al unui ciubăr, însă fac acest lucru în moduri diferite. Înțelegerea diferenței te ajută să alegi configurația potrivită.',
        ],
      },
      {
        heading: 'Aeromasajul',
        paragraphs: [
          'Aeromasajul introduce aer prin duze montate pe fundul ciubărului, creând o senzație fină de bule care învăluie întregul corp. Este o experiență blândă, relaxantă, plăcută pentru destindere generală.',
        ],
      },
      {
        heading: 'Hidromasajul',
        paragraphs: [
          'Hidromasajul folosește jeturi de apă sub presiune, direcționate către anumite zone ale corpului. Senzația este mai intensă și mai localizată, potrivită pentru relaxarea musculară după efort.',
        ],
      },
      {
        heading: 'Ce alegi?',
        paragraphs: [
          'Dacă îți dorești o relaxare lină și învăluitoare, aeromasajul este alegerea potrivită. Dacă urmărești un efect mai puternic, de masaj muscular, hidromasajul este recomandat. În gamele Luxury, cele două sisteme sunt combinate pentru o experiență completă.',
        ],
      },
    ],
  },
  {
    slug: 'de-ce-conteaza-izolatia',
    title: 'De ce contează izolația la un ciubăr premium',
    excerpt:
      'Izolația cu spumă poliuretanică face diferența între un ciubăr eficient și unul care pierde căldură. Iată de ce contează.',
    date: '2025-12-08',
    readingTime: '4 min',
    cover: '/images/ciubar13.webp',
    sections: [
      {
        paragraphs: [
          'Izolația este unul dintre cele mai importante detalii ale unui ciubăr premium, chiar dacă nu se vede din exterior. O izolație bună înseamnă apă care rămâne caldă mai mult timp, consum redus de lemne și o experiență plăcută indiferent de sezon.',
        ],
      },
      {
        heading: 'Spuma poliuretanică',
        paragraphs: [
          'Corpul ciubărelor PMPFiber este izolat cu spumă poliuretanică, un material cu proprietăți termoizolante excelente. Aceasta reduce pierderile de căldură prin pereții ciubărului și menține temperatura apei stabilă pentru mai mult timp.',
        ],
      },
      {
        heading: 'Beneficiile unei izolații bune',
        paragraphs: ['O izolație corectă aduce avantaje concrete:'],
        bullets: [
          'Timp de încălzire mai scurt.',
          'Consum redus de lemne pentru menținerea temperaturii.',
          'Confort sporit pe timp de iarnă.',
          'Utilizare eficientă pe tot parcursul anului.',
        ],
      },
      {
        heading: 'Izolație plus capac termoizolant',
        paragraphs: [
          'Cel mai bun rezultat se obține combinând corpul izolat cu un capac termoizolant. Împreună, acestea păstrează căldura între utilizări și transformă ciubărul într-un produs cu adevărat eficient.',
        ],
      },
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
