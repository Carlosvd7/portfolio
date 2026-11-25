import { hasFinePointer } from './env';

/** Spotlight: actualiza --x / --y con la posición del cursor dentro de cada [data-spotlight]. */
export function initSpotlight(): void {
  if (!hasFinePointer()) return;
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--x', `${e.clientX - r.left}px`);
        el.style.setProperty('--y', `${e.clientY - r.top}px`);
      },
      { passive: true },
    );
  });
}
