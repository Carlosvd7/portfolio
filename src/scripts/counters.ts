import { onceVisible, prefersReducedMotion } from './env';

const DURATION = 1400;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Contadores: cada [data-count] cuenta de 0 a su valor al entrar en pantalla.
 * Es decorativo (aria-hidden): el valor real está en un texto sr-only junto a él.
 */
export function initCounters(): void {
  if (prefersReducedMotion()) return;
  const els = [...document.querySelectorAll<HTMLElement>('[data-count]')];
  const pending = els.filter((el) => el.getBoundingClientRect().top > innerHeight * 0.85);
  pending.forEach((el) => (el.textContent = '0'));

  onceVisible(
    pending,
    (el) => {
      const target = Number(el.dataset.count);
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION);
        el.textContent = String(Math.round(target * easeOutExpo(p)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    { threshold: 0.6 },
  );
}
