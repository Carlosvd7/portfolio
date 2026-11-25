/**
 * Datos de contacto y enlaces del sitio. Único lugar donde se definen.
 * Privacidad: aquí NUNCA van teléfono, dirección, DNI ni fecha de nacimiento.
 */
export const site = {
  name: 'Carlos Manuel Velázquez Diego',
  shortName: 'Carlos Velázquez',
  role: 'AI & Software Engineer',
  email: 'carlosmavd2003@gmail.com',
  cv: '/cv/Carlos-Velazquez-CV.pdf',
  links: {
    github: 'https://github.com/Carlosvd7',
    // TODO (Carlos): pon aquí la URL real de tu perfil de LinkedIn
    linkedin: 'https://www.linkedin.com/in/',
    calculacasa: 'https://calculacasa.com',
  },
} as const;

/** Ids de ancla de cada sección (iguales en ES y EN). */
export const sectionIds = {
  experience: 'experiencia',
  projects: 'proyectos',
  stack: 'stack',
  credentials: 'credenciales',
  contact: 'contacto',
} as const;

/** Secciones navegables (id del ancla + clave de traducción + icono Lucide). */
export const navItems = [
  { id: 'experiencia', key: 'experience', icon: 'lucide:briefcase' },
  { id: 'proyectos', key: 'projects', icon: 'lucide:folder-git-2' },
  { id: 'stack', key: 'stack', icon: 'lucide:layers' },
  { id: 'contacto', key: 'contact', icon: 'lucide:mail' },
] as const;
