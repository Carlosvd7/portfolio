/** Preferencias del usuario y capacidades del dispositivo, consultadas en vivo. */
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
const fineQuery = matchMedia('(hover: hover) and (pointer: fine)');

export const prefersReducedMotion = (): boolean => reducedQuery.matches;
export const hasFinePointer = (): boolean => fineQuery.matches;

/** Observa elementos una sola vez: llama a `fn` cuando entran en pantalla y deja de observarlos. */
export function onceVisible(
  elements: Iterable<Element>,
  fn: (el: HTMLElement, batchIndex: number) => void,
  options: IntersectionObserverInit = {},
): void {
  const io = new IntersectionObserver((entries) => {
    entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((e, i) => {
        io.unobserve(e.target);
        fn(e.target as HTMLElement, i);
      });
  }, options);
  for (const el of elements) io.observe(el);
}
