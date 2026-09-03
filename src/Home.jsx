import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import BioSection from './components/BioSection/BioSection';
import Integrantes from './components/Integrantes/Integrantes';
import BloodDivider from './components/BloodDivider/BloodDivider';
import Setlist from './components/Setlist/Setlist';
import Contato from './components/Contato/Contato';

import './App.css';

function Home() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return;

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <HeroCarousel />

        <section id="sobre" className="section">
          <BioSection />
        </section>

        <BloodDivider />

        <Integrantes />

        <Setlist />

        <section id="agenda" className="section agenda">
          <h2><span className="section-index"></span> Agenda</h2>
          <ul className="date-list">
            <li className="date-row">
              <div className="date-block"><span className="date-day">30/05</span><span className="date-month">20H</span></div>
              <span className="date-venue">São José do Rio Preto SP - Jurema Club </span>
            </li>
            <li className="date-row">
              <div className="date-block"><span className="date-day">15/08</span><span className="date-month">21H</span></div>
              <span className="date-venue">São José do Rio Preto SP - Jurema Club</span>
            </li>
            <li className="date-row">
              <div className="date-block"><span className="date-day">20/09</span><span className="date-month">19H</span></div>
              <span className="date-venue">MIRASSOL SP - The Pub </span>
            </li>
          </ul>
          <div className="torn-divider" aria-hidden="true"></div>
        </section>

        <Contato />
      </main>
    </div>
  );
}

export default Home;