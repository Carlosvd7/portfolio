# Portfolio · Carlos Manuel Velázquez

Portfolio personal de **Carlos Manuel Velázquez Diego**, *AI & Software Engineer*.
Una web estática, rápida y accesible, en español (`/`) e inglés (`/en/`), desplegada en Netlify.

- **Stack:** Astro 7 (salida estática) · TypeScript strict · Tailwind CSS v4 · Content Collections con Zod · astro-icon (Simple Icons + Lucide) · Fontsource
- **JavaScript en cliente:** unos 4 KB gzip, en TypeScript vanilla y sin frameworks
- **Calidad medida:** Lighthouse 98–100 en Performance, Accesibilidad, Buenas prácticas y SEO (móvil y escritorio) · CLS 0 · contraste AA en todo el texto

---

## Puesta en marcha

Requisitos: **Node 24** (el archivo `.nvmrc` lo indica; con nvm basta `nvm use 24`).

```bash
npm install
npm run dev        # http://localhost:4321 con recarga en caliente
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera la web en `dist/` (incluye imágenes OG, sitemap y robots.txt) |
| `npm run preview` | Sirve `dist/` tal como quedará en producción |
| `npm run check` | Comprueba los tipos (`astro check`) y el contraste de color (WCAG AA) |
| `npm run cv:placeholder` | Regenera el PDF provisional del CV |
| `./scripts/lighthouse.ps1` | Lighthouse en móvil y escritorio contra un `npm run preview` en marcha (`-Base http://localhost:4321`) |

---

## Cómo editar el contenido

Todo el contenido vive en `src/content/` como YAML, **un archivo por entrada**, con los textos en los dos idiomas en el mismo archivo. Ningún texto está escrito dentro de los componentes.

```yaml
# src/content/projects/mi-proyecto.yaml
order: 5                     # posición en la lista
featured: false              # true = tarjeta grande destacada
title:  { es: Mi proyecto, en: My project }
label:  { es: Datos · Kaggle, en: Data · Kaggle }
description:
  es: Texto con una **frase clave resaltada**.
  en: Text with a **highlighted key phrase**.
status: done                 # live | in-progress | done
icon: lucide:chart-line      # icono de la cabecera (https://lucide.dev/icons)
tech: [python, pandas]       # ids de src/data/tech.ts
links:
  repo: https://github.com/Carlosvd7/mi-proyecto
```

| Qué quieres cambiar | Dónde |
|---|---|
| Experiencia y formación | `src/content/experience/`, `src/content/education/` |
| Proyectos | `src/content/projects/` (imágenes en `src/assets/projects/`) |
| Grupos del stack | `src/content/stack/` |
| Credenciales (`verifyUrl` vacío = sin enlace "Verificar") | `src/content/credentials/` |
| Métricas del bloque de cifras | `src/data/metrics.ts` |
| Email, LinkedIn, GitHub, CV y nombre | `src/data/site.ts` |
| Tecnologías: icono, color de marca y nombre | `src/data/tech.ts` |
| Textos de la interfaz (botones, títulos…) | `src/i18n/es.ts` y `src/i18n/en.ts` |
| Colores y tipografías (tokens) | `src/styles/global.css` (bloque `:root`) |
| Dominio | `astro.config.mjs` → `SITE` |

Si un esquema no se cumple (falta un idioma, una fecha mal escrita, una tecnología que no existe…), `npm run build` falla y dice exactamente qué archivo y qué campo revisar.

---

## Despliegue en Netlify

### 1. Subir el código a GitHub

**Desde VS Code (lo más sencillo):** abre la carpeta → icono *Source Control* → **Publish to GitHub** → elige **public repository** con el nombre `portfolio`.

**O desde la terminal**, después de crear en github.com un repositorio público vacío llamado `portfolio`:

```bash
git remote add origin https://github.com/Carlosvd7/portfolio.git
git push -u origin main
```

### 2. Conectar Netlify

1. En [app.netlify.com](https://app.netlify.com): **Add new site → Import an existing project → GitHub**.
2. Elige el repositorio `Carlosvd7/portfolio`. Netlify lee `netlify.toml`, así que **no hay que configurar nada**: comando `npm run build`, carpeta `dist`, Node 24.
3. Pulsa **Deploy**. En uno o dos minutos la web estará publicada.

A partir de aquí, **cada `git push` a `main` despliega automáticamente**.

### 3. Poner un nombre bonito

- **Subdominio gratuito:** *Site configuration → Change site name* → `carlosmanuelvelazquez` → la web queda en `https://carlosmanuelvelazquez.netlify.app` (es la URL que ya está configurada en `astro.config.mjs`).
- **Dominio propio** (p. ej. `carlosmanuelvelazquez.dev`): *Domain management → Add a domain*, sigue las instrucciones de DNS y cambia `SITE` en `astro.config.mjs`. Netlify activa HTTPS solo.

> Si el subdominio `carlosmanuelvelazquez` ya está cogido, elige otro y actualiza `SITE` en `astro.config.mjs`: de él dependen la URL canónica, el sitemap, el `hreflang` y la imagen de Open Graph.

### 4. Comprobar y enlazar desde LinkedIn

1. Abre la web publicada en el móvil y en el ordenador; prueba `Ctrl K`, el cambio de idioma y la descarga del CV.
2. Comprueba la vista previa al compartir en el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/) (debe salir la imagen OG).
3. En LinkedIn:
   - **Información de contacto → Sitio web** → pega la URL (tipo *Portfolio*).
   - **Destacado → Añadir enlace** → la URL de la web.

