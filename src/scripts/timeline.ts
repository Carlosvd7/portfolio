import { prefersReducedMotion } from './env';

/**
 * Línea de tiempo: la barra se rellena según avanza el scroll y cada nodo
 * se ilumina (`.is-lit`) cuando la línea llega a él. Solo trabaja mientras
 * la línea de tiempo está cerca de la pantalla.
 */
export function initTimeline(): void {
  const tl = document.querySelector<HTMLElement>('[data-timeline]');
  const fill = tl?.querySelector<HTMLElement>('[data-timeline-fill]');
  if (!tl || !fill) return;
  const items = [...tl.querySelectorAll<HTMLElement>('[data-tl-item]')];

  if (prefersReducedMotion()) {
    items.forEach((i) => i.classList.add('is-lit'));
    return;
  }

  let queued = false;
  const update = () => {
    queued = false;
    const anchor = innerHeight * 0.62;
    const r = tl.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
    fill.style.setProperty('--progress', progress.toFixed(4));
    for (const item of items) {
      const node = item.querySelector('[data-tl-node]');
      if (node) item.classList.toggle('is-lit', node.getBoundingClientRect().top < anchor);
    }
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };

  new IntersectionObserver(
    ([e]) => {
      if (e?.isIntersecting) {
        addEventListener('scroll', onScroll, { passive: true });
        addEventListener('resize', onScroll, { passive: true });
        onScroll();
      } else {
        removeEventListener('scroll', onScroll);
        removeEventListener('resize', onScroll);
        update();
      }
    },
    { rootMargin: '25% 0px' },
  ).observe(tl);
  update();
}
