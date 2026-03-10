import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'public', 'icon.svg');
const iconsDir = join(root, 'public', 'icons');

mkdirSync(iconsDir, { recursive: true });

const svgBuffer = readFileSync(svgPath);

// Generate PNG icons
for (const size of [192, 512]) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(iconsDir, `icon-${size}x${size}.png`));
  console.log(`Generated icon-${size}x${size}.png`);
}

// Generate apple-touch-icon (180x180)
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(join(root, 'public', 'apple-touch-icon.png'));
console.log('Generated apple-touch-icon.png');

// Generate favicon as 32x32 PNG (browsers accept PNG favicons)
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(join(root, 'public', 'favicon.png'));
console.log('Generated favicon.png');

// Generate ICO-like favicon (actually a 48x48 PNG, rename to .ico workaround)
// For a proper .ico, we'll use a 48x48 PNG since modern browsers support it
await sharp(svgBuffer)
  .resize(48, 48)
  .png()
  .toFile(join(root, 'public', 'favicon.ico'));
console.log('Generated favicon.ico');

// Generate OG image (1200x630)
const ogSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'>
  <defs>
    <linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' style='stop-color:#22c55e'/>
      <stop offset='100%' style='stop-color:#166534'/>
    </linearGradient>
  </defs>
  <rect width='1200' height='630' fill='url(#bg)'/>
  <text x='600' y='250' text-anchor='middle' font-family='Arial,sans-serif' font-size='120' font-weight='bold' fill='white'>🕌</text>
  <text x='600' y='380' text-anchor='middle' font-family='Arial,sans-serif' font-size='72' font-weight='bold' fill='white'>যাকাত ক্যালকুলেটর</text>
  <text x='600' y='450' text-anchor='middle' font-family='Arial,sans-serif' font-size='32' fill='white' opacity='0.85'>পাঁচ মাযহাব সমর্থিত সম্পূর্ণ যাকাত হিসাব অ্যাপ</text>
  <text x='600' y='520' text-anchor='middle' font-family='Arial,sans-serif' font-size='28' fill='white' opacity='0.7'>হাদিস ভিত্তিক — সহীহ বুখারী ও মুসলিম অনুযায়ী</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .resize(1200, 630)
  .png()
  .toFile(join(root, 'public', 'og-image.png'));
console.log('Generated og-image.png');

console.log('\nAll icons generated successfully!');
