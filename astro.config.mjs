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
  // No usamos bloques de código Markdown.
  markdown: { syntaxHighlight: false },
  // La CSP vive solo en la cabecera de netlify.toml. No usamos la <meta> con hashes de Astro
  // porque bloquearía el distintivo que Netlify inyecta en el plan gratuito (scripts en línea
  // dentro de un iframe srcdoc, que hereda la política de la página).
  security: { csp: false },
  // Nuestro propio CSS siempre como archivo externo: la web no depende de nada en línea.
  build: { inlineStylesheets: 'never' },
  vite: {
    plugins: [tailwindcss()],
  },
});
