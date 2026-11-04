import { useEffect, useRef } from 'react';
import { shadow, ink, eye } from './logoPaths';
import { prefersReducedMotion } from '../../lib/motion';
import styles from './EyeLogo.module.css';

// Área útil do SVG original e posição do olho (em unidades do viewBox)
const VB = { x: 52, w: 1754 };
const EYE = { cx: 1670.5, cy: 222 };
const RANGE = { x: 9, y: 11 }; // até onde a pupila anda dentro do "buraco" do S

/**
 * Logo da banda. Com track=true o olho vermelho segue o cursor,
 * pisca sozinho (e ao clicar) e, sem mouse, fica olhando em volta.
 */
export default function EyeLogo({ track = false, className = '' }) {
  const svgRef = useRef(null);
  const lookRef = useRef(null);
  const pupilRef = useRef(null);

  useEffect(() => {
    if (!track || prefersReducedMotion()) return;
    const svg = svgRef.current;
    const look = lookRef.current;
    const pupil = pupilRef.current;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let lastPointer = -1e9;
    let nextWander = 0;
    let raf = 0;
    let blinkTimer = 0;
    let visible = true;

    const onMove = (e) => {
      lastPointer = performance.now();
      const r = svg.getBoundingClientRect();
      const k = r.width / VB.w;
      const cx = r.left + (EYE.cx - VB.x) * k;
      const cy = r.top + EYE.cy * k;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      const f = Math.min(1, d / (r.width * 0.45));
      target.x = (dx / d) * f * RANGE.x;
      target.y = (dy / d) * f * RANGE.y;
    };

    const tick = (t) => {
      if (t - lastPointer > 2800 && t > nextWander) {
        nextWander = t + 1500 + Math.random() * 2300;
        target.x = (Math.random() * 2 - 1) * RANGE.x;
        target.y = (Math.random() * 2 - 1) * RANGE.y * 0.7;
      }
      cur.x += (target.x - cur.x) * 0.14;
      cur.y += (target.y - cur.y) * 0.14;
      look.setAttribute('transform', `translate(${cur.x.toFixed(2)} ${cur.y.toFixed(2)})`);
      raf = requestAnimationFrame(tick);
    };

    const blink = () => {
      pupil.classList.remove(styles.blink);
      void pupil.getBoundingClientRect(); // reinicia a animação
      pupil.classList.add(styles.blink);
    };
    const scheduleBlink = () => {
      blinkTimer = setTimeout(() => {
        if (visible) blink();
        scheduleBlink();
      }, 3000 + Math.random() * 4500);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(svg);

    window.addEventListener('pointermove', onMove, { passive: true });
    svg.addEventListener('click', blink);
    scheduleBlink();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(blinkTimer);
      window.removeEventListener('pointermove', onMove);
      svg.removeEventListener('click', blink);
    };
  }, [track]);

  return (
    <svg
      ref={svgRef}
      className={`${styles.logo} ${className}`}
      viewBox="52 0 1754 837"
      role="img"
      aria-label="Maltevis"
      focusable="false"
    >
      <path d={shadow} fill="#000" fillRule="evenodd" />
      <path d={ink} fill="#f4efe3" fillRule="evenodd" />
      <g ref={lookRef} className={styles.glow}>
        <path ref={pupilRef} className={styles.eye} d={eye} fill="#e60000" fillRule="evenodd" />
      </g>
    </svg>
  );
}
