import styles from './BioSection.module.css';


function BioSection() {
  return (
    <div className={styles.bio}>
      <span className={styles.eyebrow}>
        Rock Alternativo — São José do Rio Preto, SP
      </span>
      <p className={styles.text}>
        Maltevis é uma banda de rock alternativo que mistura elementos de Nu-Metal,
        Grunge e Thrash Metal em suas músicas. Com letras provocativas e performances
        energéticas, a banda busca desafiar as convenções e criar uma experiência
        única para o público.
      </p>
    </div>
  );
}



export default BioSection;


