import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import BioSection from './components/BioSection/BioSection';
import BloodDivider from './components/BloodDivider/BloodDivider';
import Integrantes from './components/Integrantes/Integrantes';
import Musica from './components/Musica/Musica';
import Setlist from './components/Setlist/Setlist';
import Agenda from './components/Agenda/Agenda';
import Contato from './components/Contato/Contato';
import Footer from './components/Footer/Footer';

function Home() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Maltevis — banda de rock alternativo de São José do Rio Preto';
  }, []);

  // vindo de uma página de letra: volta direto na seção pedida
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'auto' }), 60);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Hero />
        <BioSection />
        <BloodDivider />
        <Integrantes />
        <Musica />
        <Setlist />
        <Agenda />
        <Contato />
      </main>
      <Footer />
    </>
  );
}

export default Home;
