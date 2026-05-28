import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Focus trap accesibil pentru modale/drawere (WCAG 2.1.2 / 2.4.3).
 * - mută focusul în container la deschidere
 * - prinde Tab/Shift+Tab între primul și ultimul element focusabil
 * - închide la Escape
 * - readuce focusul pe elementul declanșator la închidere
 * - blochează scroll-ul body cât e activ
 */
export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  onClose?: () => void,
) {
  const ref = useRef<T | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  // Păstrăm onClose într-un ref ca să NU reexecutăm efectul (și să nu furăm
  // focusul) când părintele re-randează cu un onClose nou (ex. navigarea cu
  // săgeți în Lightbox declanșează re-render). Efectul depinde doar de `active`.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    restoreRef.current = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    // Focus inițial: primul element focusabil, altfel containerul.
    const first = focusables()[0];
    (first ?? node).focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current?.();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && (activeEl === firstEl || activeEl === node)) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && activeEl === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.({ preventScroll: true });
    };
    // Intenționat doar [active]: onClose e accesat prin ref (vezi mai sus).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return ref;
}
