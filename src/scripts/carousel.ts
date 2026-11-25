import { prefersReducedMotion } from './env';

/**
 * Carruseles [data-carousel]: el desplazamiento es scroll-snap nativo; aquí solo se
 * conectan los botones anterior/siguiente, su estado y la barra de progreso.
 */
export function initCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
    const bar = root.querySelector<HTMLElement>('[data-carousel-bar]');
    if (!track || !prev || !next) return;

    const step = () => {
      const slide = track.querySelector<HTMLElement>('[data-slide]');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return slide ? slide.offsetWidth + gap : track.clientWidth * 0.8;
    };

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const x = track.scrollLeft;
      prev.disabled = x <= 2;
      next.disabled = x >= max - 2;
      root.toggleAttribute('data-at-end', max > 0 && x >= max - 2);
      // Fracción visible + avance: la barra llega al 100 % al final
      const visible = max > 0 ? track.clientWidth / track.scrollWidth : 1;
      const p = max > 0 ? visible + (1 - visible) * (x / max) : 1;
      bar?.style.setProperty('--p', p.toFixed(3));
    };

    // Cada clic apunta a la diapositiva siguiente/anterior a la última pedida,
    // así varios clics seguidos avanzan varias posiciones aunque la animación no haya terminado.
    let target = 0;
    let animating = false;
    let animTimer: ReturnType<typeof setTimeout> | undefined;
    const settle = () => {
      animating = false;
      clearTimeout(animTimer);
    };
    track.addEventListener('scrollend', settle);
    const go = (dir: 1 | -1) => {
      const s = step();
      const max = track.scrollWidth - track.clientWidth;
      const from = animating ? target : track.scrollLeft;
      target = Math.max(0, Math.min(max, (Math.round(from / s) + dir) * s));
      animating = true;
      clearTimeout(animTimer);
      animTimer = setTimeout(settle, 900); // por si el navegador no emite `scrollend`
      track.scrollTo({ left: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    };

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    addEventListener('resize', update, { passive: true });

    // Flechas del teclado cuando el foco está dentro del carrusel
    root.addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLButtonElement) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    });

    update();
  });
}
