/**
 * Mapa central de tecnologías y marcas: icono, color y nombre.
 * Ningún componente escribe iconos ni colores de marca a mano: todos leen de aquí.
 *
 * - `icon`: id de Iconify (`simple-icons:*` para marcas, `lucide:*` para conceptos).
 * - `color`: color oficial de la marca según Simple Icons. Cuando Simple Icons
 *   publica un color casi negro, se usa el color secundario oficial de la marca
 *   (anotado) o, si no lo hay, `--text-strong` automáticamente.
 */

export interface TechDef {
  icon: string;
  color: string;
  label: string;
}

const RAW = {
  // IA y Machine Learning
  python: { icon: 'simple-icons:python', color: '#3776AB', label: 'Python' },
  tensorflow: { icon: 'simple-icons:tensorflow', color: '#FF6F00', label: 'TensorFlow' },
  pandas: { icon: 'simple-icons:pandas', color: '#E70488', label: 'Pandas' }, // secundario oficial (SI: #150458)
  scikitlearn: { icon: 'simple-icons:scikitlearn', color: '#F7931E', label: 'scikit-learn' },
  numpy: { icon: 'simple-icons:numpy', color: '#4DABCF', label: 'NumPy' }, // secundario oficial (SI: #013243)
  anthropic: { icon: 'simple-icons:anthropic', color: '#191919', label: 'Anthropic' },
  openai: { icon: 'simple-icons:openai', color: '#412991', label: 'OpenAI' },
  mcp: { icon: 'simple-icons:modelcontextprotocol', color: '#000000', label: 'MCP' },
  mediapipe: { icon: 'simple-icons:mediapipe', color: '#0097A7', label: 'MediaPipe' },
  rag: { icon: 'lucide:file-search', color: '#8B7CFF', label: 'RAG' },
  langgraph: { icon: 'simple-icons:langgraph', color: '#7FC8FF', label: 'LangGraph' },
  embeddings: { icon: 'lucide:waypoints', color: '#8B7CFF', label: 'Embeddings' },
  lightgbm: { icon: 'lucide:trees', color: '#3DDC84', label: 'LightGBM' }, // sin logo en Simple Icons
  kaggle: { icon: 'simple-icons:kaggle', color: '#20BEFF', label: 'Kaggle' },

  // Datos
  sql: { icon: 'lucide:database-zap', color: '#8B7CFF', label: 'SQL' }, // concepto, sin marca
  postgresql: { icon: 'simple-icons:postgresql', color: '#4169E1', label: 'PostgreSQL' },
  mongodb: { icon: 'simple-icons:mongodb', color: '#47A248', label: 'MongoDB' },
  powerbi: { icon: 'simple-icons:powerbi', color: '#F2C811', label: 'Power BI' },
  databricks: { icon: 'simple-icons:databricks', color: '#FF3621', label: 'Databricks' },

  // Web y backend
  typescript: { icon: 'simple-icons:typescript', color: '#3178C6', label: 'TypeScript' },
  javascript: { icon: 'simple-icons:javascript', color: '#F7DF1E', label: 'JavaScript' },
  astro: { icon: 'simple-icons:astro', color: '#BC52EE', label: 'Astro' },
  nuxt: { icon: 'simple-icons:nuxt', color: '#00DC82', label: 'Nuxt' },
  vue: { icon: 'simple-icons:vuedotjs', color: '#4FC08D', label: 'Vue' },
  angular: { icon: 'simple-icons:angular', color: '#DD0031', label: 'Angular' }, // rojo oficial (SI: #0F0F11)
  nodejs: { icon: 'simple-icons:nodedotjs', color: '#5FA04E', label: 'Node.js' },
  java: { icon: 'simple-icons:openjdk', color: '#F89820', label: 'Java' }, // Java no está en SI: logo OpenJDK + naranja de Java
  quarkus: { icon: 'simple-icons:quarkus', color: '#4695EB', label: 'Quarkus' },
  django: { icon: 'simple-icons:django', color: '#44B78B', label: 'Django' }, // verde oficial (SI: #092E20)
  docker: { icon: 'simple-icons:docker', color: '#2496ED', label: 'Docker' },
  tailwindcss: { icon: 'simple-icons:tailwindcss', color: '#06B6D4', label: 'Tailwind CSS' },
  googlemaps: { icon: 'simple-icons:googlemaps', color: '#4285F4', label: 'Google Maps API' },

  // Microsoft y herramientas
  powerapps: { icon: 'simple-icons:powerapps', color: '#742774', label: 'Power Apps' },
  powerautomate: { icon: 'simple-icons:powerautomate', color: '#0066FF', label: 'Power Automate' },
  dataverse: { icon: 'simple-icons:dataverse', color: '#088142', label: 'Dataverse' },
  sharepoint: { icon: 'simple-icons:microsoftsharepoint', color: '#0078D4', label: 'SharePoint' },
  powerfx: { icon: 'simple-icons:powerfx', color: '#742774', label: 'Power Fx' },
  git: { icon: 'simple-icons:git', color: '#F03C2E', label: 'Git' },
  github: { icon: 'simple-icons:github', color: '#181717', label: 'GitHub' },
  netlify: { icon: 'simple-icons:netlify', color: '#00C7B7', label: 'Netlify' }, // teal oficial (SI: #000000)

  // Emisores de credenciales y redes
  google: { icon: 'simple-icons:google', color: '#4285F4', label: 'Google' },
  linkedin: { icon: 'simple-icons:linkedin', color: '#0A66C2', label: 'LinkedIn' },
  email: { icon: 'lucide:mail', color: '#FFB547', label: 'Email' },
  cv: { icon: 'lucide:file-down', color: '#FFB547', label: 'CV' },
  languages: { icon: 'lucide:languages', color: '#8B7CFF', label: 'Idiomas' },
} as const satisfies Record<string, TechDef>;

