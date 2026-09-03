import styles from './Integrantes.module.css';

// Para adicionar foto, importe a imagem no topo
// (ex: import fotoLeo from '../../assets/integrantes/leo.jpg') e passe em `photo`.
const MEMBROS = [
  { id: 'm1', name: 'Leonardo Ferreira', role: 'Vocal / Guitarra', photo: null },
  { id: 'm2', name: 'Eduardo Baudelaire', role: 'Guitarra', photo: null },
  { id: 'm3', name: 'Igor Manchi', role: 'Baixo', photo: null },
  { id: 'm4', name: null, role: 'Bateria', photo: null, vacant: true },
];

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function MemberCard({ name, role, photo, vacant }) {
  return (
    <div className={`${styles.card} ${vacant ? styles.cardVacant : ''}`} tabIndex={0}>
      <div className={styles.photoWrap}>
        {photo ? (
          <img src={photo} alt={name} className={styles.photo} loading="lazy" />
        ) : vacant ? (
          <div className={styles.vacantPlaceholder} aria-hidden="true">
            <span className={styles.vacantMark}>?</span>
          </div>
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            <span>{getInitials(name)}</span>
          </div>
        )}
      </div>
      <div className={styles.caption}>
        <span className={styles.name}>{vacant ? 'Vaga aberta' : name}</span>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
}

function Integrantes() {
  return (
    <section id="integrantes" className={styles.integrantesSection}>
      <h2 className={styles.title}>Integrantes</h2>
      <div className={styles.grid}>
        {MEMBROS.map((membro) => (
          <MemberCard key={membro.id} {...membro} />
        ))}
      </div>
    </section>
  );
}

export default Integrantes;