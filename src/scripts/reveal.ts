import { onceVisible } from './env';

/**
 * Scroll reveal: añade `.is-revealed` a cada [data-reveal] la primera vez que entra en pantalla.
 * Los que entran a la vez se escalonan 80 ms. La animación vive en CSS (global.css).
 */
export function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  onceVisible(
    els,
    (el, i) => {
      el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 80}ms`);
      el.classList.add('is-revealed');
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
}
