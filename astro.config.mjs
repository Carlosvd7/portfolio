// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Cambia esta URL si conectas un dominio propio (p. ej. https://carlosvelazquez.dev)
const SITE = 'https://carlosvelazquez.netlify.app';

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
  // CSP con hashes generados en build para los scripts y estilos en línea.
  security: { csp: true },
  vite: {
    plugins: [tailwindcss()],
  },
});
