/**
 * Imagen Open Graph 1200×630 generada en build (una por idioma): /og/es.png y /og/en.png.
 * satori (layout → SVG) + resvg (SVG → PNG). No añade nada de JS al cliente.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { site } from '../../data/site';
import { useT, type Lang } from '../../i18n/utils';

export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'es' } }, { params: { lang: 'en' } }];

const font = (pkg: string, file: string) => readFile(new URL(`../../../node_modules/@fontsource/${pkg}/files/${file}`, import.meta.url));

type Node = { type: string; props: Record<string, unknown> & { style?: Record<string, unknown>; children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({ type, props: { style, children } });

const C = {
  bg: '#09090D',
  surface: '#111118',
  border: '#2F2F3D',
  text: '#ECECF1',
  strong: '#F4F4F8',
  muted: '#A9A9B8',
  accent: '#FFB547',
  violet: '#8B7CFF',
  ok: '#3DDC84',
  key: '#7FC8FF',
  str: '#FFCF87',
  cls: '#B8AEFF',
};

export const GET: APIRoute = async ({ params }) => {
  const lang = (params.lang === 'en' ? 'en' : 'es') as Lang;
  const t = useT(lang);
  const [grotesk, mono, inter] = await Promise.all([
    font('space-grotesk', 'space-grotesk-latin-700-normal.woff'),
    font('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff'),
    font('inter', 'inter-latin-500-normal.woff'),
  ]);

  const code = (k: string, v: string) =>
    h('div', { display: 'flex' }, [
      h('span', { color: C.key, marginLeft: 28 }, k),
      h('span', { color: '#FF8FA3' }, '='),
      h('span', { color: C.str }, v),
      h('span', { color: C.muted }, ','),
    ]);

  const tree = h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      position: 'relative',
      backgroundColor: C.bg,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
      backgroundSize: '28px 28px',
      fontFamily: 'Inter',
      color: C.text,
      overflow: 'hidden',
    },
    [
      // Glows
      h('div', { position: 'absolute', top: -330, right: -260, width: 820, height: 820, borderRadius: 9999, backgroundImage: 'radial-gradient(circle, rgba(139,124,255,0.32), rgba(139,124,255,0) 68%)' }),
      h('div', { position: 'absolute', top: -300, left: -300, width: 760, height: 760, borderRadius: 9999, backgroundImage: 'radial-gradient(circle, rgba(255,181,71,0.18), rgba(255,181,71,0) 68%)' }),

      // Columna de texto
      h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 0 60px 72px', width: 700 }, [
        h('div', { display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 26, color: C.strong }, [
          h('span', { color: C.violet }, '~/'),
          h('span', {}, 'carlos.velazquez'),
          h('span', { color: C.accent }, '_'),
        ]),
        h('div', { display: 'flex', flexDirection: 'column' }, [
          h('div', { display: 'flex', fontFamily: 'Space Grotesk', fontSize: 82, lineHeight: 1, letterSpacing: -3, color: C.strong }, 'Carlos Manuel'),
          h('div', { display: 'flex', fontFamily: 'Space Grotesk', fontSize: 82, lineHeight: 1.05, letterSpacing: -3, color: C.accent }, 'Velázquez'),
          h('div', { display: 'flex', marginTop: 26, fontFamily: 'Space Grotesk', fontSize: 34, color: C.strong }, site.role),
          h('div', { display: 'flex', marginTop: 14, fontSize: 24, lineHeight: 1.4, color: C.muted, maxWidth: 600 }, t.hero.subtitle),
        ]),
        h('div', { display: 'flex', alignItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 20, color: C.muted }, [
          h('div', { display: 'flex', alignItems: 'center', padding: '8px 16px', border: `1px solid ${C.border}`, borderRadius: 999, backgroundColor: 'rgba(17,17,24,0.8)' }, [
            h('div', { width: 10, height: 10, borderRadius: 9999, backgroundColor: C.ok, marginRight: 10 }),
            h('span', { color: C.ok }, t.hero.status),
          ]),
          h('span', { marginLeft: 18 }, new URL(import.meta.env.SITE).host),
        ]),
      ]),

      // Tarjeta perfil.py
      h('div', { display: 'flex', alignItems: 'center', paddingRight: 64 }, [
        h(
          'div',
          {
            display: 'flex',
            flexDirection: 'column',
            width: 400,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            backgroundColor: 'rgba(17,17,24,0.92)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
            fontFamily: 'JetBrains Mono',
            fontSize: 17,
            lineHeight: 1.9,
          },
          [
            h('div', { display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: `1px solid #23232E` }, [
              h('div', { width: 12, height: 12, borderRadius: 9999, backgroundColor: '#FF5F57', marginRight: 7 }),
              h('div', { width: 12, height: 12, borderRadius: 9999, backgroundColor: '#FEBC2E', marginRight: 7 }),
              h('div', { width: 12, height: 12, borderRadius: 9999, backgroundColor: '#28C840', marginRight: 16 }),
              h('span', { color: C.text, fontSize: 15 }, lang === 'es' ? 'perfil.py' : 'profile.py'),
            ]),
            h('div', { display: 'flex', flexDirection: 'column', padding: '16px 20px 18px' }, [
              h('div', { display: 'flex' }, [
                h('span', { color: C.strong, whiteSpace: 'pre' }, 'carlos '),
                h('span', { color: '#FF8FA3', whiteSpace: 'pre' }, '= '),
                h('span', { color: C.cls }, lang === 'es' ? 'Ingeniero' : 'Engineer'),
                h('span', { color: C.muted }, '('),
              ]),
              code(lang === 'es' ? 'foco' : 'focus', lang === 'es' ? '"IA + datos"' : '"AI + data"'),
              code('stack', '"Python, SQL"'),
              code('base', '"Madrid"'),
              h('span', { color: C.muted }, ')'),
              h('div', { display: 'flex', marginTop: 12, paddingTop: 12, borderTop: '1px solid #23232E', color: C.ok, fontSize: 16 }, '>>> match: 0.97'),
            ]),
          ],
        ),
      ]),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Space Grotesk', data: grotesk, weight: 700, style: 'normal' },
      { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' },
      { name: 'Inter', data: inter, weight: 500, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
