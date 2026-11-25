import es, { type Dict } from './es';
import en from './en';

export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

const dicts: Record<Lang, Dict> = { es, en };

export function getLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'es';
}

export function useT(lang: Lang): Dict {
  return dicts[lang];
}

/** Ruta de inicio de cada idioma: `/` para ES y `/en/` para EN. */
export function homePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

/** Etiquetas de idioma BCP 47 para `<html lang>`, hreflang y Open Graph. */
export const htmlLang: Record<Lang, string> = { es: 'es-ES', en: 'en-US' };
export const ogLocale: Record<Lang, string> = { es: 'es_ES', en: 'en_US' };
