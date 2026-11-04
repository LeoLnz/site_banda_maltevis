import { useEffect, useState } from 'react';

// Devolve true quando o elemento entra na tela (uma vez só).
export function useInView(ref, { threshold = 0.2, rootMargin = '0px 0px -8% 0px' } = {}) {
  const [seen, setSeen] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold, rootMargin]);

  return seen;
}
