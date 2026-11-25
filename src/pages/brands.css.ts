import type { APIRoute } from 'astro';
import { techIds, getTech } from '../data/tech';

/**
 * Hoja generada en build: [data-brand="python"]{--brand:#3776AB} …
 * Los componentes usan `data-brand` en vez de `style="..."`, compatible con la CSP.
 */
export const GET: APIRoute = () => {
  const css = techIds.map((id) => `[data-brand="${id}"]{--brand:${getTech(id).display}}`).join('\n');
  return new Response(css, { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
};
