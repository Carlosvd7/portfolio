import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { techIds } from './data/tech';

/** Texto traducido. Admite **negritas** para resaltar frases clave. */
const L = z.object({ es: z.string().min(1), en: z.string().min(1) });
const LList = z.object({ es: z.array(z.string().min(1)), en: z.array(z.string().min(1)) });
/** Fecha en formato AAAA-MM, o solo AAAA si no importa el mes. */
const YM = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Formato AAAA-MM o AAAA');
const tech = z.enum(techIds);

const yaml = (dir: string) => glob({ pattern: '**/*.{yaml,yml}', base: `./src/content/${dir}` });

const experience = defineCollection({
  loader: yaml('experience'),
  schema: ({ image }) =>
    z.object({
      order: z.number().int(),
      role: L,
      company: z.string(),
      initials: z.string().max(4),
      logo: image().optional(),
      url: z.url().optional(),
      location: z.string(),
      start: YM,
      end: YM.optional(),
      bullets: LList,
      tech: z.array(tech).default([]),
    }),
});

const education = defineCollection({
  loader: yaml('education'),
  schema: ({ image }) =>
    z.object({
      order: z.number().int(),
      title: L,
      institution: z.string(),
      initials: z.string().max(4),
      logo: image().optional(),
      url: z.url().optional(),
      location: z.string().optional(),
      start: YM,
      end: YM.optional(),
      upcoming: z.boolean().default(false),
      description: L.optional(),
      tech: z.array(tech).default([]),
    }),
});

const projects = defineCollection({
  loader: yaml('projects'),
  schema: ({ image }) =>
    z.object({
      order: z.number().int(),
      featured: z.boolean().default(false),
      title: L,
      label: L,
      description: L,
      status: z.enum(['live', 'in-progress', 'done']),
      tech: z.array(tech).min(1),
      links: z
        .object({
          live: z.url().optional(),
          repo: z.url().optional(),
        })
        .default({}),
      image: image().optional(),
      imageAlt: L.optional(),
    }),
});

const credentials = defineCollection({
  loader: yaml('credentials'),
  schema: z.object({
    order: z.number().int(),
    kind: z.enum(['certificate', 'language']).default('certificate'),
    issuer: tech,
    issuerName: z.string().optional(),
    name: L,
    date: YM.optional(),
    note: L.optional(),
    /** Vacío = no se muestra el enlace "Verificar". */
    verifyUrl: z.union([z.url(), z.literal('')]).default(''),
  }),
});

const stack = defineCollection({
  loader: yaml('stack'),
  schema: z.object({
    order: z.number().int(),
    icon: z.string().startsWith('lucide:'),
    title: L,
    items: z.array(tech).min(1),
    /** Grupo "Aprendiendo ahora": estilo más discreto. */
    learning: z.boolean().default(false),
  }),
});

export const collections = { experience, education, projects, credentials, stack };
