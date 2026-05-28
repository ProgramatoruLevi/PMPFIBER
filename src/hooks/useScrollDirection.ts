import { useEffect, useState } from 'react';

/**
 * Întoarce `true` când acțiunile plutitoare ar trebui să fie vizibile:
 * - aproape de partea de sus a paginii, SAU
 * - când utilizatorul derulează în SUS (semnal că vrea acțiuni/navigare).
 * Se ascund la derulare în JOS (citire), ca să nu acopere conținutul.
 */
export function useShowOnScrollUp(threshold = 12): boolean {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) > threshold) {
        // Vizibil lângă vârf sau la derulare în sus; ascuns la derulare în jos.
        setShow(y < 80 || delta < 0);
        last = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return show;
}
