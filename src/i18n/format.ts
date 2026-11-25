import type { Lang } from './utils';

/**
 * Convierte `**texto**` en <strong class="hl">texto</strong>, escapando el resto.
 * Úsalo con `set:html`: el contenido viene de nuestras colecciones, pero se escapa igualmente.
 */
export function rich(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong class="hl">$1</strong>');
}

/** Quita las marcas `**` (para meta descriptions, alt, prompts…). */
export function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1');
}

const locales: Record<Lang, string> = { es: 'es-ES', en: 'en-GB' };

/** "2026-02" → "Feb 2026" · "2021" → "2021" */
export function formatYM(value: string, lang: Lang): string {
  const [y, m] = value.split('-');
  if (!m) return y!;
  const date = new Date(Date.UTC(Number(y), Number(m) - 1, 1));
  const month = new Intl.DateTimeFormat(locales[lang], { month: 'short', timeZone: 'UTC' })
    .format(date)
    .replace('.', '');
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${y}`;
}
