import { useEffect, useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react';
import { SITE } from '../../data/site';
import { goTo } from '../../lib/motion';
import logo from '../../assets/MALTEVIS_logo_vector.svg';
import styles from './Navbar.module.css';

const LEFT = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'integrantes', label: 'Integrantes' },
  { id: 'musica', label: 'Música' },
];
const RIGHT = [
  { id: 'setlist', label: 'Setlist' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'contato', label: 'Contato' },
];
const ALL = [...LEFT, ...RIGHT];

function InstagramIcon() {
  return (
    <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function YoutubeLink({ className = '' }) {
  return (
    <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube da Maltevis" className={className}>
      <YoutubeIcon />
    </a>
  );
}

export function InstagramLink({ className = '' }) {
  return (
    <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Maltevis" className={className}>
      <InstagramIcon />
    </a>
  );
}

export function SocialLinks({ className = '' }) {
  return (
    <>
      <YoutubeLink className={className} />
      <InstagramLink className={className} />
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [active, setActive] = useState('');

  // fundo, logo e barra de progresso de leitura
  useEffect(() => {
    const bar = document.getElementById('read-progress');
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setSolid(y > 24);
      setShowLogo(y > window.innerHeight * 0.55);
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // destaca o link da seção que está na tela
  useEffect(() => {
    const els = ALL.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById('home');
    const ioHero = new IntersectionObserver(([e]) => e.isIntersecting && setActive(''), { threshold: 0.5 });
    if (hero) ioHero.observe(hero);
    return () => {
      io.disconnect();
      ioHero.disconnect();
    };
  }, []);

  // menu do celular: trava a rolagem e fecha com ESC
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    goTo(id);
  };

  const link = (item) => (
    <a
      key={item.id}
      href="#/"
      onClick={go(item.id)}
      className={`${styles.link} ${active === item.id ? styles.active : ''}`}
      aria-current={active === item.id ? 'true' : undefined}
    >
      {item.label}
    </a>
  );

  return (
    <>
      <header className={`${styles.navbar} ${solid || open ? styles.solid : ''}`}>
        <nav className={styles.left} aria-label="Principal">
          {LEFT.map(link)}
        </nav>

        <div className={styles.center}>
          <YoutubeLink className={styles.social} />
          <a
            href="#/"
            onClick={go('home')}
            className={`${styles.logo} ${showLogo || open ? styles.logoOn : ''}`}
            aria-label="Maltevis — voltar ao topo"
            tabIndex={showLogo ? 0 : -1}
          >
            <img src={logo} alt="" />
          </a>
          <InstagramLink className={styles.social} />
        </div>

        <nav className={styles.right} aria-label="Principal, continuação">
          {RIGHT.map(link)}
        </nav>

        <div className={styles.burger}>
          <Hamburger color="#e7e1d2" toggled={open} toggle={setOpen} size={22} label="Abrir menu" />
        </div>

        <div id="read-progress" className={styles.progress} aria-hidden="true" />
      </header>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} aria-hidden={!open}>
        <nav className={styles.sheetNav} aria-label="Menu">
          {ALL.map((item, n) => (
            <a key={item.id} href="#/" onClick={go(item.id)} style={{ '--n': n }} tabIndex={open ? 0 : -1}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.sheetSocial}>
          <SocialLinks />
        </div>
      </div>
    </>
  );
}
