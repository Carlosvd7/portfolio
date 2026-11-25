// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Cambia esta URL si conectas un dominio propio (p. ej. https://carlosmanuelvelazquez.dev)
const SITE = 'https://carlosmanuelvelazquez.netlify.app';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    icon({ iconDir: 'src/icons' }),
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-US' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  // No usamos bloques de código Markdown; Shiki es incompatible con la CSP.
  markdown: { syntaxHighlight: false },
  // CSP con hashes generados en build (meta). netlify.toml añade la cabecera con el resto
  // de directivas (default-src, frame-ancestors…), que solo funcionan como cabecera HTTP.
  security: { csp: true },
  // Todo el CSS como archivo externo: ningún <style> en línea que la cabecera CSP tenga que permitir.
  build: { inlineStylesheets: 'never' },
  vite: {
    plugins: [tailwindcss()],
  },
});
