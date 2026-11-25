/**
 * Punto de entrada único del JS de la web (sin frameworks).
 * Cada módulo es independiente y respeta prefers-reduced-motion y el tipo de puntero.
 */
import { initHeader } from './header';
import { initReveal } from './reveal';
import { initSpotlight } from './spotlight';
import { initCounters } from './counters';
import { initTyping } from './typing';
import { initTimeline } from './timeline';
import { initPointerEffects } from './pointer';
import { initCopyButtons } from './copy';

initHeader();
initReveal();
initCounters();
initTimeline();
initTyping();
initSpotlight();
initPointerEffects();
initCopyButtons();
