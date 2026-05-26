// Accesorii PMPFIBER — modifică liber prețuri, descrieri și imagini aici.

export interface Accessory {
  name: string;
  price: number;
  unit?: string;
  description: string;
  image: string;
}

export const accessories: Accessory[] = [
  {
    name: 'Termometru pentru apă',
    price: 200,
    description:
      'Termometru flotant pentru monitorizarea precisă a temperaturii apei, esențial pentru o experiență de relaxare controlată.',
    image: '/images/termometru.jpeg',
  },
  {
    name: 'Suport pahare mare',
    price: 200,
    description:
      'Suport din lemn pentru 4 pahare, fixat pe marginea ciubărului. Finisaj premium, asortat designului produselor PMPFiber.',
    image: '/images/suport_pahare_mare_4locuri.jpeg',
  },
  {
    name: 'Suport pahare mic',
    price: 100,
    description:
      'Suport din lemn pentru 3 pahare, compact și elegant, perfect pentru momentele de relaxare în doi.',
    image: '/images/suport_pahare_mic_3locuri.jpeg',
  },
  {
    name: 'Tetieră suplimentară',
    price: 50,
    unit: 'buc',
    description:
      'Tetieră ergonomică suplimentară pentru confort maxim. Se adaugă oricărui model pentru sprijin optim al cefei.',
    image: '/images/ciubar3.png',
  },
  {
    name: 'Bec LED multicolor pneumatic',
    price: 300,
    description:
      'Iluminare LED multicolor cu acționare pneumatică, pentru o atmosferă relaxantă pe timp de seară. Schimbi culoarea simplu, cu o atingere.',
    image: '/images/ciubar2.png',
  },
];
