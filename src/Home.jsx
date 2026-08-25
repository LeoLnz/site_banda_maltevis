import React, { useState } from 'react';
import './App.css';
import fotoBanda from './assets/foto-banda-sf.png';
import { Cross as Hamburger } from 'hamburger-react'

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="hamburger-menu">
          <Hamburger
            color="#e7e1d2"
            toggled={menuOpen}
            toggle={setMenuOpen}
          />
        </div>

        <div className="logo-container">
          <img
            src={fotoBanda}
            alt="Maltevis"
            className="navbar-logo-image"
          />
        </div>

        {menuOpen && (
          <nav className="dropdown-menu">
            <a href="#contato" onClick={handleLinkClick}>Contato</a>
            <a href="#setlist" onClick={handleLinkClick}>Setlist</a>
            <a href="#agenda" onClick={handleLinkClick}>Agenda</a>
          </nav>
        )}
      </header>

      <main className="main-content">
        <section id="home" className="section hero">
          <span className="eyebrow">Rock Alternativo — São José do Rio Preto, SP</span>
          <p>
            Maltevis é uma banda de rock alternativo que mistura elementos de NuMetal,
            Grunge e Trash Metal em suas músicas. Com letras provocativas e performances
            energéticas, a banda busca desafiar as convenções e criar uma experiência
            única para o público.
          </p>
          <div className="torn-divider" aria-hidden="true"></div>
        </section>

       <section id="setlist" className="section setlist">
          <h2><span className="section-index"></span> Setlist</h2>
          <ol className="track-list">
            <li>
              <span className="track-num">01</span>
              <a href="/letras/untilted" className="track-name" style={{ color: 'inherit', textDecoration: 'none' }}>Untilted</a>
            </li>
            <li>
              <span className="track-num">02</span>
              <a href="/letras/thunderstorm" className="track-name" style={{ color: 'inherit', textDecoration: 'none' }}>Thunderstorm</a>
            </li>
            <li>
              <span className="track-num">03</span>
              <a href="/letras/remember" className="track-name" style={{ color: 'inherit', textDecoration: 'none' }}>Remember</a>
            </li>
            <li>
              <span className="track-num">04</span>
              <a href="/letras/cerrado" className="track-name" style={{ color: 'inherit', textDecoration: 'none' }}>Cerrado</a>
            </li>
            <li>
              <span className="track-num">05</span>
              <a href="/letras/shadows" className="track-name" style={{ color: 'inherit', textDecoration: 'none' }}>Shadows</a>
            </li>
          </ol>
          <div className="torn-divider" aria-hidden="true"></div>
        </section>

        <section id="agenda" className="section agenda">
          <h2><span className="section-index">02</span> Agenda</h2>
          <ul className="date-list">
            <li className="date-row">
              <div className="date-block"><span className="date-day">--</span><span className="date-month">---</span></div>
              <span className="date-venue">Local 1</span>
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

        <section id="contato" className="section contato">
          <h2><span className="section-index">03</span> Contato</h2>
          <a className="contact-stamp" href="mailto:contato@maltevis.com">contato@maltevis.com</a>
        </section>
      </main>
    </div>
  );
}

export default Home; 