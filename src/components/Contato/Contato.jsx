import { useEffect, useRef, useState } from 'react';
import ElectricBorder from '../ElectricBorder/ElectricBorder';
import { SocialLinks } from '../Navbar/Navbar';
import { SITE } from '../../data/site';
import styles from './Contato.module.css';

const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}&su=${encodeURIComponent('Contato para Shows e Parcerias')}`;

function Contato() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch {
      window.prompt('Copie o e-mail:', SITE.email);
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contato" className={`section ${styles.section}`}>
      <div className={styles.cardContainer}>
        <ElectricBorder color="#b52e2e" speed={1} chaos={0.15} borderRadius={4}>
          <div className={styles.cardContent}>
            <h2 className={`h2 ${styles.title}`}>Contato</h2>
            <p className={styles.text}>Para shows, parcerias e orçamentos, fale com a gente pelo e-mail oficial:</p>

            <a href={GMAIL} target="_blank" rel="noopener noreferrer" className={styles.emailLink}>
              {SITE.email}
            </a>

            <div className={styles.actions}>
              <button type="button" className={styles.copy} onClick={copy}>
                {copied ? 'E-mail copiado' : 'Copiar e-mail'}
              </button>
              <span className={styles.sep} aria-hidden="true" />
              <div className={styles.social}>
                <SocialLinks />
              </div>
            </div>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? 'E-mail copiado' : ''}
            </span>
          </div>
        </ElectricBorder>
      </div>
    </section>
  );
}

export default Contato;
