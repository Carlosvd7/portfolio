const es = {
  meta: {
    title: 'Carlos Manuel Velázquez · AI & Software Engineer',
    description:
      'Ingeniero informático (UPSA) con experiencia en NTT DATA. Construyo productos reales con IA, Machine Learning y datos. Disponible para nuevos retos.',
    ogAlt: 'Carlos Manuel Velázquez, AI & Software Engineer',
  },
  a11y: {
    skip: 'Saltar al contenido',
    home: 'Inicio, Carlos Velázquez',
    mainNav: 'Navegación principal',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    langSwitch: 'Cambiar idioma',
    openPalette: 'Abrir la paleta de comandos',
    newTab: '(se abre en una pestaña nueva)',
  },
  nav: {
    experience: 'Experiencia',
    projects: 'Proyectos',
    stack: 'Stack',
    credentials: 'Credenciales',
    contact: 'Contacto',
  },
  hero: {
    status: 'Disponible',
    greeting: 'Hola, soy',
    name: 'Carlos',
    subtitle: 'Convierto datos en productos: modelos de Machine Learning, IA generativa y webs que llegan a producción.',
    intro:
      'Ingeniero informático (UPSA) con experiencia en **NTT DATA**. En 2027 empiezo el **Máster en Big Data, Data Science e IA** de la UCM.',
    ctaExperience: 'Ver experiencia',
    ctaCv: 'Descargar CV',
    codeLabel: 'Perfil de Carlos escrito como código Python',
    terminalLabel: 'Terminal: predicción de encaje entre Carlos y tu equipo',
    terminalCmd: '>>> modelo.predict(carlos, tu_equipo)',
    terminalOut: 'match: 0.97  ✓ recomendación: contratar',
  },
  ask: {
    label: 'Pregúntale a mi asistente de IA',
    soon: 'Próximamente',
  },
  metrics: {
    title: 'Resultados en cifras',
  },
  sections: {
    experience: 'Experiencia y formación',
    projects: 'Proyectos',
    stack: 'Stack',
    credentials: 'Credenciales',
  },
  timeline: {
    upcoming: 'Próximamente',
    since: 'Desde',
    present: 'Actualidad',
    logoOf: 'Logo de',
  },
  projects: {
    featured: 'Proyecto destacado',
    live: 'Live',
    inProgress: 'En desarrollo',
    visit: 'Visitar web',
    code: 'Código',
    demoSoon: 'Demo en vídeo próximamente',
    more: 'Más proyectos en GitHub',
    moreHint: 'Entre otros, Mapas interactivos con Angular, Node.js, MongoDB y Google Maps API.',
  },
  stack: {
    techCount: '{n} tecnologías',
  },
  credentials: {
    verify: 'Verificar',
    languages: 'Idiomas',
  },
  contact: {
    title: '¿Construimos algo juntos?',
    subtitle: 'Busco mi siguiente reto en desarrollo de software, IA y datos.',
    copy: 'Copiar email',
    copied: 'Copiado',
    socialTitle: 'Encuéntrame también en',
  },
  footer: {
    builtWith: 'Hecho con Astro y desplegado en Netlify',
    backToTop: 'Volver arriba',
  },
  palette: {
    title: 'Paleta de comandos',
    placeholder: 'Escribe un comando o busca…',
    empty: 'Sin resultados',
    groups: { goto: 'Ir a', open: 'Abrir', actions: 'Acciones', ai: 'IA' },
    copyEmail: 'Copiar email',
    downloadCv: 'Descargar CV',
    switchLang: 'Ver en English',
    askAi: 'Pregúntale a mi asistente de IA',
    askAiSoon:
      'Muy pronto podrás preguntar a un asistente con Claude que conoce mi experiencia, proyectos y stack. Mientras tanto, escríbeme directamente.',
    hintNav: 'navegar',
    hintSelect: 'seleccionar',
    hintClose: 'cerrar',
  },
  notFound: {
    title: 'Página no encontrada',
    code: '404',
    text: 'Esta ruta no existe. Quizá el modelo se equivocó de predicción.',
    back: 'Volver al inicio',
  },
} as const;

type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };
export type Dict = Widen<typeof es>;
export default es;
