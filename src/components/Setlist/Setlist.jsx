import { Link } from 'react-router-dom';
import styles from './Setlist.module.css';

const TRACKS = [
  { id: '01', title: 'Untilted', href: '/letras/untilted' },
  { id: '02', title: 'Thunderstorm', href: '/letras/thunderstorm' },
  { id: '03', title: 'Remember', href: '/letras/remember' },
 //{ id: '04', title: 'Cerrado', href: '/letras/cerrado' },
  { id: '05', title: 'Shadows', href: '/letras/shadows' },
];

function Setlist() {
  return (
    <section id="setlist" className={styles.setlist}>
      <h2 className={styles.heading}>Setlist</h2>
      <ol className={styles.list}>
        {TRACKS.map((track) => (
          <li key={track.id} className={styles.row}>
            <span className={styles.number}>{track.id}</span>
            <Link to={track.href} className={styles.title}>
              {track.title}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Setlist;