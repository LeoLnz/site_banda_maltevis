import { Link } from 'react-router-dom';
import { TRACKS } from '../../data/tracks';
import { SITE } from '../../data/site';
import styles from './Setlist.module.css';

function Arrow() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
      <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Setlist() {
  return (
    <section id="setlist" className="section">
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.head}>
          <h2 className="h2">Setlist</h2>
          <p className={styles.lead}>Toque em uma música para ler a letra.</p>
        </div>

        <ol className={styles.list}>
          {TRACKS.map((track, i) => (
            <li key={track.slug}>
              <Link to={`/letras/${track.slug}`} className={styles.row}>
                <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.title}>{track.title}</span>
                <span className={styles.go}>
                  <span>Ler letra</span>
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <a className={`btn ghost ${styles.yt}`} href={SITE.youtube} target="_blank" rel="noopener noreferrer">
          Ouvir no YouTube
        </a>
      </div>
    </section>
  );
}

export default Setlist;
