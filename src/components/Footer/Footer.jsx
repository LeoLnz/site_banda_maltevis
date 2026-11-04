import { SITE } from '../../data/site';
import { goTo } from '../../lib/motion';
import { SocialLinks } from '../Navbar/Navbar';
import logo from '../../assets/MALTEVIS_logo_vector.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.torn} aria-hidden="true" />
      <div className={`wrap ${styles.inner}`}>
        <img src={logo} alt="Maltevis" className={styles.logo} />
        <div className={styles.social}>
          <SocialLinks />
        </div>
        <button className={styles.top} onClick={() => goTo('home')}>
          Voltar ao topo ↑
        </button>
      </div>
      <p className={styles.legal}>
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados. Fotos: {SITE.photoCredit}.
      </p>
    </footer>
  );
}

export default Footer;
