// Întrebări frecvente — folosite pe Home/Contact și pentru JSON-LD FAQPage.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Cât durează încălzirea apei într-un ciubăr?',
    answer:
      'În mod uzual, apa ajunge la temperatura plăcută de relaxare în câteva ore, în funcție de volumul de apă, temperatura inițială și anotimp. Soba din inox inclusă încălzește eficient, iar capacul termoizolant reduce semnificativ timpul de încălzire și pierderile de căldură.',
  },
  {
    question: 'Ce diferență este între capacul din fibră de sticlă și capacul termoizolant?',
    answer:
      'Capacul din fibră de sticlă protejează apa de impurități și are un cost mai accesibil. Capacul termoizolant păstrează căldura mult mai bine, scurtează timpul de încălzire și reduce consumul de lemne, fiind recomandat pentru utilizare frecventă și pe timp de iarnă.',
  },
  {
    question: 'Ce model este potrivit pentru 4–6 persoane?',
    answer:
      'Pentru 4–6 persoane recomandăm modelele rotunde de 200 cm: PMPFiber Base 200, Comfort 200 sau Luxury 200, în funcție de dotările dorite (de la varianta clasică până la experiența completă de spa).',
  },
  {
    question: 'Ce model este potrivit pentru 8–10 persoane?',
    answer:
      'Pentru grupuri mari și familii numeroase recomandăm modelele rotunde de 225 cm din gama Family: Family 225 Base, Comfort sau Luxury, cu o capacitate de 8–10 persoane.',
  },
  {
    question: 'Se pot monta ciubărele în terasă?',
    answer:
      'Da. Oferim sisteme încastrabile modulare, disponibile pentru modele rotunde de 200 și 225 cm și pătrate de 200 × 200 cm, gândite pentru integrarea în terase, deck-uri din lemn, foișoare și spații SPA.',
  },
  {
    question: 'Ce dotări pot fi adăugate?',
    answer:
      'În funcție de model, se pot adăuga sistem de aeromasaj sau hidromasaj, iluminare LED multicolor, termometru pentru apă, suport pentru pahare, tetiere și capac termoizolant. Configurăm fiecare ciubăr în funcție de nevoile tale.',
  },
  {
    question: 'Prețurile includ TVA?',
    answer:
      'Da, toate prețurile afișate includ TVA. În plus, fiecare ciubăr PMPFiber beneficiază de garanție 2 ani. Pentru detalii privind opțiunile de livrare și o ofertă personalizată pentru configurația aleasă, ne poți contacta telefonic.',
  },
];
