import type { Lang } from '../i18n/utils';

export interface Metric {
  icon: string;
  /** Valor numérico al que llega el contador animado. */
  value: number;
  prefix?: string;
  suffix?: string;
  text: Record<Lang, string>;
}

/** Cifras reales. No añadir métricas que no estén verificadas. */
export const metrics: Metric[] = [
  {
    icon: 'lucide:trending-up',
    prefix: 'Top ',
    value: 10,
    text: {
      es: 'en Google en 2 semanas con calculaCasa.com',
      en: 'on Google within 2 weeks with calculaCasa.com',
    },
  },
  {
    icon: 'lucide:file-search',
    value: 130,
    text: {
      es: 'URLs indexadas en Google en un producto propio',
      en: 'URLs indexed by Google on a product I built',
    },
  },
  {
    icon: 'lucide:circle-check',
    value: 270,
    suffix: '+',
    text: {
      es: 'casos de prueba de QA en NTT DATA',
      en: 'QA test cases at NTT DATA',
    },
  },
  {
    icon: 'lucide:award',
    value: 7,
    text: {
      es: 'credenciales de IA (Databricks ×2 · Anthropic · OpenAI ×3 · Google)',
      en: 'AI credentials (Databricks ×2 · Anthropic · OpenAI ×3 · Google)',
    },
  },
];
