import { hasFinePointer, prefersReducedMotion } from './env';

const MAX_TILT_DEG = 4;
const MAGNET_STRENGTH = 0.3;
const MAGNET_MAX_PX = 8;

/** Efectos de puntero fino (ratón/trackpad). Nunca en táctil ni con movimiento reducido. */
export function initPointerEffects(): void {
  if (!hasFinePointer() || prefersReducedMotion()) return;
  initTilt();
  initMagnetic();
}

/** Tilt 3D muy sutil de la tarjeta perfil.py (máx. 4°). */
function initTilt(): void {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const area = card.parentElement ?? card;
    area.addEventListener(
      'pointermove',
      (e) => {
        const r = area.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateX(${(-y * 2 * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(x * 2 * MAX_TILT_DEG).toFixed(2)}deg)`;
      },
      { passive: true },
    );
    area.addEventListener('pointerleave', () => (card.style.transform = ''));
  });
}

/** Iconos de contacto que siguen ligeramente al cursor. */
function initMagnetic(): void {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        const clamp = (v: number) => Math.max(-MAGNET_MAX_PX, Math.min(MAGNET_MAX_PX, v));
        const dx = clamp((e.clientX - (r.left + r.width / 2)) * MAGNET_STRENGTH);
        const dy = clamp((e.clientY - (r.top + r.height / 2)) * MAGNET_STRENGTH);
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      },
      { passive: true },
    );
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}
