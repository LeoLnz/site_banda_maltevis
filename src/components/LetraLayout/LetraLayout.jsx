import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './LetraLayout.module.css';

function Arrow({ flip }) {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LetraLayout({ title, number, total, lyrics, youtubeUrl, prev, next }) {
  useEffect(() => {
    document.title = `${title} — letra | Maltevis`;
    return () => {
      document.title = 'Maltevis — banda de rock alternativo de São José do Rio Preto';
    };
  }, [title]);

  // estrofes separadas por linha em branco; cada linha entra com um pequeno atraso
  const stanzas = lyrics
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').map((l) => l.trim()).filter(Boolean))
    .filter((lines) => lines.length);
  let n = 0;

  return (
    <div className={styles.page}>
      <Link to="/" state={{ scrollTo: 'setlist' }} className={styles.back}>
        <Arrow flip /> Voltar ao setlist
      </Link>

      <main className={styles.main} id="main" tabIndex={-1}>
        <header className={styles.head}>
          <span className={styles.ghost} aria-hidden="true">
            {number}
          </span>
          <p className={styles.meta}>
            Faixa {number} de {String(total).padStart(2, '0')}
          </p>
          <h1 className={styles.title}>{title}</h1>
          {youtubeUrl && (
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn solid">
              Ouvir no YouTube
            </a>
          )}
        </header>

        {stanzas.length ? (
          <div className={styles.lyrics}>
            {stanzas.map((lines, s) => (
              <p key={s} className={styles.stanza}>
                {lines.map((line, i) => (
                  <span key={i} className={styles.line} style={{ '--n': Math.min(n++, 36) }}>
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Letra em breve.</p>
        )}

        <nav className={styles.pager} aria-label="Outras músicas">
          {prev ? (
            <Link to={`/letras/${prev.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>
                <Arrow flip /> Anterior
              </span>
              <span className={styles.pagerTitle}>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/letras/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
              <span className={styles.pagerLabel}>
                Próxima <Arrow />
              </span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
    </div>
  );
}

export default LetraLayout;
