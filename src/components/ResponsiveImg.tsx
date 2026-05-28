import type { ImgHTMLAttributes } from 'react';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Calea de bază, ex. `/images/comfort-200/img-1.webp`.
   *  IMPORTANT: folosește doar pentru imagini > 900px lățime — doar acelea au
   *  variantele `-w480.webp` / `-w960.webp` generate de
   *  `scripts/generate-responsive-images.mjs`. Pentru imagini mai mici (logo,
   *  iconuri) pasează `raw` ca să eviți cereri 404 către variante inexistente. */
  src: string;
  alt: string;
  /** Atribut `sizes` — cât de lată e imaginea la fiecare breakpoint. */
  sizes?: string;
  /** Dezactivează srcset (imagini fără variante: logo, iconuri, hero). */
  raw?: boolean;
}

/**
 * <img> responsive cu srcset WebP (480w / 960w / original). Reduce semnificativ
 * bytes-ii livrați pe mobil fără modificări vizuale. La SSG randează un simplu
 * <img>, deci nu adaugă cost de hidratare.
 */
export default function ResponsiveImg({ src, alt, sizes, raw = false, ...rest }: Props) {
  const isWebp = src.endsWith('.webp');
  const srcSet =
    raw || !isWebp
      ? undefined
      : (() => {
          const base = src.slice(0, -'.webp'.length);
          // Originalul e declarat la 1200w (lățimea minimă reală a surselor):
          // sub-promite pentru pozele mai mari, deci browserul nu le alege inutil,
          // dar nu produce niciodată blur (fișierul e ≥ 1200px).
          return `${base}-w480.webp 480w, ${base}-w960.webp 960w, ${src} 1200w`;
        })();

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes ?? '100vw' : undefined}
      alt={alt}
      {...rest}
    />
  );
}
