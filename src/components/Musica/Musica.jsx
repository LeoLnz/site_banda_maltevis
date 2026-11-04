import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TRACKS } from '../../data/tracks';
import { SITE } from '../../data/site';
import { eye } from '../EyeLogo/logoPaths';
import { parseLrc } from '../../lib/lrc';
import { prefersReducedMotion } from '../../lib/motion';
import styles from './Musica.module.css';

const BARS = 40;
const ARM_UP = -52; // agulha guardada, fora do disco (graus)
const ARM_DOWN = -10; // agulha no início do disco
const ARM_SWEEP = 10; // quanto ela "caminha" para dentro até o fim da música
const DROP_MS = 900; // tempo da agulha descer (igual à transição do CSS)
const LIFT_MS = 500;

const audioUrl = (file) => `${import.meta.env.BASE_URL}audio/${file}`;
const pad = (n) => String(n).padStart(2, '0');
const ms = (n) => (prefersReducedMotion() ? 0 : n);

function fmt(s) {
  if (!Number.isFinite(s) || s <= 0) return '0:00';
  return `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
}

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
  </svg>
);
const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 1.5h3v11H3zM8 1.5h3v11H8z" fill="currentColor" />
  </svg>
);
const SkipIcon = ({ flip }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M3 2.5v11l8-5.5zM12 2.5h1.8v11H12z" fill="currentColor" />
  </svg>
);

/** Braço do toca-discos (desenhado sobre o disco; coordenadas 0–100 = tamanho do disco). */
function Tonearm({ angle }) {
  return (
    <svg className={styles.armSvg} viewBox="0 0 100 100" aria-hidden="true">
      <g className={styles.arm} style={{ transform: `rotate(${angle}deg)` }}>
        <line x1="104" y1="2" x2="74.4" y2="28.4" stroke="#b9b2a2" strokeWidth="1.7" strokeLinecap="round" />
        <line x1="103" y1="1.6" x2="75" y2="26.6" stroke="#fff" strokeOpacity="0.28" strokeWidth="0.5" strokeLinecap="round" />
        <line x1="74.4" y1="28.4" x2="69.8" y2="32.5" stroke="#e7e1d2" strokeWidth="5.2" />
        <line x1="74.4" y1="28.4" x2="69.8" y2="32.5" stroke="#241c16" strokeWidth="3.8" />
        <circle cx="69.6" cy="32.7" r="0.9" fill="#e60000" />
      </g>
      <circle cx="104" cy="2" r="6.2" fill="#1b1611" stroke="#8f887a" strokeWidth="0.8" />
      <circle cx="104" cy="2" r="2.2" fill="#b52e2e" />
    </svg>
  );
}

/**
 * Caixa de letra com altura fixa.
 * Com `lrc` na música: o verso atual fica em destaque e a caixa rola junto.
 * Sem `lrc`: a caixa rola sozinha, proporcional ao tempo da música.
 */
function Lyrics({ track, time, dur, onSeek }) {
  const boxRef = useRef(null);
  const lineRefs = useRef([]);
  const userUntil = useRef(0);

  const data = useMemo(() => {
    const synced = parseLrc(track.lrc);
    if (synced.length) return { synced: true, lines: synced };
    const lines = track.lyrics.split('\n').map((l) => ({ text: l.trim() }));
    while (lines.length && !lines[lines.length - 1].text) lines.pop();
    return { synced: false, lines };
  }, [track]);

  let active = -1;
  if (data.synced) {
    for (let i = data.lines.length - 1; i >= 0; i--) {
      if (data.lines[i].t <= time + 0.12) {
        active = i;
        break;
      }
    }
    while (active >= 0 && !data.lines[active].text) active--;
  }

  // nova música: volta ao topo
  useEffect(() => {
    boxRef.current?.scrollTo({ top: 0 });
  }, [track]);

  // sincronizada: centraliza o verso atual
  useEffect(() => {
    const box = boxRef.current;
    const el = lineRefs.current[active];
    if (!box || !el || Date.now() < userUntil.current) return;
    box.scrollTo({
      top: el.offsetTop - box.clientHeight / 2 + el.offsetHeight / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [active]);

  // sem sincronia: rola proporcional ao tempo
  useEffect(() => {
    const box = boxRef.current;
    if (!box || data.synced || !dur || Date.now() < userUntil.current) return;
    const max = box.scrollHeight - box.clientHeight;
    const p = Math.min(1, Math.max(0, (time / dur - 0.04) / 0.9));
    box.scrollTop = max * p;
  }, [time, dur, data.synced]);

  // se a pessoa rolar com a mão, não briga com ela por uns segundos
  const hold = () => {
    userUntil.current = Date.now() + 4000;
  };

  return (
    <div
      ref={boxRef}
      className={`${styles.lyrics} ${data.synced ? styles.synced : ''}`}
      tabIndex={0}
      role="region"
      aria-label={`Letra de ${track.title}`}
      onWheel={hold}
      onTouchMove={hold}
      onPointerDown={hold}
    >
      {data.lines.map((line, i) =>
        line.text ? (
          <p
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            className={`${styles.line} ${i === active ? styles.hot : ''}`}
            onClick={data.synced ? () => onSeek(line.t) : undefined}
          >
            {line.text}
          </p>
        ) : (
          <span key={i} className={styles.gap} ref={(el) => (lineRefs.current[i] = el)} />
        ),
      )}
    </div>
  );
}

/**
 * Player de músicas. Áudios em public/audio/ (veja LEIAME.txt lá).
 *
 * Fluxo: apertar play numa música abre o modo estendido — a agulha desce,
 * o som começa quando ela encosta, a música vira destaque com a letra ao lado
 * do disco e as outras faixas ficam num menu.
 */
function Musica() {
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const barsRef = useRef([]);
  const nowRef = useRef(null);
  const timers = useRef([]);

  const [idx, setIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [arm, setArm] = useState('up');
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [meta, setMeta] = useState({}); // slug -> { dur } | { missing: true }

  const playable = (t) => Boolean(t.audio) && !meta[t.slug]?.missing;
  const anyPlayable = TRACKS.some(playable);
  const expanded = idx >= 0;
  const current = expanded ? TRACKS[idx] : null;
  const progress = dur ? Math.min(1, time / dur) : 0;

  // descobre duração de cada faixa e quais arquivos existem
  useEffect(() => {
    const probes = TRACKS.filter((t) => t.audio).map((t) => {
      const a = new Audio();
      a.preload = 'metadata';
      a.onloadedmetadata = () => setMeta((m) => ({ ...m, [t.slug]: { dur: a.duration } }));
      a.onerror = () => setMeta((m) => ({ ...m, [t.slug]: { missing: true } }));
      a.src = audioUrl(t.audio);
      return a;
    });
    return () =>
      probes.forEach((a) => {
        a.onloadedmetadata = a.onerror = null;
        a.removeAttribute('src');
        a.load();
      });
  }, []);

  // equalizador (Web Audio); se o navegador não deixar, anima de mentirinha
  const ensureAnalyser = () => {
    if (analyserRef.current || ctxRef.current === false) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      const an = ctx.createAnalyser();
      an.fftSize = 128;
      an.smoothingTimeConstant = 0.78;
      const src = ctx.createMediaElementSource(audioRef.current);
      src.connect(an);
      an.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = an;
    } catch {
      ctxRef.current = false;
    }
  };

  useEffect(() => {
    const bars = barsRef.current;
    const rest = () => bars.forEach((b) => b && (b.style.transform = 'scaleY(0.08)'));
    if (!playing || prefersReducedMotion()) {
      rest();
      return;
    }
    const an = analyserRef.current;
    const data = an ? new Uint8Array(an.frequencyBinCount) : null;
    let raf = 0;
    const tick = (t) => {
      if (an) an.getByteFrequencyData(data);
      bars.forEach((b, i) => {
        if (!b) return;
        const v = data
          ? data[Math.floor((i * data.length * 0.8) / BARS)] / 255
          : 0.1 + Math.abs(Math.sin(t / 260 + i * 0.55)) * 0.8;
        b.style.transform = `scaleY(${Math.max(0.08, v).toFixed(3)})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // sair da página para o som e cancela a sequência da agulha
  useEffect(() => {
    const a = audioRef.current;
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      a?.pause();
    };
  }, []);

  // menu das outras faixas: fecha com ESC ou clique fora
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onDown = (e) => {
      if (nowRef.current && !nowRef.current.contains(e.target)) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [menuOpen]);

  const later = (fn, wait) => timers.current.push(setTimeout(fn, wait));
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // agulha desce e, quando encosta, o som começa
  const dropAndPlay = () => {
    const a = audioRef.current;
    setArm('down');
    later(() => a.play().catch(() => setArm('up')), ms(DROP_MS));
  };

  /** Toca (ou pausa) a música i. Troca de música: agulha sobe, troca, desce. */
  const play = (i) => {
    const a = audioRef.current;
    const t = TRACKS[i];
    if (!t || !playable(t)) return;
    clearTimers();
    ensureAnalyser();
    ctxRef.current?.resume?.();

    if (i === idx) {
      if (!a.paused) {
        a.pause();
        setArm('up');
      } else dropAndPlay();
      return;
    }

    const swap = () => {
      setIdx(i);
      setTime(0);
      setDur(meta[t.slug]?.dur || 0);
      a.src = audioUrl(t.audio);
      dropAndPlay();
    };
    if (!a.paused || arm === 'down') {
      a.pause();
      setArm('up');
      later(swap, ms(LIFT_MS));
    } else swap();
  };

  const step = (dir) => {
    let i = idx < 0 ? (dir > 0 ? -1 : TRACKS.length) : idx;
    for (let n = 0; n < TRACKS.length; n++) {
      i = (i + dir + TRACKS.length) % TRACKS.length;
      if (playable(TRACKS[i])) return play(i);
    }
  };

  const onEnded = () => {
    const a = audioRef.current;
    a.currentTime = 0;
    setTime(0);
    setPlaying(false);
    setArm('up');
  };

  const onError = () => {
    if (idx < 0) return;
    setMeta((m) => ({ ...m, [TRACKS[idx].slug]: { missing: true } }));
    setPlaying(false);
    setArm('up');
  };

  const seekTo = (v) => {
    const a = audioRef.current;
    if (!a || idx < 0) return;
    a.currentTime = v;
    setTime(v);
  };

  // controles na tela de bloqueio do celular
  useEffect(() => {
    if (!('mediaSession' in navigator) || idx < 0) return;
    navigator.mediaSession.metadata = new MediaMetadata({ title: TRACKS[idx].title, artist: SITE.name });
    navigator.mediaSession.setActionHandler('play', () => play(idx));
    navigator.mediaSession.setActionHandler('pause', () => audioRef.current?.pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => step(-1));
    navigator.mediaSession.setActionHandler('nexttrack', () => step(1));
  });

  const streaming = Object.entries(SITE.streaming || {}).filter(([, url]) => url);
  const armAngle = arm === 'up' ? ARM_UP : ARM_DOWN + ARM_SWEEP * progress;

  return (
    <section id="musica" className={`section ${styles.section}`}>
      <div className="wrap">
        <h2 className={`h2 ${styles.title}`}>Ouça</h2>

        <div className={styles.player}>
          {/* ---------- coluna do disco ---------- */}
          <div className={styles.deck}>
            <div className={styles.stage}>
              <div className={`${styles.disc} ${playing ? styles.spin : ''}`} aria-hidden="true">
                <div className={styles.label}>
                  <svg viewBox="1642 185 57 74" className={styles.labelEye}>
                    <path d={eye} fill="#e60000" fillRule="evenodd" />
                  </svg>
                </div>
              </div>
              <Tonearm angle={armAngle} />
            </div>

            <div className={`${styles.panel} ${expanded ? styles.panelOpen : ''}`} inert={!expanded}>
              <div className={styles.panelInner}>
                <div className={styles.eq} aria-hidden="true">
                  {Array.from({ length: BARS }, (_, i) => (
                    <i key={i} ref={(el) => (barsRef.current[i] = el)} />
                  ))}
                </div>

                <input
                  type="range"
                  className={styles.seek}
                  min={0}
                  max={dur || 0}
                  step={0.1}
                  value={Math.min(time, dur || 0)}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  disabled={!expanded || !dur}
                  style={{ '--p': `${progress * 100}%` }}
                  aria-label="Posição da música"
                />
                <div className={styles.readout}>
                  <span>{fmt(time)}</span>
                  <span className={styles.nowTitle}>{current?.title}</span>
                  <span>{fmt(dur)}</span>
                </div>

                <div className={styles.controls}>
                  <button type="button" className={styles.skip} onClick={() => step(-1)} aria-label="Música anterior">
                    <SkipIcon flip />
                  </button>
                  <button
                    type="button"
                    className={styles.big}
                    onClick={() => play(idx)}
                    aria-label={playing ? 'Pausar' : 'Tocar'}
                  >
                    {playing ? <PauseIcon /> : <PlayIcon />}
                  </button>
                  <button type="button" className={styles.skip} onClick={() => step(1)} aria-label="Próxima música">
                    <SkipIcon />
                  </button>
                </div>
              </div>
            </div>

            {streaming.length > 0 && (
              <div className={styles.streams}>
                {streaming.map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                ))}
              </div>
            )}
            {!anyPlayable && <p className={styles.soon}>Os áudios entram em breve.</p>}
          </div>

          {/* ---------- coluna da direita ---------- */}
          {expanded ? (
            <div className={styles.now} ref={nowRef}>
              <div className={styles.head}>
              <button
                type="button"
                className={`${styles.featured} ${menuOpen ? styles.open : ''}`}
                aria-expanded={menuOpen}
                aria-controls="outras-faixas"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className={styles.fn}>{pad(idx + 1)}</span>
                <span className={styles.ft}>{current.title}</span>
                <span className={styles.fh}>
                  <span className={styles.fhText}>{menuOpen ? 'fechar' : 'outras faixas'}</span>
                  <i className={styles.burger} aria-hidden="true">
                    <b />
                    <b />
                    <b />
                  </i>
                </span>
              </button>

              <ul id="outras-faixas" className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`} inert={!menuOpen}>
                {TRACKS.map((t, i) =>
                  i === idx ? null : (
                    <li key={t.slug}>
                      <button
                        type="button"
                        className={styles.item}
                        disabled={!playable(t)}
                        onClick={() => {
                          setMenuOpen(false);
                          play(i);
                        }}
                      >
                        <span className={styles.n}>{pad(i + 1)}</span>
                        <span className={styles.itemTitle}>{t.title}</span>
                        <span className={styles.itemEnd}>{playable(t) ? fmt(meta[t.slug]?.dur) : 'em breve'}</span>
                      </button>
                    </li>
                  ),
                )}
              </ul>
              </div>

              <Lyrics track={current} time={time} dur={dur} onSeek={seekTo} />
            </div>
          ) : (
            <ol className={styles.tracks}>
              {TRACKS.map((t, i) => {
                const ok = playable(t);
                return (
                  <li key={t.slug} className={`${styles.row} ${ok ? '' : styles.off}`}>
                    <span className={styles.n}>{pad(i + 1)}</span>
                    <button type="button" className={styles.name} onClick={() => play(i)} disabled={!ok}>
                      <span className={styles.t}>{t.title}</span>
                      {t.note && <small>{t.note}</small>}
                    </button>
                    <Link to={`/letras/${t.slug}`} className={styles.lyr}>
                      letra
                    </Link>
                    <span className={styles.time}>{ok ? (meta[t.slug]?.dur ? fmt(meta[t.slug].dur) : '') : 'em breve'}</span>
                    <button
                      type="button"
                      className={styles.pbtn}
                      onClick={() => play(i)}
                      disabled={!ok}
                      aria-label={`Tocar ${t.title}`}
                    >
                      <PlayIcon />
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          setArm('up');
        }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onEnded={onEnded}
        onError={onError}
      />
    </section>
  );
}

export default Musica;
