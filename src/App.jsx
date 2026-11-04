import { useCallback, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Letra from './Letra';
import Preloader from './components/Preloader/Preloader';
import { markIntroDone, shouldPlayIntro } from './lib/motion';

function AppRoutes() {
  const location = useLocation();

  // toda página nova começa no topo (a não ser que peça uma seção)
  useEffect(() => {
    if (!location.state?.scrollTo) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.state]);

  return (
    <div key={location.pathname} className="page">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/letras/:slug" element={<Letra />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  const [intro, setIntro] = useState(shouldPlayIntro);
  const endIntro = useCallback(() => setIntro(false), []);

  useEffect(() => {
    if (!intro) markIntroDone();
  }, [intro]);

  return (
    <HashRouter>
      <a
        className="skip"
        href="#/"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      {intro && <Preloader onDone={endIntro} />}
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
