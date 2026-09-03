import { useState, useEffect, useCallback } from 'react';
import styles from './HeroCarousel.module.css';

import smoke from '../../assets/igorcarrossel.jpg';
import stageLights from '../../assets/educarrossel.jpg';
import shadowCrowd from '../../assets/Carrosseltodoscor.png';

const SLIDES = [smoke, stageLights, shadowCrowd];
const AUTO_ROTATE_MS = 6000;

// TODO: trocar por link interno (#musicas) quando a seção de música existir
const YOUTUBE_URL = 'https://youtube.com/@bandamaltevis?si=LFaHJujwcf5udDqZ';

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className={styles.hero}
      style={{ backgroundImage: `url(${SLIDES[index]})` }}
    >
      <div className={styles.overlay} />

      <button
        className={`${styles.navButton} ${styles.navButtonPrev}`}
        onClick={() => goTo(index - 1)}
        aria-label="Slide anterior"
      >
        ‹
      </button>
      <button
        className={`${styles.navButton} ${styles.navButtonNext}`}
        onClick={() => goTo(index + 1)}
        aria-label="Próximo slide"
      >
        ›
      </button>

      <div className={styles.content}>
        <span className={styles.eyebrow}>Rock Alternativo / Nu Metal</span>
        <h1 className={styles.heroTagline}>Banda Maltevis</h1>
        <p className={styles.heroTagline}>
          Direto do palco pra você.
        </p>

        <div className={styles.heroCtas}>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            Assistir no YouTube
          </a>
          <a href="#agenda" className={styles.ctaSecondary}>
            Ver agenda
          </a>
        </div>
      </div>

      <div className={styles.dots}>
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;