/**
 * Asistente de IA — contrato preparado para la fase 2.
 *
 * Fase 1 (ahora): `assistant.available === false` y la paleta muestra "Próximamente".
 * Fase 2: implementar `netlifyAssistant` contra una Netlify Function
 * (`netlify/functions/ask.ts`) que llama a la API de Claude con un system prompt
 * construido desde las colecciones de contenido, limita peticiones por IP y lee la
 * API key de las variables de entorno de Netlify. Ver README → "Fase 2: asistente".
 * Cambiar entonces la exportación `assistant` por `netlifyAssistant`.
 */
export interface AssistantProvider {
  readonly available: boolean;
  ask(question: string, lang: 'es' | 'en'): Promise<string>;
}

const comingSoon: AssistantProvider = {
  available: false,
  ask: () => Promise.reject(new Error('El asistente aún no está disponible')),
};

export const assistant: AssistantProvider = comingSoon;
