import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  images: string[];
  index: number;
  alt: string;
  open: boolean;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

const MIN = 1;
const MAX = 4;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/**
 * Lightbox fullscreen cu zoom (scroll / butoane / dublu-click / pinch),
 * pan prin drag și navigare între imagini. Fără dependențe externe.
 */
export default function Lightbox({ images, index, alt, open, onClose, onIndexChange }: Props) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const pinch = useRef<{ dist: number; scale: number } | null>(null);

  const reset = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const go = useCallback(
    (dir: number) => {
      reset();
      onIndexChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onIndexChange, reset],
  );

  // Blocare scroll body + scurtături tastatură
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, go]);

  // Resetează zoom-ul când se schimbă imaginea sau se deschide
  useEffect(() => {
    reset();
  }, [index, open, reset]);

  const zoomBy = (delta: number) => {
    setScale((s) => {
      const next = clamp(+(s + delta).toFixed(2), MIN, MAX);
      if (next === 1) setPos({ x: 0, y: 0 });
      return next;
    });
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomBy(e.deltaY > 0 ? -0.3 : 0.3);
  };

  const toggleZoom = () => {
    if (scale > 1) reset();
    else setScale(2.5);
  };

  // Pan cu pointer (mouse / touch single)
  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    dragging.current = true;
    last.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - last.current.x, y: e.clientY - last.current.y });
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  // Pinch-to-zoom (mobil)
  const dist = (t: React.TouchList) =>
    Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) pinch.current = { dist: dist(e.touches), scale };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current) {
      e.preventDefault();
      const ratio = dist(e.touches) / pinch.current.dist;
      setScale(clamp(+(pinch.current.scale * ratio).toFixed(2), MIN, MAX));
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinch.current = null;
      if (scale <= 1) setPos({ x: 0, y: 0 });
    }
  };

  const hasMany = images.length > 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-ink-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie imagini — ${alt}`}
        >
          {/* Bara de sus */}
          <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <span className="text-sm text-sand">
              {index + 1} / {images.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => zoomBy(-0.5)}
                disabled={scale <= MIN}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold/50 disabled:opacity-40"
                aria-label="Micșorează"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => zoomBy(0.5)}
                disabled={scale >= MAX}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold/50 disabled:opacity-40"
                aria-label="Mărește"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={scale === 1 && pos.x === 0 && pos.y === 0}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold/50 disabled:opacity-40"
                aria-label="Resetează zoom"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-1 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold/50"
                aria-label="Închide galeria"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Zona imaginii */}
          <div
            className="relative flex flex-1 select-none items-center justify-center overflow-hidden px-4"
            onWheel={onWheel}
            onClick={(e) => {
              // închide doar dacă se dă click pe fundal, nu pe imagine
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={`${alt} — imaginea ${index + 1}`}
              draggable={false}
              onDoubleClick={toggleZoom}
              onClick={(e) => {
                e.stopPropagation();
                if (scale <= 1) toggleZoom();
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="max-h-[78vh] max-w-full rounded-lg object-contain shadow-premium"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                cursor: scale > 1 ? (dragging.current ? 'grabbing' : 'grab') : 'zoom-in',
                touchAction: 'none',
                transition: dragging.current ? 'none' : 'transform 0.18s ease-out',
              }}
            />

            {/* Săgeți navigare */}
            {hasMany && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/60 text-cream backdrop-blur-md transition hover:border-gold/50 sm:left-6"
                  aria-label="Imaginea anterioară"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/60 text-cream backdrop-blur-md transition hover:border-gold/50 sm:right-6"
                  aria-label="Imaginea următoare"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails jos */}
          {hasMany && (
            <div className="flex justify-center gap-2.5 px-4 py-5">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => {
                    reset();
                    onIndexChange(i);
                  }}
                  className={`relative h-14 w-16 overflow-hidden rounded-lg border transition-all sm:h-16 sm:w-20 ${
                    i === index ? 'border-gold ring-2 ring-gold/40' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Imaginea ${i + 1}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Hint */}
          <p className="pb-3 text-center text-[11px] text-sand/50">
            Scroll, dublu-click sau pinch pentru zoom · trage pentru a muta imaginea
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
