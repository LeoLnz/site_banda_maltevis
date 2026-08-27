  import { useState } from 'react';
  import Navbar from './components/Navbar/Navbar';
  import HeroCarousel from './components/HeroCarousel/HeroCarousel';
  import BioSection from './components/BioSection/BioSection';
  import BloodDivider from './components/BloodDivider/BloodDivider';
  import Setlist from './components/Setlist/Setlist';
  import Contato from './components/Contato/Contato';
  import './App.css';

  function Home() {
    return (
      <div className="app-container">
        <Navbar />

        <main>
          <HeroCarousel>
            <BioSection />
          </HeroCarousel>

          <BloodDivider />

          <Setlist />

          <section id="agenda" className="section agenda">
            <h2><span className="section-index"></span> Agenda</h2>
            <ul className="date-list">
              <li className="date-row">
                <div className="date-block"><span className="date-day">20/09</span><span className="date-month">20H</span></div>
                <span className="date-venue">MIRASSOL SP - The Pub </span>
              </li>
              <li className="date-row">
                <div className="date-block"><span className="date-day">--</span><span className="date-month">---</span></div>
                <span className="date-venue">Local 2</span>
              </li>
              <li className="date-row">
                <div className="date-block"><span className="date-day">--</span><span className="date-month">---</span></div>
                <span className="date-venue">Local 3</span>
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