---

## Seguridad y rendimiento

- **CSP por cabecera** (`netlify.toml`): todo se carga desde el propio dominio, `frame-ancestors 'none'`, `object-src 'none'`… Nuestro código no usa ningún script ni estilo en línea. La política permite `'unsafe-inline'`, fuentes `data:` y el formulario hacia `app.netlify.com` **solo porque Netlify inyecta su distintivo obligatorio del plan gratuito**; si un día no hace falta (plan de pago o dominio sin distintivo), el comentario de `netlify.toml` indica la versión estricta.
- Los colores de marca de cada tecnología salen de `/brands.css` (generado en build) para no usar atributos `style` en el HTML.
- Cabeceras: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`, `X-Frame-Options`, y caché inmutable de 1 año para `/_astro/*`.
- Privacidad: la web no muestra teléfono, dirección, DNI ni fecha de nacimiento.
- **Nota sobre `npm audit`:** avisa de 2 vulnerabilidades moderadas en `fflate`, una dependencia interna de `satori` (generador de la imagen OG). Solo se ejecuta en el build con fuentes propias y nunca llega al navegador, así que no supone riesgo. La "solución" que propone npm baja `satori` a una versión antigua incompatible; se revisará cuando `satori` publique una versión corregida.

---

## Fase 2: asistente de IA (preparado, no implementado)

La command palette ya tiene la entrada "Pregúntale a mi asistente de IA" marcada como **Próximamente**. Para activarlo:

1. Crear `netlify/functions/ask.ts` (Netlify Function) que:
   - reciba `{ question, lang }` por `POST`;
   - construya el *system prompt* a partir de las colecciones de `src/content/` (experiencia, proyectos, stack, credenciales);
   - llame a la API de Claude con la key leída de `process.env.ANTHROPIC_API_KEY`;
   - limite peticiones (por ejemplo, N por IP y hora) y la longitud de la pregunta.
2. En Netlify: *Site configuration → Environment variables* → `ANTHROPIC_API_KEY` (nunca en el repositorio).
3. En `src/scripts/assistant.ts`, implementar el proveedor que hace `fetch('/.netlify/functions/ask')` y exportarlo como `assistant` (`available: true`). La paleta mostrará entonces el chat en lugar del aviso.
4. La CSP ya permite `connect-src 'self'`, así que no hace falta tocar `netlify.toml`.

---

## Estructura

```
src/
  components/   Header, Hero, CodeCard, Terminal, AskBar, CommandPalette, Metrics,
                SectionHeader, Timeline, ProjectFeatured, ProjectCard, StackGroup,
                TechChip, CredentialCard, Contact, Footer, HomePage
  content/      experience/ education/ projects/ credentials/ stack/  (YAML)
  content.config.ts   esquemas Zod de las colecciones
  data/         site.ts · tech.ts · metrics.ts
  i18n/         es.ts · en.ts · utils.ts · format.ts
  layouts/      BaseLayout.astro (SEO, JSON-LD, fuentes, fondo)
  pages/        index · en/index · 404 · og/[lang].png · brands.css · robots.txt
  scripts/      main · header · reveal · spotlight · counters · typing · timeline
                pointer · copy · palette · assistant · env
  styles/       global.css (tokens, utilidades, animaciones, reduced motion)
public/         favicon.svg · cv/
scripts/        check-contrast.mjs · lighthouse.ps1 · make-cv-placeholder.mjs
netlify.toml
```

---

## Pendiente de Carlos

- [x] **URL de LinkedIn** en `src/data/site.ts` (`links.linkedin`).
- [ ] **CV real** en PDF: sustituir `public/cv/Carlos-Velazquez-CV.pdf` (mismo nombre). El actual es provisional.
- [ ] **Logos** de NTT DATA, UCM y UPSA (opcional): guardarlos en `src/assets/logos/` y descomentar la línea `logo:` de cada YAML. Ahora se muestran sus iniciales.
- [ ] **GIF o vídeo de la demo** de lengua de signos: `src/assets/projects/` y añadir `image:` en `lengua-de-signos.yaml` (quitar `demoPending`).
- [ ] **Enlaces de verificación** de las credenciales: rellenar `verifyUrl` en cada archivo de `src/content/credentials/`.
- [ ] **Repo de calculaCasa:** si lo haces público, añadir `repo:` en `calculacasa.yaml` y aparecerá el botón "Código".
- [ ] **Identidad de Git:** tus commits salen como `DESKTOP-EBDJR8J\Carlos Manuel <Carlos Manuel>` y GitHub no los asocia a tu perfil. Arréglalo con `git config --global user.name "Carlos Manuel Velázquez"` y `git config --global user.email "<email de tu cuenta de GitHub>"`.
- [ ] **Fase 2:** asistente de IA (ver sección anterior).
