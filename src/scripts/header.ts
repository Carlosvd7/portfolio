/**
 * Header: sombra al hacer scroll, enlace activo según la sección visible,
 * menú móvil (dialog nativo: focus trap y Esc incluidos) y tecla ⌘ en Mac.
 */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  // 1. Sombra al hacer scroll (sin listener de scroll continuo)
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => {
    header.toggleAttribute('data-scrolled', !entry?.isIntersecting);
  }).observe(sentinel);

  // 2. Enlace activo
  const links = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((a) => {
    links.set(a.dataset.navLink!, a);
  });
  const sections = [...links.keys()]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (sections.length) {
    const visible = new Set<string>();
    const setActive = () => {
      // La sección activa es la primera (en orden de documento) que cruza la franja central
      const current = sections.find((s) => visible.has(s.id))?.id;
      links.forEach((a, id) => {
        if (id === current) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setActive();
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
  }

  // 3. Menú móvil
  const menu = document.getElementById('mobile-menu') as HTMLDialogElement | null;
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (menu && openBtn) {
    openBtn.addEventListener('click', () => {
      menu.showModal();
      openBtn.setAttribute('aria-expanded', 'true');
    });
    menu.addEventListener('close', () => {
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.focus();
    });
    menu.querySelector('[data-menu-close]')?.addEventListener('click', () => menu.close());
    menu.querySelectorAll('[data-menu-link]').forEach((a) =>
      a.addEventListener('click', () => menu.close()),
    );
    // Si se agranda la ventana con el menú abierto, se cierra
    matchMedia('(width >= 900px)').addEventListener('change', (e) => {
      if (e.matches && menu.open) menu.close();
    });
  }

  // 4. Cambio de idioma conservando la sección actual (#ancla)
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) => {
    a.addEventListener('click', () => {
      if (location.hash) a.hash = location.hash;
    });
  });

  // 5. Mostrar ⌘ en lugar de Ctrl en Mac
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  if (isMac) {
    document.querySelectorAll('[data-mod-key]').forEach((el) => (el.textContent = '⌘'));
  }
}