export type TechId = keyof typeof RAW;
export const techIds = Object.keys(RAW) as [TechId, ...TechId[]];

/**
 * Logos oficiales a todo color (set `logos` de Iconify) para los tiles del stack.
 * Solo marcas cuyo logo se lee bien sobre fondo oscuro; el resto usa `icon` en su color de marca.
 */
const COLOR_LOGOS: Partial<Record<TechId, string>> = {
  python: 'logos:python',
  tensorflow: 'logos:tensorflow',
  pandas: 'logos:pandas-icon',
  numpy: 'logos:numpy',
  postgresql: 'logos:postgresql',
  mongodb: 'logos:mongodb-icon',
  powerbi: 'logos:microsoft-power-bi',
  typescript: 'logos:typescript-icon',
  javascript: 'logos:javascript',
  nuxt: 'logos:nuxt-icon',
  vue: 'logos:vue',
  angular: 'logos:angular-icon',
  nodejs: 'logos:nodejs-icon',
  java: 'logos:java',
  quarkus: 'logos:quarkus-icon',
  docker: 'logos:docker-icon',
  tailwindcss: 'logos:tailwindcss-icon',
  googlemaps: 'logos:google-maps',
  git: 'logos:git-icon',
  netlify: 'logos:netlify-icon',
  google: 'logos:google-icon',
};

/* ---------- Contraste: colores demasiado oscuros pasan a --text-strong ---------- */
const SURFACE = '#111118';
const MIN_CONTRAST = 3; // WCAG 1.4.11 para gráficos y componentes de interfaz

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0]! + 0.7152 * ch[1]! + 0.0722 * ch[2]!;
}

function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Color visible sobre el fondo oscuro (marca o `--text-strong`). */
export function displayColor(hex: string): string {
  return contrast(hex, SURFACE) >= MIN_CONTRAST ? hex : 'var(--text-strong)';
}

export function getTech(id: TechId): TechDef & { display: string; logo?: string } {
  const t = RAW[id];
  return { ...t, display: displayColor(t.color), logo: COLOR_LOGOS[id] };
}
