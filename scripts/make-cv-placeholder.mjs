// Genera public/cv/Carlos-Velazquez-CV.pdf como PDF provisional de una página.
// Sustitúyelo por tu CV real con el mismo nombre de archivo.
import { mkdirSync, writeFileSync } from 'node:fs';

const lines = [
  ['F2', 26, 'Carlos Manuel Velazquez Diego'],
  ['F1', 14, 'AI & Software Engineer'],
  ['F1', 11, ''],
  ['F1', 11, 'CV en preparacion / CV coming soon.'],
  ['F1', 11, 'Contacto / Contact: carlosmavd2003@gmail.com'],
  ['F1', 11, 'Web: https://carlosmanuelvelazquez.netlify.app'],
];

let y = 760;
const text = lines
  .map(([font, size, str]) => {
    const out = `BT /${font} ${size} Tf 64 ${y} Td (${str.replace(/[()\\]/g, '\\$&')}) Tj ET`;
    y -= size + 14;
    return out;
  })
  .join('\n');
const stream = `0.035 0.035 0.05 rg 0 0 595 842 re f\n1 0.71 0.28 rg 64 790 48 4 re f\n0.93 0.93 0.95 rg\n${text}`;

const objs = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objs.forEach((o, i) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('');
pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info << /Title (CV - Carlos Manuel Velazquez Diego) >> >>\nstartxref\n${xref}\n%%EOF\n`;

mkdirSync('public/cv', { recursive: true });
writeFileSync('public/cv/Carlos-Velazquez-CV.pdf', pdf, 'latin1');
console.log('public/cv/Carlos-Velazquez-CV.pdf generado');
