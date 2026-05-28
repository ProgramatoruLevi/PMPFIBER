// Descarcă fonturile local (latin + latin-ext), per-weight, format woff2.
// Generează /public/fonts/{family}-{weight}-{subset}.woff2 și fonts.css.
//
// Rulare: `node scripts/download-fonts.mjs`
//
// Sursa: Google Fonts CSS API (apelat cu User-Agent modern → woff2).
// După descărcare, NU se mai face niciun request către fonts.googleapis.com
// sau fonts.gstatic.com — site-ul rămâne GDPR-compliant.

import fs from 'node:fs/promises';
import path from 'node:path';

const FAMILIES = [
  { name: 'Playfair Display', cssName: 'Playfair+Display', file: 'playfair-display', weights: [500, 600, 700, 800] },
  { name: 'Plus Jakarta Sans', cssName: 'Plus+Jakarta+Sans', file: 'plus-jakarta-sans', weights: [300, 400, 500, 600, 700] },
];

const OUT_DIR = path.resolve('public/fonts');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

await fs.mkdir(OUT_DIR, { recursive: true });

const fontFaces = [];

for (const fam of FAMILIES) {
  const url = `https://fonts.googleapis.com/css2?family=${fam.cssName}:wght@${fam.weights.join(';')}&display=swap`;
  process.stdout.write(`Fetching ${fam.name}... `);
  const css = await fetch(url, { headers: { 'User-Agent': UA } }).then((r) => r.text());

  // Fiecare bloc real e: /* subset */ @font-face { ... }
  // Comentariul subset-ului apare ÎNAINTE de @font-face, nu în interior.
  const blockRegex = /\/\*\s*([a-z\-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  const blocks = Array.from(css.matchAll(blockRegex));
  console.log(`${blocks.length} font-face blocks`);

  for (const [, subset, body] of blocks) {
    if (subset !== 'latin' && subset !== 'latin-ext') continue;

    const weight = body.match(/font-weight:\s*(\d+)/)?.[1];
    const urlMatch = body.match(/url\((https:\/\/[^)]+\.woff2)\)/);
    const unicodeRange = body.match(/unicode-range:\s*([^;]+);/)?.[1]?.trim();
    if (!weight || !urlMatch) continue;

    const localName = `${fam.file}-${weight}-${subset}.woff2`;
    const dest = path.join(OUT_DIR, localName);

    process.stdout.write(`  · ${localName} ... `);
    const buf = Buffer.from(await fetch(urlMatch[1], { headers: { 'User-Agent': UA } }).then((r) => r.arrayBuffer()));
    await fs.writeFile(dest, buf);
    console.log(`${(buf.length / 1024).toFixed(1)} KB`);

    fontFaces.push(`@font-face {
  font-family: '${fam.name}';
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${localName}') format('woff2');${unicodeRange ? `\n  unicode-range: ${unicodeRange};` : ''}
}`);
  }
}

const css = `/* Fonturi locale — GDPR-compliant (zero requesturi externe). Generat de scripts/download-fonts.mjs. */
${fontFaces.join('\n\n')}
`;

await fs.writeFile(path.join(OUT_DIR, 'fonts.css'), css);
console.log(`\n✓ ${fontFaces.length} @font-face → public/fonts/fonts.css`);
