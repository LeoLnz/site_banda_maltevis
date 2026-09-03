import { Link } from 'react-router-dom';
import styles from './LetraLayout.module.css';

function LetraLayout({ title, trackNumber, lyrics, youtubeUrl }) {
  return (
    <div className={styles.page}>
      <Link to="/" state={{ scrollTo: 'setlist' }} className={styles.backLink}>
  ← Voltar para o Setlist
</Link>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.meta}>Faixa {trackNumber} — Letra e Informações</p>

        {youtubeUrl && (
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.listenButton}
          >
            Ouvir no YouTube
          </a>
        )}

        {lyrics ? (
          <div className={styles.lyrics}>{lyrics}</div>
        ) : (
          <p className={styles.placeholder}>Letra em breve.</p>
        )}
      </main>
    </div>
  );
}

export default LetraLayout;