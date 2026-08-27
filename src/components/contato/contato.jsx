import styles from './Contato.module.css';
import ElectricBorder from '../ElectricBorder/ElectricBorder';

function Contato() {
  return (
    <section id="contato" className={styles.contatoSection}>
      <div className={styles.cardContainer}>
        <ElectricBorder color="#b52e2e" speed={1} chaos={0.15} borderRadius={4}>
          <div className={styles.cardContent}>
            <h2 className={styles.title}>Contato</h2>
            <p className={styles.text}>
              Para shows, parcerias e orçamentos, entre em contato através do nosso e-mail oficial:
            </p>
            <a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=bandamaltevis@gmail.com&su=Contato%20para%20Shows%20e%20Parcerias" 
  target="_blank" 
  rel="noopener noreferrer" 
  className={styles.emailLink}
>
  bandamaltevis@gmail.com
</a>        
          </div>
        </ElectricBorder>
      </div>
    </section>
  );
}

export default Contato;