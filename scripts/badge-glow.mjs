// Calcula el color del "aura" de cada credencial a partir de su imagen y lo guarda como `glow:` en su YAML.
// Uso: npm run badges:glow   (vuelve a ejecutarlo al añadir o cambiar una insignia)
//
// Método: reduce la imagen a 48x48, descarta píxeles transparentes, casi blancos, casi negros y grises,
// agrupa el resto por tono (24 sectores) ponderando por saturación y toma la media del sector ganador.
// Después sube un poco la luminosidad/saturación para que el halo se vea sobre fondo oscuro.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';

const DIR = 'src/content/credentials';

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}
function hslToHex(h, s, l) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return '#' + [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

async function glowFor(file) {
  // Primero busca colores vivos; si la imagen es de tonos apagados (p. ej. verde salvia), relaja el filtro
  return (await dominant(file, 0.22)) ?? (await dominant(file, 0.08));
}

async function dominant(file, minSat) {
  const { data, info } = await sharp(file).resize(48, 48, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bins = Array.from({ length: 24 }, () => ({ w: 0, r: 0, g: 0, b: 0 }));
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 200) continue;
    const [h, s, l] = rgbToHsl(r, g, b);
    if (s < minSat || l < 0.12 || l > 0.9) continue;
    const bin = bins[Math.floor(h / 15) % 24];
    const w = s * (1 - Math.abs(l - 0.5));
    bin.w += w; bin.r += r * w; bin.g += g * w; bin.b += b * w;
  }
  const best = bins.reduce((a, b) => (b.w > a.w ? b : a));
  if (best.w === 0) return null;
  const [h, s, l] = rgbToHsl(best.r / best.w, best.g / best.w, best.b / best.w);
  return hslToHex(h, Math.min(1, Math.max(s, 0.55)), Math.min(0.68, Math.max(l, 0.55)));
}

for (const name of readdirSync(DIR).filter((f) => /\.ya?ml$/.test(f))) {
  const path = join(DIR, name);
  let yaml = readFileSync(path, 'utf8');
  const img = yaml.match(/^image:\s*(.+)$/m)?.[1]?.trim();
  if (!img) continue;
  const color = await glowFor(resolve(dirname(path), img));
  if (!color) {
    console.log(`${name.padEnd(34)} sin color vivo (se usa el de la marca)`);
    continue;
  }
  yaml = /^glow:/m.test(yaml) ? yaml.replace(/^glow:.*$/m, `glow: '${color}'`) : yaml.replace(/^(image:.*)$/m, `$1\nglow: '${color}'`);
  writeFileSync(path, yaml);
  console.log(`${name.padEnd(34)} ${color}`);
}
