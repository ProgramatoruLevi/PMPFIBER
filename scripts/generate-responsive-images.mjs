// Generează variante responsive WebP pentru imaginile de produs/galerie/accesorii.
// Pentru fiecare `foo.webp` cu lățime > 900px creează `foo-w480.webp` și `foo-w960.webp`.
// (Sufix `-w<lățime>` ales intenționat ca să NU se confunde cu galeriile `img-1.webp`.)
// Folosit de componenta <ResponsiveImg> prin srcset. Idempotent (sare variantele existente).
//
// Necesită: dwebp + cwebp (libwebp) instalate (brew install webp).
// Rulează cu: node scripts/generate-responsive-images.mjs
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join, extname, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = resolve(__dirname, '..', 'public', 'images');
const WIDTHS = [480, 960];
const QUALITY = 80;

// Fișiere care NU primesc variante (logo/iconuri/OG/hero gestionate separat).
const SKIP = new Set(['logo_PMP_FIBER.webp', 'og-default.webp']);
const SKIP_PREFIX = ['imagine_background_hero']; // hero — preload dedicat, nu intră în carduri

const VARIANT_RE = /-w\d+\.webp$/; // sare fișierele deja generate (foo-w480.webp)

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (extname(entry) === '.webp') out.push(p);
  }
  return out;
}

function widthOf(file) {
  const out = execFileSync('sips', ['-g', 'pixelWidth', file], { encoding: 'utf8' });
  const m = out.match(/pixelWidth:\s*(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

const tmp = mkdtempSync(join(tmpdir(), 'respimg-'));
let made = 0, skipped = 0;

try {
  for (const file of walk(IMAGES_DIR)) {
    const name = basename(file);
    if (SKIP.has(name)) continue;
    if (SKIP_PREFIX.some((p) => name.startsWith(p))) continue;
    if (VARIANT_RE.test(name)) continue; // deja o variantă

    const w = widthOf(file);
    if (w <= 900) { skipped++; continue; }

    // Decodează o singură dată în PNG temporar.
    const png = join(tmp, name.replace('.webp', '.png'));
    execFileSync('dwebp', ['-quiet', file, '-o', png]);

    for (const tw of WIDTHS) {
      if (tw >= w) continue; // nu mări
      const outFile = file.replace(/\.webp$/, `-w${tw}.webp`);
      if (existsSync(outFile)) continue;
      execFileSync('cwebp', ['-quiet', '-resize', String(tw), '0', '-q', String(QUALITY), png, '-o', outFile]);
      made++;
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log(`✓ Variante responsive generate: ${made} (sărite: ${skipped} sub 900px)`);
