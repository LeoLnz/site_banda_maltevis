// Pequenas ferramentas de movimento e navegação compartilhadas.

export const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

// Rola até uma seção da home. (O site usa HashRouter, então links "#id" não funcionam.)
export function goTo(id) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

// Abertura (olho que abre) — toca só na primeira visita de cada sessão.
export function shouldPlayIntro() {
  try {
    if (prefersReducedMotion()) return false;
    return !sessionStorage.getItem('mvs-intro');
  } catch {
    return true;
  }
}

export function markIntroDone() {
  document.documentElement.dataset.intro = 'done';
  try {
    sessionStorage.setItem('mvs-intro', '1');
  } catch {
    /* sem storage: ok */
  }
}
