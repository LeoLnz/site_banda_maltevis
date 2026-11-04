// Integrantes. Para trocar uma foto, substitua o arquivo em src/assets/img/.
// vacant: true mostra o card de "vaga aberta".
import leo from '../assets/img/membro-leo.webp';
import edu from '../assets/img/membro-edu.webp';
import igor from '../assets/img/membro-igor.webp';

export const MEMBROS = [
  { id: 'leo', name: 'Leonardo Ferreira', role: 'Vocal / Guitarra', photo: leo },
  { id: 'edu', name: 'Eduardo Baudelaire', role: 'Guitarra', photo: edu },
  { id: 'igor', name: 'Igor Manchi', role: 'Baixo', photo: igor },
  { id: 'bat', name: null, role: 'Bateria', photo: null, vacant: true },
];
