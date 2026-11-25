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
  },
  nav: {
    experience: 'Experiencia',
    projects: 'Proyectos',
    stack: 'Stack',
    contact: 'Contacto',
  },
} as const;

type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };
export type Dict = Widen<typeof es>;
export default es;
