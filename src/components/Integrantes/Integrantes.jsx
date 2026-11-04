import { useRef } from 'react';
import { MEMBROS } from '../../data/members';
import { useInView } from '../../hooks/useInView';
import { goTo, hasFinePointer, prefersReducedMotion } from '../../lib/motion';
import styles from './Integrantes.module.css';

function MemberCard({ name, role, photo, vacant, index }) {
  const cardRef = useRef(null);
  const seen = useInView(cardRef, { threshold: 0.15 });

  // inclina o card em 3D seguindo o mouse
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !hasFinePointer() || prefersReducedMotion()) return;
    const el = cardRef.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${((0.5 - y) * 9).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = cardRef.current;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <li
      ref={cardRef}
      className={`${styles.card} ${vacant ? styles.vacant : ''} ${seen ? styles.in : ''}`}
      style={{ '--delay': `${index * 0.12}s` }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className={styles.tilt}>
        <div className={styles.photoWrap}>
          {photo ? (
            <img src={photo} alt={`${name}, ${role}`} className={styles.photo} loading="lazy" draggable="false" />
          ) : (
            <div className={styles.empty}>
              <span>?</span>
              <button type="button" className={styles.call} onClick={() => goTo('contato')}>
                Toca bateria? Chama a gente
              </button>
            </div>
          )}
          <span className={styles.glare} aria-hidden="true" />
        </div>
        <div className={styles.caption}>
          <span className={styles.name}>{vacant ? 'Vaga aberta' : name}</span>
          <span className={styles.role}>{role}</span>
        </div>
      </div>
    </li>
  );
}

function Integrantes() {
  return (
    <section id="integrantes" className="section">
      <div className="wrap">
        <h2 className={`h2 ${styles.title}`}>Integrantes</h2>
        <ul className={styles.grid}>
          {MEMBROS.map((m, i) => (
            <MemberCard key={m.id} {...m} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Integrantes;
