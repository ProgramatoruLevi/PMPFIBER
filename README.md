# PMPFIBER — Site web premium

Site de prezentare pentru **PMPFIBER SRL**, producător român de ciubăre premium
din fibră de sticlă și lemn. Construit ca aplicație React modernă, cu prerendering
static pentru SEO, design premium dark + accente aurii și optimizat pentru
desktop, tabletă și telefon.

## Stack tehnic

- **React 18** + **TypeScript**
- **Vite 5** (build & dev)
- **vite-react-ssg** — prerendering / generare statică (o pagină HTML per rută)
- **React Router 6**
- **Tailwind CSS 3** — design system custom (culori, fonturi, animații)
- **Framer Motion** — animații fine la scroll și interacțiuni
- **Lucide React** — iconuri
- **react-helmet-async** (prin `vite-react-ssg`) — SEO per pagină

## Instalare și rulare

```bash
npm install        # instalează dependențele
npm run dev        # server de development (http://localhost:5173)
npm run build      # build static + prerendering (rezultat în /dist)
npm run preview    # servește build-ul din /dist pentru verificare
npm run sitemap    # regenerează public/sitemap.xml și public/robots.txt
npm run lint       # verificare TypeScript (tsc --noEmit)
```

> `npm run build` rulează automat și generarea sitemap-ului.
> Pentru un build SPA clasic (fără prerendering) există `npm run build:spa`.

## Structura proiectului

```
public/
  images/                 # TOATE imaginile (logo, hero, produse, accesorii)
  sitemap.xml             # generat automat
  robots.txt              # generat automat
src/
  components/             # componente reutilizabile (Navbar, Hero, ProductCard...)
  data/                   # ⬅ DATELE site-ului (produse, firmă, FAQ, blog, accesorii)
  layouts/MainLayout.tsx  # layout principal (navbar + footer + butoane plutitoare)
  pages/                  # paginile site-ului
  utils/seo.ts            # generatoare JSON-LD + helperi SEO
  components/SEO.tsx       # componentă SEO reutilizabilă (title, OG, JSON-LD)
  App.tsx                 # definirea rutelor + getStaticPaths pentru prerendering
  main.tsx                # entry ViteReactSSG
scripts/generate-sitemap.mjs
```

## ✏️ Unde modifici PRODUSELE

Toate produsele sunt într-un singur fișier:

**`src/data/products.ts`**

Fiecare produs are: `slug`, `name`, `category`, `tier`, `diameter`, `capacity`,
`description`, `images`, `features` (dotări), `prices` (variante de capac),
`optionals`, `components`, `variants` (pentru cuve), `benefits` (IceTube),
`recommendedFor`, `badges` și `tags` (pentru filtrare).

- **Adaugi un produs nou** → adaugi un obiect nou în array-ul `products`.
  Dacă slug-ul nu are `routeOverride`, pagina lui apare automat la
  `/ciubare/{slug}` (și e prerandată la build prin `getStaticPaths`).
- **Schimbi prețuri / dotări** → editezi câmpurile `prices` / `features`.
- **Marchezi un produs ca „popular"** (apare pe homepage) → `popular: true`.
- **Filtre** pe pagina Ciubăre → definite la finalul fișierului (`filters`).

Accesoriile sunt separate, în **`src/data/accessories.ts`**.

## 🖼️ Unde schimbi IMAGINILE

Toate imaginile sunt în **`public/images/`** și sunt referite prin path absolut
(ex: `"/images/ciubar1.png"`).

- **Înlocuiești o imagine** → suprascrie fișierul din `public/images/` cu același nume,
  SAU schimbă path-ul în `images: [...]` al produsului în `products.ts`.
- **Hero homepage** folosește două imagini (art direction prin `<picture>`):
  - desktop: `imagine_background_hero.png`
  - mobil: `imagine_background_hero_mobil.png`
  (vezi `src/components/Hero.tsx`)
- **Galeria de produs** funcționează cu oricâte imagini per produs — adaugă pur și
  simplu mai multe path-uri în array-ul `images`.

## 🔍 SEO și prerendering

- **Componenta `SEO.tsx`** setează pe fiecare pagină: `title` unic, `meta description`,
  `canonical`, OpenGraph, Twitter Card, limbă `ro-RO` și **JSON-LD**.
- **JSON-LD** generat în `src/utils/seo.ts`:
  - `LocalBusiness` / `Organization` (PMPFIBER SRL, CUI, adresă, telefon) — pe toate paginile
  - `Product` (name, description, image, brand, offers, `priceCurrency: RON`, `price`, `availability: InStock`) — pe paginile de produs
  - `BreadcrumbList` — pe paginile interioare
  - `FAQPage` — pe homepage
  - `Article` — pe articolele de blog
- **Prerendering static**: `vite-react-ssg` generează la `npm run build` câte un
  fișier `.html` complet randat pentru fiecare rută (inclusiv fiecare produs și
  articol de blog, prin `getStaticPaths` în `src/App.tsx`). Motoarele de căutare
  primesc HTML complet, nu un shell gol.
- **`sitemap.xml`** și **`robots.txt`** sunt generate în `public/` din
  `scripts/generate-sitemap.mjs`.
- **Performanță**: imagini cu `loading="lazy"`, `aspect-ratio` pe containere
  (fără layout shift), preload pentru hero, fonturi cu `display=swap`.

> ⚠️ Înainte de publicare, actualizează `siteUrl` din `src/data/company.ts`
> (momentan `https://www.pmpfiber.ro`) cu domeniul real. El se folosește în
> canonical, OpenGraph, sitemap și JSON-LD.

## 📞 Apel telefonic & WhatsApp

Accentul principal e pe **apelul telefonic** (buton verde „Sună acum", mai mare
decât „Cerere ofertă") prezent în navbar, hero, footer, butoane plutitoare și pe
fiecare card/pagină de produs. Există și buton **WhatsApp**. Numărul și mesajele
se modifică în **`src/data/company.ts`** (`phoneDisplay`, `phoneRaw`, `whatsapp`).

## 🧮 Configurator inteligent

Pe homepage (și reutilizabil oriunde) există un configurator în 5 pași
(persoane → formă → gamă → capac → opționale) care recomandă automat modelul
potrivit, calculează un **preț estimativ** și trimite configurația către pagina
Contact (preselectată) sau pe WhatsApp. Vezi `src/components/Configurator.tsx`.

## 📨 Formular de contact

Formularul (`src/pages/Contact.tsx`) are validare front-end și mesaj de succes.
Nu trimite încă date real — în cod sunt comentate 3 variante de conectare:
**Netlify Forms**, **Formspree** sau un **API propriu** (`fetch`). Citește și
parametrii `?model=` și `?config=` din URL pentru a preselecta modelul.
