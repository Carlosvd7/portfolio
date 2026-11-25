// Comprueba el contraste WCAG de los colores de texto sobre los fondos del sistema.
// Uso: node scripts/check-contrast.mjs  (sale con código 1 si algo no llega a AA)
const bgs = { bg: '#09090D', surface: '#111118', 'surface-2': '#1A1A23', terminal: '#0C0C11' };
const texts = {
  text: '#ECECF1',
  'text-strong': '#F4F4F8',
  muted: '#A9A9B8',
  subtle: '#838396',
  accent: '#FFB547',
  'accent-2': '#8B7CFF',
  ok: '#3DDC84',
  'badge-violet': '#C4BBFF',
  'code-class': '#B8AEFF',
  'code-key': '#7FC8FF',
  'code-string': '#FFCF87',
  'code-op': '#FF8FA3',
};
// Texto oscuro sobre botones de color
const pairs = [
  ['btn-primary', '#1A1204', '#FFB547'],
  ['btn-primary:hover', '#1A1204', '#FFC266'],
  ['ask-icon', '#0E0A24', '#8B7CFF'],
];

const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

let fail = 0;
const rows = [];
for (const [tn, tc] of Object.entries(texts))
  for (const [bn, bc] of Object.entries(bgs)) {
    const r = ratio(tc, bc);
    const ok = r >= 4.5;
    if (!ok) fail++;
    rows.push({ texto: tn, fondo: bn, ratio: r.toFixed(2), AA: ok ? 'sí' : 'NO' });
  }
for (const [n, fg, bg] of pairs) {
  const r = ratio(fg, bg);
  if (r < 4.5) fail++;
  rows.push({ texto: n, fondo: bg, ratio: r.toFixed(2), AA: r >= 4.5 ? 'sí' : 'NO' });
}
console.table(rows);
console.log(fail ? `${fail} combinaciones por debajo de 4.5:1` : 'Todas las combinaciones cumplen AA (≥ 4.5:1)');
process.exit(fail ? 1 : 0);
