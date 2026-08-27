import { useState, useEffect, useCallback } from 'react';
import styles from './HeroCarousel.module.css';

// 1. Importando as imagens diretamente da pasta assets
import smoke from '../../assets/igorcarrossel.jpg';
import stageLights from '../../assets/educarrossel.jpg';
import shadowCrowd from '../../assets/todoscarrossel.jpg';

// 2. Usando as variáveis importadas em vez de strings de texto
const SLIDES = [
  smoke,
  stageLights,
  shadowCrowd,
];

const AUTO_ROTATE_MS = 6000;

function HeroCarousel({ children }) {
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
      // O Vite agora vai substituir o SLIDES[index] pelo caminho real gerado na compilação
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

      <div className={styles.content}>{children}</div>

      <div className={styles.dots}>
        {SLIDES.map((slide, i) => (
          <button
            key={i} // Melhor usar o índice como key aqui para evitar conflitos de nome
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