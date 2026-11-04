import { SHOWS } from '../../data/shows';
import { SITE } from '../../data/site';
import { goTo } from '../../lib/motion';
import styles from './Agenda.module.css';

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

function parse(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function daysUntil(date, today) {
  return Math.round((date - today) / 86400000);
}

function countdown(n) {
  if (n === 0) return 'É hoje';
  if (n === 1) return 'Amanhã';
  return `Em ${n} dias`;
}

function Row({ show, today, past }) {
  const date = parse(show.date);
  const n = daysUntil(date, today);
  const Tag = show.url && !past ? 'a' : 'div';
  const extra = show.url && !past ? { href: show.url, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <li>
      <Tag className={`${styles.row} ${past ? styles.past : ''}`} {...extra}>
        <div className={styles.date}>
          <span className={styles.day}>{String(date.getDate()).padStart(2, '0')}</span>
          <span className={styles.month}>
            {MESES[date.getMonth()]} {date.getFullYear()}
          </span>
        </div>
        <div className={styles.info}>
          <span className={styles.venue}>{show.venue}</span>
          <span className={styles.city}>
            {show.city} · {weekday.format(date)}, {show.time}
          </span>
        </div>
        {!past && <span className={styles.when}>{countdown(n)}</span>}
      </Tag>
    </li>
  );
}

function Agenda() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = SHOWS.filter((s) => parse(s.date) >= today).sort((a, b) => parse(a.date) - parse(b.date));
  const past = SHOWS.filter((s) => parse(s.date) < today).sort((a, b) => parse(b.date) - parse(a.date));

  return (
    <section id="agenda" className="section">
      <div className="wrap">
        <h2 className={`h2 ${styles.title}`}>Agenda</h2>

        {upcoming.length > 0 ? (
          <ul className={styles.list} aria-label="Próximos shows">
            {upcoming.map((s) => (
              <Row key={s.date + s.venue} show={s} today={today} />
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Nenhum show marcado por enquanto.</p>
            <p className={styles.emptyText}>
              Quer a Maltevis na sua casa de shows ou festival? Chame a gente. As datas novas saem primeiro no Instagram.
            </p>
            <div className={styles.emptyActions}>
              <button className="btn solid" onClick={() => goTo('contato')}>
                Contratar a banda
              </button>
              <a className="btn ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                Seguir no Instagram
              </a>
            </div>
          </div>
        )}

        {past.length > 0 && (
          <>
            <h3 className={styles.pastTitle}>Já rolou</h3>
            <ul className={styles.list} aria-label="Shows anteriores">
              {past.map((s) => (
                <Row key={s.date + s.venue} show={s} today={today} past />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default Agenda;
