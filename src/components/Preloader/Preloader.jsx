import { useEffect, useState } from 'react';
import { eye } from '../EyeLogo/logoPaths';
import { SLIDES } from '../../data/slides';
import { markIntroDone } from '../../lib/motion';
import styles from './Preloader.module.css';

/** Abertura: um olho vermelho pisca e as pálpebras se abrem revelando o site. */
export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState('in'); // in -> open

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let cancelled = false;

    const minWait = new Promise((r) => setTimeout(r, 1500));
    const imgReady = new Promise((r) => {
      const img = new Image();
      img.onload = img.onerror = r;
      img.src = SLIDES[0].src;
      setTimeout(r, 3500); // nunca prende o visitante
    });

    Promise.all([minWait, imgReady]).then(() => {
      if (cancelled) return;
      setPhase('open');
      markIntroDone();
      setTimeout(() => {
        if (cancelled) return;
        document.body.style.overflow = '';
        onDone?.();
      }, 1100);
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div className={`${styles.root} ${phase === 'open' ? styles.open : ''}`} aria-hidden="true">
      <div className={styles.lidTop} />
      <div className={styles.lidBottom} />
      <svg className={styles.eye} viewBox="1642 185 57 74">
        <path d={eye} fill="#e60000" fillRule="evenodd" />
      </svg>
    </div>
  );
}
