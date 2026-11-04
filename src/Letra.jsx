import { Navigate, useParams } from 'react-router-dom';
import LetraLayout from './components/LetraLayout/LetraLayout';
import { TRACKS } from './data/tracks';

// Página única para todas as letras: /letras/<slug>. Edite em src/data/tracks.js
function Letra() {
  const { slug } = useParams();
  const i = TRACKS.findIndex((t) => t.slug === slug);
  if (i === -1) return <Navigate to="/" replace />;
  const track = TRACKS[i];

  return (
    <LetraLayout
      title={track.title}
      number={String(i + 1).padStart(2, '0')}
      total={TRACKS.length}
      lyrics={track.lyrics}
      youtubeUrl={track.youtube || null}
      prev={TRACKS[i - 1]}
      next={TRACKS[i + 1]}
    />
  );
}

export default Letra;
