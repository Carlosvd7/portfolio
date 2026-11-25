import { copyText, showToast } from './copy';
import { assistant } from './assistant';
import { prefersReducedMotion } from './env';

/** Normaliza para buscar sin tildes ni mayúsculas ("credenciales" = "Credénciales"). */
const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export function initPalette(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-palette]');
  const input = dialog?.querySelector<HTMLInputElement>('[data-palette-input]');
  const list = dialog?.querySelector<HTMLElement>('[data-palette-list]');
  if (!dialog || !input || !list) return;

  const options = [...list.querySelectorAll<HTMLElement>('[data-option]')];
  const groups = [...list.querySelectorAll<HTMLElement>('[data-palette-group]')];
  const empty = dialog.querySelector<HTMLElement>('[data-palette-empty]');
  const aiPanel = dialog.querySelector<HTMLElement>('[data-palette-ai]');
  const status = dialog.querySelector<HTMLElement>('[data-palette-status]');
  let active: HTMLElement | null = null;
  let opener: HTMLElement | null = null;

  const visible = () => options.filter((o) => !o.hidden);

  function setActive(opt: HTMLElement | null, scroll = true) {
    active?.setAttribute('aria-selected', 'false');
    active = opt;
    if (opt) {
      opt.setAttribute('aria-selected', 'true');
      input!.setAttribute('aria-activedescendant', opt.id);
      if (scroll) opt.scrollIntoView({ block: 'nearest' });
    } else {
      input!.removeAttribute('aria-activedescendant');
    }
  }

  function filter() {
    const tokens = norm(input!.value.trim()).split(/\s+/).filter(Boolean);
    for (const o of options) {
      const hay = norm(o.dataset.search ?? '');
      o.hidden = !tokens.every((tk) => hay.includes(tk));
    }
    for (const g of groups) g.hidden = !g.querySelector('[data-option]:not([hidden])');
    const vis = visible();
    if (empty) empty.hidden = vis.length > 0;
    setActive(vis[0] ?? null);
    if (aiPanel) aiPanel.hidden = true;
  }

  function open(mode?: string) {
    if (dialog!.open) return;
    opener = document.activeElement as HTMLElement | null;
    input!.value = '';
    filter();
    dialog!.showModal();
    input!.focus();
    if (mode === 'ai') {
      // Desde la barra del asistente: solo la opción de IA y su explicación
      const ai = options.find((o) => o.dataset.action === 'ai');
      if (ai) {
        options.forEach((o) => (o.hidden = o !== ai));
        groups.forEach((g) => (g.hidden = !g.contains(ai)));
        setActive(ai);
        void run(ai);
      }
    }
  }

  function close() {
    if (dialog!.open) dialog!.close();
  }

  function moveTo(delta: number | 'first' | 'last') {
    const vis = visible();
    if (!vis.length) return;
    if (delta === 'first') return setActive(vis[0]!);
    if (delta === 'last') return setActive(vis[vis.length - 1]!);
    const i = active ? vis.indexOf(active) : -1;
    setActive(vis[(i + delta + vis.length) % vis.length]!);
  }

  async function run(opt: HTMLElement) {
    const value = opt.dataset.value ?? '';
    switch (opt.dataset.action) {
      case 'goto': {
        close();
        const target = document.getElementById(value);
        if (target) {
          history.pushState(null, '', `#${value}`);
          target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
          // El foco va a la sección para que teclado y lector de pantalla sigan el salto
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
        break;
      }
      case 'open':
        close();
        window.open(value, '_blank', 'noopener,noreferrer');
        break;
      case 'copy':
        close();
        if (await copyText(value)) showToast();
        break;
      case 'download': {
        close();
        const a = document.createElement('a');
        a.href = value;
        a.download = '';
        a.click();
        break;
      }
      case 'lang':
        location.href = value + location.hash;
        break;
      case 'ai':
        if (!assistant.available && aiPanel) {
          aiPanel.hidden = false;
          if (status) status.textContent = aiPanel.textContent?.replace(/\s+/g, ' ').trim() ?? '';
        }
        break;
    }
  }

  // ---- Eventos ----
  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        moveTo(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveTo(-1);
        break;
      case 'Home':
        if (!input.value) {
          e.preventDefault();
          moveTo('first');
        }
        break;
      case 'End':
        if (!input.value) {
          e.preventDefault();
          moveTo('last');
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (active) void run(active);
        break;
    }
  });

  list.addEventListener('pointermove', (e) => {
    const opt = (e.target as HTMLElement).closest<HTMLElement>('[data-option]');
    if (opt && opt !== active) setActive(opt, false);
  });
  list.addEventListener('click', (e) => {
    const opt = (e.target as HTMLElement).closest<HTMLElement>('[data-option]');
    if (opt) {
      setActive(opt, false);
      void run(opt);
      input.focus();
    }
  });

  // Cerrar al pulsar fuera del panel (sobre el backdrop)
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  dialog.querySelector('[data-palette-close]')?.addEventListener('click', close);
  dialog.addEventListener('close', () => {
    if (status) status.textContent = '';
    if (opener?.isConnected && !document.activeElement?.closest('section[tabindex="-1"]')) opener.focus();
  });

  // Atajo global Ctrl/⌘ + K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (dialog.open) close();
      else open();
    }
  });

  // Botones que abren la paleta (header, barra del asistente, menú móvil…)
  document.querySelectorAll<HTMLElement>('[data-palette-open]').forEach((btn) =>
    btn.addEventListener('click', () => open(btn.dataset.paletteOpen)),
  );
}
