/** Copia texto al portapapeles. Si el navegador lo bloquea, devuelve false (el mailto sigue disponible). */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

let toastTimer: ReturnType<typeof setTimeout> | undefined;

/** Muestra el toast "Copiado" (región aria-live, la leen los lectores de pantalla). */
export function showToast(): void {
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = toast.dataset.text ?? '';
  toast.setAttribute('data-show', '');
  toastTimer = setTimeout(() => {
    toast.removeAttribute('data-show');
    setTimeout(() => (toast.textContent = ''), 300);
  }, 1800);
}

/** Botones [data-copy]: copian su valor y cambian el icono a ✓ durante un momento. */
export function initCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!(await copyText(btn.dataset.copy ?? ''))) return;
      showToast();
      const copyIcon = btn.querySelector('[data-copy-icon]');
      const okIcon = btn.querySelector('[data-copied-icon]');
      copyIcon?.classList.add('hidden');
      okIcon?.classList.remove('hidden');
      setTimeout(() => {
        copyIcon?.classList.remove('hidden');
        okIcon?.classList.add('hidden');
      }, 1800);
    });
  });
}
