import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

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
const SWIPE_THRESHOLD = 45; // px

/**
 * Lightbox fullscreen. Pe mobil: pinch cu 2 degete (zoom), swipe stânga/dreapta
 * (schimbă poza), drag cu un deget când e mărit (pan), dublu-tap (zoom).
 * Gesturile folosesc listenere native non-passive ca să meargă pe toate
 * telefoanele. Pe desktop: scroll/butoane/dublu-click pentru zoom, săgeți+tastatură.
 */
export default function Lightbox({ images, index, alt, open, onClose, onIndexChange }: Props) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false); // pan cu mouse (desktop)
  const last = useRef({ x: 0, y: 0 });
  const areaRef = useRef<HTMLDivElement>(null);

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

  const toggleZoom = useCallback(() => {
    setScale((s) => (s > 1 ? 1 : 2.5));
    setPos({ x: 0, y: 0 });
  }, []);

  // Focus trap + Escape + blocare scroll + restaurare focus (a11y).
  const dialogRef = useFocusTrap<HTMLDivElement>(open, onClose);

  // Navigare cu săgeți.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  // Resetează zoom-ul când se schimbă imaginea sau se deschide.
  useEffect(() => {
    reset();
  }, [index, open, reset]);

  // ── Gesturi touch (native, non-passive) ─────────────────────────────────
  // Refs „live" ca efectul să depindă doar de `open` (fără closures învechite).
  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const posRef = useRef(pos);
  posRef.current = pos;
  const goRef = useRef(go);
  goRef.current = go;
  const toggleRef = useRef(toggleZoom);
  toggleRef.current = toggleZoom;

  useEffect(() => {
    if (!open) return;
    const el = areaRef.current;
    if (!el) return;

    const g = {
      mode: 'none' as 'none' | 'swipe' | 'pan' | 'pinch',
      startX: 0,
      startY: 0,
      startPos: { x: 0, y: 0 },
      pinchDist: 0,
      pinchScale: 1,
      dx: 0,
      dy: 0,
      lastTap: 0,
    };
    const distance = (a: Touch, b: Touch) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        g.mode = 'pinch';
        g.pinchDist = distance(e.touches[0], e.touches[1]);
        g.pinchScale = scaleRef.current;
        return;
      }
      const t = e.touches[0];
      const now = e.timeStamp;
      if (now - g.lastTap < 300) {
        // dublu-tap → zoom
        e.preventDefault();
        toggleRef.current();
        g.mode = 'none';
        g.lastTap = 0;
        return;
      }
      g.lastTap = now;
      g.startX = t.clientX;
      g.startY = t.clientY;
      g.startPos = { ...posRef.current };
      g.dx = 0;
      g.dy = 0;
      g.mode = scaleRef.current > 1 ? 'pan' : 'swipe';
    };

    const onMove = (e: TouchEvent) => {
      if (g.mode === 'pinch' && e.touches.length === 2) {
        e.preventDefault();
        const d = distance(e.touches[0], e.touches[1]);
        if (g.pinchDist > 0) {
          setScale(clamp(+(g.pinchScale * (d / g.pinchDist)).toFixed(3), MIN, MAX));
        }
        return;
      }
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      g.dx = t.clientX - g.startX;
      g.dy = t.clientY - g.startY;
      if (g.mode === 'pan') {
        e.preventDefault();
        setPos({ x: g.startPos.x + g.dx, y: g.startPos.y + g.dy });
      } else if (g.mode === 'swipe' && Math.abs(g.dx) > Math.abs(g.dy)) {
        // swipe orizontal — blochează scroll-ul vertical
        e.preventDefault();
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (g.mode === 'swipe' && Math.abs(g.dx) > SWIPE_THRESHOLD && Math.abs(g.dx) > Math.abs(g.dy)) {
        goRef.current(g.dx < 0 ? 1 : -1); // swipe stânga → poza următoare
      }
      if (e.touches.length === 0) {
        if (g.mode === 'pinch' && scaleRef.current <= 1.05) {
          setScale(1);
          setPos({ x: 0, y: 0 });
        }
        g.mode = 'none';
      } else if (e.touches.length === 1 && g.mode === 'pinch') {
        // pinch → un deget rămas: continuă ca pan/swipe
        const t = e.touches[0];
        g.startX = t.clientX;
        g.startY = t.clientY;
        g.startPos = { ...posRef.current };
        g.dx = 0;
        g.dy = 0;
        g.mode = scaleRef.current > 1 ? 'pan' : 'swipe';
      }
    };

    el.addEventListener('touchstart', onStart, { passive: false });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd, { passive: false });
    el.addEventListener('touchcancel', onEnd, { passive: false });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, [open]);

  // ── Zoom desktop (scroll/butoane) + pan cu mouse ─────────────────────────
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
  // Pan doar cu mouse-ul (touch e gestionat de listenerele native de mai sus).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || scale <= 1) return;
    dragging.current = true;
    last.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !dragging.current) return;
    setPos({ x: e.clientX - last.current.x, y: e.clientY - last.current.y });
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const hasMany = images.length > 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
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
                className="hidden h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold/50 disabled:opacity-40 sm:grid"
                aria-label="Micșorează"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => zoomBy(0.5)}
                disabled={scale >= MAX}
                className="hidden h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold/50 disabled:opacity-40 sm:grid"
                aria-label="Mărește"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={scale === 1 && pos.x === 0 && pos.y === 0}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold/50 disabled:opacity-40"
                aria-label="Resetează zoom"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-1 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold/50"
                aria-label="Închide galeria"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Zona imaginii */}
          <div
            ref={areaRef}
            className="relative flex flex-1 select-none items-center justify-center overflow-hidden px-4"
            style={{ touchAction: 'none' }}
            onWheel={onWheel}
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose(); // tap pe fundal închide
            }}
          >
            <img
              key={images[index]}
              src={images[index]}
              alt={`${alt} — imaginea ${index + 1}`}
              draggable={false}
              onDoubleClick={toggleZoom}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-premium"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                cursor: scale > 1 ? (dragging.current ? 'grabbing' : 'grab') : 'zoom-in',
                willChange: 'transform',
              }}
            />

            {/* Săgeți navigare (utile pe desktop; pe mobil merge și swipe) */}
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
            <div className="flex justify-center gap-2.5 overflow-x-auto px-4 py-5">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => {
                    reset();
                    onIndexChange(i);
                  }}
                  className={`relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border transition-all sm:h-16 sm:w-20 ${
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
          <p className="pb-3 text-center text-[11px] text-sand/70">
            <span className="sm:hidden">Glisează pentru a schimba poza · apropie două degete pentru zoom</span>
            <span className="hidden sm:inline">Scroll sau dublu-click pentru zoom · trage pentru a muta imaginea</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
