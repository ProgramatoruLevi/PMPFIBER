import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';
import ResponsiveImg from './ResponsiveImg';

interface Props {
  images: string[];
  alt: string;
}

/**
 * Galerie imagine mare + thumbnails. Click pe imaginea principală deschide
 * lightbox-ul cu zoom. Funcționează și cu o singură imagine.
 */
export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const safeImages = images.length ? images : ['/images/ciubar1.webp'];
  const idx = Math.min(active, safeImages.length - 1);
  const current = safeImages[idx];

  return (
    <div className="flex flex-col gap-4">
      {/* Imagine principală — click pentru zoom. Plain <img> (fără opacity:0)
          ca să fie LCP rapid pe pagina de produs. */}
      <button
        type="button"
        onClick={() => setZoomOpen(true)}
        className="product-media group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10"
        aria-label="Mărește imaginea"
      >
        <ResponsiveImg
          key={current}
          src={current}
          sizes="(min-width:1024px) 45vw, 92vw"
          alt={alt}
          width={800}
          height={600}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
        {/* Indicator zoom */}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-md transition-colors group-hover:border-gold/50 group-hover:text-gold-light">
          <Maximize2 className="h-3.5 w-3.5" />
          Mărește
        </span>
      </button>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {safeImages.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              onDoubleClick={() => {
                setActive(i);
                setZoomOpen(true);
              }}
              className={`relative aspect-square overflow-hidden rounded-xl border transition-all ${
                i === idx
                  ? 'border-gold ring-2 ring-gold/40'
                  : 'border-white/10 opacity-70 hover:opacity-100'
              }`}
              aria-label={`Imaginea ${i + 1}`}
            >
              <ResponsiveImg
                src={img}
                sizes="120px"
                alt={`${alt} — imaginea ${i + 1}`}
                width={120}
                height={120}
                loading="lazy"
                decoding="async"
                className="product-media h-full w-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        images={safeImages}
        index={idx}
        alt={alt}
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        onIndexChange={setActive}
      />
    </div>
  );
}
