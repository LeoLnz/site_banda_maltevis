import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/motion';
import styles from './BioSection.module.css';

const TEXT =
  'Maltevis é uma banda de rock alternativo que mistura elementos de Nu-Metal, Grunge e Thrash Metal em suas músicas. Com letras provocativas e performances energéticas, a banda busca desafiar as convenções e criar uma experiência única para o público enquanto se divertem.';

const WORDS = TEXT.split(' ');

/** O texto "acende" palavra por palavra conforme a pessoa rola a página. */
export default function BioSection() {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1.2');
      return;
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.82 - r.top) / (r.height + vh * 0.12);
      el.style.setProperty('--p', Math.max(0, Math.min(1.2, p)).toFixed(3));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="sobre" className={`section ${styles.sobre}`}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.side}>
          <h2 className="h2">Sobre</h2>
          <p className={styles.place}>São José do Rio Preto, SP</p>
        </div>
        <p ref={textRef} className={styles.text} aria-label={TEXT}>
          {WORDS.map((w, i) => (
            <span key={i} className={styles.word} style={{ '--i': (i / WORDS.length).toFixed(3) }} aria-hidden="true">
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
