import { prefersReducedMotion } from './env';

const CYCLE_MS = 8000;

/**
 * Terminal del hero: escribe el comando carácter a carácter, muestra la respuesta
 * y repite cada 8 s. Se pausa fuera de pantalla o con la pestaña oculta.
 * Con movimiento reducido se queda el texto completo y estático.
 */
export function initTyping(): void {
  const root = document.querySelector<HTMLElement>('[data-terminal]');
  const cmd = root?.querySelector<HTMLElement>('[data-type-cmd]');
  const out = root?.querySelector<HTMLElement>('[data-type-out]');
  if (!root || !cmd || !out || prefersReducedMotion()) return;

  const text = cmd.dataset.text ?? cmd.textContent ?? '';
  let onScreen = true;
  new IntersectionObserver(([e]) => (onScreen = !!e?.isIntersecting)).observe(root);

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
  const canRun = async () => {
    while (!onScreen || document.hidden) await sleep(400);
  };

  const cycle = async () => {
    await canRun();
    const start = performance.now();
    out.setAttribute('data-hidden', '');
    cmd.textContent = '';
    await sleep(450);
    for (let i = 1; i <= text.length; i++) {
      cmd.textContent = text.slice(0, i);
      // Ritmo humano: arranque pausado y pequeñas variaciones
      await sleep(i < 4 ? 110 : 32 + Math.random() * 45);
    }
    await sleep(380);
    out.removeAttribute('data-hidden');
    await sleep(Math.max(1500, CYCLE_MS - (performance.now() - start)));
    void cycle();
  };
  void cycle();
}
