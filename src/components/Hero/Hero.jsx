import { useCallback, useEffect, useRef, useState } from 'react';
import EyeLogo from '../EyeLogo/EyeLogo';
import { SLIDES } from '../../data/slides';
import { SITE } from '../../data/site';
import { goTo, prefersReducedMotion } from '../../lib/motion';
import styles from './Hero.module.css';

const SLIDE_MS = 7000;

export default function Hero() {
  const rootRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const touchX = useRef(null);

  const go = useCallback((i) => setIndex((i + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setIndex((v) => (v + 1) % SLIDES.length), []);

  // Lanterna: a foto é em preto e vermelho; perto do cursor ela ganha cor.
  // Sem mouse (celular), a luz passeia sozinha pelo palco.
  useEffect(() => {
    const root = rootRef.current;
    if (prefersReducedMotion()) {
      root.style.setProperty('--mx', '50%');
      root.style.setProperty('--my', '45%');
      return;
    }
    const pos = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    let lastPointer = -1e9;
    let raf = 0;
    let visible = true;

    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      tgt.x = e.clientX - r.left;
      tgt.y = e.clientY - r.top;
      lastPointer = performance.now();
    };
    const tick = (t) => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (t - lastPointer > 2500) {
        tgt.x = w * (0.5 + 0.3 * Math.sin(t / 2600));
        tgt.y = h * (0.5 + 0.18 * Math.sin(t / 1900 + 1));
      }
      pos.x += (tgt.x - pos.x) * 0.09;
      pos.y += (tgt.y - pos.y) * 0.09;
      root.style.setProperty('--mx', `${pos.x.toFixed(1)}px`);
      root.style.setProperty('--my', `${pos.y.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };

    pos.x = tgt.x = root.clientWidth / 2;
    pos.y = tgt.y = root.clientHeight / 2;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(root);
    root.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
    };
  }, []);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  const layer = (cls) => (
    <div className={cls} aria-hidden="true">
      {SLIDES.map((s, n) => (
        <img
          key={n}
          src={s.src}
          alt=""
          draggable="false"
          decoding="async"
          style={{ objectPosition: s.pos }}
          className={`${styles.img} ${n === index ? styles.active : ''}`}
        />
      ))}
    </div>
  );

  return (
    <section
      id="home"
      ref={rootRef}
      className={styles.hero}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {layer(styles.mono)}
      <div className={styles.tint} aria-hidden="true" />
      {layer(styles.color)}
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.content}>
        <p className={`${styles.kicker} ${styles.rise}`} style={{ '--d': '0.1s' }}>
          Rock alternativo / Nu Metal
        </p>
        <h1 className={styles.logoWrap}>
          <EyeLogo track />
        </h1>
        <p className={`${styles.tagline} ${styles.rise}`} style={{ '--d': '0.75s' }}>
          Direto do palco pra você.
        </p>
        <div className={`${styles.ctas} ${styles.rise}`} style={{ '--d': '0.95s' }}>
          <a className="btn solid" href={SITE.youtube} target="_blank" rel="noopener noreferrer">
            Assistir no YouTube
          </a>
          <button className="btn ghost" onClick={() => goTo('agenda')}>
            Ver agenda
          </button>
        </div>
      </div>

      <div
        className={`${styles.controls} ${styles.rise}`}
        style={{ '--d': '1.2s' }}
        onPointerEnter={() => setHold(true)}
        onPointerLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        <button className={styles.arrow} onClick={() => go(index - 1)} aria-label="Foto anterior">
          ‹
        </button>
        <div className={styles.bars} role="group" aria-label="Fotos da banda">
          {SLIDES.map((_, n) => (
            <button
              key={n}
              className={`${styles.bar} ${n < index ? styles.done : ''} ${n === index ? styles.on : ''} ${hold ? styles.hold : ''}`}
              onClick={() => go(n)}
              aria-label={`Foto ${n + 1} de ${SLIDES.length}`}
              aria-current={n === index}
            >
              <span
                className={styles.fill}
                style={{ '--ms': `${SLIDE_MS}ms` }}
                onAnimationEnd={n === index ? next : undefined}
              />
            </button>
          ))}
        </div>
        <button className={styles.arrow} onClick={() => go(index + 1)} aria-label="Próxima foto">
          ›
        </button>
      </div>

      <button className={styles.cue} onClick={() => goTo('sobre')} aria-label="Rolar para baixo">
        <span>rolar</span>
        <i />
      </button>
    </section>
  );
}
